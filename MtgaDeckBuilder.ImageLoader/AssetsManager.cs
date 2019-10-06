using System;
using System.Collections.Generic;
using System.Drawing;
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
                
        public void LoadFile(string file)
        {
            Load(file);

            ReadAssets();
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
                case "UnityFS":
                    return FileType.BundleFile;
                default:
                    throw new NotImplementedException("The loaded asset has a file type other than UnityFS that is not enabled to be handled.");
            }
        }

        private void LoadBundleFile(string fullName, EndianBinaryReader reader)
        {
            try
            {
                var bundleFile = new BundleFile(reader, fullName);
                foreach (var file in bundleFile.fileList)
                {
                    var dummyPath = Path.GetDirectoryName(fullName) + "\\" + file.fileName;
                    LoadAssetsFromMemory(dummyPath, new EndianBinaryReader(file.stream), fullName);
                }
            }
            finally
            {
                reader.Dispose();
            }
        }

        private void LoadAssetsFromMemory(string fullName, EndianBinaryReader reader, string originalPath)
        {
            var upperFileName = Path.GetFileName(fullName).ToUpper();

            try
            {
                var assetsFile = new SerializedFile(this, fullName, reader);
                assetsFile.originalPath = originalPath;
                assetsFileList.Add(assetsFile);
            }
            catch
            {
                // catch block required
            }
            finally
            {
                resourceFileReaders.Add(upperFileName, reader);
            }
        }

        private void ReadAssets()
        {
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

        public IEnumerable<AssetItem> BuildAssetList()
        {
            if (assetsFileList.Count == 0)
            {
                throw new ArgumentException("No asset file was loaded.");
            }

            var tempDic = new Dictionary<Object, AssetItem>(); // TODO remove?

            var assetList = new List<AssetItem>();

            int j = 0;
            foreach (var assetsFile in assetsFileList)
            {
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
                        assetList.Add(assetItem);
                    }
                }

            }

            return assetList;
        }
    }
}
