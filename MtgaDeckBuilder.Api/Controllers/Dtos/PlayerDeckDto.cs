using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class PlayerDeckDto
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public IList<DeckCardDto> Cards { get; set; }

        public int TotalOwnedDeckCards { get; set; }

        public int TotalDeckCards { get; set; }

        public int Completeness { get; set; }

        public float Worth { get; set; }
    }
}
