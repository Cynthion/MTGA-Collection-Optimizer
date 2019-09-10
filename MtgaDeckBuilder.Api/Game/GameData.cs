using MtgaDeckBuilder.Api.Game.Data;
using MtgaDeckBuilder.Api.Model;
using System.Collections.Generic;
using System.Linq;

namespace MtgaDeckBuilder.Api.Game
{
    public interface IGameData
    {
        void AssertInitialized();

        IGameCard GetGameCard(long mtgaId);
    }

    public class GameData : IGameData
    {
        private readonly IGameDataLoader _gameDataLoader;
        private readonly IDictionary<long, IGameCard> _gameCardCache;

        // Key: Card GrpId, Value: GameCard
        private IDictionary<long, GameDataCard> _cards;

        // Key: Enum name, Value: (Key: Enum Id, Value: Locality Id)
        public IDictionary<string, Dictionary<long, long>> _enums;

        // Key: Ability Id, Value: Locality Id
        public IDictionary<long, long> _abilities;

        // Key: Locality Id, Value: Text
        public IDictionary<long, string> _localities;

        public GameData(IGameDataLoader gameDataLoader)
        {
            _gameDataLoader = gameDataLoader;
        }

        public void AssertInitialized()
        {
            if (_cards == null)
            {
                var cards = _gameDataLoader.LoadGameDataCards();
                _cards = cards.ToDictionary(c => c.Grpid, c => c);
            }

            if (_enums == null)
            {
                var enums = _gameDataLoader.LoadGameDataEnums();
                _enums = enums.ToDictionary(e => e.Name, e => e.Values.ToDictionary(v => v.Id, v => v.Text));
            }

            if (_abilities == null)
            {
                var abilities = _gameDataLoader.LoadGameDataAbilities();
                _abilities = abilities.ToDictionary(a => a.Id, a => a.Text);
            }

            if (_localities == null)
            {
                var keys = _gameDataLoader.LoadGameDataLocalities()
                    .Single(l => l.IsoCode == "en-US")
                    .Keys;
                _localities = keys.ToDictionary(k => k.Id, k => k.Text);
            }
        }

        public IGameCard GetGameCard(long mtgaId)
        {
            if (_gameCardCache.TryGetValue(mtgaId, out IGameCard gameCard))
            {
                return gameCard;
            }

            if (!_cards.TryGetValue(mtgaId, out GameDataCard gameDataCard))
            {
                return UnknownGameCard;
            }

            _localities.TryGetValue(gameDataCard.TitleId, out string name);
            _localities.TryGetValue(gameDataCard.CardTypeTextId, out string cardTypeText);
            _localities.TryGetValue(gameDataCard.SubtypeTextId, out string subtypeText);

            gameCard = new GameCard
            {
                MtgaId = mtgaId,
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

            _gameCardCache.Add(gameCard.MtgaId, gameCard);

            return gameCard;
        }

        private static readonly GameCard UnknownGameCard = new GameCard
        {
            MtgaId = -1,
            Name = "Unknown Game Card",
            Rarity = Rarity.Unknown,
            Set = "Unknown Set",
            CardTypes = new[] { CardType.Unknown },
        };
    }
}
