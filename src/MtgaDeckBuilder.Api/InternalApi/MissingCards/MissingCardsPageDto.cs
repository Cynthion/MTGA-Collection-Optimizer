using System.Collections.Generic;
using MtgaDeckBuilder.Api.Controllers;
using MtgaDeckBuilder.Api.Controllers.Dtos;

namespace MtgaDeckBuilder.Api.InternalApi.MissingCards
{
    public class MissingCardsPageDto
    {
        public IList<PlayerCardDto> PlayerCards { get; set; }

        public IList<PlayerDeckDto> PlayerDecks { get; set; }
    }
}
