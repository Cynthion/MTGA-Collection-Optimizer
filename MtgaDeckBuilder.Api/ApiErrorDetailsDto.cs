namespace MtgaDeckBuilder.Api
{
    public class ApiErrorDetailsDto
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public ApiErrorCode ApiErrorCode { get; set; }
    }
}
