namespace BlogServer.Models.RequestModels.Posts
{
    public class CreateModel
    {
        public string Title { get; set; }

        public string Content { get; set; }

        public string Category { get; set; }

        public string AuthorId { get; set; }
    }
}