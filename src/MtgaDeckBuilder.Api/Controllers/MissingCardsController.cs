using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.InternalApi.MissingCards;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.Api.SetImport;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class MissingCardsController : Controller
    {
        private readonly ILogParser _logParser;
        private readonly ISetLoader _setLoader;
        private readonly IStorage _storage;

        public MissingCardsController(
            ILogParser logParser,
            ISetLoader setLoader,
            IStorage storage
        )
        {
            _logParser = logParser;
            _setLoader = setLoader;
            _storage = storage;
        }

        // GET api/missingcards
        [HttpGet]
        public ActionResult GetMissingCards()
        {
            // TODO parse log async
            // TODO optimize parsing: start from end of file
            var playerDecks = _logParser.ParsePlayerDecks();
            var playerCards = _logParser.ParsePlayerCards();
            
            //var cardInfos = await _setLoader.LoadAllSetsAsync();

            var dto = new MissingCardsPageDto
            {
                PlayerDecks = playerDecks.Select(d => new PlayerDeckDto
                    {
                        Id = d.Id,
                        Name = d.Name,
                        Cards = d.Cards.Select(c => new CardDto
                        {
                            MultiverseId = c.Key,
                            Quantity = c.Value
                        }).ToArray()
                    })
                    .Where(d => !d.Name.Contains("?=?"))
                    .OrderBy(d => d.Name)
                    .ToArray(),
                PlayerCards = playerCards.Select(c => new CardDto
                {
                    MultiverseId = c.Key,
                    Quantity = c.Value
                }).ToArray()
            };

            return Ok(dto);
        }
    }
}