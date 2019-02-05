using System.Collections.Generic;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.LogImport
{
    public interface ILogParser
    {
        IEnumerable<PlayerDeck> ParsePlayerDecks();

        IDictionary<long, short> ParsePlayerCards();

        LogPlayerInventory ParsePlayerInventory();

        string ParsePlayerName();
    }
}