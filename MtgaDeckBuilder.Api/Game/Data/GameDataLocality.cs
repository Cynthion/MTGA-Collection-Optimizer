namespace MtgaDeckBuilder.Api.Game.Data
{
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class GameDataLocality
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

    public partial class GameDataLocality
    {
        public static GameDataLocality[] FromJson(string json) => JsonConvert.DeserializeObject<GameDataLocality[]>(json, GameLocalityConverter.Settings);
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
