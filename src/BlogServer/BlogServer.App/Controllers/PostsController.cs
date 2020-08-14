using System.Threading.Tasks;
using BlogServer.Models.RequestModels.Posts;
using BlogServer.Services;
using Microsoft.AspNetCore.Authorization;
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

        [HttpPost("sort")]
        public async Task<IActionResult> GetSortedPosts(ByCategoryModel model)
        {
            var result = await this.postsService.GetPostsByDateAndCategory(model.Category);

            if (!result.Success)
            {
                return Ok(new { message = result.Message });
            }

            return Ok(result.Data);
        }

        [HttpGet("all")]
        public async Task<IActionResult> GetAllPosts()
        {
            var result = await this.postsService.GetAllPostsByDate();

            if (!result.Success)
            {
                return Ok(new { message = result.Message });
            }

            return Ok(result.Data);
        }

        [HttpGet("categories")]
        public IActionResult GetCategories()
        {
            string[] categories = this.postsService.GetCategories();

            return Ok(categories);
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> Create([FromBody] CreateModel model)
        {
            var result = await this.postsService.CreatePost(model.Title, model.Content, model.Category, model.AuthorId);

            if (!result.Success)
            {
                return Ok(new { message = result.Message });
            }

            return Ok(result.Data);
        }
    }
}