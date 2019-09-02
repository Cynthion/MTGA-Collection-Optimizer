using System.Linq;
using MtgaDeckBuilder.Api.Controllers.Dtos;
using MtgaDeckBuilder.Api.LogImport;
using NLog;

namespace MtgaDeckBuilder.Api.Layout
{
    public class LayoutService : ILayoutService
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(LogParser));

        private readonly ILogParser _logParser;
        // TODO remove
        private int _counter = 1;

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

            var ownedCountRandom = (short)(_counter++ % 5);
            Logger.Info(ownedCountRandom);

            var dto = new LayoutDto
            {
                Inventory = inventory,
                PlayerCards = playerCards.Select(c => new PlayerCardDto
                    {
                        MtgaId = c.Key,
                        // TODO remove after HistoryTab UI finished
                        OwnedCount = c.Key == 66931 ? ownedCountRandom : c.Value,
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