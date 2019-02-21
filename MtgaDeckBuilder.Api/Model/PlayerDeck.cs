using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Model
{
    public class PlayerDeck
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public IDictionary<long, short> Cards { get; set; } = new Dictionary<long, short>();
    }
}
