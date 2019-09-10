namespace MtgaDeckBuilder.Api.Game.Data
{
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class GameDataAbility
    {
        [JsonProperty("id")]
        public long Id { get; set; }

        /// <summary>
        /// Loc.Id
        /// </summary>
        [JsonProperty("text")]
        public long Text { get; set; }

        //[JsonProperty("baseId")]
        //public long BaseId { get; set; }

        //[JsonProperty("baseIdNumeral")]
        //public long BaseIdNumeral { get; set; }

        //[JsonProperty("category")]
        //public long Category { get; set; }

        //[JsonProperty("subCategory")]
        //public long SubCategory { get; set; }

        //[JsonProperty("abilityWord")]
        //public long AbilityWord { get; set; }

        //[JsonProperty("requiresConfirmation")]
        //public long RequiresConfirmation { get; set; }

        //[JsonProperty("miscellaneousTerm")]
        //public long MiscellaneousTerm { get; set; }

        //[JsonProperty("numericAid")]
        //public long NumericAid { get; set; }

        //[JsonProperty("fullyParsed")]
        //public bool FullyParsed { get; set; }

        //[JsonProperty("paymentTypes")]
        //public long[] PaymentTypes { get; set; }

        //[JsonProperty("relevantZones")]
        //public long[] RelevantZones { get; set; }

        //[JsonProperty("linkedHiddenAbilities")]
        //public long[] LinkedHiddenAbilities { get; set; }

        //[JsonProperty("referencedKeywords")]
        //public long[] ReferencedKeywords { get; set; }

        //[JsonProperty("referencedKeywordTypes")]
        //public long[] ReferencedKeywordTypes { get; set; }
    }

    public partial class GameDataAbility
    {
        public static GameDataAbility[] FromJson(string json) => JsonConvert.DeserializeObject<GameDataAbility[]>(json, GameAbilityConverter.Settings);
    }

    internal static class GameAbilityConverter
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
