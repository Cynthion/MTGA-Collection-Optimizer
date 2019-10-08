using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.ImageLoader;
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
            var setCodeAssetPrefix = $"{setCode}_mdnassetlibrarypayloads_general_";
            var setCodeAssetFilePath = Directory.GetFiles(_assetBundlePath, $"{setCodeAssetPrefix}*.mtga").Single();

            var serializedFiles = _assetsManager.LoadSerializedFiles(setCodeAssetFilePath);
            var assetList = _assetsManager.BuildAssetList(serializedFiles).ToList();

            // ExpansionSymbol_RNA_Common
            // ExpansionSymbol_RNA_Mythic
            // ExpansionSymbol_RNA_Rare
            // ExpansionSymbol_RNA_Uncommon
        }

        public void ImportImageForCard(long artId)
        {
            var cardArtAssetPrefix = $"{artId}_cardart_";
            var cardArtAssetFilePath = Directory.GetFiles(_assetBundlePath, $"{cardArtAssetPrefix}*.mtga").Single();

            var serializedFiles = _assetsManager.LoadSerializedFiles(cardArtAssetFilePath);
            var assetList = _assetsManager.BuildAssetList(serializedFiles).ToList();

            var bitmap = Exporter.ExportAssetsToBitmap(assetList);
            bitmap = ResizeBitmap(bitmap, 512, 376);

            AssertImageImportsDirectoryExists(_settings.ImageImportPath);
            var imageImportPath = $"{_settings.ImageImportPath}\\{artId}.png";
            bitmap.Save(imageImportPath, ImageFormat.Png);
            bitmap.Dispose();
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
