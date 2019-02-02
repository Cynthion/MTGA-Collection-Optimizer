using System;
using System.Collections.Generic;
using MtgaDeckBuilder.Api.Configuration;
using System.IO;
using System.Linq;
using MtgaDeckBuilder.Api.SetImport.Model;
using Newtonsoft.Json;
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

            var allCardInfos = new List<CardInfo>();

            foreach (var jsonFilePath in setJsonFilePaths)
            {
                Logger.Info($"Found {jsonFilePath}");
                string setJson;

                try
                {
                    // TODO make async
                    setJson = File.ReadAllText(jsonFilePath);
                }
                catch (Exception e)
                {
                    Logger.Error(e, $"Could not read {jsonFilePath}");
                    break;
                }
    
                try
                {
                    File.ReadAllText(jsonFilePath);

                    // TODO figure out if only certain properties can be read
                    var set = JsonConvert.DeserializeObject<Set>(setJson);
                    var setCards = set.Cards;
                    var setCardInfos = setCards.Select(c => new CardInfo
                    {
                        MultiverseId = c.MultiverseId,
                        Name = c.Name,
                        Number = c.Number,
                        Rarity = c.Rarity,
                        Uuid = c.Uuid,
                    });

                    allCardInfos.AddRange(setCardInfos);
                }
                catch (Exception e)
                {
                    Logger.Warn($"{jsonFilePath} could not be loaded as it doesn't fit the importing model.");
                    Logger.Error(e);
                }
            }

            Logger.Info($"Found { allCardInfos.Count } set cards.");
        }
    }
}
