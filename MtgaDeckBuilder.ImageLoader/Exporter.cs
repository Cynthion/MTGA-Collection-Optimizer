using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.IO;

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
        public static void ExportAssets(string savePath, List<AssetItem> toExportAssets, ExportType exportType)
        {
            //ThreadPool.QueueUserWorkItem(state =>
            //{
                //Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");

                foreach (var asset in toExportAssets)
                {
                    var exportpath = savePath + "\\";
                    exportpath = savePath + "\\" + asset.TypeString + "\\";

                    try
                    {
                        switch (exportType)
                        {
                            case ExportType.Convert:
                                switch (asset.Type)
                                {
                                    case ClassIDType.Texture2D:
                                        ExportTexture2D(asset, exportpath);
                                        break;
                                    default:
                                        throw new NotImplementedException("The provided asset type is ther than Texture2D and not supported.");
                                }
                                break;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Export {asset.Type}:{asset} error\r\n{ex.Message}\r\n{ex.StackTrace}");
                    }
                }
            //});
        }

        public static bool ExportTexture2D(AssetItem item, string exportPathName)
        {
            var converter = new Texture2DConverter((Texture2D)item.Asset);

            var bitmap = converter.ConvertToBitmap(true);
            if (bitmap == null)
                return false;

            var exportFullName = exportPathName + /*item.Text +*/ ".png"; //+ ext.ToLower();
            if (ExportFileExists(exportFullName))
            {
                return false;
            }
            bitmap.Save(exportFullName, ImageFormat.Png);
            bitmap.Dispose();
            return true;
        }

        private static bool ExportFileExists(string filename)
        {
            if (File.Exists(filename))
            {
                return true;
            }
            Directory.CreateDirectory(Path.GetDirectoryName(filename));
            return false;
        }
    }
}
