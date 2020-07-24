using System.ComponentModel.DataAnnotations;

namespace BlogServer.Models.RequestModels.Users
{
    public class LoginModel
    {
        private const int MinLength = 3;

        [EmailAddress]
        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(MinLength)]
        public string Password { get; set; }
    }
}