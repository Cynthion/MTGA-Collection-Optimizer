
using Game.Model;
using System.Linq;

namespace MtgaDeckBuilder.Api.Game
{
    public interface IGameData
    {
        GameCard[] GameCards { get; }

        GameEnum[] GameEnums { get; }

        GameAbility[] GameAbilities { get; }

        GameLocality[] GameLocalities { get; }
    }

    public class GameData : IGameData
    {
        private readonly IGameDataLoader _gameDataLoader;

        private GameCard[] _gameCards;
        private GameEnum[] _gameEnums;
        private GameAbility[] _gameAbilities;
        private GameLocality[] _gameLocalities;


        public GameCard[] GameCards
        {
            get
            {
                if (_gameCards == null)
                {
                    _gameCards = _gameDataLoader.LoadGameCards();
                }
                return _gameCards;
            }
        }

        public GameEnum[] GameEnums
        {
            get
            {
                if (_gameEnums == null)
                {
                    _gameEnums = _gameDataLoader.LoadGameEnums();
                }
                return _gameEnums;
            }
        }

        public GameAbility[] GameAbilities
        {
            get
            {
                if (_gameAbilities == null)
                {
                    _gameAbilities = _gameDataLoader.LoadGameAbilities();
                }
                return _gameAbilities;
            }
        }

        public GameLocality[] GameLocalities
        {
            get
            {
                if (_gameLocalities == null)
                {
                    _gameLocalities = _gameDataLoader.LoadGameLocalities()
                        .Where(l => l.IsoCode == "en-US")
                        .ToArray(); ;
                }
                return _gameLocalities;
            }
        }

        public GameData(IGameDataLoader gameDataLoader)
        {
            _gameDataLoader = gameDataLoader;
        }
    }
}
