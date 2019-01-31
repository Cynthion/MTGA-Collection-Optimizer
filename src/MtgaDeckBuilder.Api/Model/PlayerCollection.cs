using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Model
{
    public class PlayerCollection
    {
        public IDictionary<long, short> Cards { get; set; } = new Dictionary<long, short>();
    }
}
