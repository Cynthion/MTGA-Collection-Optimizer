using System.Linq;
using MtgaDeckBuilder.Api.Controllers.Dtos;
using MtgaDeckBuilder.Api.InternalApi.MissingCards;
using MtgaDeckBuilder.Api.LogImport;

namespace MtgaDeckBuilder.Api.MissingCards
{
    public class MissingCardsService : IMissingCardsService
    {
        private readonly ILogParser _logParser;

        public MissingCardsService(ILogParser logParser)
        {
            _logParser = logParser;
        }

        public MissingCardsPageDto GetMissingCardsPageDto()
        {
            // TODO parse log async
            // TODO optimize parsing: start from end of file
            var playerCards = _logParser.ParsePlayerCards();
            var playerDecks = _logParser.ParsePlayerDecks();

            var dto = new MissingCardsPageDto
            {
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
                    .Take(1) // TODO remove
                    .ToArray()
            };

            return dto;
        }
    }
}