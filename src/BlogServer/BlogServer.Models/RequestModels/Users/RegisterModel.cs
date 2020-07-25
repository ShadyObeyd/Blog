using BlogServer.Utilities;
using System.ComponentModel.DataAnnotations;

namespace BlogServer.Models.RequestModels.Users
{
    public class RegisterModel
    {
        public string Email { get; set; }

        public string Password { get; set; }

        public string RepeatPassword { get; set; }
    }
}