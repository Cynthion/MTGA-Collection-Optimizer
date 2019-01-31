using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Model
{
    public class PlayerLibrary
    {
        public PlayerCollection PlayerCollection { get; set; }

        public IEnumerable<PlayerDeck> PlayerDecks { get; set; }
    }
}