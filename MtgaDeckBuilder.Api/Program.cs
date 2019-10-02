using Microsoft.AspNetCore.Hosting;
using MtgaDeckBuilder.ImageLoader;

namespace MtgaDeckBuilder.Api
{
    internal class Program
    {
        public static void Main(string[] args)
        {
            // TODO undo
            //var host = new WebHostBuilder()
            //    .UseKestrel()
            //    .UseStartup<Startup>()
            //    .Build();

            //host.Run();

            var imageLoaderDemo = new ImageLoaderDemo();
            imageLoaderDemo.Demo();
        }
    }
}