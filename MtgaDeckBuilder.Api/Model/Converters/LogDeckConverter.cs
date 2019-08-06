using System;
using System.Collections.Generic;
using System.Linq;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace MtgaDeckBuilder.Api.Model.Converters
{
    public class LogDeckConverter : JsonConverter
    {
        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            throw new NotImplementedException();
        }

        public override object ReadJson(JsonReader reader, Type objectType, object existingValue, JsonSerializer serializer)
        {
            if (reader.TokenType == JsonToken.StartObject)
            {
                var item = JObject.Load(reader);

                return new LogDeck
                {
                    Id = item["id"].Value<string>(),
                    Name = item["name"].Value<string>(),
                    Description = item["description"].Value<string>(),
                    MainDeck = MapTuplesToDictionary(item["mainDeck"].Values<int>().ToList())
                };
            }

            return new LogDeck();
        }

        public override bool CanConvert(Type objectType)
        {
            return objectType == typeof(LogDeck);
        }

        private static IDictionary<long, short> MapTuplesToDictionary(IList<int> tuples)
        {
            var dictionary = new Dictionary<long, short>();

            for (var i = 0; i < tuples.Count; i += 2)
            {
                dictionary.Add(tuples[i], (short)tuples[i+1]);
            }

            return dictionary;
        }
    }
}
