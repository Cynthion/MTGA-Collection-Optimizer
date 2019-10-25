using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.LogImport;

namespace MtgaDeckBuilder.Api
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args)
        {
            var urls = IsProduction(args)
                ? new string[2] { "http://localhost:61008/", "https://localhost:61009/" }
                : new string[2] { "http://localhost:5000/", "https://localhost:5001/" };

            return Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseUrls(urls);
                    webBuilder.UseStartup<Startup>();
                })
                // configure hosted services here so they run after the app's request processing 
                // pipeline has been configured (default is before)
                .ConfigureServices(services =>
                {
                    services.AddHostedService<LogWatcher>();
                });
        }

        private static bool IsProduction(string[] args)
        {
            for (var i = 0; i < args.Length; i++)
            {
                if (args[i].Equals("-env"))
                {
                    return args[i + 1].Equals("prod");
                }
            }

            return false;
        }
    }
}