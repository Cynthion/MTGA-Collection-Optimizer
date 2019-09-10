namespace MtgaDeckBuilder.Api.Game.Data
{
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class GameDataEnum
    {
        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("values")]
        public Value[] Values { get; set; }
    }

    public partial class Value
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        [JsonProperty("text")]
        public long Text { get; set; }
    }

    public partial class GameDataEnum
    {
        public static GameDataEnum[] FromJson(string json) => JsonConvert.DeserializeObject<GameDataEnum[]>(json, GameEnumConverter.Settings);
    }

    internal static class GameEnumConverter
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
