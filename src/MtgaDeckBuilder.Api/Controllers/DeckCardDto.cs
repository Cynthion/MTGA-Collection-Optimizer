namespace MtgaDeckBuilder.Api.Controllers
{
    public class DeckCardDto : IMtgaCard
    {
        public long MtgaId { get; set; }

        public short RequiredCount { get; set; }
    }
}