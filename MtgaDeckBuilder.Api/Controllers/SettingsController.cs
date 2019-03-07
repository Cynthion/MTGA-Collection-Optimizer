using System.IO;
using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Controllers.Dtos;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class SettingsController : Controller
    {
        private readonly ISettings _settings;

        public SettingsController(ISettings settings)
        {
            _settings = settings;
        }

        // POST api/settings
        [HttpPost]
        public ActionResult SetSettings([FromBody] SettingsDialogDto settingsDialogDto)
        {
            _settings.OutputLogPath = settingsDialogDto.OutputLogPath;
            _settings.LogPollInterval = settingsDialogDto.LogPollInterval;

            AssertOutputLogPath();
            AssertOutputLogPathValid();

            return NoContent();
        }

        private void AssertOutputLogPath()
        {
            if (_settings.OutputLogPath == null)
            {
                throw new ApiException(ApiErrorCode.OutputLogPathNull);
            }
        }

        private void AssertOutputLogPathValid()
        {
            try
            {
                using (new FileStream(_settings.OutputLogPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                }
            }
            catch (FileNotFoundException)
            {
                throw new ApiException(ApiErrorCode.OutputLogPathInvalid);
            }
        }
    }
}
