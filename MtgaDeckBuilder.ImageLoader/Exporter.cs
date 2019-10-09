using System;
using System.Drawing;

namespace MtgaDeckBuilder.ImageLoader
{
    public class Exporter
    {
        // Studio.cs
        public static Bitmap ExportTexture2DAssetToBitmap(AssetItem texture2dAsset)
        {
            //ThreadPool.QueueUserWorkItem(state =>
            //{
                //Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
                try
                {
                    switch (texture2dAsset.Type)
                    {
                        case ClassIDType.Texture2D:
                            return ConvertTexture2DToBitmap(texture2dAsset);
                        default:
                            throw new NotImplementedException("The provided asset type is ther than Texture2D and not supported.");
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Export {texture2dAsset.Type}:{texture2dAsset} error\r\n{ex.Message}\r\n{ex.StackTrace}");
                }
            //});
        }

        private static Bitmap ConvertTexture2DToBitmap(AssetItem item)
        {
            var converter = new Texture2DConverter((Texture2D)item.Asset);

            var bitmap = converter.ConvertToBitmap(true);

            return bitmap;
        }
    }
}
