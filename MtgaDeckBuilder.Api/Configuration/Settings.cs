using System;

namespace MtgaDeckBuilder.Api.Configuration
{
    public class Settings : ISettings
    {
        private const string UserNamePlaceholder = "{user name}";
        private int _logPollIntervall = 5;

        public string OutputLogPath { get; set; } =  @"C:\Users\{user name}\AppData\LocalLow\Wizards Of The Coast\\MTGA\output_log.txt";

        public int LogPollInterval
        {
            get => _logPollIntervall > 0 ? _logPollIntervall : 5;
            set => _logPollIntervall = value;
        }

        public static void TryReplaceUserNamePlaceholder(ISettings settings)
        {
            if (settings.OutputLogPath.Contains(UserNamePlaceholder))
            {
                settings.OutputLogPath = settings.OutputLogPath.Replace(UserNamePlaceholder, Environment.UserName);
            }
        }
    }
}