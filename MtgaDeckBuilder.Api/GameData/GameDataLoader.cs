using System.IO;
using System.Linq;
using GameData;
using MtgaDeckBuilder.Api.Configuration;
using NLog;

namespace MtgaDeckBuilder.Api.GameData
{
    public interface IGameDataLoader
    {
        GameCard[] LoadGameCards();

        GameEnum[] LoadGameEnums();

        GameAbility[] LoadGameAbilities();
    }

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
                return GameCard.FromJson(json);
            }
        }

        public GameEnum[] LoadGameEnums()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.EnumsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return GameEnum.FromJson(json);
            }
        }

        public GameAbility[] LoadGameAbilities()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.AbilitiesDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return GameAbility.FromJson(json);
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
