using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using MtgaDeckBuilder.Api.Configuration;
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

        // TODO cache
        public async Task<IDictionary<long, CardInfo>> LoadAllSetsAsync()
        {
            var setFolderPath = Path.Combine(_configuration.MtgaDeckBuilderDropFolderPath, "Sets");
            Directory.CreateDirectory(setFolderPath);

            var filePaths = Directory.EnumerateFiles(setFolderPath);
            var setJsonFilePaths = filePaths
                .Where(p => p.EndsWith(".json"));

            var cardInfoDictionary = new Dictionary<long, CardInfo>();

            foreach (var jsonFilePath in setJsonFilePaths)
            {
                Logger.Info($"Found {jsonFilePath}");
                string setJson;

                try
                {
                    setJson = await File.ReadAllTextAsync(jsonFilePath);
                }
                catch (Exception e)
                {
                    Logger.Error(e, $"Could not read {jsonFilePath}");
                    break;
                }

                try
                {
                    var set = JsonConvert.DeserializeObject<Set>(setJson);
                    var setCards = set.Cards;
                    var setCardInfos = setCards.Select(c => new CardInfo
                    {
                        MultiverseId = c.MultiverseId,
                        Name = c.Names != null ? string.Join("//", c.Names) : c.Name,
                        Number = c.Number,
                        Rarity = c.Rarity,
                        Uuid = c.Uuid,
                        SetCode = set.Code,
                    });

                    foreach (var cardInfo in setCardInfos)
                    {
                        // handle double-faced cards that have same CardMultiverseId
                        if (!cardInfoDictionary.ContainsKey(cardInfo.MultiverseId))
                        {
                            cardInfoDictionary.Add(cardInfo.MultiverseId, cardInfo);
                        }
                    }
                }
                catch (Exception e)
                {
                    Logger.Warn($"{jsonFilePath} could not be loaded.");
                    Logger.Error(e);
                }
            }

            Logger.Info($"Found {cardInfoDictionary.Count} set cards.");

            return cardInfoDictionary;
        }
    }
}