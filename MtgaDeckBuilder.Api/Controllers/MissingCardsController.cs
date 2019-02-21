using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.MissingCards;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class MissingCardsController : Controller
    {
        private readonly IMissingCardsService _missingCardsService;

        public MissingCardsController(IMissingCardsService missingCardsService)
        {
            _missingCardsService = missingCardsService;
        }

        // GET api/missingcards
        [HttpGet]
        public ActionResult GetMissingCards()
        {
            var dto = _missingCardsService.GetMissingCardsPageDto();

            return Ok(dto);
        }
    }
}
