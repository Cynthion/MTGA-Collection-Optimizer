using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Extensions;
using MtgaDeckBuilder.Api.Game.Data;
using NLog;

namespace MtgaDeckBuilder.Api.Game
{
    public interface IGameDataLoader
    {
        ValueTask<GameDataCard[]> LoadGameDataCardsAsync();

        ValueTask<GameDataEnum[]> LoadGameDataEnumsAsync();

        ValueTask<GameDataAbility[]> LoadGameDataAbilitiesAsync();

        ValueTask<GameDataLocality[]> LoadGameDataLocalitiesAsync();
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

        public async ValueTask<GameDataCard[]> LoadGameDataCardsAsync()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.CardsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                return await fileStream.FromJsonStreamAsync<GameDataCard[]>();
            }
        }

        public async ValueTask<GameDataEnum[]> LoadGameDataEnumsAsync()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.EnumsDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                return await fileStream.FromJsonStreamAsync<GameDataEnum[]>();
            }
        }

        public async ValueTask<GameDataAbility[]> LoadGameDataAbilitiesAsync()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.AbilitiesDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                return await fileStream.FromJsonStreamAsync<GameDataAbility[]>();
            }
        }

        public async ValueTask<GameDataLocality[]> LoadGameDataLocalitiesAsync()
        {
            using (var fileStream = new FileStream(FindModelPath(_fileLocations.LocalityDataPrefix), FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            {
                return await fileStream.FromJsonStreamAsync<GameDataLocality[]>();
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
