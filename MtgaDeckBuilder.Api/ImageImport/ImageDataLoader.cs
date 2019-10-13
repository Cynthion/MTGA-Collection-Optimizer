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
        IDictionary<string, Bitmap> LoadImagesFromAssetBundle(string assetBundleName, IEnumerable<string> textureAssetNames);

        Bitmap LoadImageFromAssetBundle(string assetBundleNamePrefix);
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

        public IDictionary<string, Bitmap> LoadImagesFromAssetBundle(string assetBundleNamePrefix, IEnumerable<string> textureAssetNames)
        {
            _settings.AssertGameDataPathValid();
            var assetBundlesPath = Path.Combine(_settings.GameDataPath, "AssetBundle");
            var assetBundlePath = Directory.GetFiles(assetBundlesPath, $"{assetBundleNamePrefix}*.mtga").Single();

            var assets = _assetsManager.LoadSerializedFiles(assetBundlePath);
            var textureAssets = _assetsManager.BuildTextureAssetList(assets);

            var result = new Dictionary<string, Bitmap>();
            foreach (var textureAssetName in textureAssetNames)
            {
                var textureAsset = textureAssets.First(a => textureAssetName.StartsWith((a.Asset as NamedObject).m_Name));
                var bitmap = Exporter.ExportTextureAssetToBitmap(textureAsset);
                result.Add(textureAssetName, bitmap);
            }

            return result;
        }

        public Bitmap LoadImageFromAssetBundle(string assetBundleNamePrefix)
        {
            _settings.AssertGameDataPathValid();
            var assetBundlesPath = Path.Combine(_settings.GameDataPath, "AssetBundle");
            var assetBundlePath = Directory.GetFiles(assetBundlesPath, $"{assetBundleNamePrefix}*.mtga").Single();

            var assets = _assetsManager.LoadSerializedFiles(assetBundlePath);
            var textureAssets = _assetsManager.BuildTextureAssetList(assets);

            var textureAsset = textureAssets.First();
            var bitmap = Exporter.ExportTextureAssetToBitmap(textureAsset);
            return bitmap;
        }
    }
}
