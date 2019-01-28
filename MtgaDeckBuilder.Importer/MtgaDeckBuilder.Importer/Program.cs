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
            var cts = new CancellationTokenSource();

            try
            {
                Logger.Log(LogLevel.Info, "Setting up...");

                //RavenDb.CreateDatabaseIfNotExists();

                var container = SetupIoC();
                var configuration = container.GetInstance<IConfiguration>();

                Logger.Log(LogLevel.Info, "Setup completed.");

                // TODO Implement Polling

                Console.ReadLine();
            }
            catch (Exception e)
            {
                Logger.Log(LogLevel.Error, e.Message, "Unexpected termination due to an error;");

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
                    });
            });
        }
    }
}