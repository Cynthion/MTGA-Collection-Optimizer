using MtgaDeckBuilder.Api.Model;
using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Controllers
{
    public interface IGameCard
    {
        long MtgaId { get; set; }


        string Name { get; set; }

        string CardTypeText { get; set; }

        string SubtypeText { get; set; }

        string Set { get; set; }

        long Power { get; set; }

        long Toughness { get; set; }

        Rarity Rarity { get; set; }

        IEnumerable<Color> Colors { get; set; }

        IEnumerable<CardType> CardTypes { get; set; }
        
        IEnumerable<string> Subtypes { get; set; }

        IEnumerable<string> Abilities { get; set; }

        IEnumerable<string> HiddenAbilities { get; set; }
    }

    public class GameCard : IGameCard
    {
        public long MtgaId { get; set; }

        public string Name { get; set; }

        public string CardTypeText { get; set; }

        public string SubtypeText { get; set; }

        public string Set { get; set; }

        public long Power { get; set; }

        public long Toughness { get; set; }

        public Rarity Rarity { get; set; }

        public IEnumerable<Color> Colors { get; set; }

        public IEnumerable<CardType> CardTypes { get; set; }

        public IEnumerable<string> Subtypes { get; set; }

        public IEnumerable<string> Abilities { get; set; }

        public IEnumerable<string> HiddenAbilities { get; set; }
    }
}
