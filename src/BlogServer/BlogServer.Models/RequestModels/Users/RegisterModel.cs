using System.ComponentModel.DataAnnotations;

namespace BlogServer.Models.RequestModels.Users
{
    public class RegisterModel
    {
        private const int MinLength = 3;

        [EmailAddress(ErrorMessage = "Invalid email!")]
        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(MinLength, ErrorMessage = "Password should be at least 3 characters long!")]
        public string Password { get; set; }

        [Compare(nameof(Password), ErrorMessage = "Passwords don't match!")]
        public string RepeatPassword { get; set; }
    }
}