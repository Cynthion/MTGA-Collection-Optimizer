using MtgaDeckBuilder.Importer.Model;

namespace MtgaDeckBuilder.Importer
{
    internal interface IStorage
    {
        void StorePlayerLibrary(PlayerLibrary playerLibrary);
    }
}