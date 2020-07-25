using BlogServer.Utilities;
using System.ComponentModel.DataAnnotations;

namespace BlogServer.Models.RequestModels.Users
{
    public class RegisterModel
    {
        private const int MinLength = 3;

        [EmailAddress(ErrorMessage = Constants.InvalidEmailMessage)]
        [Required]
        public string Email { get; set; }

        [Required]
        [MinLength(MinLength, ErrorMessage = Constants.PasswordTooShortMessage)]
        public string Password { get; set; }

        [Compare(nameof(Password), ErrorMessage = Constants.PasswordsDontMatchMessage)]
        public string RepeatPassword { get; set; }
    }
}