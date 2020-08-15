namespace BlogServer.Models.RequestModels.Comments
{
    public class CreateCommentModel
    {
        public string UserId { get; set; }

        public int PostId { get; set; }

        public string Content { get; set; }
    }
}