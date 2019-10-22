using System.Text;
using System.Text.Json;

namespace MtgaDeckBuilder.Api.Extensions
{
    public static class JsonExtensions
    {
        public static TResult FromJson<TResult>(this string json)
        {
            byte[] data = Encoding.UTF8.GetBytes(json);
            var utf8JsonReader = new Utf8JsonReader(data);

            var result = JsonSerializer.Deserialize<TResult>(ref utf8JsonReader, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return result;
        }
    }
}
