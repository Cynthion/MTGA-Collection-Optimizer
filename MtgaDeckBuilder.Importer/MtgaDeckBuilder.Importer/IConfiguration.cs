namespace MtgaDeckBuilder.Importer
{
    public interface IConfiguration
    {
        string PlayerCardsCommand { get; set; }

        string PlayerDecksCommand { get; set; }
    }
}