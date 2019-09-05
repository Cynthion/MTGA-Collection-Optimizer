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
            var playerDeckCreations = _logParser.ParsePlayerDeckCreations();
            var playerDeckUpdates = _logParser.ParsePlayerDeckUpdates();
            var playerDeckDeletions = _logParser.ParsePlayerDeckDeletions();

            // merge existing decks and created decks
            var playerDecksConsolidated = playerDecks
                .Concat(playerDeckCreations)
                .GroupBy(pd => pd.Id)
                .Select(id => id.First())
                .ToList();

            // remove deleted decks
            playerDecksConsolidated.RemoveAll(pd => playerDeckDeletions.Contains(pd.Id));

            // TODO check if works
            // replace updated decks
            playerDecksConsolidated.ForEach(pd =>
            {
                if (playerDeckUpdates.Any(u => u.Id == pd.Id))
                {
                    pd = playerDeckUpdates.Single(u => u.Id == pd.Id);
                }
            });

            var dto = new LayoutDto
            {
                Inventory = inventory,
                PlayerCards = playerCards
                    .Select(c => new PlayerCardDto
                    {
                        MtgaId = c.Key,
                        OwnedCount = c.Value,
                    })
                    .ToArray(),
                PlayerDecks = playerDecksConsolidated
                    .Select(d => new PlayerDeckDto
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