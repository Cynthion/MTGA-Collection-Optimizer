using System.Collections.Generic;
using MtgaDeckBuilder.Importer.Model;

namespace MtgaDeckBuilder.Importer
{
    public interface IOutputLogParser
    {
        PlayerCollection ParseCollection();

        IEnumerable<PlayerCollection> ParseDecks();
    }
}