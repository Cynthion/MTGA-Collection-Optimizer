﻿using Microsoft.AspNetCore.Mvc;
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
            _settings.LogPollInterval = settingsDto.LogPollInterval > 0 
                ? settingsDto.LogPollInterval 
                : _settings.LogPollInterval;
            _settings.OutputLogPath = string.IsNullOrEmpty(settingsDto.OutputLogPath)
                ? _settings.OutputLogPath
                : settingsDto.OutputLogPath;
            _settings.GameDataPath = string.IsNullOrEmpty(settingsDto.GameDataPath)
                ? _settings.GameDataPath
                : settingsDto.GameDataPath;

            return NoContent();
        }
    }
}
