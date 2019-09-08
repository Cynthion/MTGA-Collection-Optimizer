namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class SettingsDto
    {
        public int LogPollInterval { get; set; }

        public string OutputLogPath { get; set; }

        public string GameDataPath { get; set; }
    }
}
