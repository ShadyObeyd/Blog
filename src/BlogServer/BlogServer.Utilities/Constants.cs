using System.Runtime.CompilerServices;

namespace BlogServer.Utilities
{
    public class Constants
    {
        public const string CorsPolicy = "CorsPolicy";
        public const string AppSecret = "super secret key";
        public const string EmailPattern = @"^[A-Za-z0-9]+@[A-Za-z]+\.[a-z]{2,3}$";

        public const string GenericErrorMessage = "An error occured!";

        public const string InvalidEmailOrPasswordMessage = "Invalid email or password!";
        public const string EmailTakenMessage = "Email is taken!";
        public const string EmptyEmailMessage = "Email must not be empty!";
        public const string InvalidEmailMessage = "Invalid email!";
        public const string PasswordEmptyMessage = "Password cannot be empty!";
        public const string PasswordTooShortMessage = "Passowrd length must be at least 3 characters long!";
        public const string PasswordsDontMatchMessage = "Passwords don't match!";
        public const string UserRegisteredSuccessMessage = "User registered successfully!";
        public const string UserLoginSuccessMessage = "User logged in successfully!";

        public const int ContentMinLength = 20;

        public const string InvalidTitleMessage = "Post title cannot be empty!";
        public const string InvalidContentMessage = "Content cannot be less than 20 characters!";
        public const string InvalidCategoryMessage = "Category cannot be empty!";
        public const string PostExistsMessage = "Post with that title already exists!";

        public const string PostCreatedMessage = "Post created successfully!";
        public const string NoPostsMessage = "There are no posts yet!";
        public const string CategoryMissingMessage = "No posts with this category!";
        public const string PostsExistMessage = "Posts exist.";
        public const string UserHasNoPostsMessage = "You currently don't have any posts!";
    }
}