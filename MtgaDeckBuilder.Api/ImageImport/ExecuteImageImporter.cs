using Microsoft.Extensions.Hosting;
using System.Threading;
using System.Threading.Tasks;

namespace MtgaDeckBuilder.Api.ImageImport
{
    // TODO remove this class that was only intended for testing
    public class ExecuteImageImporter : IHostedService
    {
        private readonly IImageDataRepository _imageDataRepository;

        public ExecuteImageImporter(IImageDataRepository imageDataRepository)
        {
            _imageDataRepository = imageDataRepository;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            var artIds = new[]
            {
                410110,
                405019,
                405050,
                406463,
                406464,
            };

            foreach (var artId in artIds)
            {
                //_imageImporter.ImportImageForCard(artId);
            }

            _imageDataRepository.GetSetSymbolImageData("rna", Model.Rarity.Common);

            return Task.CompletedTask;
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}
