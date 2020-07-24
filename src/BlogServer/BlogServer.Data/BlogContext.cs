using BlogServer.Models.DomainModels;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace BlogServer.Data
{
    public class BlogContext : IdentityDbContext<BlogUser>
    {
        public BlogContext(DbContextOptions<BlogContext> options) 
            : base(options)
        {
        }

        public DbSet<Post> Posts { get; set; }

        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<BlogUser>()
                        .HasIndex(u => u.Email)
                        .IsUnique();

            base.OnModelCreating(modelBuilder);
        }
    }
}