using MtgaDeckBuilder.Api.Configuration;
using MtgaDeckBuilder.ImageLoader;
using System.Drawing;
using System.IO;
using System.Linq;

namespace MtgaDeckBuilder.Api.ImageImport
{
    public interface IImageImporter
    {
        void ImportImageForCard(long artId);
    }

    public class ImageImporter : IImageImporter
    {
        private readonly ISettings _settings;
        private readonly string _assetBundlePath;

        public ImageImporter(ISettings settings)
        {
            _settings = settings;

            _settings.GameDataPath = @"G:\MTGArenaLive\MTGA_Data";
            _settings.AssertGameDataPathValid();
            _assetBundlePath = Path.Combine(settings.GameDataPath, "Downloads\\AssetBundle");
        }

        public void ImportImageForCard(long artId)
        {
            var cardArtAssetPrefix = $"{artId}_cardart_";
            var cardArtAssetFilePath = Directory.GetFiles(_assetBundlePath, $"{cardArtAssetPrefix}*.mtga").Single();

            // TODO use interface and dependency injection
            var assetsManager = new AssetsManager();
            assetsManager.LoadFile(cardArtAssetFilePath);
            assetsManager.BuildAssetList();
            assetsManager.ExportAssets(_settings.ImageImportPath);
        }
    }
}
