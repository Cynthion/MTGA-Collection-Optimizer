using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.Controllers;
using Newtonsoft.Json;
using NLog;

namespace MtgaDeckBuilder.Api.EventSource
{
    internal class HeartbeatService : BackgroundService
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(HeartbeatService));

        private readonly IServerSentEventsService _serverSentEventsService;

        public HeartbeatService(IServerSentEventsService serverSentEventsService)
        {
            _serverSentEventsService = serverSentEventsService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            var playerCardDto = new PlayerCardDto
            {
                MtgaId = 123456789,
                OwnedCount = 4,
            };

            var json = JsonConvert.SerializeObject(playerCardDto);

            while (!stoppingToken.IsCancellationRequested)
            {
                Logger.Info("heartbeat");

                await _serverSentEventsService.SendEventAsync(new ServerSentEvent
                {
                    Data = new List<string>(json.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None))
                });

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
        }
    }
}
