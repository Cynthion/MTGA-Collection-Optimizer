using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.Controllers
{
    public interface IGameCard : IMtgaCard
    {
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
}
