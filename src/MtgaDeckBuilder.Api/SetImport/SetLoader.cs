using MtgaDeckBuilder.Api.Configuration;
using System.IO;
using System.Linq;
using NLog;

namespace MtgaDeckBuilder.Api.SetImport
{
    public class SetLoader : ISetLoader
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(SetLoader));

        private readonly IConfiguration _configuration;

        public SetLoader(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void LoadAllSets()
        {
            var setFolderPath = Path.Combine(_configuration.MtgaDeckBuilderDropFolderPath, "Sets");
            Directory.CreateDirectory(setFolderPath);

            var filePaths = Directory.EnumerateFiles(setFolderPath);
            var setJsonFilePaths = filePaths
                .Where(p => p.EndsWith(".json"));

            foreach (var jsonFilePath in setJsonFilePaths)
            {
                Logger.Info($"Found {jsonFilePath}");
            }
        }
    }
}
