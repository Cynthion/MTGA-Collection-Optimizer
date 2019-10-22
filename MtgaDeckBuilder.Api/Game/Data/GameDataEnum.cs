namespace MtgaDeckBuilder.Api.Game.Data
{
    using System.Text.Json;

    public partial class GameDataEnum
    {
        public string Name { get; set; }

        public Value[] Values { get; set; }
    }

    public partial class Value
    {
        public long Id { get; set; }

        public long Text { get; set; }
    }
}
