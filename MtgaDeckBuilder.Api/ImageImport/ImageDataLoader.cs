using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.ImageLoader;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;

namespace MtgaDeckBuilder.Api.ImageImport
{
    public interface IImageDataLoader
    {
        IDictionary<string, Bitmap> LoadImagesFromAssetBundle(string assetBundleName, IEnumerable<string> texture2DAssetNames);
    }

    public class ImageDataLoader : IImageDataLoader
    {
        private readonly ISettings _settings;
        private readonly IAssetsManager _assetsManager;

        public ImageDataLoader(ISettings settings, IAssetsManager assetsManager)
        {
            _settings = settings;
            _assetsManager = assetsManager;
        }

        public IDictionary<string, Bitmap> LoadImagesFromAssetBundle(string assetBundleNamePrefix, IEnumerable<string> texture2DAssetNames)
        {
            _settings.AssertGameDataPathValid();
            var assetBundlesPath = Path.Combine(_settings.GameDataPath, "AssetBundle");
            var assetBundlePath = Directory.GetFiles(assetBundlesPath, $"{assetBundleNamePrefix}*.mtga").Single();

            var assets = _assetsManager.LoadSerializedFiles(assetBundlePath);
            var texture2DAssets = _assetsManager.BuildTexture2DAssetList(assets);

            var result = new Dictionary<string, Bitmap>();
            foreach (var texture2DAssetName in texture2DAssetNames)
            {
                var texture2DAsset = texture2DAssets.First(a => texture2DAssetName.Equals((a.Asset as NamedObject).m_Name));
                var bitmap = Exporter.ExportTexture2DAssetToBitmap(texture2DAsset);
                result.Add(texture2DAssetName, bitmap);
            }

            return result;
        }
    }
}
