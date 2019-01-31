using System;
using System.IO;
using MtgaDeckBuilder.Api.Model;
using Newtonsoft.Json;

namespace MtgaDeckBuilder.Api.LogImport
{
    public class FileStorage : IStorage
    {
        private const string DocName = @"MTGA Deck Builder - Storage File.json";

        public void StorePlayerLibrary(PlayerLibrary playerLibrary)
        {
            var json = JsonConvert.SerializeObject(playerLibrary);

            var filePath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            using (var streamWriter = new StreamWriter(Path.Combine(filePath, DocName)))
            {
                streamWriter.Write(json);
            }
        }
    }
}