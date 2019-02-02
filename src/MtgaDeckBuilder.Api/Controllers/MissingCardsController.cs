using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.InternalApi.MissingCards;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class MissingCardsController : Controller
    {
        private readonly ILogParser _logParser;
        private readonly IStorage _storage;

        public MissingCardsController(ILogParser logParser, IStorage storage)
        {
            _logParser = logParser;
            _storage = storage;
        }

        // GET api/missingcards
        [HttpGet]
        public IActionResult GetMissingCards()
        {
            StartLogImport();

            var dto = new MissingCardsPageDto
            {
                MissingCards = new List<MissingCardDto>
                {
                    new MissingCardDto
                    {
                        Id = "123456",
                        MissingQuantity = 2,
                        Rarity = "Rare",
                    }
                }
            };

            return Ok(dto);
        }

        private void StartLogImport()
        {
            // TODO make async
            var playerCollection = _logParser.ParsePlayerCollection();
            var playerDecks = _logParser.ParsePlayerDecks().ToArray();

            var playerLibrary = new PlayerLibrary
            {
                PlayerCollection = playerCollection,
                PlayerDecks = playerDecks
            };

            _storage.StorePlayerLibrary(playerLibrary);
        }
    }
}