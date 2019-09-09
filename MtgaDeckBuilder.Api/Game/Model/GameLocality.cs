namespace MtgaDeckBuilder.Api.Game.Model
{
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class GameLocality
    {
        [JsonProperty("langkey")]
        public string Langkey { get; set; }

        [JsonProperty("isoCode")]
        public string IsoCode { get; set; }

        [JsonProperty("keys")]
        public Key[] Keys { get; set; }
    }

    public partial class Key
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("text")]
        public string Text { get; set; }
    }

    public partial class GameLocality
    {
        public static GameLocality[] FromJson(string json) => JsonConvert.DeserializeObject<GameLocality[]>(json, GameLocalityConverter.Settings);
    }

    internal static class GameLocalityConverter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }
}
