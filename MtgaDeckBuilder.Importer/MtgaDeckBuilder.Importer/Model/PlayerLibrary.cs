using System.Collections.Generic;

namespace MtgaDeckBuilder.Importer.Model
{
    internal class PlayerLibrary
    {
        public PlayerCollection PlayerCollection { get; set; }

        public IEnumerable<PlayerDeck> PlayerDecks { get; set; }
    }
}
