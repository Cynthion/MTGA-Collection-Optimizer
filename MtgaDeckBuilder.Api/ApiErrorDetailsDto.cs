using Newtonsoft.Json;

namespace MtgaDeckBuilder.Api
{
    public class ApiErrorDetailsDto
    {
        public int StatusCode { get; set; }

        public string Message { get; set; }

        public ApiErrorCode ApiErrorCode { get; set; }

        public override string ToString()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}
