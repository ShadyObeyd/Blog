namespace BlogServer.Models.ResponseModels.Comments
{
    public class CommentModel
    {
        public int Id { get; set; }

        public string Content { get; set; }

        public string CreatedOn { get; set; }

        public string AuthorName { get; set; }
    }
}