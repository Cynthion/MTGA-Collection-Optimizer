using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public interface ICollectionCard : IGameCard, IPlayerCard, IDeckCard
    {

    }

    public class CollectionCardDto : ICollectionCard
    {
        public long MtgaId { get; set; }

        public short OwnedCount { get; set; }

        public short RequiredCount { get; set; }

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
