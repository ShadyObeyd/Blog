using BlogServer.Models.DomainModels;
using Microsoft.EntityFrameworkCore;

namespace BlogServer.Data
{
    public class BlogContext : DbContext
    {
        public BlogContext(DbContextOptions options) 
            : base(options)
        {

        }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
        }
    }
}