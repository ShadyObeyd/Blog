using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        // TODO Add Author navigation property and foreign key

        public IEnumerable<Comment> Comments { get; set; }
    }
}