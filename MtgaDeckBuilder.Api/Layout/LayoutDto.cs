﻿using System.Collections.Generic;
using MtgaDeckBuilder.Api.Controllers.Dtos;

namespace MtgaDeckBuilder.Api.Layout
{
    public class LayoutDto
    {
        public InventoryDto Inventory { get; set; }

        public TabsDto Tabs { get; set; }

        public IEnumerable<CollectionCardDto> CollectionCards { get; set; }

        public IEnumerable<PlayerDeckDto> Decks { get; set; }
    }

    public class TabsDto
    {
        public HistoryTabDto HistoryTab { get; set; }
    }

    public class HistoryTabDto
    {
        public IEnumerable<HistoryCardDto> HistoryCards { get; set; }

        public int NewBadgeCount { get; set; }
    }
}
