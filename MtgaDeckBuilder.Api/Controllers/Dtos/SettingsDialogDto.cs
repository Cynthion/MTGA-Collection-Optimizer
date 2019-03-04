namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class SettingsDialogDto
    {
        public string OutputLogPath { get; set; }

        public int LogPollInterval { get; set; }
    }
}
