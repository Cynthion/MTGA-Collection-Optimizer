using GameData;

namespace MtgaDeckBuilder.Api.GameData
{
    public interface IGameData
    {
        GameCard[] GameCards { get; }

        GameEnum[] GameEnums { get; }

        GameAbility[] GameAbilities { get; }

        void LoadModel();
    }

    public class GameData : IGameData
    {
        private readonly IGameDataLoader _gameDataLoader;

        public GameCard[] GameCards { get; private set; }

        public GameEnum[] GameEnums { get; private set; }

        public GameAbility[] GameAbilities { get; private set; }

        public GameData(IGameDataLoader gameDataLoader)
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

            if (GameEnums == null)
            {
                GameEnums = _gameDataLoader.LoadGameEnums();
            }

            if (GameAbilities == null)
            {
                GameAbilities = _gameDataLoader.LoadGameAbilities();
            }
        }
    }
}
