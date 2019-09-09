using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.Controllers
{
    public interface IGameCard
    {
        long MtgaId { get; set; }

        string Name { get; set; }

        string Set { get; set; }

        Rarity Rarity { get; set; }

        Color[] Colors { get; set; }

        CardType CardTypes { get; set; }

        SuperType[] Supertypes { get; set; }

        string[] Subtypes { get; set; }

        string[] Abilities { get; set; }

        string[] HiddenAbilities { get; set; }

        string CardTypeText { get; set; }

        string SubtypeText { get; set; }
    }

    public class GameCard : IGameCard
    {
        public long MtgaId { get; set; }

        public string Name { get; set; }

        public string Set { get; set; }

        public Rarity Rarity { get; set; }

        public Color[] Colors { get; set; }

        public CardType CardTypes { get; set; }

        public SuperType[] Supertypes { get; set; }

        public string[] Subtypes { get; set; }

        public string[] Abilities { get; set; }

        public string[] HiddenAbilities { get; set; }

        public string CardTypeText { get; set; }

        public string SubtypeText { get; set; }
    }
}
