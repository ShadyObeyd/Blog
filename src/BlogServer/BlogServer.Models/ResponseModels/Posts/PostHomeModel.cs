namespace BlogServer.Models.ResponseModels.Posts
{
    public class PostHomeModel
    {
        public int Id { get; set; }

        public string Title { get; set; }

        public string PartialContent => this.Content.Length > 100 ? this.Content.Substring(0, 100) + "..." : this.Content;

        public string Content { get; set; }
    }
}