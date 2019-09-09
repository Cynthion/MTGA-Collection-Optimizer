using MtgaDeckBuilder.Api.Game;
using MtgaDeckBuilder.Api.Model;
using System.Collections.Generic;
using System.Linq;

namespace MtgaDeckBuilder.Api.Controllers
{
    public interface IGameDataIntegrator
    {
        void AssertGameDataInitialized();

        IGameCard GetGameCard(long mtgaId);
    }

    public class GameDataIntegrator : IGameDataIntegrator
    {
        private readonly IGameData _gameData;
        private readonly IDictionary<long, IGameCard> _gameCardCache;

        public GameDataIntegrator(IGameData gameData)
        {
            _gameData = gameData;
            _gameCardCache = new Dictionary<long, IGameCard>();
        }

        public void AssertGameDataInitialized()
        {
            _gameData.AssertInitialized();
        }

        public IGameCard GetGameCard(long mtgaId)
        {
            if (_gameCardCache.TryGetValue(mtgaId, out IGameCard gameCard))
            {
                return gameCard;
            }

            if (!_gameData.Cards.TryGetValue(mtgaId, out Game.Model.GameCard gameDataCard))
            {
                return UnknownGameCard;
            }

            _gameData.Localities.TryGetValue(gameDataCard.TitleId, out string name);
            _gameData.Localities.TryGetValue(gameDataCard.CardTypeTextId, out string cardTypeText);
            _gameData.Localities.TryGetValue(gameDataCard.SubtypeTextId, out string subtypeText);

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
                    _gameData.Enums["SubType"].TryGetValue(st, out long textId);
                    _gameData.Localities.TryGetValue(textId, out string subtype);
                    return subtype;
                }),
                Abilities = gameDataCard.Abilities.Select(a =>
                {
                    _gameData.Localities.TryGetValue(a.TextId, out string ability);
                    return ability;
                }),
                HiddenAbilities = gameDataCard.HiddenAbilities.Select(ha => _gameData.Localities[ha.TextId])
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
