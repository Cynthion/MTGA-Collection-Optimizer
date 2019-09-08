namespace MtgaDeckBuilder.Api.Configuration
{
    public interface IFileLocations
    {
        string AbilitiesDataPrefix { get; set; }

        string CardsDataPrefix { get; set; }

        string EnumsDataPrefix { get; set; }

        string LocalityDataPrefix { get; set; }
    }
}
