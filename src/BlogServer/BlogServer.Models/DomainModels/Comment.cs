using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogServer.Models.DomainModels
{
    public class Comment
    {
        private const int StringMinLength = 5;

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(StringMinLength)]
        public string Content { get; set; }

        // TODO Add Author navigation property and foreign key

        public int PostId { get; set; }

        [ForeignKey(nameof(PostId))]
        public Post Post { get; set; }
    }
}