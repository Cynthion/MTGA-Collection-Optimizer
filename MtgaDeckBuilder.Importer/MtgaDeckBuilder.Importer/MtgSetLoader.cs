using System;
using System.Collections.Generic;
using System.IO;
using System.Runtime.CompilerServices;
using System.Runtime.InteropServices;
using System.Text;

namespace MtgaDeckBuilder.Importer
{
    internal class MtgSetLoader
    {
        private readonly IConfiguration _configuration;

        public MtgSetLoader(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void LoadAllSideLoadedSets()
        {
            // TODO load all sets
            using (var streamReader = new StreamReader())

            File.ReadAllText(Path.Combine(_configuration.MtgSetJsonDirectoryPath, "RNA.json"))
        }
    }
}
