using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MtgaDeckBuilder.Importer.Model;
using Newtonsoft.Json;
using NLog;

namespace MtgaDeckBuilder.Importer
{
    internal class OutputLogParser : IOutputLogParser
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(OutputLogParser));

        private readonly IConfiguration _configuration;

        public OutputLogParser(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public PlayerCollection ParsePlayerCollection()
        {
            var playerCollection = new PlayerCollection();

            using (var fileStream = File.OpenRead(_configuration.OutputLogPath))
            using (var streamReader = new StreamReader(fileStream))
            {
                do
                {
                    var outputLine = streamReader.ReadLine();

                    if (outputLine != null && outputLine.Contains(_configuration.PlayerCardsCommand))
                    {
                        Logger.Info($"Found {nameof(_configuration.PlayerCardsCommand)} on position {streamReader.BaseStream.Position}.");

                        playerCollection = ParseCollectionOccurrence(streamReader);
                    }
                } while (!streamReader.EndOfStream);
            }

            return playerCollection;
        }

        public IEnumerable<PlayerDeck> ParsePlayerDecks()
        {
            var playerDecks = new List<PlayerDeck>();

            using (var fileStream = File.OpenRead(_configuration.OutputLogPath))
            using (var streamReader = new StreamReader(fileStream))
            {
                do
                {
                    var outputLine = streamReader.ReadLine();

                    if (outputLine != null && outputLine.Contains(_configuration.PlayerDecksCommand))
                    {
                        Logger.Info($"Found {nameof(_configuration.PlayerDecksCommand)} on position {streamReader.BaseStream.Position}.");

                        playerDecks = ParsePlayerDeckOccurrence(streamReader).ToList();
                    }
                } while (!streamReader.EndOfStream);
            }

            return playerDecks;
        }

        private static PlayerCollection ParseCollectionOccurrence(TextReader streamReader)
        {
            string outputLine;
            var collectionOccurrenceLines = new List<string>();

            do
            {
                outputLine = streamReader.ReadLine();
                collectionOccurrenceLines.Add(outputLine);
            } while (outputLine != null && !outputLine.Equals("}"));

            var cards = collectionOccurrenceLines.Where(
                    l => !l.Equals("{")
                         && !l.Equals("}")
                         && !l.Equals(string.Empty))
                .Select(l =>
                {
                    var formatted = l.Trim()
                        .Replace("\"", string.Empty)
                        .Replace(" ", string.Empty)
                        .Replace(",", string.Empty);

                    var parts = formatted.Split(':');
                    var multiverseId = long.Parse(parts[0]);
                    var quantity = short.Parse(parts[1]);

                    return new KeyValuePair<long, short>(multiverseId, quantity);
                });

            return new PlayerCollection
            {
                Cards = new Dictionary<long, short>(cards)
            };
        }

        private static IEnumerable<PlayerDeck> ParsePlayerDeckOccurrence(TextReader streamReader)
        {
            string outputLine;
            var json = string.Empty;
            var deckOccurrenceLines = new List<string>();

            do
            {
                outputLine = streamReader.ReadLine();
                json += outputLine;
                deckOccurrenceLines.Add(outputLine);
            } while (outputLine != null && !outputLine.Equals("]"));

            var logDecks = JsonConvert.DeserializeObject<IEnumerable<LogDeck>>(json);

            var playerDecks = logDecks.Select(d =>
            {
                var cards = d.MainDeck.Select(c => new KeyValuePair<long, short>(long.Parse(c.Id), c.Quantity));
                var deckCards = new Dictionary<long, short>(cards);

                return new PlayerDeck
                {
                    Id = d.Id,
                    Name = d.Name,
                    Cards = deckCards
                };
            });

            return playerDecks;
        }
    }
}