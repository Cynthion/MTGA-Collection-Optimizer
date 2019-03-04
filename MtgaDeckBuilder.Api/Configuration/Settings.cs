namespace MtgaDeckBuilder.Api.Configuration
{
    public class Settings : ISettings
    {
        public string OutputLogPath { get; set; }

        public int LogPollInterval { get; set; } = 5;
    }
}