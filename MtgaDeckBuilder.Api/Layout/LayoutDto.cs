using System.Collections.Generic;
using MtgaDeckBuilder.Api.Controllers.Dtos;

namespace MtgaDeckBuilder.Api.Layout
{
    public class LayoutDto
    {
        public InventoryDto Inventory { get; set; }

        public IEnumerable<CollectionCardDto> CollectionCards { get; set; }

        public IEnumerable<PlayerDeckDto> PlayerDecks { get; set; }

        public int CollectionCardsOwnedCountTotal { get; set; }

        public int CollectionCardsRequiredCountTotal { get; set; }
    }
}
