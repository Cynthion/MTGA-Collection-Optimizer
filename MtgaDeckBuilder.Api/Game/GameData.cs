using MtgaDeckBuilder.Api.Game.Model;
using System.Collections.Generic;
using System.Linq;

namespace MtgaDeckBuilder.Api.Game
{
    public interface IGameData
    {
        /// <summary>
        /// Key: Card GrpId, Value: GameCard
        /// </summary>
        IDictionary<long, GameCard> Cards { get; }

        /// <summary>
        /// Key: Enum name, Value: (Key: Enum Id, Value: Locality Id)
        /// </summary>
        IDictionary<string, Dictionary<long, long>> Enums { get; }

        /// <summary>
        /// Key: Ability Id, Value: Locality Id
        /// </summary>
        IDictionary<long, long> Abilities { get; }

        /// <summary>
        /// Key: Locality Id, Value: Text
        /// </summary>
        IDictionary<long, string> Localities { get; }

        void AssertInitialized();
    }

    public class GameData : IGameData
    {
        private readonly IGameDataLoader _gameDataLoader;

        public IDictionary<long, GameCard> Cards { get; private set; }

        public IDictionary<string, Dictionary<long, long>> Enums { get; private set; }

        public IDictionary<long, long> Abilities { get; private set; }

        public IDictionary<long, string> Localities { get; private set; }

        public void AssertInitialized()
        {
            if (Cards == null)
            {
                var cards = _gameDataLoader.LoadGameCards();
                Cards = cards.ToDictionary(c => c.Grpid, c => c);
            }

            if (Enums == null)
            {
                var enums = _gameDataLoader.LoadGameEnums();
                Enums = enums.ToDictionary(e => e.Name, e => e.Values.ToDictionary(v => v.Id, v => v.Text));
            }

            if (Abilities == null)
            {
                var abilities = _gameDataLoader.LoadGameAbilities();
                Abilities = abilities.ToDictionary(a => a.Id, a => a.Text);
            }

            if (Localities == null)
            {
                var keys = _gameDataLoader.LoadGameLocalities()
                    .Single(l => l.IsoCode == "en-US")
                    .Keys;
                Localities = keys.ToDictionary(k => k.Id, k => k.Text);
            }
        }

        public GameData(IGameDataLoader gameDataLoader)
        {
            _gameDataLoader = gameDataLoader;
        }
    }
}
