using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.Model
{
    public class LogDeck
    {
        public string Id { get; set; }

        public string Name { get; set; }

        public string Description { get; set; }

        public IList<int> MainDeck { get; set; }
    }
}
