using System.Collections.Generic;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.LogImport
{
    public interface ILogParser
    {
        IDictionary<long, short> ParsePlayerCards();

        IEnumerable<PlayerDeck> ParsePlayerDecks();

        IEnumerable<PlayerDeck> ParsePlayerDeckUpdates();

        LogPlayerInventory ParsePlayerInventory();

        string ParsePlayerName();
    }
}