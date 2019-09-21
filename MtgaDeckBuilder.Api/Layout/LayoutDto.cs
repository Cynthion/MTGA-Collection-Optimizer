using System.Collections.Generic;
using MtgaDeckBuilder.Api.Controllers.Dtos;

namespace MtgaDeckBuilder.Api.Layout
{
    public class LayoutDto
    {
        public InventoryDto Inventory { get; set; }

        public IEnumerable<CollectionCardDto> CollectionCards { get; set; }

        public IEnumerable<PlayerDeckDto> Decks { get; set; }

        public int CollectionCardsOwnedCountTotal { get; set; }

        public int CollectionCardsRequiredCountTotal { get; set; }

        public IEnumerable<HistoryCardDto> HistoryCards { get; set; }
    }
}
