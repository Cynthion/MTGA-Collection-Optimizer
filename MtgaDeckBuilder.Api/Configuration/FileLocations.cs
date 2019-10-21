namespace MtgaDeckBuilder.Api.Configuration
{
    public interface IFileLocations
    {
        string AbilitiesDataPrefix { get; set; }

        string CardsDataPrefix { get; set; }

        string EnumsDataPrefix { get; set; }

        string LocalityDataPrefix { get; set; }
    }

    public class FileLocations : IFileLocations
    {
        public string MtgaDownloadsDataDirectoryPath { get; set; }

        public string AbilitiesDataPrefix { get; set; }

        public string CardsDataPrefix { get; set; }

        public string EnumsDataPrefix { get; set; }

        public string LocalityDataPrefix { get; set; }
    }
}
