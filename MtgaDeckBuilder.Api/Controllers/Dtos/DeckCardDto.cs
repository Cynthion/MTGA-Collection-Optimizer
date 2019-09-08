namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public interface IDeckCard : IMtgaCard
    {
        short RequiredCount { get; set; }
    }

    public class DeckCardDto : IDeckCard
    {
        public long MtgaId { get; set; }

        public short RequiredCount { get; set; }
    }
}