using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.Layout;
using System.Threading.Tasks;

namespace MtgaDeckBuilder.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // api/layout
    public class LayoutController : ControllerBase
    {
        private readonly ILayoutService _layoutService;

        public LayoutController(ILayoutService layoutService)
        {
            _layoutService = layoutService;
        }

        // GET api/layout/load-data
        [HttpGet("load-data")]
        public async Task<ActionResult> LoadData()
        {
            AssertDetailedLogEnabled();

            var dto = await _layoutService.LoadLayoutAsync();
            return Ok(dto);
        }

        private void AssertDetailedLogEnabled()
        {
            if (_layoutService.IsDetailedLogDisabled())
            {
                throw new ApiException(ApiErrorCode.DetailedLogsDisabled);
            }
        }
    }
}
