using MtgaDeckBuilder.Api.InternalApi.MissingCards;

namespace MtgaDeckBuilder.Api.MissingCards
{
    public interface IMissingCardsService
    {
        MissingCardsPageDto GetMissingCardsPageDto();
    }
}
