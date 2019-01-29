using System.Collections.Generic;
using MtgaDeckBuilder.Importer.Model;

namespace MtgaDeckBuilder.Importer
{
    internal interface IOutputLogParser
    {
        PlayerCollection ParsePlayerCollection();

        IEnumerable<PlayerCollection> ParseDecks();
    }
}