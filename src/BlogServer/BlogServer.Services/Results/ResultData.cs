namespace BlogServer.Services.Results
{
    public class ResultData<T> : Result
    {
        public ResultData(string message, bool success, T data) 
            : base(message, success)
        {
            this.Data = data;
        }

        public T Data { get; }
    }
}