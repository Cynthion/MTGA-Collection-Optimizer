using System.Collections.Generic;
using System.IO;

namespace MtgaDeckBuilder.ImageLoader
{
    public interface IAssetsManager
    {
        IList<SerializedFile> LoadSerializedFiles(string filePath);

        IEnumerable<AssetItem> BuildAssetList(IEnumerable<SerializedFile> assetsFiles);
    }

    public class AssetsManager : IAssetsManager
    {
        internal Dictionary<string, EndianBinaryReader> resourceFileReaders = new Dictionary<string, EndianBinaryReader>();
                
        public IList<SerializedFile> LoadSerializedFiles(string filePath)
        {
            var reader = new EndianBinaryReader(File.OpenRead(filePath));
            reader.ReadStringToNull(20); // signature: UnityFS
            reader.Position = 0;

            var serializedFiles = new List<SerializedFile>();
            serializedFiles.AddRange(LoadSerializedBundleFiles(filePath, reader));

            ReadAssets(serializedFiles);

            return serializedFiles;
        }

        private IList<SerializedFile> LoadSerializedBundleFiles(string fileName, EndianBinaryReader reader)
        {
            var serializedFiles = new List<SerializedFile>();
            try
            {
                var bundleFile = new BundleFile(reader, fileName);
                foreach (var file in bundleFile.fileList)
                {
                    var dummyPath = Path.GetDirectoryName(fileName) + "\\" + file.fileName;
                    var serializedFile = LoadSerializedFileFromMemory(dummyPath, new EndianBinaryReader(file.stream), fileName);

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
            var assetList = new List<AssetItem>();

            foreach (var assetsFile in assetsFiles)
            {
                foreach (var asset in assetsFile.Objects.Values)
                {
                    var assetItem = new AssetItem(asset);
                    switch (asset.type)
                    {
                        case ClassIDType.Texture2D:
                            assetList.Add(assetItem);
                            break;
                        default:
                            continue;
                    }
                }
            }

            return assetList;
        }
    }
}
