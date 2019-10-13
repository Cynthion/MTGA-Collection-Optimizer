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

        byte[] GetCardArtImageData(string artId);
    }

    public class ImageDataRepository : IImageDataRepository
    {
        private static readonly string _setSpecificAssetBundleNameSuffix = "_mdnassetlibrarypayloads_general_";
        private static readonly string _arenaSpecificAssetBundleNameSuffix = "_mdnassetlibrarypayloads_npe_";

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
            if (setCode.Equals("ana", System.StringComparison.OrdinalIgnoreCase))
            {
                assetName = _expansionSymbolTexture2DNamePatterns[rarity].Replace("*", "ARENA");
            }
            var assetPath = $"{_settings.ImageImportPath}\\{assetName}.png";

            // if not, import it from asset bundle
            if (!File.Exists(assetPath))
            {
                ImportSetSpecificAssets(setCode);
            }

            using (var bitmap = new Bitmap(assetPath))
            using (var ms = new MemoryStream())
            {
                bitmap.Save(ms, ImageFormat.Png);
                return ms.ToArray();
            }
        }
        
        public byte[] GetCardArtImageData(string artId)
        {
            var paddedArtId = artId.PadLeft(6, '0');
            var assetPath = $"{_settings.ImageImportPath}\\{paddedArtId}.png";

            // if not, import it from asset bundle
            using (var bitmap = File.Exists(assetPath) 
                ? new Bitmap(assetPath) 
                : ImportCardArtAsset(paddedArtId))
            using (var ms = new MemoryStream())
            {
                bitmap.Save(ms, ImageFormat.Png);
                return ms.ToArray();
            }
        }

        private void ImportSetSpecificAssets(string setCode)
        {
            // TODO also load images for booster packs here
            var assetBundleNamePrefix = $"{setCode.ToLower()}{_setSpecificAssetBundleNameSuffix}";
            var assetNames = _expansionSymbolTexture2DNamePatterns.Values.Select(s => s.Replace("*", setCode.ToUpper()));

            if (setCode.Equals("ana", System.StringComparison.OrdinalIgnoreCase))
            {
                assetBundleNamePrefix = $"{setCode.ToLower()}{_arenaSpecificAssetBundleNameSuffix}";
                assetNames = _expansionSymbolTexture2DNamePatterns.Values.Select(s => s.Replace("*", "ARENA"));
            }

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

        private Bitmap ImportCardArtAsset(string artId)
        {
            var assetBundleNamePrefix = $"{artId}_cardart_";

            var bitmap = _imageDataLoader.LoadImageFromAssetBundle(assetBundleNamePrefix);
            bitmap = ResizeBitmap(bitmap, 512, 376);

            AssertDirectoryExists(_settings.ImageImportPath);
            var path = $"{_settings.ImageImportPath}\\{artId}.png";
            bitmap.Save(path, ImageFormat.Png);
            return bitmap;
        }

        private static void AssertDirectoryExists(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }

        private Bitmap ResizeBitmap(Bitmap original, int width, int height)
        {
            Bitmap result = new Bitmap(width, height);
            using (Graphics g = Graphics.FromImage(result))
            {
                g.DrawImage(original, 0, 0, width, height);
            }
            original.Dispose();

            return result;
        }
    }
}
