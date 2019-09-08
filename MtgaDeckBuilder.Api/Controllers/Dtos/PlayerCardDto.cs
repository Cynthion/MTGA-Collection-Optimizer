namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public interface IPlayerCard : IMtgaCard
    {
        short OwnedCount { get; set; }
    }

    public class PlayerCardDto : IPlayerCard
    {
        public long MtgaId { get; set; }

        public short OwnedCount { get; set; }
    }
}