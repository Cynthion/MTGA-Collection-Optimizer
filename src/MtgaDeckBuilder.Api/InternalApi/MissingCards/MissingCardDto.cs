namespace MtgaDeckBuilder.Api.InternalApi.MissingCards
{
    public class MissingCardDto
    {
        public string Id { get; set; }

        public short MissingQuantity { get; set; }

        public string Rarity { get; set; }
    }
}
