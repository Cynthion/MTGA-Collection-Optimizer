using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.SetImport.Model
{
    public class Set
    {
        public int BaseSetSize { get; set; }
        public string Block { get; set; }
        public List<object> BoosterV3 { get; set; }
        public List<Card> Cards { get; set; }
        public string Code { get; set; }
        public Meta Meta { get; set; }
        public string MtgoCode { get; set; }
        public string Name { get; set; }
        public string ReleaseDate { get; set; }
        public int TcgplayerGroupId { get; set; }
        public List<Token> Tokens { get; set; }
        public int TotalSetSize { get; set; }
        public string Type { get; set; }
    }
}
