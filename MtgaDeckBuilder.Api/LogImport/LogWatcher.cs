using System;
using System.Collections.Generic;
using System.IO;
using System.Threading;
using System.Threading.Tasks;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.Configuration;
using NLog;

namespace MtgaDeckBuilder.Api.LogImport
{
    public class LogWatcher : IHostedService
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(LogWatcher));

        private readonly ISettings _settings;
        private readonly IServerSentEventsService _serverSentEventsService;
        private long _logLength;

        public LogWatcher(
            ISettings settings,
            IServerSentEventsService serverSentEventsService)
        {
            _settings = settings;
            _serverSentEventsService = serverSentEventsService;
        }

        public async Task StartAsync(CancellationToken cancellationToken)
        {
            while (!cancellationToken.IsCancellationRequested)
            {
                try
                {
                    if (_settings.OutputLogPath != null)
                    {
                        var fileInfo = new FileInfo(_settings.OutputLogPath);

                        if (fileInfo.Length != _logLength)
                        {
                            _logLength = fileInfo.Length;

                            var logEntry = $"{fileInfo.Name}: {fileInfo.LastAccessTime} / {fileInfo.LastWriteTime} / {fileInfo.Length}";
                            Logger.Info(logEntry);

                            await _serverSentEventsService.SendEventAsync(new ServerSentEvent
                            {
                                Data = new List<string>(logEntry.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None))
                            }, cancellationToken);
                        }
                    }
                    else
                    {
                        Logger.Warn("OutputLogPath is not defined. Cannot parse log.");
                    }
                }
                catch (Exception e)
                {
                    Logger.Error(e);
                }

                await Task.Delay(TimeSpan.FromSeconds(_settings.LogPollInterval), cancellationToken);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
