using BlogServer.Data;
using BlogServer.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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

            // Application services

            services.AddScoped<PostsService>();
        }


        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthorization();

            app.UseCors(CorsPolicy);

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}