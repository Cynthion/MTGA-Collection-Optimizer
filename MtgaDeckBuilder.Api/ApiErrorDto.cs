namespace MtgaDeckBuilder.Api
{
    public class ApiErrorDto
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public ApiErrorCode ApiErrorCode { get; set; }
    }
}
