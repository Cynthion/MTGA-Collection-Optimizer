using System.Collections.Generic;
using MtgaDeckBuilder.Importer.Model;

namespace MtgaDeckBuilder.Importer
{
    public interface IOutputLogParser
    {
        IEnumerable<Card> ParseCollection(IConfiguration config);

        IEnumerable<Deck> ParseDecks(IConfiguration config);
    }
}