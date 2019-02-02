using MtgaDeckBuilder.Api.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MtgaDeckBuilder.Api.SetImport
{
    public class SetLoader : ISetLoader
    {
        private readonly IConfiguration _configuration;

        public SetLoader(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public void LoadAllSets()
        {
            Directory.CreateDirectory(Path.Combine(_configuration.MtgaDeckBuilderDropFolderPath, "Sets"));
        }
    }
}
