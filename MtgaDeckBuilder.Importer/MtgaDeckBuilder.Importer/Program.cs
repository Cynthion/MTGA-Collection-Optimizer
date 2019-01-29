using System;
using System.Linq;
using System.Threading;
using Lamar;
using MtgaDeckBuilder.Importer.Model;
using NLog;

namespace MtgaDeckBuilder.Importer
{
    internal class Program
    {
        private static readonly ILogger Logger = LogManager.GetLogger(nameof(Program));

        private static void Main(string[] args)
        {
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
                var playerDecks = outputLogParser.ParsePlayerDecks().ToArray();

                var playerLibrary = new PlayerLibrary
                {
                    PlayerCollection = playerCollection,
                    PlayerDecks = playerDecks
                };

                storage.StorePlayerLibrary(playerLibrary);

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
                        PlayerDecksCommand = "<== Deck.GetDeckLists"
                    });

                c.For<IOutputLogParser>().Use<OutputLogParser>();
                c.For<IStorage>().Use<FileStorage>();
            });
        }
    }
}