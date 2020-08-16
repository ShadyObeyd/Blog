namespace BlogServer.Models.ResponseModels.Posts
{
    public class PostDetailsModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string CreatedOn { get; set; }

        public string Category { get; set; }

        public string AuthorName { get; set; }

        public int CommentsCount { get; set; }

        public string AuthorId { get; set; }
    }
}