using GameData;
using System;
using System.Collections.Generic;
using System.Text;

namespace MtgaDeckBuilder.Api.GameData
{
    public interface IGameModel
    {
        GameCard[] GameCards { get; }

        void LoadModel();
    }

    public class GameModel : IGameModel
    {
        private readonly IGameDataLoader _gameDataLoader;

        public GameCard[] GameCards { get; private set; }

        public GameModel(IGameDataLoader gameDataLoader)
        {
            _gameDataLoader = gameDataLoader;
        }

        // TODO make async
        public void LoadModel()
        {
            if (GameCards == null)
            {
                GameCards = _gameDataLoader.LoadGameCards();
            }
        }
    }
}
