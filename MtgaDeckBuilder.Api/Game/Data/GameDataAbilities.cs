namespace MtgaDeckBuilder.Api.Game.Data
{
    using System.Text;
    using System.Text.Json;
    using System.Text.Json.Serialization;

    public partial class GameDataAbility
    {
        public long Id { get; set; }

        /// <summary>
        /// Loc.Id
        /// </summary>
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
}
