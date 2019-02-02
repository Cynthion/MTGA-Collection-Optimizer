using System.Collections.Generic;

namespace MtgaDeckBuilder.Api.InternalApi.MissingCards
{
    public class MissingCardsPageDto
    {
        public IList<MissingCardDto> MissingCards { get; set; }
    }
}
