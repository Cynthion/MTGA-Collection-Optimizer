namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class PlayerCardDto : IMtgaCard
    {
        public long MtgaId { get; set; }

        public short OwnedCount { get; set; }
    }
}