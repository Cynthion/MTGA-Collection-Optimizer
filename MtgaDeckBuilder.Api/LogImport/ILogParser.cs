using System.Collections.Generic;
using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.LogImport
{
    public interface ILogParser
    {
        bool IsDetailedLogDisabled();

        /// <summary>
        /// Key: MtgaId, Value: OwnedCount
        /// </summary>
        IDictionary<long, short> ParsePlayerCards();

        IEnumerable<PlayerDeck> ParsePlayerDecks();

        IEnumerable<PlayerDeck> ParsePlayerDeckCreations();

        IEnumerable<PlayerDeck> ParsePlayerDeckUpdates();

        IEnumerable<string> ParsePlayerDeckDeletions();

        LogPlayerInventory ParsePlayerInventory();

        string ParsePlayerName();
    }
}