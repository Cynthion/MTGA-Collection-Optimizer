namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class SettingsDto
    {
        public string OutputLogPath { get; set; }

        public int LogPollInterval { get; set; }
    }
}
