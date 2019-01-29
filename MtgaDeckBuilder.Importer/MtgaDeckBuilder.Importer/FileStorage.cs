using System;
using System.IO;
using MtgaDeckBuilder.Importer.Model;
using Newtonsoft.Json;

namespace MtgaDeckBuilder.Importer
{
    internal class FileStorage : IStorage
    {
        private const string docName = @"MTGA Deck Builder - Storage File.json";

        public void StorePlayerLibrary(PlayerLibrary playerLibrary)
        {
            var json = JsonConvert.SerializeObject(playerLibrary);

            var filePath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            using (var streamWriter = new StreamWriter(Path.Combine(filePath, docName)))
            {
                streamWriter.Write(json);
            }
        }
    }
}
