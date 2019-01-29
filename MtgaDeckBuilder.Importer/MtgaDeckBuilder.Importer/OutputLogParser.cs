﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MtgaDeckBuilder.Importer.Model;
using NLog;

namespace MtgaDeckBuilder.Importer
{
    public class OutputLogParser : IOutputLogParser
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(OutputLogParser));

        private readonly IConfiguration _configuration;

        public OutputLogParser(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public PlayerCollection ParseCollection()
        {
            var playerCollection = new PlayerCollection();

            using (var fileStream = File.OpenRead(_configuration.OutputLogPath))
            using (var streamReader = new StreamReader(fileStream))
            {
                var outputLine = string.Empty;
                var outputLineIdx = 0;

                do
                {
                    playerCollection.Cards.Clear();

                    do
                    {
                        outputLine = streamReader.ReadLine();
                        outputLineIdx++;
                    } while (!outputLine.Contains(_configuration.PlayerCardsCommand) && !streamReader.EndOfStream);

                    Logger.Info($"Found {nameof(_configuration.PlayerCardsCommand)} on line {outputLineIdx}.");

                    playerCollection = ParseCollectionOccurrence(streamReader);

                } while (!streamReader.EndOfStream);
            }

            return playerCollection;
        }

        public IEnumerable<PlayerCollection> ParseDecks()
        {
            throw new NotImplementedException();
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
            }; ;
        }
    }
}