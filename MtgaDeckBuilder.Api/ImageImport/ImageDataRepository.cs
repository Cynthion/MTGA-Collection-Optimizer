using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.Api.Model;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace MtgaDeckBuilder.Api.ImageImport
{
    public interface IImageDataRepository
    {
        byte[] GetSetSymbolImageData(string setCode, Rarity rarity);
    }

    public class ImageDataRepository : IImageDataRepository
    {
        private static readonly string _setSpecificAssetBundleNameSuffix = "_mdnassetlibrarypayloads_general_";

        private static readonly IDictionary<Rarity, string> _expansionSymbolTexture2DNamePatterns = new Dictionary<Rarity, string>()
        {
            { Rarity.Common, "ExpansionSymbol_*_Common" },
            { Rarity.Uncommon, "ExpansionSymbol_*_Uncommon" },
            { Rarity.Rare, "ExpansionSymbol_*_Rare" },
            { Rarity.MythicRare, "ExpansionSymbol_*_Mythic" },
        };

        private readonly ISettings _settings;
        private readonly IImageDataLoader _imageDataLoader;

        public ImageDataRepository(ISettings settings, IImageDataLoader imageDataLoader)
        {
            _settings = settings;
            _imageDataLoader = imageDataLoader;
        }

        public byte[] GetSetSymbolImageData(string setCode, Rarity rarity)
        {
            var assetName = _expansionSymbolTexture2DNamePatterns[rarity].Replace("*", setCode.ToUpper());
            var assetPath = $"{_settings.ImageImportPath}\\{assetName}.png";

            // if not, import it from asset bundle
            if (!File.Exists(assetPath))
            {
                ImportSetSpecificAssets(setCode);
            }

            using (var ms = new MemoryStream())
            using (var bitmap = new Bitmap(assetPath))
            {
                bitmap.Save(ms, ImageFormat.Png);
                return ms.ToArray();
            }
        }

        private void ImportSetSpecificAssets(string setCode)
        {
            var assetBundleNamePrefix = $"{setCode.ToLower()}{_setSpecificAssetBundleNameSuffix}";
            var assetNames = _expansionSymbolTexture2DNamePatterns.Values.Select(s => s.Replace("*", setCode.ToUpper()));

            var bundleImages = _imageDataLoader.LoadImagesFromAssetBundle(assetBundleNamePrefix, assetNames);

            AssertDirectoryExists(_settings.ImageImportPath);
            foreach (var bundleImage in bundleImages)
            {
                var path = $"{_settings.ImageImportPath}\\{bundleImage.Key}.png";
                var bitmap = bundleImage.Value;
                bitmap.Save(path, ImageFormat.Png);
                bitmap.Dispose();
            }
        }

        private static void AssertDirectoryExists(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }

        //public void ImportImageForCard(long artId)
        //{
        //    var cardArtAssetPrefix = $"{artId}_cardart_";
        //    var cardArtAssetFilePath = Directory.GetFiles(_assetBundlePath, $"{cardArtAssetPrefix}*.mtga").Single();

        //    var serializedFiles = _assetsManager.LoadSerializedFiles(cardArtAssetFilePath);
        //    var assetList = _assetsManager.BuildTexture2DAssetList(serializedFiles);

        //    var cardArtAsset = assetList.First();

        //    using (var bitmap = ResizeBitmap(Exporter.ExportTextture2DAssetToBitmap(cardArtAsset), 512, 376))
        //    {
        //        AssertImageImportsDirectoryExists(_settings.ImageImportPath);
        //        var imageImportPath = $"{_settings.ImageImportPath}\\{artId}.png";
        //        bitmap.Save(imageImportPath, ImageFormat.Png);
        //    }
        //}

        //private Bitmap ResizeBitmap(Bitmap original, int width, int height)
        //{
        //    Bitmap result = new Bitmap(width, height);
        //    using (Graphics g = Graphics.FromImage(result))
        //    {
        //        g.DrawImage(original, 0, 0, width, height);
        //    }

        //    return result;
        //}
    }
}
