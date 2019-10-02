using System;
using System.Collections.Generic;
using System.Drawing.Imaging;
using System.Globalization;
using System.IO;
using System.Text;
using System.Threading;

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
            ThreadPool.QueueUserWorkItem(state =>
            {
                Thread.CurrentThread.CurrentCulture = new CultureInfo("en-US");

                int toExportCount = toExportAssets.Count;
                int exportedCount = 0;
                //int i = 0;

                foreach (var asset in toExportAssets)
                {
                    var exportpath = savePath + "\\";
                    //if (assetGroupSelectedIndex == 1)
                    //{
                    //   exportpath += Path.GetFileNameWithoutExtension(asset.SourceFile.fullName) + "_export\\";
                    //}
                    //else if (assetGroupSelectedIndex == 0)
                    //{
                    exportpath = savePath + "\\" + asset.TypeString + "\\";
                    //}
                    // TODO enable logging
                    //StatusStripUpdate($"Exporting {asset.TypeString}: {asset.Text}");
                    try
                    {
                        switch (exportType)
                        {
                            //case ExportType.Raw:
                            //    if (ExportRawFile(asset, exportpath))
                            //    {
                            //        exportedCount++;
                            //    }
                            //    break;
                            //case ExportType.Dump:
                            //    if (ExportDumpFile(asset, exportpath))
                            //    {
                            //        exportedCount++;
                            //    }
                            //    break;
                            case ExportType.Convert:
                                switch (asset.Type)
                                {
                                    case ClassIDType.Texture2D:
                                        if (ExportTexture2D(asset, exportpath))
                                        {
                                            exportedCount++;
                                        }
                                        break;
                                    //case ClassIDType.AudioClip:
                                    //    if (ExportAudioClip(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.Shader:
                                    //    if (ExportShader(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.TextAsset:
                                    //    if (ExportTextAsset(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.MonoBehaviour:
                                    //    if (ExportMonoBehaviour(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.Font:
                                    //    if (ExportFont(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.Mesh:
                                    //    if (ExportMesh(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.VideoClip:
                                    //    if (ExportVideoClip(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.MovieTexture:
                                    //    if (ExportMovieTexture(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.Sprite:
                                    //    if (ExportSprite(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.Animator:
                                    //    if (ExportAnimator(asset, exportpath))
                                    //    {
                                    //        exportedCount++;
                                    //    }
                                    //    break;
                                    //case ClassIDType.AnimationClip:
                                    //    break;
                                    default:
                                        throw new NotImplementedException("The provided asset type is ther than Texture2D and not supported.");
                                        //if (ExportRawFile(asset, exportpath))
                                        //{
                                        //    exportedCount++;
                                        //}
                                        //break;
                                }
                                break;
                        }
                    }
                    catch (Exception ex)
                    {
                        throw new Exception($"Export {asset.Type}:{asset} error\r\n{ex.Message}\r\n{ex.StackTrace}");
                    }
                }

                // TODO enable logging
                //var statusText = exportedCount == 0 ? "Nothing exported." : $"Finished exporting {exportedCount} assets.";
                //StatusStripUpdate(statusText);
            });
        }

        public static bool ExportTexture2D(AssetItem item, string exportPathName)
        {
            var converter = new Texture2DConverter((Texture2D)item.Asset);
            //var convertTexture = (bool)Properties.Settings.Default["convertTexture"];
            //if (convertTexture)
            //{
                var bitmap = converter.ConvertToBitmap(true);
                if (bitmap == null)
                    return false;
                ImageFormat format = null;
                //var ext = (string)Properties.Settings.Default["convertType"];
                //switch (ext)
                //{
                //    case "BMP":
                //        format = ImageFormat.Bmp;
                //        break;
                //    case "PNG":
                        format = ImageFormat.Png;
                //break;
                //    case "JPEG":
                //        format = ImageFormat.Jpeg;
                //        break;
                //}
                var exportFullName = exportPathName + item.Text + ".png"; //+ ext.ToLower();
                if (ExportFileExists(exportFullName))
                    return false;
                bitmap.Save(exportFullName, format);
                bitmap.Dispose();
                return true;
            //}
            //else
            //{
            //    var exportFullName = exportPathName + item.Text + converter.GetExtensionName();
            //    if (ExportFileExists(exportFullName))
            //        return false;
            //    File.WriteAllBytes(exportFullName, converter.ConvertToContainer());
            //    return true;
            //}
        }
    }
}
