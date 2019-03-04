namespace MtgaDeckBuilder.Api.Configuration
{
    public interface ISettings
    {
        string OutputLogPath { get; set; }

        int LogPollInterval { get; set; }
    }
}
