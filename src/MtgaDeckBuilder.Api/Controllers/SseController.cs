//using Microsoft.AspNetCore.Mvc;
//using Newtonsoft.Json;

//namespace MtgaDeckBuilder.Api.Controllers
//{
//    [Route("api/[controller]")]
//    public class SseController : Controller
//    {
//        // GET api/sse
//        [HttpGet]
//        public IActionResult EventSource()
//        {
//            //var stringBuilder = new StringBuilder();

//            var playerCardDto = new PlayerCardDto
//            {
//                MtgaId = 1234567,
//                OwnedCount = 4,
//            };

//            var json = JsonConvert.SerializeObject(playerCardDto);
//            //stringBuilder.AppendFormat("data: {0}\n\n", json);

//            //foreach (Customer obj in db.Customers.OrderBy(i => i.CustomerID).Take(5))
//            //{
//            //    string jsonCustomer =
//            //    JsonConvert.SerializeObject(obj);
//            //    sb.AppendFormat("data: {0}\n\n", jsonCustomer);
//            //}

//            return Content(json, "text/event-stream");
//        }
//    }
//}
