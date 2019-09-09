using MtgaDeckBuilder.Api.Game;
using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Controllers
{
    public interface IGameDataIntegrator
    {
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

        public IGameCard GetGameCard(long mtgaId)
        {
            if (_gameCardCache.TryGetValue(mtgaId, out IGameCard gameCard))
            {
                return gameCard;
            }

            gameCard = new GameCard()
            {
                MtgaId = mtgaId,
                //Name = _gameData.GameCards
            };

            return gameCard;
        }
    }
}
