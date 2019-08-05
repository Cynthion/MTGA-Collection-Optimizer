using System.Collections.Generic;
using MtgaDeckBuilder.Api.Model.Converters;
using Newtonsoft.Json;

namespace MtgaDeckBuilder.Api.Model
{
    [JsonConverter(typeof(LogDeckConverter))]
    public class LogDeck
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IDictionary<long, short> MainDeck { get; set; }

        public IDictionary<long, short> Sideboard { get; set; }
    }
}
