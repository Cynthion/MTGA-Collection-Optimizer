namespace Game.Model
{
    using System.Globalization;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Converters;

    public partial class GameCard
    {
        [JsonProperty("grpid")]
        public long Grpid { get; set; }

        [JsonProperty("titleId")]
        public long TitleId { get; set; }

        [JsonProperty("artId")]
        public long ArtId { get; set; }

        //[JsonProperty("isToken")]
        //public bool IsToken { get; set; }

        //[JsonProperty("isCollectible")]
        //public bool IsCollectible { get; set; }

        //[JsonProperty("isCraftable")]
        //public bool IsCraftable { get; set; }

        //[JsonProperty("artSize")]
        //public long ArtSize { get; set; }

        [JsonProperty("power")]
        public long Power { get; set; }

        [JsonProperty("toughness")]
        public long Toughness { get; set; }

        //[JsonProperty("flavorId")]
        //public long FlavorId { get; set; }

        //[JsonProperty("CollectorNumber")]
        //public string CollectorNumber { get; set; }

        //[JsonProperty("altDeckLimit")]
        //public long? AltDeckLimit { get; set; }

        //[JsonProperty("cmc")]
        //public long Cmc { get; set; }

        [JsonProperty("rarity")]
        public long Rarity { get; set; }

        //[JsonProperty("artistCredit")]
        //public string ArtistCredit { get; set; }

        //[JsonProperty("set")]
        //public Set Set { get; set; }

        [JsonProperty("set")]
        public string Set { get; set; }

        //[JsonProperty("linkedFaceType")]
        //public long LinkedFaceType { get; set; }

        /// <summary>
        /// Enum.CardType.Id
        /// </summary>
        [JsonProperty("types")]
        public long[] Types { get; set; }

        /// <summary>
        /// Enum.CardType.Id
        /// </summary>
        [JsonProperty("subtypes")]
        public long[] Subtypes { get; set; }

        /// <summary>
        /// Enum.CardType.Id
        /// </summary>
        [JsonProperty("supertypes")]
        public long[] Supertypes { get; set; }

        /// <summary>
        /// Loc.Keys.Id of Enum.CardType
        /// </summary>
        [JsonProperty("cardTypeTextId")]
        public long CardTypeTextId { get; set; }

        /// <summary>
        /// Loc.Keys.Id of Enum.CardType
        /// </summary>
        [JsonProperty("subtypeTextId")]
        public long SubtypeTextId { get; set; }

        /// <summary>
        /// Enum.Color.Id
        /// </summary>
        [JsonProperty("colors")]
        public long[] Colors { get; set; }

        //[JsonProperty("frameColors")]
        //public long[] FrameColors { get; set; }

        //[JsonProperty("frameDetails")]
        //public FrameDetail[] FrameDetails { get; set; }

        //[JsonProperty("colorIdentity")]
        //public long[] ColorIdentity { get; set; }

        [JsonProperty("abilities")]
        public Ability[] Abilities { get; set; }

        [JsonProperty("hiddenAbilities")]
        public Ability[] HiddenAbilities { get; set; }

        //[JsonProperty("linkedFaces")]
        //public long[] LinkedFaces { get; set; }

        //[JsonProperty("castingcost")]
        //public string Castingcost { get; set; }

        /// <summary>
        /// Card.GrpId
        /// </summary>
        [JsonProperty("linkedTokens")]
        public long[] LinkedTokens { get; set; }

        //[JsonProperty("knownSupportedStyles")]
        //public KnownSupportedStyle[] KnownSupportedStyles { get; set; }
    }

    public partial class Ability
    {
        [JsonProperty("abilityId")]
        public long AbilityId { get; set; }

        [JsonProperty("textId")]
        public long TextId { get; set; }
    }

    //public enum FrameDetail { Adventure, ArgiveMark, BGGuildmark, BRGuildmark, BenaliaMark, CabalMark, FemerefMark, GUGuildmark, GWGuildmark, GhituMark, Gold, HasMark, Hybrid, KeldMark, LlanowarMark, MadaraMark, PhyrexiaMark, PhyrexianMark, RGGuildmark, RWGuildmark, StorySpotlight, ThranMark, TolariaMark, UBGuildmark, URGuildmark, WBGuildmark, WUGuildmark };

    //public enum KnownSupportedStyle { Da, Sg, Sh };

    //public enum Set { Akh, Ana, ArenaSup, Avr, Bfz, C13, Chk, Cmd, Dar, Dis, Dst, Eld, Emn, G18, Grn, Gtc, M11, M19, M20, Me2, Me4, Mi, Nph, Ps, Rav, Rix, Rna, Roe, Rtr, Scg, The10E, The5Dn, The9Ed, War, Xln, Zen };

    public partial class GameCard
    {
        public static GameCard[] FromJson(string json) => JsonConvert.DeserializeObject<GameCard[]>(json, GameCardConverter.Settings);
    }

    internal static class GameCardConverter
    {
        public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
        {
            MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
            DateParseHandling = DateParseHandling.None,
            Converters =
            {
                //FrameDetailConverter.Singleton,
                //KnownSupportedStyleConverter.Singleton,
                //SetConverter.Singleton,
                new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
            },
        };
    }

    //internal class FrameDetailConverter : JsonConverter
    //{
    //    public override bool CanConvert(Type t) => t == typeof(FrameDetail) || t == typeof(FrameDetail?);

    //    public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    //    {
    //        if (reader.TokenType == JsonToken.Null) return null;
    //        var value = serializer.Deserialize<string>(reader);
    //        switch (value)
    //        {
    //            case "adventure":
    //                return FrameDetail.Adventure;
    //            case "argive mark":
    //                return FrameDetail.ArgiveMark;
    //            case "b/g guildmark":
    //                return FrameDetail.BGGuildmark;
    //            case "b/r guildmark":
    //                return FrameDetail.BRGuildmark;
    //            case "benalia mark":
    //                return FrameDetail.BenaliaMark;
    //            case "cabal mark":
    //                return FrameDetail.CabalMark;
    //            case "femeref mark":
    //                return FrameDetail.FemerefMark;
    //            case "g/u guildmark":
    //                return FrameDetail.GUGuildmark;
    //            case "g/w guildmark":
    //                return FrameDetail.GWGuildmark;
    //            case "ghitu mark":
    //                return FrameDetail.GhituMark;
    //            case "gold":
    //                return FrameDetail.Gold;
    //            case "has mark":
    //                return FrameDetail.HasMark;
    //            case "hybrid":
    //                return FrameDetail.Hybrid;
    //            case "keld mark":
    //                return FrameDetail.KeldMark;
    //            case "llanowar mark":
    //                return FrameDetail.LlanowarMark;
    //            case "madara mark":
    //                return FrameDetail.MadaraMark;
    //            case "phyrexia mark":
    //                return FrameDetail.PhyrexiaMark;
    //            case "phyrexian mark":
    //                return FrameDetail.PhyrexianMark;
    //            case "r/g guildmark":
    //                return FrameDetail.RGGuildmark;
    //            case "r/w guildmark":
    //                return FrameDetail.RWGuildmark;
    //            case "story spotlight":
    //                return FrameDetail.StorySpotlight;
    //            case "thran mark":
    //                return FrameDetail.ThranMark;
    //            case "tolaria mark":
    //                return FrameDetail.TolariaMark;
    //            case "u/b guildmark":
    //                return FrameDetail.UBGuildmark;
    //            case "u/r guildmark":
    //                return FrameDetail.URGuildmark;
    //            case "w/b guildmark":
    //                return FrameDetail.WBGuildmark;
    //            case "w/u guildmark":
    //                return FrameDetail.WUGuildmark;
    //        }
    //        throw new Exception("Cannot unmarshal type FrameDetail");
    //    }

    //    public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
    //    {
    //        if (untypedValue == null)
    //        {
    //            serializer.Serialize(writer, null);
    //            return;
    //        }
    //        var value = (FrameDetail)untypedValue;
    //        switch (value)
    //        {
    //            case FrameDetail.Adventure:
    //                serializer.Serialize(writer, "adventure");
    //                return;
    //            case FrameDetail.ArgiveMark:
    //                serializer.Serialize(writer, "argive mark");
    //                return;
    //            case FrameDetail.BGGuildmark:
    //                serializer.Serialize(writer, "b/g guildmark");
    //                return;
    //            case FrameDetail.BRGuildmark:
    //                serializer.Serialize(writer, "b/r guildmark");
    //                return;
    //            case FrameDetail.BenaliaMark:
    //                serializer.Serialize(writer, "benalia mark");
    //                return;
    //            case FrameDetail.CabalMark:
    //                serializer.Serialize(writer, "cabal mark");
    //                return;
    //            case FrameDetail.FemerefMark:
    //                serializer.Serialize(writer, "femeref mark");
    //                return;
    //            case FrameDetail.GUGuildmark:
    //                serializer.Serialize(writer, "g/u guildmark");
    //                return;
    //            case FrameDetail.GWGuildmark:
    //                serializer.Serialize(writer, "g/w guildmark");
    //                return;
    //            case FrameDetail.GhituMark:
    //                serializer.Serialize(writer, "ghitu mark");
    //                return;
    //            case FrameDetail.Gold:
    //                serializer.Serialize(writer, "gold");
    //                return;
    //            case FrameDetail.HasMark:
    //                serializer.Serialize(writer, "has mark");
    //                return;
    //            case FrameDetail.Hybrid:
    //                serializer.Serialize(writer, "hybrid");
    //                return;
    //            case FrameDetail.KeldMark:
    //                serializer.Serialize(writer, "keld mark");
    //                return;
    //            case FrameDetail.LlanowarMark:
    //                serializer.Serialize(writer, "llanowar mark");
    //                return;
    //            case FrameDetail.MadaraMark:
    //                serializer.Serialize(writer, "madara mark");
    //                return;
    //            case FrameDetail.PhyrexiaMark:
    //                serializer.Serialize(writer, "phyrexia mark");
    //                return;
    //            case FrameDetail.PhyrexianMark:
    //                serializer.Serialize(writer, "phyrexian mark");
    //                return;
    //            case FrameDetail.RGGuildmark:
    //                serializer.Serialize(writer, "r/g guildmark");
    //                return;
    //            case FrameDetail.RWGuildmark:
    //                serializer.Serialize(writer, "r/w guildmark");
    //                return;
    //            case FrameDetail.StorySpotlight:
    //                serializer.Serialize(writer, "story spotlight");
    //                return;
    //            case FrameDetail.ThranMark:
    //                serializer.Serialize(writer, "thran mark");
    //                return;
    //            case FrameDetail.TolariaMark:
    //                serializer.Serialize(writer, "tolaria mark");
    //                return;
    //            case FrameDetail.UBGuildmark:
    //                serializer.Serialize(writer, "u/b guildmark");
    //                return;
    //            case FrameDetail.URGuildmark:
    //                serializer.Serialize(writer, "u/r guildmark");
    //                return;
    //            case FrameDetail.WBGuildmark:
    //                serializer.Serialize(writer, "w/b guildmark");
    //                return;
    //            case FrameDetail.WUGuildmark:
    //                serializer.Serialize(writer, "w/u guildmark");
    //                return;
    //        }
    //        throw new Exception("Cannot marshal type FrameDetail");
    //    }

    //    public static readonly FrameDetailConverter Singleton = new FrameDetailConverter();
    //}

    //internal class KnownSupportedStyleConverter : JsonConverter
    //{
    //    public override bool CanConvert(Type t) => t == typeof(KnownSupportedStyle) || t == typeof(KnownSupportedStyle?);

    //    public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    //    {
    //        if (reader.TokenType == JsonToken.Null) return null;
    //        var value = serializer.Deserialize<string>(reader);
    //        switch (value)
    //        {
    //            case "DA":
    //                return KnownSupportedStyle.Da;
    //            case "SG":
    //                return KnownSupportedStyle.Sg;
    //            case "SH":
    //                return KnownSupportedStyle.Sh;
    //        }
    //        throw new Exception("Cannot unmarshal type KnownSupportedStyle");
    //    }

    //    public override void WriteJson(JsonWriter writer, object untypedValue, JsonSerializer serializer)
    //    {
    //        if (untypedValue == null)
    //        {
    //            serializer.Serialize(writer, null);
    //            return;
    //        }
    //        var value = (KnownSupportedStyle)untypedValue;
    //        switch (value)
    //        {
    //            case KnownSupportedStyle.Da:
    //                serializer.Serialize(writer, "DA");
    //                return;
    //            case KnownSupportedStyle.Sg:
    //                serializer.Serialize(writer, "SG");
    //                return;
    //            case KnownSupportedStyle.Sh:
    //                serializer.Serialize(writer, "SH");
    //                return;
    //        }
    //        throw new Exception("Cannot marshal type KnownSupportedStyle");
    //    }

    //    public static readonly KnownSupportedStyleConverter Singleton = new KnownSupportedStyleConverter();
    //}

    //    internal class SetConverter : JsonConverter
    //    {
    //        public override bool CanConvert(Type t) => t == typeof(Set) || t == typeof(Set?);

    //        public override object ReadJson(JsonReader reader, Type t, object existingValue, JsonSerializer serializer)
    //        {
    //            if (reader.TokenType == JsonToken.Null) return null;
    //            var value = serializer.Deserialize<string>(reader);
    //            switch (value)
    //            {
    //                case "10E":
    //                    return Set.The10E;
    //                case "5DN":
    //                    return Set.The5Dn;
    //                case "9ED":
    //                    return Set.The9Ed;
    //                case "AKH":
    //                    return Set.Akh;
    //                case "ANA":
    //                    return Set.Ana;
    //                case "AVR":
    //                    return Set.Avr;
    //                case "ArenaSUP":
    //                    return Set.ArenaSup;
    //                case "BFZ":
    //                    return Set.Bfz;
    //                case "C13":
    //                    return Set.C13;
    //                case "CHK":
    //                    return Set.Chk;
    //                case "CMD":
    //                    return Set.Cmd;
    //                case "DAR":
    //                    return Set.Dar;
    //                case "DIS":
    //                    return Set.Dis;
    //                case "DST":
    //                    return Set.Dst;
    //                case "ELD":
    //                    return Set.Eld;
    //                case "EMN":
    //                    return Set.Emn;
    //                case "G18":
    //                    return Set.G18;
    //                case "GRN":
    //                    return Set.Grn;
    //                case "GTC":
    //                    return Set.Gtc;
    //                case "M11":
    //                    return Set.M11;
    //                case "M19":
    //                    return Set.M19;
    //                case "M20":
    //                    return Set.M20;
    //                case "ME2":
    //                    return Set.Me2;
    //                case "ME4":
    //                    return Set.Me4;
    //                case "MI":
    //                    return Set.Mi;
    //                case "NPH":
    //                    return Set.Nph;
    //                case "PS":
    //                    return Set.Ps;
    //                case "RAV":
    //                    return Set.Rav;
    //                case "RIX":
    //                    return Set.Rix;
    //                case "RNA":
    //                    return Set.Rna;
    //                case "ROE":
    //                    return Set.Roe;
    //                case "RTR":
    //                    return Set.Rtr;
    //                case "SCG":
    //                    return Set.Scg;
    //                case "WAR":
    //                    return Set.War;
    //                case "XLN":
    //                    return Set.Xln;
    //                case "ZEN":
    //                    return Set.Zen;
    //            }
    //            throw new Exception("Cannot unmarshal type Set");
    //        }


    //    }
}
