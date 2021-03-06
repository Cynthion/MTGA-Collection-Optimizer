﻿using MtgaDeckBuilder.Api.Game.Data;
using MtgaDeckBuilder.Api.Model;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace MtgaDeckBuilder.Api.Game
{
    public interface IGameDataRepository
    {
        Task AssertInitializedAsync();

        IGameCard GetGameCard(long mtgaId);
    }

    public class GameDataRepository : IGameDataRepository
    {
        private readonly IGameDataLoader _gameDataLoader;
        private readonly IDictionary<long, IGameCard> _gameCardCache;

        // Key: Card GrpId, Value: GameCard
        private IDictionary<long, GameDataCard> _cards;

        // Key: Enum name, Value: (Key: Enum Id, Value: Locality Id)
        private IDictionary<string, Dictionary<long, long>> _enums;

        // Key: Ability Id, Value: Locality Id
        private IDictionary<long, long> _abilities;

        // Key: Locality Id, Value: Text
        private IDictionary<long, string> _localities;

        public GameDataRepository(IGameDataLoader gameDataLoader)
        {
            _gameDataLoader = gameDataLoader;
            _gameCardCache = new Dictionary<long, IGameCard>();
        }

        public async Task AssertInitializedAsync()
        {
            await AssertCardsLoadedAsync();
            await AssertEnumsLoadedAsync();
            await AssertAbilitiesLoadedAsync();
            await AssertLocalitiesLoadedAsync();
        }

        public IGameCard GetGameCard(long grpId)
        {
            if (_gameCardCache.TryGetValue(grpId, out IGameCard gameCard))
            {
                return gameCard;
            }

            if (!_cards.TryGetValue(grpId, out GameDataCard gameDataCard))
            {
                return UnknownGameCard;
            }

            _localities.TryGetValue(gameDataCard.TitleId, out string name);
            _localities.TryGetValue(gameDataCard.CardTypeTextId, out string cardTypeText);
            _localities.TryGetValue(gameDataCard.SubtypeTextId, out string subtypeText);

            gameCard = new GameCard
            {
                GrpId = grpId,
                ArtId = gameDataCard.ArtId,
                Name = name,
                CardTypeText = cardTypeText,
                SubtypeText = subtypeText,
                Set = gameDataCard.Set,
                Power = gameDataCard.Power,
                Toughness = gameDataCard.Toughness,
                Rarity = (Rarity)gameDataCard.Rarity,
                Colors = gameDataCard.Colors.Select(c => (Color)c),
                CardTypes = gameDataCard.Types.Select(t => (CardType)t),
                Subtypes = gameDataCard.Subtypes.Select(st =>
                {
                    _enums["SubType"].TryGetValue(st, out long textId);
                    _localities.TryGetValue(textId, out string subtype);
                    return subtype;
                }),
                Abilities = gameDataCard.Abilities.Select(a =>
                {
                    _localities.TryGetValue(a.TextId, out string ability);
                    return ability;
                }),
                HiddenAbilities = gameDataCard.HiddenAbilities.Select(ha => _localities[ha.TextId])
            };

            _gameCardCache.Add(gameCard.GrpId, gameCard);

            return gameCard;
        }

        private static readonly GameCard UnknownGameCard = new GameCard
        {
            GrpId = -1,
            Name = "Unknown Game Card",
            Rarity = Rarity.Unknown,
            Set = "Unknown Set",
            CardTypes = new[] { CardType.Unknown },
        };

        private async Task AssertCardsLoadedAsync()
        {
            if (_cards == null)
            {
                var cards = await _gameDataLoader.LoadGameDataCardsAsync();
                _cards = cards.ToDictionary(c => c.Grpid, c => c);
            }
        }

        private async Task AssertEnumsLoadedAsync()
        {
            if (_enums == null)
            {
                var enums = await _gameDataLoader.LoadGameDataEnumsAsync();
                _enums = enums.ToDictionary(e => e.Name, e => e.Values.ToDictionary(v => v.Id, v => v.Text));
            }
        }

        private async Task AssertAbilitiesLoadedAsync()
        {
            if (_abilities == null)
            {
                var abilities = await _gameDataLoader.LoadGameDataAbilitiesAsync();
                _abilities = abilities.ToDictionary(a => a.Id, a => a.Text);
            }
        }

        private async Task AssertLocalitiesLoadedAsync()
        {
            if (_localities == null)
            {
                var keys = (await _gameDataLoader.LoadGameDataLocalitiesAsync())
                    .Single(l => l.IsoCode == "en-US")
                    .Keys;
                _localities = keys.ToDictionary(k => k.Id, k => k.Text);
            }
        }
    }
}
