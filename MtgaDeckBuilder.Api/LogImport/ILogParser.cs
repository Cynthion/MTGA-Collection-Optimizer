using System.Collections.Generic;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.LogImport
{
    public interface ILogParser
    {
        IDictionary<long, short> ParsePlayerCards();

        IEnumerable<PlayerDeck> ParsePlayerDecks();
        
        LogPlayerInventory ParsePlayerInventory();

        string ParsePlayerName();
    }
}