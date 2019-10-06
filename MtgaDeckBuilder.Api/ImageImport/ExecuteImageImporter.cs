using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;

namespace MtgaDeckBuilder.Api.ImageImport
{
    // TODO remove this class that was only intended for testing
    public class ExecuteImageImporter : IHostedService
    {
        private readonly IImageImporter _imageImporter;

        public ExecuteImageImporter(IImageImporter imageImporter)
        {
            _imageImporter = imageImporter;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            _imageImporter.ImportImageForCard(410110);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
