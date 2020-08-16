namespace BlogServer.Models.ResponseModels.Posts
{
    public class PostEditModel
    {
        public int PostId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public string Category { get; set; }
    }
}