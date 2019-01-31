using Microsoft.AspNetCore.Mvc;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class PlayerLibraryController : Controller
    {
        // GET api/playerlibrary
        [HttpGet]
        public IActionResult GetPlayerCollection()
        {
            var result = new[] {
                new { FirstName = "John", LastName = "Doe" },
                new { FirstName = "Chris", LastName = "Smith" }
            };

            return Ok(result);
        }
    }
}
