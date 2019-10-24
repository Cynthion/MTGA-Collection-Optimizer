using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MtgaDeckBuilder.Api.LogImport;
using System.Linq;

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
            var urls = args.Any(a => a.Contains("prod"))
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
    }
}