namespace BlogServer.Services.Results
{
    public class Result
    {
        public Result(string message, bool success)
        {
            this.Message = message;
            this.Success = success;
        }

        public string Message { get; set; }

        public bool Success { get; set; }
    }
}