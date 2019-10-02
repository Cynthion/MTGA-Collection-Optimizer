namespace MtgaDeckBuilder.ImageLoader
{
    public class ImageLoaderDemo
    {
        public void Demo()
        {
            var assetPath = @"C:\Program Files (x86)\Wizards of the Coast\MTGA\MTGA_Data\Downloads\AssetBundle\001837_cardart_93b131b498b4c6ca8fcd92bd49edb08a.mtga";
            var assetsManager = new AssetsManager();
            assetsManager.LoadFile(assetPath);
            assetsManager.BuildAssetList();
        }
    }
}
