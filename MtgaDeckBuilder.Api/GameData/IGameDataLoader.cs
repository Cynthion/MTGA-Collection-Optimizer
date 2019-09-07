using GameData;

namespace MtgaDeckBuilder.Api.GameData
{
    public interface IGameDataLoader
    {
        GameCard[] LoadGameCards();
    }
}
