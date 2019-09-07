using System.IO;
using System.Linq;
using GameData;
using MtgaDeckBuilder.Api.Configuration;
using NLog;

namespace MtgaDeckBuilder.Api.GameData
{
    public class GameDataLoader : IGameDataLoader
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(GameDataLoader));

        private readonly IFileLocations _fileLocations;

        public GameDataLoader(IFileLocations fileLocations)
        {
            _fileLocations = fileLocations;
        }

        public GameCard[] LoadGameCards()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.CardsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();

                var gameCards = GameCard.FromJson(json);

                return gameCards;
            }
        }

        private string FindModelPath(string prefix)
        {
            var matchingFile = Directory.GetFiles(_fileLocations.MtgaDownloadsDataDirectoryPath, $"{prefix}*").Single();
            Logger.Info($"Found {matchingFile} game model file.");
            return matchingFile;
        }
    }
}
