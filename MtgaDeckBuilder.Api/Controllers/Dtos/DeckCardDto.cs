namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class DeckCardDto : IMtgaCard
    {
        public long MtgaId { get; set; }

        public short RequiredCount { get; set; }
    }
}