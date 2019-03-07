namespace MtgaDeckBuilder.Api.Configuration
{
    public class Settings : ISettings
    {
        private int _logPollIntervall = 5;

        public string OutputLogPath { get; set; }

        public int LogPollInterval
        {
            get => _logPollIntervall > 0 ? _logPollIntervall : 5;
            set => _logPollIntervall = value;
        }
    }
}