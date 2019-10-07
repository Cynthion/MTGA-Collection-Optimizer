using System;
using System.Collections.Generic;
using System.IO;

namespace MtgaDeckBuilder.ImageLoader
{
    public enum FileType
    {
        BundleFile,
    }

    public interface IAssetsManager
    {
        IList<SerializedFile> LoadSerializedFiles(string file);

        IEnumerable<AssetItem> BuildAssetList(IEnumerable<SerializedFile> assetsFiles);
    }

    public class AssetsManager : IAssetsManager
    {
        internal Dictionary<string, int> assetsFileIndexCache = new Dictionary<string, int>(); // TODO not filled, required?
        internal Dictionary<string, EndianBinaryReader> resourceFileReaders = new Dictionary<string, EndianBinaryReader>();
                
        public IList<SerializedFile> LoadSerializedFiles(string file)
        {
            var serializedFiles = new List<SerializedFile>();
            switch (CheckFileType(file, out var reader))
            {
                case FileType.BundleFile:
                    serializedFiles.AddRange(LoadSerializedBundleFiles(file, reader));
                    break;
            }

            ReadAssets(serializedFiles);

            return serializedFiles;
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

        private IList<SerializedFile> LoadSerializedBundleFiles(string fullName, EndianBinaryReader reader)
        {
            var serializedFiles = new List<SerializedFile>();
            try
            {
                var bundleFile = new BundleFile(reader, fullName);
                foreach (var file in bundleFile.fileList)
                {
                    var dummyPath = Path.GetDirectoryName(fullName) + "\\" + file.fileName;
                    var serializedFile = LoadSerializedFileFromMemory(dummyPath, new EndianBinaryReader(file.stream), fullName);

                    if (serializedFile != null)
                    {
                        serializedFiles.Add(serializedFile);
                    }
                }
            }
            finally
            {
                reader.Dispose();
            }

            return serializedFiles;
        }

        private SerializedFile LoadSerializedFileFromMemory(string fullName, EndianBinaryReader reader, string originalPath)
        {
            var upperFileName = Path.GetFileName(fullName).ToUpper();
            try
            {
                var assetsFile = new SerializedFile(this, fullName, reader);
                assetsFile.originalPath = originalPath;
                return assetsFile;
            }
            catch
            {
                // catch block required
                return null;
            }
            finally
            {
                resourceFileReaders.Add(upperFileName, reader);
            }
        }

        private void ReadAssets(IEnumerable<SerializedFile> assetFiles)
        {
            foreach (var assetsFile in assetFiles)
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

        public IEnumerable<AssetItem> BuildAssetList(IEnumerable<SerializedFile> assetsFiles)
        {
            var tempDic = new Dictionary<Object, AssetItem>(); // TODO remove?

            var assetList = new List<AssetItem>();

            int j = 0;
            foreach (var assetsFile in assetsFiles)
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
