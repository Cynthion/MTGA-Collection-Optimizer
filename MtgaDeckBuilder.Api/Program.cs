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

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
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