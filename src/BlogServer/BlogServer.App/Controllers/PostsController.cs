using System.Threading.Tasks;
using BlogServer.Services;
using Microsoft.AspNetCore.Mvc;

namespace BlogServer.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostsController : ControllerBase
    {
        private readonly PostsService postsService;

        public PostsController(PostsService postsService)
        {
            this.postsService = postsService;
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            string[] categories = this.postsService.GetCategories();

            return Ok(categories);
        }
    }
}