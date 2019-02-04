namespace MtgaDeckBuilder.Api.Model
{
    public class LogPlayerInventory
    {
        public string PlayerId { get; set; }

        public int WcCommon { get; set; }

        public int WcUncommon { get; set; }

        public int WcRare { get; set; }

        public int WcMythic { get; set; }

        public int Gold { get; set; }

        public int Gems { get; set; }

        public float VaultProgress { get; set; }
    }
}
