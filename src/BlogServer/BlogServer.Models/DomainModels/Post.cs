using BlogServer.Models.DomainModels.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BlogServer.Models.DomainModels
{
    public class Post
    {
        private const int StringMinLength = 5;

        public Post()
        {
            this.Comments = new HashSet<Comment>();
            this.CreatedOn = DateTime.Today;
        }

        [Key]
        public int Id { get; set; }

        [Required]
        [MinLength(StringMinLength)]
        public string Title { get; set; }

        [Required]
        [MinLength(StringMinLength)]
        public string Content { get; set; }

        public DateTime CreatedOn { get; set; }

        public Category Category { get; set; }

        public string AuthorId { get; set; }

        [ForeignKey(nameof(AuthorId))]
        public BlogUser Author { get; set; }

        public IEnumerable<Comment> Comments { get; set; }
    }
}