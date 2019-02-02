namespace MtgaDeckBuilder.Api.Controllers
{
    public class CardDto
    {
        public long MultiverseId { get; set; }

        public short Quantity { get; set; }

        public string Name { get; set; }

        public string Rarity { get; set; }
    }
}