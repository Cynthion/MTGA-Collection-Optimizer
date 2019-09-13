using MtgaDeckBuilder.Api.Controllers.Dtos;
using MtgaDeckBuilder.Api.Game;
using MtgaDeckBuilder.Api.LogImport;
using MtgaDeckBuilder.Api.Model;
using System;
using System.Collections.Generic;
using System.Linq;

namespace MtgaDeckBuilder.Api.Layout
{
    public interface ILayoutService
    {
        bool IsDetailedLogDisabled();

        LayoutDto LoadLayout();
    }

    public class LayoutService : ILayoutService
    {
        private readonly ILogParser _logParser;
        private readonly IGameData _gameData;

        public LayoutService(ILogParser logParser, IGameData gameData)
        {
            _logParser = logParser;
            _gameData = gameData;
        }

        public bool IsDetailedLogDisabled()
        {
            return _logParser.IsDetailedLogDisabled();
        }

        public LayoutDto LoadLayout()
        {
            // TODO parse log async
            // TODO optimize parsing: start from end of file
            var inventory = ParseInventory();
            var playerCards = _logParser.ParsePlayerCards();
            var playerDecks = ParsePlayerDecks();
            var collectionCards = CalculateCollectionCards(playerCards, playerDecks);
            var decks = CalculateDecks(playerDecks, collectionCards);

            collectionCards
                .Select(cc => cc.WildcardWorthiness = Calculations.CalculateWildcardWorthiness(cc, decks))
                .ToArray();

            var dto = new LayoutDto
            {
                Inventory = inventory,
                CollectionCards = collectionCards,
                PlayerDecks = decks,
                CollectionCardsOwnedCountTotal = collectionCards.Sum(cc => cc.OwnedCount),
                CollectionCardsRequiredCountTotal = collectionCards.Sum(cc => cc.RequiredCount),
            };

            return dto;
        }

        private InventoryDto ParseInventory()
        {
            var playerName = _logParser.ParsePlayerName();
            var playerInventory = _logParser.ParsePlayerInventory();

            var dto = new InventoryDto
            {
                PlayerName = playerName,
                WildcardCommon = playerInventory.WcCommon,
                WildcardUncommon = playerInventory.WcUncommon,
                WildcardRare = playerInventory.WcRare,
                WildcardMythic = playerInventory.WcMythic,
                Gold = playerInventory.Gold,
                Gems = playerInventory.Gems,
                VaultProgress = playerInventory.VaultProgress,
            };

            return dto;
        }

        private IEnumerable<PlayerDeck> ParsePlayerDecks()
        {
            var playerDecks = _logParser.ParsePlayerDecks();
            var playerDeckCreations = _logParser.ParsePlayerDeckCreations();
            var playerDeckUpdates = _logParser.ParsePlayerDeckUpdates();
            var playerDeckDeletions = _logParser.ParsePlayerDeckDeletions();

            // merge existing decks and created decks
            var playerDecksConsolidated = playerDecks
                .Concat(playerDeckCreations)
                .GroupBy(pd => pd.Id)
                .Select(id => id.First())
                .ToList();

            // remove deleted decks
            playerDecksConsolidated.RemoveAll(pd => playerDeckDeletions.Contains(pd.Id));

            // replace updated decks
            playerDecksConsolidated.ForEach(pd =>
            {
                if (playerDeckUpdates.Any(u => u.Id == pd.Id))
                {
                    pd = playerDeckUpdates.Single(u => u.Id == pd.Id);
                }
            });

            return playerDecksConsolidated;
        }

