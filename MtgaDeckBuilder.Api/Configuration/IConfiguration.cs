namespace MtgaDeckBuilder.Api.Configuration
{
    public interface IConfiguration
    {
        string PlayerCardsCommand { get; set; }

        string PlayerDecksCommand { get; set; }

        string PlayerDeckUpdateCommand { get; set; }

        string PlayerInventoryCommand { get; set; }

        string PlayerNameCommand { get; set; }
    }
}