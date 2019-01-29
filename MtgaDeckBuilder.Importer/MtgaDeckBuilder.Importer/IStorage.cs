using MtgaDeckBuilder.Importer.Model;

namespace MtgaDeckBuilder.Importer
{
    internal interface IStorage
    {
        void StorePlayerCollection(PlayerCollection playerCollection);
    }
}