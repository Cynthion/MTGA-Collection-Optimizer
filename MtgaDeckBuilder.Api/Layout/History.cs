using MtgaDeckBuilder.Api.Controllers.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MtgaDeckBuilder.Api.Layout
{
    public class HistoryCardDto
    {
        public string TimeStamp { get; set; }

        public CollectionCardDto CollectionCard { get; set; }
    }

    public class History
    {
        private IDictionary<long, short> _existingCardCollection;
        private readonly IList<HistoryCardDto> _historyCards;

        public History()
        {
            _historyCards = new List<HistoryCardDto>();
        }

        public IEnumerable<HistoryCardDto> CalculateHistoryCards(IEnumerable<CollectionCardDto> newCollectionCards)
        {
            var newCardCollection = newCollectionCards.ToDictionary(cc => cc.MtgaId, cc => cc.OwnedCount);

            // don't add history deltas for the first time
            if (_existingCardCollection == null)
            {
                _existingCardCollection = newCardCollection;
                return Enumerable.Empty<HistoryCardDto>();
            }

            var deltaCardCollection = newCardCollection.Except(_existingCardCollection);
            var timeStamp = DateTime.Now.ToLongTimeString();

            foreach (var deltaCard in deltaCardCollection)
            {
                _existingCardCollection.Add(deltaCard);
                _historyCards.Add(new HistoryCardDto
                {
                    TimeStamp = timeStamp,
                    CollectionCard = newCollectionCards.Single(cc => cc.MtgaId == deltaCard.Key),
                });
            }

            return _historyCards
                .OrderByDescending(cc => cc.TimeStamp)
                .ThenByDescending(cc => cc.CollectionCard.Data.Rarity)
                .ThenByDescending(cc => cc.CollectionCard.Data.Name)
                .ToArray();
        }
    }
}
