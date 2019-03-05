using System;

namespace MtgaDeckBuilder.Api
{
    public class ApiException : Exception
    {
        public ApiException(string message)
            : base(message)
        { }
    }
}
