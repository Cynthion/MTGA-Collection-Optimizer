using System;
using MtgaDeckBuilder.Importer.Model;
using Newtonsoft.Json;

namespace MtgaDeckBuilder.Importer
{
    internal class FileStorage : IStorage
    {
        public void StorePlayerCollection(PlayerCollection playerCollection)
        {
            var json = JsonConvert.SerializeObject(playerCollection);

            Console.WriteLine(json);
        }
    }
}
