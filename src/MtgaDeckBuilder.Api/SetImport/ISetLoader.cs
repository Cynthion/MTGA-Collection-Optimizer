using System.Collections.Generic;
using System.Threading.Tasks;

namespace MtgaDeckBuilder.Api.SetImport
{
    public interface ISetLoader
    {
        Task<IDictionary<long, CardInfo>> LoadAllSetsAsync();
    }
}