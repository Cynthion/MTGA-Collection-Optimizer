using System;
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
        public ActionResult SetSettings([FromBody] SettingsDto settingsDto)
        {
            _settings.OutputLogPath = settingsDto.OutputLogPath;
            _settings.LogPollInterval = settingsDto.LogPollInterval;

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
            // replace UI placeholder with user name
            const string userNamePlaceholder = "{user name}";
            if (_settings.OutputLogPath.Contains(userNamePlaceholder))
            {
                _settings.OutputLogPath = _settings.OutputLogPath.Replace(userNamePlaceholder, Environment.UserName);
            }

            try
            {
                using (new FileStream(_settings.OutputLogPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
                {
                }
            }
            catch (Exception)
            {
                throw new ApiException(ApiErrorCode.OutputLogPathInvalid);
            }
        }
    }
}
