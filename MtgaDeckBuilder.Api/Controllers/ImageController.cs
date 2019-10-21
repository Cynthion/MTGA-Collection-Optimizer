using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.ImageImport;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/image
    public class ImageController : ControllerBase
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
            if (rarity >= 2 && rarity <= 5)
            {
                var bytes = _imageDataRepository.GetSetSymbolImageData(setCode, (Rarity)rarity);
                return File(bytes, "image/png");
            }

            return Ok();
        }

        // GET api/image/cardart/012345
        [HttpGet("cardart/{artId}")]
        public ActionResult GetSetSymbol(string artId)
        {
            var bytes = _imageDataRepository.GetCardArtImageData(artId);
            return File(bytes, "image/png");
        }
    }
}
