using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;

namespace BlogServer.Models.DomainModels
{
    public class BlogUser: IdentityUser
    {
        public IEnumerable<Post> Posts { get; set; }

        public IEnumerable<Comment> Comments { get; set; }
    }
}