namespace MtgaDeckBuilder.Importer
{
    public class Configuration : IConfiguration
    {
        public string PlayerCardsCommand { get; set; }

        public string PlayerDecksCommand { get; set; }
    }
}