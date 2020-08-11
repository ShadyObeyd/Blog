using BlogServer.Models.RequestModels.Users;
using BlogServer.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace BlogServer.App.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UsersService usersService;

        public UsersController(UsersService usersService)
        {
            this.usersService = usersService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            var result = await this.usersService.Register(model.Email, model.Password, model.RepeatPassword);

            if (!result.Success)
            {
                return Ok(new { message = result.Message });
            }

            return Ok(result.Data);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var result = await this.usersService.Login(model.Email, model.Password);

            if (!result.Success)
            {
                return Ok(new { message = result.Message });
            }

            return Ok(result.Data);
        }
    }
}