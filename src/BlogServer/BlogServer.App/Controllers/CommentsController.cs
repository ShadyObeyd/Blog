using System.Threading.Tasks;
using BlogServer.Models.RequestModels.Comments;
using BlogServer.Models.RequestModels.Posts;
using BlogServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace BlogServer.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        private readonly CommentsService commentsService;

        public CommentsController(CommentsService commentsService)
        {
            this.commentsService = commentsService;
        }

        [Authorize]
        [HttpPost("create")]
        public async Task<IActionResult> CreateComment([FromBody] CreateCommentModel model)
        {
            var result = await this.commentsService.CreateComment(model.UserId, model.PostId, model.Content);

            if (!result.Success)
            {
                return Ok(result.Message);
            }

            return Ok();
        }

        [HttpPost("all")]
        public async Task<IActionResult> GetPostComments([FromBody] ByIdModel model)
        {
            var result = await this.commentsService.GetCommentsByPostId(model.PostId);

            if (!result.Success)
            {
                return Ok(new { message = result.Message });
            }

            return Ok(result.Data);
        }
    }
}