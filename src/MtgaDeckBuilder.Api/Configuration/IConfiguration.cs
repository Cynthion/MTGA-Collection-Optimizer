namespace MtgaDeckBuilder.Api.Configuration
{
    public interface IConfiguration
    {
        string OutputLogPath { get; set; }

        string MtgaDeckBuilderDropFolderPath { get; set; }

        string PlayerCardsCommand { get; set; }

        string PlayerDecksCommand { get; set; }
    }
}