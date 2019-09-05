namespace MtgaDeckBuilder.Api.Model
{
    public class LogJsonRpc
    {
        public string JsonRpc { get; set; }
        public string Method { get; set; }
        public LogJsonRpcParams Params { get; set; }
        public string Id { get; set; }
    }

    public class LogJsonRpcParams
    {
        public string DeckId { get; set; }
    }
}
