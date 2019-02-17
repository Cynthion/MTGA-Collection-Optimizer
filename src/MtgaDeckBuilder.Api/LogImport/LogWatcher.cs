using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.MissingCards;
using Newtonsoft.Json;
using NLog;

namespace MtgaDeckBuilder.Api.LogImport
{
    public class LogWatcher : IHostedService
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(LogWatcher));

        private readonly IConfiguration _configuration;
        private readonly IMissingCardsService _missingCardsService;
        private readonly IServerSentEventsService _serverSentEventsService;
        private long _logLength;

        public LogWatcher(
            IConfiguration configuration,
            IMissingCardsService missingCardsService,
            IServerSentEventsService serverSentEventsService)
        {
            _configuration = configuration;
            _missingCardsService = missingCardsService;
            _serverSentEventsService = serverSentEventsService;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                var fileInfo = new FileInfo(_configuration.OutputLogPath);

                if (fileInfo.Length != _logLength)
                {
                    Logger.Info($"{fileInfo.Name}: {fileInfo.LastAccessTime} / {fileInfo.LastWriteTime} / {fileInfo.Length}");
                    _logLength = fileInfo.Length;

                    var dto = _missingCardsService.GetMissingCardsPageDto();
                    var json = JsonConvert.SerializeObject(dto);

                    await _serverSentEventsService.SendEventAsync(new ServerSentEvent
                    {
                        Data = new List<string>(json.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None))
                    });
                }

                await Task.Delay(TimeSpan.FromSeconds(5), cancellationToken);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
