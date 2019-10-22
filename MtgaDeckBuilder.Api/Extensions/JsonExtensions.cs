using System.IO;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

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

        // TODO make async
        public static TResult FromJsonStream<TResult>(Stream utf8JsonStream)
        {
            var valueTask = JsonSerializer.DeserializeAsync<TResult>(utf8JsonStream, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return valueTask.Result;
        }
    }
}
