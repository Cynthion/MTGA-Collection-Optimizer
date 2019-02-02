using MtgaDeckBuilder.Api.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MtgaDeckBuilder.Api.SetImport
{
    public class SetLoader
    {
        private readonly IConfiguration _configuration;

        public SetLoader(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void LoadAllSideLoadedSets()
        {
            // TODO load all sets
            //using (var streamReader = new StreamReader())

            //    File.ReadAllText(Path.Combine(_configuration.MtgaDeckBuilderDropFolderPath, "RNA.json"))
        }
    }
}