        private IEnumerable<CollectionCardDto> CalculateCollectionCards(IDictionary<long, short> playerCards, IEnumerable<PlayerDeck> playerDecks)
        {
            var collectionCards = new List<CollectionCardDto>();

            var playerCardCcs = playerCards.Select(pc => new CollectionCardDto
            {
                MtgaId = pc.Key,
                OwnedCount = pc.Value,
                RequiredCount = 0,
                MissingCount = 0,
                WildcardWorthiness = 0,
            });

            collectionCards.AddRange(playerCardCcs);

            foreach (var deck in playerDecks)
            {
                var deckCardCcs = deck.Cards.Select(dc => new CollectionCardDto
                {
                    MtgaId = dc.Key,
                    OwnedCount = 0,
                    RequiredCount = dc.Value,
                    MissingCount = 0,
                    WildcardWorthiness = 0,
                });

                foreach (var deckCardCc in deckCardCcs)
                {
                    // if player has card, take ownedCount
                    var existingPlayerCard = playerCardCcs.SingleOrDefault(pc => pc.MtgaId == deckCardCc.MtgaId);
                    var ownedCount = existingPlayerCard != null
                        ? existingPlayerCard.OwnedCount
                        : deckCardCc.OwnedCount;
                    var missingCountForDeck = (short)Math.Max(deckCardCc.RequiredCount - ownedCount, 0);

                    // if collection has card, take max missingCount
                    var existingCollectionCard = collectionCards.SingleOrDefault(cc => cc.MtgaId == deckCardCc.MtgaId);
                    var missingCount = existingCollectionCard != null
                        ? Math.Max(existingCollectionCard.MissingCount, missingCountForDeck)
                        : missingCountForDeck;

                    // add/update card
                    if (existingCollectionCard == null)
                    {
                        deckCardCc.OwnedCount = ownedCount;
                        deckCardCc.MissingCount = missingCount;
                        if (deckCardCc.RequiredForDeck == null)
                        {
                            deckCardCc.RequiredForDeck = new Dictionary<string, short>();
                        }
                        deckCardCc.RequiredForDeck.Add(deck.Id, deckCardCc.RequiredCount);
                        collectionCards.Add(deckCardCc);
                    }
                    else
                    {
                        existingCollectionCard.OwnedCount = ownedCount;
                        existingCollectionCard.MissingCount = missingCount;
                        if (deckCardCc.RequiredForDeck == null)
                        {
                            deckCardCc.RequiredForDeck = new Dictionary<string, short>();
                        }
                        deckCardCc.RequiredForDeck.Add(deck.Id, deckCardCc.RequiredCount);
                    }
                }
            }

            // TODO fix
            // game data integration
            _gameData.AssertInitialized();
            collectionCards
                .Select(cc => cc.Data = _gameData.GetGameCard(cc.MtgaId))
                .OrderByDescending(data => data.Rarity)
                .ThenBy(data => data.Name)
                .ToArray();

            return collectionCards;
        }

        private static IEnumerable<PlayerDeckDto> CalculateDecks(IEnumerable<PlayerDeck> playerDecks, IEnumerable<CollectionCardDto> collectionCards)
        {
            var decks = playerDecks
                        .Select(d => new PlayerDeckDto
                        {
                            Id = d.Id,
                            Name = d.Name,
                            Cards = d.Cards.Select(c => new DeckCardDto
                            {
                                MtgaId = c.Key,
                                RequiredCount = c.Value
                            }).ToArray()
                        })
                        .Where(d => !d.Name.Contains("?=?"))
                        .OrderBy(d => d.Name)
                        .ToArray();

            foreach (var deck in decks)
            {
                var totalOwnedDeckCards = 0;
                var deckCollectionCards = new List<CollectionCardDto>();
                foreach (var deckCard in deck.Cards)
                {
                    var collectionCard = collectionCards.Single(cc => cc.MtgaId == deckCard.MtgaId);
                    var deckCardOwnedCount = collectionCard.OwnedCount > deckCard.RequiredCount
                        ? deckCard.RequiredCount
                        : collectionCard.OwnedCount;
                    totalOwnedDeckCards += deckCardOwnedCount;

                    deckCollectionCards.Add(collectionCard);
                }

                deck.TotalDeckCards = deck.Cards.Sum(dc => dc.RequiredCount);
                deck.TotalOwnedDeckCards = totalOwnedDeckCards;
                deck.Completeness = (float)deck.TotalOwnedDeckCards / deck.TotalDeckCards;

                deck.Worth = Calculations.CalculateDeckWorth(deck, deckCollectionCards);
            }

            return decks;
        }
    }
}