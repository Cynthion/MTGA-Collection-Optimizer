using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.InternalApi.MissingCards;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.Api.Model;
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
        public async Task<ActionResult> GetMissingCards()
        {
            // TODO move these to another place
            StartLogImport();
            await _setLoader.LoadAllSetsAsync();

            var dto = new MissingCardsPageDto
            {
                MissingCards = new List<MissingCardDto>
                {
                    new MissingCardDto
                    {
                        Id = "123456",
                        MissingQuantity = 2,
                        Rarity = "Rare"
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