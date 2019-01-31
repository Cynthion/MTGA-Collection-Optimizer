using System.Linq;
using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class PlayerLibraryController : Controller
    {
        private readonly ILogParser _logParser;
        private readonly IStorage _storage;

        public PlayerLibraryController(ILogParser logParser, IStorage storage)
        {
            _logParser = logParser;
            _storage = storage;
        }

        // GET api/playerlibrary
        [HttpGet]
        public IActionResult GetPlayerCollection()
        {
            var result = new[]
            {
                new {FirstName = "John", LastName = "Doe"},
                new {FirstName = "Chris", LastName = "Smith"}
            };

            return Ok(result);
        }

        // TODO provide configs like paths from UI
        // GET api/playerlibrary/log-import
        [HttpGet]
        [Route("log-import")]
        public IActionResult StartLogImport()
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

            return Ok();
        }
    }
}