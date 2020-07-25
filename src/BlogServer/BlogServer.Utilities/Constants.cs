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
    }
}