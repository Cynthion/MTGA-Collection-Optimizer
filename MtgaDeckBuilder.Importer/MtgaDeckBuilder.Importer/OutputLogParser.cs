using System.Collections.Generic;
using MtgaDeckBuilder.Importer.Model;

namespace MtgaDeckBuilder.Importer
{
    public class OutputLogParser : IOutputLogParser
    {
        public IEnumerable<Card> ParseCollection(IConfiguration config)
        {
            throw new System.NotImplementedException();
        }

        public IEnumerable<Deck> ParseDecks(IConfiguration config)
        {
            throw new System.NotImplementedException();
        }
    }
}