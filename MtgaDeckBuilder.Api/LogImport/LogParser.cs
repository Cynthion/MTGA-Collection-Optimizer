using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Model;
using Newtonsoft.Json;
using NLog;

namespace MtgaDeckBuilder.Api.LogImport
{
    public class LogParser : ILogParser
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(LogParser));

        private readonly IConfiguration _configuration;
        private readonly ISettings _settings;

        public LogParser(IConfiguration configuration, ISettings settings)
        {
            _configuration = configuration;
            _settings = settings;
        }

        public IDictionary<long, short> ParsePlayerCards()
        {
            var result = ParseLog(_configuration.PlayerCardsCommand, ParsePlayerCardsOccurrence);
            return result ?? new Dictionary<long, short>(0);
        }

        public IEnumerable<PlayerDeck> ParsePlayerDecks()
        {
            var result = ParseLog(_configuration.PlayerDecksCommand, ParsePlayerDeckOccurrence);
            return result ?? Enumerable.Empty<PlayerDeck>();
        }

        public LogPlayerInventory ParsePlayerInventory()
        {
            var result = ParseLog(_configuration.PlayerInventoryCommand, ParsePlayerInventoryOccurrence);
            return result ?? new LogPlayerInventory();
        }

        public string ParsePlayerName()
        {
            var nameLine = FindLineContainingCommand(_configuration.PlayerNameCommand);

            if (nameLine == string.Empty)
            {
                return string.Empty;
            }

            var routeIdx = nameLine.IndexOf('#');
            var nameCmdLength = _configuration.PlayerNameCommand.Length;

            return nameLine.Substring(nameCmdLength, routeIdx - nameCmdLength);
        }

        private static IDictionary<long, short> ParsePlayerCardsOccurrence(TextReader reader)
        {
            string outputLine;
            var collectionOccurrenceLines = new List<string>();

            do
            {
                outputLine = reader.ReadLine();
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

            return new Dictionary<long, short>(cards);
        }

        private static IEnumerable<PlayerDeck> ParsePlayerDeckOccurrence(TextReader reader)
        {
            string outputLine;
            var json = string.Empty;

            do
            {
                outputLine = reader.ReadLine();
                json += outputLine;
            } while (outputLine != null && !outputLine.Equals("]"));

            var logDecks = JsonConvert.DeserializeObject<IEnumerable<LogDeck>>(json);

            var playerDecks = logDecks.Select(d => new PlayerDeck
            {
                Id = d.Id,
                Name = d.Name,
                Cards = d.MainDeck
            });

            return playerDecks;
        }

        private static LogPlayerInventory ParsePlayerInventoryOccurrence(TextReader reader)
        {
            string outputLine;
            var json = string.Empty;

            do
            {
                outputLine = reader.ReadLine();
                json += outputLine;
            } while (outputLine != null && !outputLine.Equals("}"));

            var logPlayerInventory = JsonConvert.DeserializeObject<LogPlayerInventory>(json);

            return logPlayerInventory;
        }

        private TResult ParseLog<TResult>(string occurrenceCommand, Func<TextReader, TResult> occurrenceAction)
        {
            using (var fileStream = new FileStream(_settings.OutputLogPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var result = default(TResult);

                do
                {
                    var outputLine = streamReader.ReadLine();

                    if (outputLine != null && outputLine.Contains(occurrenceCommand))
                    {
                        Logger.Info($"Found {occurrenceCommand} occurrence on position {streamReader.BaseStream.Position}.");

                        result = occurrenceAction(streamReader);
                    }
                } while (!streamReader.EndOfStream);

                return result;
            }
        }

        private string FindLineContainingCommand(string occurrenceCommand)
        {
            using (var fileStream = new FileStream(_settings.OutputLogPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                do
                {
                    var outputLine = streamReader.ReadLine();

                    if (outputLine != null && outputLine.Contains(occurrenceCommand))
                    {
                        Logger.Info($"Found {occurrenceCommand} occurrence on position {streamReader.BaseStream.Position}.");

                        return outputLine;
                    }
                } while (!streamReader.EndOfStream);

                return string.Empty;
            }
        }
    }
}