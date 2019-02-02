using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Controllers
{
    public class PlayerDeckDto
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public IList<CardDto> Cards { get; set; }
    }
}
