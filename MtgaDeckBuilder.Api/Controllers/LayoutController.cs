﻿using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.Layout;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")] // api/layout
    public class LayoutController : Controller
    {
        private readonly ILayoutService _layoutService;

        public LayoutController(ILayoutService layoutService)
        {
            _layoutService = layoutService;
        }

        // GET api/layout/load-data
        [HttpGet("load-data")]
        public ActionResult LoadData()
        {
            var dto = _layoutService.LoadLayout();
            return Ok(dto);
        }
    }
}