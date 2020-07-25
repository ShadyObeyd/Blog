using BlogServer.Utilities;
using System.ComponentModel.DataAnnotations;

namespace BlogServer.Models.RequestModels.Users
{
    public class LoginModel
    {
        public string Email { get; set; }

        public string Password { get; set; }
    }
}