using System.Collections.Generic;
using MtgaDeckBuilder.Api.Controllers;

namespace MtgaDeckBuilder.Api.InternalApi.MissingCards
{
    public class MissingCardsPageDto
    {
        public IList<CardDto> PlayerCards { get; set; }

        public IList<PlayerDeckDto> PlayerDecks { get; set; }
    }
}
