namespace MtgaDeckBuilder.Api.Configuration
{
    public interface IMtgaAppConfiguration
    {
        string DetailedLogCommand { get; set; }

        string PlayerCardsCommand { get; set; }

        string PlayerDecksCommand { get; set; }

        string PlayerDeckCreateCommand { get; set; }

        string PlayerDeckUpdateCommand { get; set; }

        string PlayerDeckDeleteCommand { get; set; }

        string PlayerInventoryCommand { get; set; }

        string PlayerNameCommand { get; set; }

    }

    public class MtgaAppConfiguration : IMtgaAppConfiguration
    {
        public string DetailedLogCommand { get; set; }

        public string PlayerCardsCommand { get; set; }

        public string PlayerDecksCommand { get; set; }

        public string PlayerDeckCreateCommand { get; set; }

        public string PlayerDeckUpdateCommand { get; set; }

        public string PlayerDeckDeleteCommand { get; set; }

        public string PlayerInventoryCommand { get; set; }

        public string PlayerNameCommand { get; set; }
    }
}
