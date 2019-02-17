using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Lib.AspNetCore.ServerSentEvents;
using Microsoft.AspNetCore.Mvc;
using MtgaDeckBuilder.Api.EventSource;

namespace MtgaDeckBuilder.Api.Controllers
{
    [Route("api/[controller]")]
    public class NotificationsController : Controller
    {
        private readonly INotificationsServerSentEventsService _notificationsServerSentEventsService;

        public NotificationsController(INotificationsServerSentEventsService notificationsServerSentEventsService)
        {
            _notificationsServerSentEventsService = notificationsServerSentEventsService;
        }

        //// GET api/notifications
        //[HttpGet]
        //public async Task<IActionResult> GetNotifications()
        //{
        //    var testData = "testData";

        //    await _notificationsServerSentEventsService.SendEventAsync(new ServerSentEvent
        //    {
        //        Data = new List<string>(testData.Split(new[] { "\r\n", "\n" }, StringSplitOptions.None))
        //    });

            
        //}
    }
}
