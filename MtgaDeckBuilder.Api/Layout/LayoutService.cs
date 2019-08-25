using System.Linq;
using MtgaDeckBuilder.Api.Controllers.Dtos;
using MtgaDeckBuilder.Api.LogImport;

namespace MtgaDeckBuilder.Api.Layout
{
    public class LayoutService : ILayoutService
    {
        private readonly ILogParser _logParser;

        public LayoutService(ILogParser logParser)
        {
            _logParser = logParser;
        }

        public LayoutDto LoadLayout()
        {
            // TODO parse log async
            // TODO optimize parsing: start from end of file
            var inventory = LoadInventory();
            var playerCards = _logParser.ParsePlayerCards();
            var playerDecks = _logParser.ParsePlayerDecks();

            var dto = new LayoutDto
            {
                Inventory = inventory,
                PlayerCards = playerCards.Select(c => new PlayerCardDto
                    {
                        MtgaId = c.Key,
                        OwnedCount = c.Value
                    })
                    .ToArray(),
                PlayerDecks = playerDecks.Select(d => new PlayerDeckDto
                    {
                        Id = d.Id,
                        Name = d.Name,
                        Cards = d.Cards.Select(c => new DeckCardDto
                        {
                            MtgaId = c.Key,
                            RequiredCount = c.Value
                        }).ToArray()
                    })
                    .Where(d => !d.Name.Contains("?=?"))
                    .OrderBy(d => d.Name)
                    .ToArray()
            };

            return dto;
        }

        private InventoryDto LoadInventory()
        {
            var playerName = _logParser.ParsePlayerName();
            var playerInventory = _logParser.ParsePlayerInventory();

            var dto = new InventoryDto
            {
                PlayerName = playerName,
                WildcardCommon = playerInventory.WcCommon,
                WildcardUncommon = playerInventory.WcUncommon,
                WildcardRare = playerInventory.WcRare,
                WildcardMythic = playerInventory.WcMythic,
                Gold = playerInventory.Gold,
                Gems = playerInventory.Gems,
                VaultProgress = playerInventory.VaultProgress,
            };

            return dto;
        }
    }
}