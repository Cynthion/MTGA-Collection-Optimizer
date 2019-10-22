namespace MtgaDeckBuilder.Api.Game.Data
{
    using System.Text.Json;

    public partial class GameDataLocality
    {
        public string Langkey { get; set; }

        public string IsoCode { get; set; }

        public Key[] Keys { get; set; }
    }

    public partial class Key
    {
        public long Id { get; set; }

        public string Text { get; set; }
    }
}
