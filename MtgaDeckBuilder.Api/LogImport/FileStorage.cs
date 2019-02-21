using System.IO;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Model;
using Newtonsoft.Json;

namespace MtgaDeckBuilder.Api.LogImport
{
    public class FileStorage : IStorage
    {
        private readonly IConfiguration _configuration;
        private const string DocName = @"MTGA Deck Builder - Storage File.json";

        public FileStorage(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void StorePlayerLibrary(PlayerLibrary playerLibrary)
        {
            var json = JsonConvert.SerializeObject(playerLibrary);
            var filePath = Path.Combine(_configuration.MtgaDeckBuilderDropFolderPath, DocName);

            Directory.CreateDirectory(_configuration.MtgaDeckBuilderDropFolderPath);

            using (var fileStream = File.Open(filePath, FileMode.OpenOrCreate))
            using (var streamWriter = new StreamWriter(fileStream))
            {
                streamWriter.Write(json);
            }

            // TODO cut only necessary information
            // TODO cache, key: included json paths
        }
    }
}