using System.Collections.Generic;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.LogImport
{
    public interface ILogParser
    {
        PlayerCollection ParsePlayerCollection();

        IEnumerable<PlayerDeck> ParsePlayerDecks();
    }
}