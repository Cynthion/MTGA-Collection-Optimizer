using System.IO;
using System.Linq;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Game.Data;
using NLog;

namespace MtgaDeckBuilder.Api.Game
{
    public interface IGameDataLoader
    {
        GameDataCard[] LoadGameDataCards();

        GameDataEnum[] LoadGameDataEnums();

        GameDataAbility[] LoadGameDataAbilities();

        GameDataLocality[] LoadGameDataLocalities();
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

        public GameDataCard[] LoadGameDataCards()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.CardsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return GameDataCard.FromJson(json);
            }
        }

        public GameDataEnum[] LoadGameDataEnums()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.EnumsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return GameDataEnum.FromJson(json);
            }
        }

        public GameDataAbility[] LoadGameDataAbilities()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.AbilitiesDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return GameDataAbility.FromJson(json);
            }
        }

        public GameDataLocality[] LoadGameDataLocalities()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.LocalityDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return GameDataLocality.FromJson(json);
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
