using MtgaDeckBuilder.Api.Controllers.Dtos;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MtgaDeckBuilder.Api.Layout
{
    public class HistoryCardDto
    {
        public double TimeStamp { get; set; }

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

        public HistoryTabDto CalculateHistoryTabDto(IEnumerable<CollectionCardDto> newCollectionCards)
        {
            var newCardCollection = newCollectionCards.ToDictionary(cc => cc.MtgaId, cc => cc.OwnedCount);

            // don't add history deltas for the first time
            if (_existingCardCollection == null)
            {
                _existingCardCollection = newCardCollection;
                return new HistoryTabDto
                {
                    HistoryCards = Enumerable.Empty<HistoryCardDto>(),
                    NewBadgeCount = 0,
                };
            }

            var deltaCardCollection = newCardCollection.Except(_existingCardCollection).ToList();
            var timeStamp = DateTime.UtcNow.Subtract(new DateTime(1970, 1, 1, 0, 0, 0, DateTimeKind.Utc)).TotalMilliseconds;

            foreach (var deltaCard in deltaCardCollection)
            {
                if (!_existingCardCollection.TryAdd(deltaCard.Key, deltaCard.Value))
                {
                    _existingCardCollection[deltaCard.Key] = deltaCard.Value;
                }

                _historyCards.Add(new HistoryCardDto
                {
                    TimeStamp = timeStamp,
                    CollectionCard = newCollectionCards.Single(cc => cc.MtgaId == deltaCard.Key),
                });
            }

            var historyCards = _historyCards
                .OrderByDescending(cc => cc.TimeStamp)
                .ThenByDescending(cc => cc.CollectionCard.Data.Rarity)
                .ThenByDescending(cc => cc.CollectionCard.Data.Name)
                .ToArray();

            return new HistoryTabDto
            {
                HistoryCards = historyCards,
                NewBadgeCount = deltaCardCollection.Count(),
            };
        }
    }
}
