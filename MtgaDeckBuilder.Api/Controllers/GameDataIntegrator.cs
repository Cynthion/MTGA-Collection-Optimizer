using MtgaDeckBuilder.Api.Game;
using MtgaDeckBuilder.Api.Model;
using System.Collections.Generic;

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

            gameCard = new GameCard()
            {
                MtgaId = mtgaId,
                //Name = gameDataCard.
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
            CardTypes = CardType.Unknown,
        };
    }
}
