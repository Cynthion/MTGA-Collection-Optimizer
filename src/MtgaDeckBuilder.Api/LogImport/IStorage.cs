using MtgaDeckBuilder.Api.Model;

namespace MtgaDeckBuilder.Api.LogImport
{
    public interface IStorage
    {
        void StorePlayerLibrary(PlayerLibrary playerLibrary);
    }
}