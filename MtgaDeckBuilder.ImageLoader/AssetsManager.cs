using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace MtgaDeckBuilder.ImageLoader
{
    public enum FileType
    {
        AssetsFile,
        BundleFile,
        WebFile
    }

    public class AssetsManager
    {

        public List<SerializedFile> assetsFileList = new List<SerializedFile>();
        internal Dictionary<string, int> assetsFileIndexCache = new Dictionary<string, int>(); // TODO not filled, required?
        internal Dictionary<string, EndianBinaryReader> resourceFileReaders = new Dictionary<string, EndianBinaryReader>();

        private List<string> importFiles = new List<string>();
        private HashSet<string> importFilesHash = new HashSet<string>();
        private HashSet<string> assetsFileListHash = new HashSet<string>();

        public static List<AssetItem> exportableAssets = new List<AssetItem>();
        
        public void LoadFile(string file)
        {
            importFiles.Add(file);
            importFilesHash.Add(Path.GetFileName(file).ToUpper());

            //use a for loop because list size can change
            for (var i = 0; i < importFiles.Count; i++)
            {
                Load(importFiles[i]);
            }

            importFiles.Clear();
            importFilesHash.Clear();
            assetsFileListHash.Clear();

            ReadAssets();
            //ProcessAssets();
        }

        private void Load(string fullName)
        {
            switch (CheckFileType(fullName, out var reader))
            {
                case FileType.BundleFile:
                    LoadBundleFile(fullName, reader);
                    break;
            }
        }

        private static FileType CheckFileType(string fileName, out EndianBinaryReader reader)
        {
            reader = new EndianBinaryReader(File.OpenRead(fileName));
            return CheckFileType(reader);
        }

        private static FileType CheckFileType(EndianBinaryReader reader)
        {
            var signature = reader.ReadStringToNull(20);
            reader.Position = 0;
            switch (signature)
            {
                //case "UnityWeb":
                //case "UnityRaw":
                //case "\xFA\xFA\xFA\xFA\xFA\xFA\xFA\xFA":
                case "UnityFS":
                    return FileType.BundleFile;
                //case "UnityWebData1.0":
                //    return FileType.WebFile;
                //default:
                //    {
                //        var magic = reader.ReadBytes(2);
                //        reader.Position = 0;
                //        if (WebFile.gzipMagic.SequenceEqual(magic))
                //        {
                //            return FileType.WebFile;
                //        }
                //        reader.Position = 0x20;
                //        magic = reader.ReadBytes(6);
                //        reader.Position = 0;
                //        if (WebFile.brotliMagic.SequenceEqual(magic))
                //        {
                //            return FileType.WebFile;
                //        }
                //        return FileType.AssetsFile;
                //    }
                default:
                    throw new NotImplementedException("The loaded asset has a file type other than UnityFS that is not enabled to be handled.");
            }
        }

        private void LoadBundleFile(string fullName, EndianBinaryReader reader, string parentPath = null)
        {
            try
            {
                var bundleFile = new BundleFile(reader, fullName);
                foreach (var file in bundleFile.fileList)
                {
                    // TODO required? rather directly use byte stream to export to png
                    var dummyPath = Path.GetDirectoryName(fullName) + "\\" + file.fileName;
                    LoadAssetsFromMemory(dummyPath, new EndianBinaryReader(file.stream), parentPath ?? fullName, bundleFile.versionEngine);
                }
            }
            finally
            {
                reader.Dispose();
            }
        }

        private void LoadAssetsFromMemory(string fullName, EndianBinaryReader reader, string originalPath, string unityVersion = null)
        {
            var upperFileName = Path.GetFileName(fullName).ToUpper();
            if (!assetsFileListHash.Contains(upperFileName))
            {
                try
                {
                    var assetsFile = new SerializedFile(this, fullName, reader);
                    assetsFile.originalPath = originalPath;
                    assetsFileList.Add(assetsFile);
                    assetsFileListHash.Add(assetsFile.upperFileName);
                }
                catch
                {
                    //Logger.Error($"Unable to load assets file {fileName} from {Path.GetFileName(originalPath)}");
                }
                finally
                {
                    resourceFileReaders.Add(upperFileName, reader);
                }
            }
        }

        private void ReadAssets()
        {
            var progressCount = assetsFileList.Sum(x => x.m_Objects.Count);
            foreach (var assetsFile in assetsFileList)
            {
                assetsFile.Objects = new Dictionary<long, Object>(assetsFile.m_Objects.Count);
                foreach (var objectInfo in assetsFile.m_Objects)
                {
                    var objectReader = new ObjectReader(assetsFile.reader, assetsFile, objectInfo);
                    switch (objectReader.type)
                    {
                        case ClassIDType.Texture2D:
                            assetsFile.Objects.Add(objectInfo.m_PathID, new Texture2D(objectReader));
                            break;
                        default:
                            assetsFile.Objects.Add(objectInfo.m_PathID, new Object(objectReader));
                            break;
                    }
                }
            }
        }

        public void BuildAssetList()
        {
            if (assetsFileList.Count == 0)
            {
                throw new ArgumentException("No asset file was loaded.");
            }

            var tempDic = new Dictionary<Object, AssetItem>();
            //var productName = string.Empty;
            var assetsNameHash = new HashSet<string>();

            int j = 0;
            foreach (var assetsFile in assetsFileList)
            {
                var tempExportableAssets = new List<AssetItem>();
                //AssetBundle ab = null;
                foreach (var asset in assetsFile.Objects.Values)
                {
                    var assetItem = new AssetItem(asset);
                    tempDic.Add(asset, assetItem);
                    assetItem.UniqueID = " #" + j;
                    var exportable = false;
                    switch (asset)
                    {
                        case Texture2D m_Texture2D:
                            if (!string.IsNullOrEmpty(m_Texture2D.m_StreamData?.path))
                                assetItem.FullSize = asset.byteSize + m_Texture2D.m_StreamData.size;
                            //assetItem.Text = m_Texture2D.m_Name;
                            exportable = true;
                            break;
                    }

                    if (exportable)
                    {
                        tempExportableAssets.Add(assetItem);
                    }
                }

                exportableAssets.AddRange(tempExportableAssets);
                tempExportableAssets.Clear();
            }

            assetsNameHash.Clear();
        }

        // AssetStudioGUIForm.cs
        public void ExportAssets(string savePath, int type = 2, ExportType exportType = ExportType.Convert)
        {
            if (exportableAssets.Count > 0)
            {
                //var saveFolderDialog1 = new OpenFolderDialog();
                //if (saveFolderDialog1.ShowDialog(this) == DialogResult.OK)
                //{
                List<AssetItem> toExportAssets = null;
                switch (type)
                {
                    //case 1: //All Assets
                    //    toExportAssets = exportableAssets;
                    //    break;
                    case 2: //Selected Assets
                        // TODO check if this is correct
                        toExportAssets = exportableAssets; //GetSelectedAssets();
                        break;
                        //case 3: //Filtered Assets
                        //    toExportAssets = visibleAssets;
                        //    break;
                }
                Exporter.ExportAssets(savePath, toExportAssets, exportType);
                //}
            }
            else
            {
                throw new ArgumentException("No exportable assets loaded");
            }
        }
    }
}
