using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Model
{
    public class PlayerLibrary
    {
        public IEnumerable<PlayerDeck> PlayerDecks { get; set; }

        public IDictionary<long, short> PlayerCards { get; set; }
    }
}