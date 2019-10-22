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
    public interface ILogWatcher
    {
        void ChangeInterval(int seconds);
    }

    public class LogWatcher : ILogWatcher, IHostedService, IDisposable
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(LogWatcher));

        private readonly ISettings _settings;
        private readonly IServerSentEventsService _serverSentEventsService;
        private long _logLength;

        private Timer _timer;

        public LogWatcher(
            ISettings settings,
            IServerSentEventsService serverSentEventsService)
        {
            _settings = settings;
            _serverSentEventsService = serverSentEventsService;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            Logger.Info($"{nameof(LogWatcher)} is running.");

            _timer = new Timer(DoWork, cancellationToken, TimeSpan.Zero, TimeSpan.FromSeconds(_settings.LogPollInterval));

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            Logger.Info($"{nameof(LogWatcher)} is stopping.");

            _timer?.Change(Timeout.Infinite, 0);

            return Task.CompletedTask;
        }

        public void Dispose()
        {
            _timer?.Dispose();
        }

        public void ChangeInterval(int seconds)
        {
            Logger.Info($"Changed interval to {seconds} seconds.");

            _timer?.Change(TimeSpan.Zero, TimeSpan.FromSeconds(seconds));
        }

        private async void DoWork(object cancellationToken)
        {
            Logger.Info($"Polling Output Log (Interval: {_settings.LogPollInterval}sec)");

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
                        }, (CancellationToken)cancellationToken);
                    }
                    else
                    {
                        Logger.Info("No changes in Output Log.");
                    }
                }
                else
                {
                    Logger.Warn("OutputLogPath is not defined. Cannot parse output log.");
                }
            }
            catch (Exception e)
            {
                Logger.Error(e);
            }
        }
    }
}

