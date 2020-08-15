using BlogServer.Models.DomainModels.Enums;
using BlogServer.Models.ResponseModels.Comments;
using System.Collections.Generic;

namespace BlogServer.Models.ResponseModels.Posts
{
    public class PostDetailsModel
    {
        public PostDetailsModel()
        {
            this.Comments = new HashSet<CommentModel>();
        }

        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Category { get; set; }

        public string CreatedOn { get; set; }

        public string AuthorName { get; set; }

        public IEnumerable<CommentModel> Comments { get; set; }
    }
}