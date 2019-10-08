using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.ImageLoader;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;

namespace MtgaDeckBuilder.Api.ImageImport
{
    public interface IImageImporter
    {
        void ImportImagesForSetSymbols(string setCode);

        void ImportImageForCard(long artId);
    }

    public class ImageImporter : IImageImporter
    {
        private readonly ISettings _settings;
        private readonly IAssetsManager _assetsManager;

        private static readonly IEnumerable<string> _expansionSymbolTexture2DNamePatterns = new List<string>
        {
            "ExpansionSymbol_*_Common",
            "ExpansionSymbol_*_Mythic",
            "ExpansionSymbol_*_Rare",
            "ExpansionSymbol_*_Uncommon",
        };

        private readonly string _assetBundlePath;

        public ImageImporter(ISettings settings, IAssetsManager assetsManager)
        {
            _settings = settings;
            _assetsManager = assetsManager;

            //_settings.GameDataPath = @"G:\MTGArenaLive\MTGA_Data";
            _settings.GameDataPath = @"C:\Program Files (x86)\Wizards of the Coast\MTGA\MTGA_Data";
            _settings.AssertGameDataPathValid();
            _assetBundlePath = Path.Combine(settings.GameDataPath, "Downloads\\AssetBundle");
        }

        public void ImportImagesForSetSymbols(string setCode)
        {
            var expansionSymbolTexture2DNames = _expansionSymbolTexture2DNamePatterns.Select(p => p.Replace("*", setCode.ToUpper())).ToList();

            var setCodeAssetPrefix = $"{setCode}_mdnassetlibrarypayloads_general_";
            var setCodeAssetFilePath = Directory.GetFiles(_assetBundlePath, $"{setCodeAssetPrefix}*.mtga").Single();

            var serializedFiles = _assetsManager.LoadSerializedFiles(setCodeAssetFilePath);
            var assetList = _assetsManager.BuildTexture2DAssetList(serializedFiles).ToList();

            var expansionSymbolAssets = assetList.Where(a => expansionSymbolTexture2DNames.Contains((a.Asset as NamedObject).m_Name));

            foreach (var texture2dAsset in expansionSymbolAssets)
            {
                using (var bitmap = Exporter.ExportTextture2DAssetToBitmap(texture2dAsset))
                {
                    AssertImageImportsDirectoryExists(_settings.ImageImportPath);
                    var imageImportPath = $"{_settings.ImageImportPath}\\{(texture2dAsset.Asset as NamedObject).m_Name}.png";
                    bitmap.Save(imageImportPath, ImageFormat.Png);
                }
            }

        }

        public void ImportImageForCard(long artId)
        {
            var cardArtAssetPrefix = $"{artId}_cardart_";
            var cardArtAssetFilePath = Directory.GetFiles(_assetBundlePath, $"{cardArtAssetPrefix}*.mtga").Single();

            var serializedFiles = _assetsManager.LoadSerializedFiles(cardArtAssetFilePath);
            var assetList = _assetsManager.BuildTexture2DAssetList(serializedFiles);

            var cardArtAsset = assetList.First();

            using (var bitmap = ResizeBitmap(Exporter.ExportTextture2DAssetToBitmap(cardArtAsset), 512, 376))
            {
                AssertImageImportsDirectoryExists(_settings.ImageImportPath);
                var imageImportPath = $"{_settings.ImageImportPath}\\{artId}.png";
                bitmap.Save(imageImportPath, ImageFormat.Png);
            }
        }

        private Bitmap ResizeBitmap(Bitmap original, int width, int height)
        {
            Bitmap result = new Bitmap(width, height);
            using (Graphics g = Graphics.FromImage(result))
            {
                g.DrawImage(original, 0, 0, width, height);
            }

            return result;
        }

        private static void AssertImageImportsDirectoryExists(string path)
        {
            if (!Directory.Exists(path))
            {
                Directory.CreateDirectory(path);
            }
        }
    }
}
