using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.MissingCards;
using Newtonsoft.Json;
using NLog;

namespace MtgaDeckBuilder.Api.EventSource
{
    internal class CollectionWatchService : BackgroundService
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(CollectionWatchService));

        private readonly IServerSentEventsService _serverSentEventsService;
        private readonly IMissingCardsService _missingCardsService;

        public CollectionWatchService(
            IServerSentEventsService serverSentEventsService,
            IMissingCardsService missingCardsService
        )
        {
            _serverSentEventsService = serverSentEventsService;
            _missingCardsService = missingCardsService;
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                Logger.Info("Executing collection watch...");

                var dto = _missingCardsService.GetMissingCardsPageDto();
                var json = JsonConvert.SerializeObject(dto);

                await _serverSentEventsService.SendEventAsync(new ServerSentEvent
                {
                    Data = new List<string>(json.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None))
                });

                await Task.Delay(TimeSpan.FromSeconds(5), stoppingToken);
            }
        }
    }
}
