using BlogServer.Data;
using BlogServer.Models.DomainModels;
using BlogServer.Models.ResponseModels.Comments;
using BlogServer.Services.Results;
using BlogServer.Utilities;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;

namespace BlogServer.Services
{
    public class CommentsService
    {
        private readonly BlogContext db;

        public CommentsService(BlogContext db)
        {
            this.db = db;
        }

        public async Task<Result> CreateComment(string userId, int postId, string content)
        {
            if (string.IsNullOrEmpty(userId))
            {
                return new Result(Constants.NoUserMessage, false);
            }

            if (postId == 0)
            {
                return new Result(Constants.NoPostMessage, false);
            }

            if (string.IsNullOrEmpty(content) || content.Length < Constants.StringMinLength)
            {
                return new Result(Constants.InvalidCommentMessage, false);
            }

            var comment = new Comment
            {
                AuthorId = userId,
                PostId = postId,
                Content = content
            };

            await this.db.Comments.AddAsync(comment);
            await this.db.SaveChangesAsync();

            return new Result("", true);
        }

        public async Task<ResultData<IEnumerable<CommentModel>>> GetCommentsByPostId(int postId)
        {
            if (postId == 0)
            {
                return new ResultData<IEnumerable<CommentModel>>(Constants.PostNotFoundMessage, false, null);
            }

            var comments = await this.db.Comments.Where(c => c.PostId == postId)
                                                 .OrderByDescending(c => c.CreatetOn)
                                                 .Include(c => c.Author).Select(c => new CommentModel
                                                 {
                                                     Id = c.Id,
                                                     AuthorName = c.Author.Email,
                                                     Content = c.Content,
                                                     CreatedOn = c.CreatetOn.ToString(Constants.DateFormat, CultureInfo.InvariantCulture)
                                                 }).ToArrayAsync();

            return new ResultData<IEnumerable<CommentModel>>("", true, comments);
        }
    }
}