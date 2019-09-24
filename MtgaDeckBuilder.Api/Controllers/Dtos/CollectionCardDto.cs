using System.Collections.Generic;
using MtgaDeckBuilder.Api.Game;

namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public interface ICollectionCard : IPlayerCard, IDeckCard
    {
        short MissingCount { get; set; }
        float WildcardWorthiness { get; set; }
        IList<DeckRequirementDto> DeckRequirements { get; set; }
        IGameCard Data { get; set; }
    }

    public class CollectionCardDto : ICollectionCard
    {
        public long MtgaId { get; set; }
        public short OwnedCount { get; set; }
        public short RequiredCount { get; set; }
        public short MissingCount { get; set; }
        public float WildcardWorthiness { get; set; }
        public IList<DeckRequirementDto> DeckRequirements { get; set; }
        public IGameCard Data { get; set; }
    }
}
