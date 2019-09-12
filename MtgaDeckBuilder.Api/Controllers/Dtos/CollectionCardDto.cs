using System.Collections.Generic;
using MtgaDeckBuilder.Api.Game;

namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public interface ICollectionCard : IPlayerCard, IDeckCard
    {
        IGameCard Data { get; set; }
        short MissingCount { get; set; }
        float WildcardWorthiness { get; set; }
        IDictionary<string, short> RequiredForDeck { get; set; }
    }

    public class CollectionCardDto : ICollectionCard
    {
        public long MtgaId { get; set; }
        public short OwnedCount { get; set; }
        public short RequiredCount { get; set; }
        public short MissingCount { get; set; }
        public float WildcardWorthiness { get; set; }
        public IDictionary<string, short> RequiredForDeck { get; set; }
        public IGameCard Data { get; set; }
    }
}
