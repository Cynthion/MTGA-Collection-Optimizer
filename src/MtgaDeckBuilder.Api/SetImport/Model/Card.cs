using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.SetImport.Model
{
    public class Card
    {
        public string Artist { get; set; }
        public string BorderColor { get; set; }
        public List<object> ColorIdentity { get; set; }
        public List<object> Colors { get; set; }
        public double ConvertedManaCost { get; set; }
        public List<object> ForeignData { get; set; }
        public string FrameVersion { get; set; }
        public bool HasFoil { get; set; }
        public bool HasNonFoil { get; set; }
        public string Layout { get; set; }
        public Legalities Legalities { get; set; }
        public string ManaCost { get; set; }
        public int MultiverseId { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string OriginalText { get; set; }
        public string OriginalType { get; set; }
        public string Power { get; set; }
        public List<string> Printings { get; set; }
        public string Rarity { get; set; }
        public List<object> Rulings { get; set; }
        public string ScryfallId { get; set; }
        public List<object> Subtypes { get; set; }
        public List<object> Supertypes { get; set; }
        public int TcgplayerProductId { get; set; }
        public string TcgplayerPurchaseUrl { get; set; }
        public string Text { get; set; }
        public string Toughness { get; set; }
        public string Type { get; set; }
        public List<string> Types { get; set; }
        public string Uuid { get; set; }
        public string FlavorText { get; set; }
        public string Watermark { get; set; }
        public string Loyalty { get; set; }
        public double? FaceConvertedManaCost { get; set; }
        public List<string> Names { get; set; }
        public string Side { get; set; }
        public List<string> Variations { get; set; }
        public bool? Starter { get; set; }
    }
}