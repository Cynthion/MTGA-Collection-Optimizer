using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.LogImport;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class InventoryController : Controller
    {
        private readonly ILogParser _logParser;

        public InventoryController(ILogParser logParser)
        {
            _logParser = logParser;
        }

        // GET api/inventory
        [HttpGet]
        public ActionResult GetInventory()
        {
            // TODO ensure there is no lock with the other parsing
            var playerInventory = _logParser.ParsePlayerInventory();

            var dto = new InventoryDto
            {
                WildcardCommon = playerInventory.WcCommon,
                WildcardUncommon = playerInventory.WcUncommon,
                WildcardRare = playerInventory.WcRare,
                WildcardMythic = playerInventory.WcMythic,
                Gold = playerInventory.Gold,
                Gems = playerInventory.Gems,
                VaultProgress = playerInventory.VaultProgress,
            };

            return Ok(dto);
        }
    }
}
