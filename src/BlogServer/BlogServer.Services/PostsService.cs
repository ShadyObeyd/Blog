using BlogServer.Data;
using BlogServer.Models.DomainModels;
using BlogServer.Models.DomainModels.Enums;
using BlogServer.Models.ResponseModels.Comments;
using BlogServer.Models.ResponseModels.Posts;
using BlogServer.Services.Results;
using BlogServer.Utilities;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BlogServer.Services
{
    public class PostsService
    {
        private readonly BlogContext db;

        public PostsService(BlogContext db)
        {
            this.db = db;
        }

        public async Task<ResultData<IEnumerable<PostHomeModel>>> GetPostsByUserId(string userId)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new ResultData<IEnumerable<PostHomeModel>>(Constants.UserHasNoPostsMessage, false, null);
            }

            var posts = await this.db.Posts.Where(p => p.AuthorId == userId)
                                     .OrderByDescending(p => p.CreatedOn)
                                     .Select(p => new PostHomeModel
                                     {
                                         Id = p.Id,
                                         Content = p.Content,
                                         Title = p.Title
                                     }).ToArrayAsync();

            return new ResultData<IEnumerable<PostHomeModel>>(Constants.PostsExistMessage, true, posts);
        }

        public async Task<ResultData<IEnumerable<PostHomeModel>>> GetPostsByDateAndCategory(string category = null)
        {
            if (category == "All")
            {
                category = null;
            }

            bool postsExist = await this.db.Posts.AnyAsync();

            if (!postsExist)
            {
                return new ResultData<IEnumerable<PostHomeModel>>(Constants.CategoryMissingMessage, false, null);
            }

            Category postCategory;
            var tryParseCategory = Enum.TryParse(category, true, out postCategory);

            if (!tryParseCategory)
            {
                return new ResultData<IEnumerable<PostHomeModel>>(Constants.InvalidCategoryMessage, false, null);
            }

            var posts = await this.db.Posts.Where(p => category == null ? true : p.Category == postCategory)
                                           .OrderByDescending(p => p.CreatedOn)
                                           .Select(p => new PostHomeModel
                                            {
                                                Id = p.Id,
                                                Title = p.Title,
                                                Content = p.Content

                                            }).ToArrayAsync();

            return new ResultData<IEnumerable<PostHomeModel>>(Constants.PostExistsMessage, true, posts);
        }

        public async Task<ResultData<PostDetailsModel>> CreatePost(string title, string content, string category, string authorId)
        {
            if (string.IsNullOrEmpty(title))
            {
                return new ResultData<PostDetailsModel>(Constants.InvalidTitleMessage, false, null);
            }

            if (string.IsNullOrEmpty(content) || content.Length < Constants.ContentMinLength)
            {
                return new ResultData<PostDetailsModel>(Constants.InvalidContentMessage, false, null);
            }

            if (string.IsNullOrEmpty(category))
            {
                return new ResultData<PostDetailsModel>(Constants.InvalidCategoryMessage, false, null);
            }

            var existingPost = await this.db.Posts.FirstOrDefaultAsync(p => p.Title == title);

            if (existingPost != null)
            {
                return new ResultData<PostDetailsModel>(Constants.PostExistsMessage, false, null);
            }

            Category postCategory;
            var tryParseCategory = Enum.TryParse(category, true, out postCategory);

            if (!tryParseCategory)
            {
                return new ResultData<PostDetailsModel>(Constants.InvalidCategoryMessage, false, null);
            }

            var post = new Post
            {
                AuthorId = authorId,
                Category = postCategory,
                Content = content,
                Title = title,
                Author = await this.db.Users.FirstOrDefaultAsync(u => u.Id == authorId)
            };

            await this.db.Posts.AddAsync(post);
            await this.db.SaveChangesAsync();

            return new ResultData<PostDetailsModel>(Constants.PostCreatedMessage, true, new PostDetailsModel
            {
                Id = post.Id,
                AuthorName = post.Author.Email,
                Category = post.Category,
                Content = post.Content,
                Title = post.Title,
                CreatedOn = post.CreatedOn.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture),
                Comments = post.Comments.Select(c => new CommentModel
                {
                    CreatedOn = c.CreatetOn.ToString("dd.MM.yyyy", CultureInfo.InvariantCulture),
                    AuthorName = c.Author.Email,
                    Content = c.Content
                })
            });
        }

        public string[] GetCategories()
        {
            string[] categories = Enum.GetNames(typeof(Category));

            return categories;
        }
    }
}