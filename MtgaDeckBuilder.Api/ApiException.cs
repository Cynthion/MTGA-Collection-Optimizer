using System;

namespace MtgaDeckBuilder.Api
{
    public class ApiException : Exception
    {
        public ApiErrorCode ApiErrorCode { get; set; }

        public ApiException(ApiErrorCode apiErrorCode)
        {
            ApiErrorCode = apiErrorCode;
        }
    }
}
