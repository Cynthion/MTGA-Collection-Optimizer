using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.ImageImport;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")] // api/image
    public class ImageController : Controller
    {
        private readonly IImageDataRepository _imageDataRepository;

        public ImageController(IImageDataRepository imageDataRepository)
        {
            _imageDataRepository = imageDataRepository;
        }

        // GET api/image/set-symbol/rna/2
        [HttpGet("set-symbol/{setCode}/{rarity}")]
        public ActionResult GetSetSymbol(string setCode, int rarity)
        {
            var bytes = _imageDataRepository.GetSetSymbolImageData(setCode, (Rarity)rarity);
            return File(bytes, "image/png");
        }
    }
}
