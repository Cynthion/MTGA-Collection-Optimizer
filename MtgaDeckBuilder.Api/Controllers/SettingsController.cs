using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Controllers.Dtos;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        private readonly IConfiguration _configuration;

        public SettingsController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        // GET api/settings
        [HttpGet]
        public ActionResult GetSettings()
        {
            var dto = new SettingsDialogDto
            {
                OutputLogPath = _configuration.OutputLogPath
            };

            return Ok(dto);
        }
    }
}
