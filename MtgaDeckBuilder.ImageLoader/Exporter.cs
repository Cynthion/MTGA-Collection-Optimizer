using System;
using System.Collections.Generic;
using System.Drawing;

namespace MtgaDeckBuilder.ImageLoader
{
    public enum ExportType
    {
        Convert,
        //Raw,
        //Dump
    }

    public class Exporter
    {
        // Studio.cs
        public static Bitmap ExportAssetsToBitmap(List<AssetItem> toExportAssets)
        {
            //ThreadPool.QueueUserWorkItem(state =>
            //{
                //Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");
            foreach (var asset in toExportAssets)
            {
                try
                {
                    switch (asset.Type)
                    {
                        case ClassIDType.Texture2D:
                            return ConvertTexture2DToBitmap(asset);
                        default:
                            throw new NotImplementedException("The provided asset type is ther than Texture2D and not supported.");
                    }
                }
                catch (Exception ex)
                {
                    throw new Exception($"Export {asset.Type}:{asset} error\r\n{ex.Message}\r\n{ex.StackTrace}");
                }
            }

            throw new ArgumentException("No assets to export.");
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
