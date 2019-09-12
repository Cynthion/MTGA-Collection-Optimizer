using MtgaDeckBuilder.Api.Controllers.Dtos;
using MtgaDeckBuilder.Api.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MtgaDeckBuilder.Api.Layout
{
    public class Calculations
    {
        private static readonly float WcCommonDropRate = 1 / 3;         // 0.33
        private static readonly float WcUncommonDropRate = 1 / 5;       // 0.20
        private static readonly float WcRareDropRate = 1 / 10;          // 0.10, not representing real drop rate
        private static readonly float WcMythicRareDropRate = 1 / 24;    // 0.04

        public static int CalculateWildcardWorthiness(CollectionCardDto collectionCardDto, IEnumerable<PlayerDeckDto> playerDeckDtos)
        {
            // get decks containing the card
            var containingDecks = playerDeckDtos
                .Where(pd => pd.Cards.Any(dc => dc.MtgaId == collectionCardDto.MtgaId))
                .ToArray();

            // get decks that miss that card
            var wildcardWorhiness = 0;

            for (var i = 0; i < containingDecks.Length; i++)
            {
                var containingDeck = containingDecks[i];

                var ownedCount = collectionCardDto.OwnedCount;
                var requiredCount = containingDeck.Cards.Single(c => c.MtgaId == collectionCardDto.MtgaId).RequiredCount;

                if (ownedCount < requiredCount)
                {
                    var deckCompletenessWithCard = ((containingDeck.TotalOwnedDeckCards + 1) * 100) / containingDeck.TotalDeckCards;

                    wildcardWorhiness += (deckCompletenessWithCard * containingDeck.Worth);
                }
            }

            return wildcardWorhiness;
        }

        public static float CalculateDeckWorth(PlayerDeckDto playerDeckDto, IEnumerable<CollectionCardDto> collectionCards)
        {
            var nrOfCards = playerDeckDto.Cards.Count();
            var deckWorth = 0f;

            foreach (var deckCard in playerDeckDto.Cards)
            {
                var collectionCard = collectionCards.Single(cc => cc.MtgaId == deckCard.MtgaId);
                var dropRate = GetRarityDropRate(collectionCard.Data.Rarity);

                deckWorth += (deckCard.RequiredCount * dropRate);
            }

            return deckWorth;
        }

        private static float GetRarityDropRate(Rarity rarity)
        {
            switch (rarity)
            {
                case Rarity.Common: return WcCommonDropRate;
                case Rarity.Uncommon: return WcUncommonDropRate;
                case Rarity.Rare: return WcRareDropRate;
                case Rarity.MythicRare: return WcMythicRareDropRate;
                default: return 0;
            }
        }
    }
}

