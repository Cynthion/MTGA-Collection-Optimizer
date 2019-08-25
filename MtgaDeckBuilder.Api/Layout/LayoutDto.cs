using System.Collections.Generic;
using MtgaDeckBuilder.Api.Controllers.Dtos;

namespace MtgaDeckBuilder.Api.Layout
{
    public class LayoutDto
    {
        public InventoryDto Inventory { get; set; }

        public IList<PlayerCardDto> PlayerCards { get; set; }

        public IList<PlayerDeckDto> PlayerDecks { get; set; }
    }
}
