using System;
using System.Threading;
using Lamar;
using NLog;

namespace MtgaDeckBuilder.Importer
{
    internal class Program
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(Program));

        private static void Main(string[] args)
        {
            LogManager.ThrowConfigExceptions = true;
            LogManager.ThrowExceptions = true;

            var cts = new CancellationTokenSource();

            try
            {
                Logger.Info("Setting up...");
                
                var container = SetupIoC();
                var configuration = container.GetInstance<IConfiguration>();
                var outputLogParser = container.GetInstance<IOutputLogParser>();
                var storage = container.GetInstance<IStorage>();

                Logger.Info("Setup completed.");

                // TODO make async
                var playerCollection = outputLogParser.ParsePlayerCollection();
                //var decks = outputLogParser.ParseDecks();

                // TODO write collection and decks to json
                storage.StorePlayerCollection(playerCollection);

                Console.ReadLine();
            }
            catch (Exception e)
            {
                Logger.Error(e.Message, "Unexpected termination due to an error;");

                Console.ReadLine();
            }
            finally
            {
                cts.Cancel();
            }
        }

        private static Container SetupIoC()
        {
            return new Container(c =>
            {
                c.For<IConfiguration>().Use(_ =>
                    new Configuration
                    {
                        OutputLogPath = @"C:\Users\chlu\AppData\LocalLow\Wizards Of The Coast\MTGA\output_log.txt",
                        PlayerCardsCommand = "<== PlayerInventory.GetPlayerCardsV3",
                        PlayerDecksCommand = "Deck.GetDeckLists"
                    });

                c.For<IOutputLogParser>().Use<OutputLogParser>();
                c.For<IStorage>().Use<FileStorage>();
            });
        }
    }
}