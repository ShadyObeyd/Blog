using BlogServer.Utilities;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogServer.Models.DomainModels
{
    public class Comment
    {
        public Comment()
        {
            this.CreatetOn = DateTime.Now;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(Constants.StringMinLength)]
        public string Content { get; set; }

        public DateTime CreatetOn { get; set; }

        public string AuthorId { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public BlogUser Author { get; set; }

        public int PostId { get; set; }

        [ForeignKey(nameof(PostId))]
        public Post Post { get; set; }
    }
}