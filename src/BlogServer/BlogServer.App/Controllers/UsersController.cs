using BlogServer.Models.RequestModels.Users;
using BlogServer.Services;
using Microsoft.AspNetCore.Mvc;

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
        public IActionResult Register([FromForm] RegisterModel model)
        {

        }
    }
}