using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.Extensions.Hosting;
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
            var testData = "testData";

            while (!stoppingToken.IsCancellationRequested)
            {
                Logger.Info("heartbeat");

                await _serverSentEventsService.SendEventAsync(new ServerSentEvent
                {
                    Data = new List<string>(testData.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None))
                });

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
        }
    }
}
