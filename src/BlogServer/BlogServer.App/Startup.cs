using BlogServer.Data;
using BlogServer.Models.DomainModels;
using BlogServer.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace BlogServer.App
{
    public class Startup
    {
        private const string CorsPolicy = "CorsPolicy";

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }


        public void ConfigureServices(IServiceCollection services)
        {
            services.AddDbContext<BlogContext>(o => o.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddCors(o =>
            {
                o.AddPolicy(CorsPolicy, p =>
                {
                    p.AllowAnyHeader()
                     .AllowAnyMethod()
                     .WithOrigins("http://localhost:3000");
                });
            });

            services.AddControllers();

            var builder = services.AddIdentityCore<BlogUser>();
            var identityBuilder = new IdentityBuilder(builder.UserType, builder.Services);
            identityBuilder.AddEntityFrameworkStores<BlogContext>();
            identityBuilder.AddSignInManager<SignInManager<BlogUser>>();

            services.AddAuthentication();

            // Application services

            services.AddScoped<PostsService>();
            services.AddScoped<UsersService>();
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(CorsPolicy);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}