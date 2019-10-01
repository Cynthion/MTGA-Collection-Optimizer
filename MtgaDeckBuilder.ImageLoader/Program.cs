namespace MtgaDeckBuilder.ImageLoader
{
    public class Program
    {
        public void Demo()
        {
            var assetsManager = new AssetsManager();
            assetsManager.LoadFile("filePath");
            assetsManager.BuildAssetList();
        }
    }
}
