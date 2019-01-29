using System.Collections.Generic;

namespace MtgaDeckBuilder.Importer.Model
{
    public class PlayerCollection
    {
        public IDictionary<long, short> Cards { get; set; } = new Dictionary<long, short>();
    }
}