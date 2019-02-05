namespace MtgaDeckBuilder.Api.Controllers
{
    public class InventoryDto
    {
        public string PlayerName { get; set; }

        public int WildcardCommon { get; set; }

        public int WildcardUncommon { get; set; }

        public int WildcardRare { get; set; }

        public int WildcardMythic { get; set; }

        public int Gold { get; set; }

        public int Gems { get; set; }

        public float VaultProgress { get; set; }
    }
}