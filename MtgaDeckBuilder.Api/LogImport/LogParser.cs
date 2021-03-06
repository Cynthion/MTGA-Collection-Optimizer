﻿using Microsoft.Extensions.Configuration;
using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Extensions;
using MtgaDeckBuilder.Api.Model;
using NLog;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MtgaDeckBuilder.Api.LogImport
{
    public class LogParser : ILogParser
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(LogParser));

        private readonly OutputLogCommands _outputLogCommands;
        private readonly ISettings _settings;

        public LogParser(IConfiguration configuration, ISettings settings)
        {
            _outputLogCommands = new OutputLogCommands();
            configuration.GetSection("OutputLogCommands").Bind(_outputLogCommands);
            _settings = settings;
        }

        public bool IsDetailedLogDisabled()
        {
            var detailedLogLines = FindLinesContainingCommand(_outputLogCommands.DetailedLogCommand);
            return detailedLogLines.Any(l => l.Contains("DISABLED"));
        }

        public IDictionary<long, short> ParsePlayerCards()
        {
            var result = FindOccurrenceInLog(_outputLogCommands.PlayerCardsCommand, ParsePlayerCardsOccurrence);
            return result ?? new Dictionary<long, short>(0);
        }

        public IEnumerable<PlayerDeck> ParsePlayerDecks()
        {
            var result = FindOccurrenceInLog(_outputLogCommands.PlayerDecksCommand, ParsePlayerDecksOccurrence);
            return result ?? Enumerable.Empty<PlayerDeck>();
        }

        public IEnumerable<PlayerDeck> ParsePlayerDeckCreations()
        {
            return ParseLogAggregate(_outputLogCommands.PlayerDeckCreateCommand, ParsePlayerDeckOccurrence);
        }

        public IEnumerable<PlayerDeck> ParsePlayerDeckUpdates()
        {
            var results = Enumerable.Empty<PlayerDeck>().ToList();
            var updates = ParseLogAggregate(_outputLogCommands.PlayerDeckUpdateCommand, ParsePlayerDeckOccurrence);

            // only take latest of many updates
            updates.Reverse();
            updates.ToList().ForEach(u =>
            {
                if (!results.Any(r => r.Id == u.Id))
                {
                    results.Add(u);
                }
            });

            return results;
        }

        public IEnumerable<string> ParsePlayerDeckDeletions()
        {
            var logJsonRpcs = ParseLogAggregate(_outputLogCommands.PlayerDeckDeleteCommand, ParseJson<LogJsonRpc>);

            return logJsonRpcs.Where(jr => jr.Method.Equals("Deck.DeleteDeck")).Select(jr => jr.Params.DeckId);
        }

        public LogPlayerInventory ParsePlayerInventory()
        {
            var result = FindOccurrenceInLog(_outputLogCommands.PlayerInventoryCommand, ParseJson<LogPlayerInventory>);
            return result ?? new LogPlayerInventory();
        }

        public string ParsePlayerName()
        {
            var nameLine = FindLineContainingCommand(_outputLogCommands.PlayerNameCommand);

            if (nameLine == string.Empty)
            {
                return string.Empty;
            }

            var routeIdx = nameLine.IndexOf('#');
            var nameCmdLength = _outputLogCommands.PlayerNameCommand.Length;

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

        private static IEnumerable<PlayerDeck> ParsePlayerDecksOccurrence(TextReader reader)
        {
            string outputLine;
            var json = string.Empty;

            do
            {
                outputLine = reader.ReadLine();
                json += outputLine;
            } while (outputLine != null && !outputLine.Equals("]"));

            var logDecks = json.FromJson<IEnumerable<LogDeck>>();

            var playerDecks = logDecks.Select(d => new PlayerDeck
            {
                Id = d.Id,
                Name = d.Name,
                Cards = MapTuplesToDictionary(d.MainDeck),
            });

            return playerDecks;
        }

        private static PlayerDeck ParsePlayerDeckOccurrence(TextReader reader)
        {
            string outputLine;
            var json = string.Empty;

            do
            {
                outputLine = reader.ReadLine();
                json += outputLine;
            } while (outputLine != null && !outputLine.Equals("}"));

            var logDeck = json.FromJson<LogDeck>();

            var playerDeck = new PlayerDeck
            {
                Id = logDeck.Id,
                Name = logDeck.Name,
                Cards = MapTuplesToDictionary(logDeck.MainDeck),
            };
            return playerDeck;
        }

        private static TResult ParseJson<TResult>(TextReader reader)
        {
            string outputLine;
            var json = string.Empty;

            do
            {
                outputLine = reader.ReadLine();
                json += outputLine;
            } while (outputLine != null && !outputLine.Equals("}"));

            var result = json.FromJson<TResult>();

            return result;
        }

        private TResult FindOccurrenceInLog<TResult>(string occurrenceCommand, Func<TextReader, TResult> occurrenceAction)
        {
            _settings.AssertOutputLogPathValid();
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

        private IEnumerable<TResult> ParseLogAggregate<TResult>(string occurrenceCommand, Func<TextReader, TResult> occurrenceAction)
        {
            _settings.AssertOutputLogPathValid();
            using (var fileStream = new FileStream(_settings.OutputLogPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var results = Enumerable.Empty<TResult>().ToList();

                do
                {
                    var outputLine = streamReader.ReadLine();

                    if (outputLine != null && outputLine.Contains(occurrenceCommand))
                    {
                        Logger.Info($"Found {occurrenceCommand} occurrence on position {streamReader.BaseStream.Position}.");

                        var result = occurrenceAction(streamReader);
                        results.Add(result);
                    }
                } while (!streamReader.EndOfStream);

                return results;
            }
        }

        private string FindLineContainingCommand(string occurrenceCommand)
        {
            _settings.AssertOutputLogPathValid();
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

        private IEnumerable<string> FindLinesContainingCommand(string occurrenceCommand)
        {
            _settings.AssertOutputLogPathValid();
            using (var fileStream = new FileStream(_settings.OutputLogPath, FileMode.Open, FileAccess.Read, FileShare.ReadWrite))
            using (var streamReader = new StreamReader(fileStream))
            {
                var results = Enumerable.Empty<string>().ToList();
                do
                {
                    var outputLine = streamReader.ReadLine();

                    if (outputLine != null && outputLine.Contains(occurrenceCommand))
                    {
                        Logger.Info($"Found {occurrenceCommand} occurrence on position {streamReader.BaseStream.Position}.");

                        results.Add(outputLine);
                    }
                } while (!streamReader.EndOfStream);

                return results;
            }
        }

        private static IDictionary<long, short> MapTuplesToDictionary(IList<int> tuples)
        {
            var dictionary = new Dictionary<long, short>();

            for (var i = 0; i < tuples.Count; i += 2)
            {
                dictionary.Add(tuples[i], (short)tuples[i + 1]);
            }

            return dictionary;
        }
    }
}