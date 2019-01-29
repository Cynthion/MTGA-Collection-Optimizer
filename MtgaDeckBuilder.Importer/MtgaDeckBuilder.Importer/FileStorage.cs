using System;
using System.IO;
using MtgaDeckBuilder.Importer.Model;
using Newtonsoft.Json;

namespace MtgaDeckBuilder.Importer
{
    internal class FileStorage : IStorage
    {
        private const string docName = @"MTGA Deck Builder - Storage File.json";

        public void StorePlayerCollection(PlayerCollection playerCollection)
        {
            var json = JsonConvert.SerializeObject(playerCollection);

            var filePath = Environment.GetFolderPath(Environment.SpecialFolder.MyDocuments);

            using (var streamWriter = new StreamWriter(Path.Combine(filePath, docName)))
            {
                streamWriter.Write(json);
            }
        }
    }
}
