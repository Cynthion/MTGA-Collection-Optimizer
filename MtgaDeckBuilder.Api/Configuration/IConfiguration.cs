namespace MtgaDeckBuilder.Api.Configuration
{
    public interface IConfiguration
    {
        // TODO move to settingsDto
        string OutputLogPath { get; set; }

        string PlayerCardsCommand { get; set; }

        string PlayerDecksCommand { get; set; }

        string PlayerInventoryCommand { get; set; }

        string PlayerNameCommand { get; set; }
    }
}