using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Controllers.Dtos;
using MtgaDeckBuilder.Api.LogImport;

namespace MtgaDeckBuilder.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SettingsController : ControllerBase
    {
        private readonly ISettings _settings;
        private readonly ILogWatcher _logWatcher;

        public SettingsController(ISettings settings, ILogWatcher logWatcher)
        {
            _settings = settings;
            _logWatcher = logWatcher;
        }

        // GET api/settings
        [HttpGet]
        public ActionResult GetSettings()
        {
            return Ok(_settings);
        }

        // POST api/settings
        [HttpPost]
        public ActionResult SetSettings([FromBody] SettingsDto settingsDto)
        {
            _settings.LogPollInterval = settingsDto.LogPollInterval > 0
                ? settingsDto.LogPollInterval 
                : _settings.LogPollInterval;
            _settings.OutputLogPath = string.IsNullOrEmpty(settingsDto.OutputLogPath)
                ? _settings.OutputLogPath
                : settingsDto.OutputLogPath;
            _settings.GameDataPath = string.IsNullOrEmpty(settingsDto.GameDataPath)
                ? _settings.GameDataPath
                : settingsDto.GameDataPath;

            _logWatcher.ChangeInterval(_settings.LogPollInterval);

            _settings.AssertOutputLogPathValid();
            _settings.AssertGameDataPathValid();

            return NoContent();
        }
    }
}
