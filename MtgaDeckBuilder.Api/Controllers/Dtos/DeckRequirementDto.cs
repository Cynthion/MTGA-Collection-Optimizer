namespace MtgaDeckBuilder.Api.Controllers.Dtos
{
    public class DeckRequirementDto
    {
        public string DeckId { get; set; }

        public string DeckName { get; set; }

        public short OwnedCount { get; set; }

        public short RequiredCount { get; set; }
    }
}
