using System.IO;
using System.Linq;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Game.Model;
using NLog;

namespace MtgaDeckBuilder.Api.Game
{
    public interface IGameDataLoader
    {
        GameCard[] LoadGameCards();

        GameEnum[] LoadGameEnums();

        GameAbility[] LoadGameAbilities();

        GameLocality[] LoadGameLocalities();
    }

    public class GameDataLoader : IGameDataLoader
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(GameDataLoader));

        private readonly ISettings _settings;
        private readonly IFileLocations _fileLocations;

        public GameDataLoader(ISettings settings, IFileLocations fileLocations)
        {
            _settings = settings;
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

        public GameLocality[] LoadGameLocalities()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.LocalityDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return GameLocality.FromJson(json);
            }
        }

        private string FindModelPath(string prefix)
        {
            _settings.AssertGameDataPathValid();
            var matchingFile = Directory.GetFiles(_settings.GameDataPath, $"{prefix}*").Single();
            Logger.Info($"Found {matchingFile} game model file.");
            return matchingFile;
        }
    }
}
