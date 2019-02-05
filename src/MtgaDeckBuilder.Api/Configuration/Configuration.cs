namespace MtgaDeckBuilder.Api.Configuration
{
    public class Configuration : IConfiguration
    {
        public string OutputLogPath { get; set; }

        public string MtgaDeckBuilderDropFolderPath { get; set; }

        public string PlayerCardsCommand { get; set; }

        public string PlayerDecksCommand { get; set; }

        public string PlayerInventoryCommand { get; set; }

        public string PlayerNameCommand { get; set; }
    }
}
