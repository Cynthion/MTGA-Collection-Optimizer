using System;
using System.Drawing;

namespace MtgaDeckBuilder.ImageLoader
{
    public class Exporter
    {
        // Studio.cs
        public static Bitmap ExportTextureAssetToBitmap(AssetItem assetItem)
        {
            //ThreadPool.QueueUserWorkItem(state =>
            //{
                //Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
                try
                {
                    switch (assetItem.Type)
                    {
                        case ClassIDType.Sprite:
                            return ConvertSpriteToBitmap(assetItem);
                        case ClassIDType.Texture2D:
                            return ConvertTexture2DToBitmap(assetItem);
                        default:
                            throw new NotImplementedException("The provided asset type is ther than Texture2D and not supported.");
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Export {assetItem.Type}:{assetItem} error\r\n{ex.Message}\r\n{ex.StackTrace}");
                }
            //});
        }

        private static Bitmap ConvertSpriteToBitmap(AssetItem item)
        {
            var bitmap = SpriteHelper.GetImageFromSprite((Sprite)item.Asset);
            return bitmap;
        }

        private static Bitmap ConvertTexture2DToBitmap(AssetItem item)
        {
            var converter = new Texture2DConverter((Texture2D)item.Asset);

            var bitmap = converter.ConvertToBitmap(true);

            return bitmap;
        }
    }
}
