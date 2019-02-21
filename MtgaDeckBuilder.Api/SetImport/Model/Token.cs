using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.SetImport.Model
{
    public class Token
    {
        public string Artist { get; set; }
        public string BorderColor { get; set; }
        public List<object> ColorIdentity { get; set; }
        public List<object> Colors { get; set; }
        public string Name { get; set; }
        public string Number { get; set; }
        public string Power { get; set; }
        public List<object> ReverseRelated { get; set; }
        public string ScryfallId { get; set; }
        public string Toughness { get; set; }
        public string Type { get; set; }
        public string Uuid { get; set; }
        public string Text { get; set; }
        public string Watermark { get; set; }
    }
}