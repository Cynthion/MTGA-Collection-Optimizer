using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Model
{
    public class LogDeck
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public string Format { get; set; }

        public string ResourceId { get; set; }

        public string DeckTileId { get; set; }

        public IEnumerable<LogCard> MainDeck { get; set; }
    }
}
