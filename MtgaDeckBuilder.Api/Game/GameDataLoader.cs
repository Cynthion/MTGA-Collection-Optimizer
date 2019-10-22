using System.IO;
using System.Linq;
using Microsoft.Extensions.Configuration;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Extensions;
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

        private readonly FileLocations _fileLocations;
        private readonly ISettings _settings;

        public GameDataLoader(ISettings settings, IConfiguration configuration)
        {
            _fileLocations = new FileLocations();
            configuration.GetSection("FileLocations").Bind(_fileLocations);
            _settings = settings;
        }

        public GameDataCard[] LoadGameDataCards()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.CardsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return json.FromJson<GameDataCard[]>();
            }
        }

        public GameDataEnum[] LoadGameDataEnums()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.EnumsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return json.FromJson<GameDataEnum[]>();
            }
        }

        public GameDataAbility[] LoadGameDataAbilities()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.AbilitiesDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return json.FromJson<GameDataAbility[]>();
            }
        }

        public GameDataLocality[] LoadGameDataLocalities()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.LocalityDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var json = streamReader.ReadToEnd();
                return json.FromJson<GameDataLocality[]>();
            }
        }

        private string FindModelPath(string prefix)
        {
            _settings.AssertGameDataPathValid();
            var dataPath = Path.Combine(_settings.GameDataPath, "Data");
            var matchingFile = Directory.GetFiles(dataPath, $"{prefix}*.mtga").Single();
            Logger.Info($"Found {matchingFile} game model file.");
            return matchingFile;
        }
    }
}
