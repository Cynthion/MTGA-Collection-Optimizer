namespace MtgaDeckBuilder.Importer
{
    public interface IConfiguration
    {
        string OutputLogPath { get; set; }

        string PlayerCardsCommand { get; set; }

        string PlayerDecksCommand { get; set; }
    }
}