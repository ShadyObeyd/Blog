using BlogServer.Data;
using BlogServer.Models.DomainModels;
using BlogServer.Models.DomainModels.Enums;
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

        public async Task<ResultData<PostDetailsModel>> GetPostById(int postId)
        {
            if (postId == 0)
            {
                return new ResultData<PostDetailsModel>(Constants.PostNotFoundMessage, false, null);
            }

            var post = await this.db.Posts.Include(p => p.Author).Include(p => p.Comments).ThenInclude(c => c.Author).FirstOrDefaultAsync(p => p.Id == postId);

            if (post == null)
            {
                return new ResultData<PostDetailsModel>(Constants.PostNotFoundMessage, false, null);
            }

            var model = new PostDetailsModel
            {
                Id = post.Id,
                AuthorName = post.Author.Email,
                Category = post.Category.ToString(),
                Content = post.Content,
                Title = post.Title,
                CreatedOn = post.CreatedOn.ToString(Constants.DateFormat, CultureInfo.InvariantCulture),
                CommentsCount = post.Comments.Count()
            };

            return new ResultData<PostDetailsModel>(Constants.PostExistsMessage, true, model);
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

        public async Task<ResultData<IEnumerable<PostHomeModel>>> GetPostsByDateAndCategory(string category)
        {
            if (category == "All")
            {
                return await this.GetAllPostsByDate();
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

            var posts = await this.db.Posts.Where(p => p.Category == postCategory)
                                           .OrderByDescending(p => p.CreatedOn)
                                           .Select(p => new PostHomeModel
                                            {
                                                Id = p.Id,
                                                Title = p.Title,
                                                Content = p.Content

                                            }).ToArrayAsync();

            return new ResultData<IEnumerable<PostHomeModel>>(Constants.PostExistsMessage, true, posts);
        }

        public async Task<ResultData<IEnumerable<PostHomeModel>>> GetAllPostsByDate()
        {
            bool postsExist = await this.db.Posts.AnyAsync();

            if (!postsExist)
            {
                return new ResultData<IEnumerable<PostHomeModel>>(Constants.NoPostsMessage, false, null);
            }

            var posts = await this.db.Posts.OrderByDescending(p => p.CreatedOn).Select(p => new PostHomeModel
            {
                Id = p.Id,
                Title = p.Title,
                Content = p.Content
                
            }).ToArrayAsync();

            return new ResultData<IEnumerable<PostHomeModel>>(Constants.PostExistsMessage, true, posts);
        }

        public async Task<ResultData<PostIdModel>> CreatePost(string title, string content, string category, string authorId)
        {
            if (string.IsNullOrEmpty(title))
            {
                return new ResultData<PostIdModel>(Constants.InvalidTitleMessage, false, null);
            }

            if (string.IsNullOrEmpty(content) || content.Length < Constants.ContentMinLength)
            {
                return new ResultData<PostIdModel>(Constants.InvalidContentMessage, false, null);
            }

            if (string.IsNullOrEmpty(category))
            {
                return new ResultData<PostIdModel>(Constants.InvalidCategoryMessage, false, null);
            }

            var existingPost = await this.db.Posts.FirstOrDefaultAsync(p => p.Title == title);

            if (existingPost != null)
            {
                return new ResultData<PostIdModel>(Constants.PostExistsMessage, false, null);
            }

            Category postCategory;
            var tryParseCategory = Enum.TryParse(category, true, out postCategory);

            if (!tryParseCategory)
            {
                return new ResultData<PostIdModel>(Constants.InvalidCategoryMessage, false, null);
            }

            var post = new Post
            {
                AuthorId = authorId,
                Category = postCategory,
                Content = content,
                Title = title
            };

            await this.db.Posts.AddAsync(post);
            await this.db.SaveChangesAsync();

            return new ResultData<PostIdModel>(Constants.PostCreatedMessage, true, new PostIdModel
            {
                Id = post.Id
            });
        }

        public string[] GetCategories()
        {
            string[] categories = Enum.GetNames(typeof(Category));

            return categories;
        }
    }
}