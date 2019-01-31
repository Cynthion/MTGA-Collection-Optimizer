namespace MtgaDeckBuilder.Api.Configuration
{
    public interface IConfiguration
    {
        string OutputLogPath { get; set; }

        string MtgSetJsonDirectoryPath { get; set; }

        string PlayerCardsCommand { get; set; }

        string PlayerDecksCommand { get; set; }
    }
}