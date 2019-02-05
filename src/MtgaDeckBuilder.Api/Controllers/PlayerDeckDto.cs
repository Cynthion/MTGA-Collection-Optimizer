using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Controllers
{
    public class PlayerDeckDto
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public IList<DeckCardDto> Cards { get; set; }
    }
}
