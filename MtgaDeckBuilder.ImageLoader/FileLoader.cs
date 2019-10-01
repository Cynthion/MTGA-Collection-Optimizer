using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace MtgaDeckBuilder.ImageLoader
{
    public enum FileType
    {
        AssetsFile,
        BundleFile,
        WebFile
    }

    public class FileLoader
    {
        public void LoadFile(string fullName)
        {
            switch (CheckFileType(fullName, out var reader))
            {
                //case FileType.AssetsFile:
                //    LoadAssetsFile(fullName, reader);
                //    break;
                case FileType.BundleFile:
                    LoadBundleFile(fullName, reader);
                    break;
                //case FileType.WebFile:
                //    LoadWebFile(fullName, reader);
                //    break;
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
            var fileName = Path.GetFileName(fullName);
            // TODO enable logging
            //Logger.Info("Loading " + fileName);
            try
            {
                var bundleFile = new BundleFile(reader, fullName);
                foreach (var file in bundleFile.fileList)
                {
                    var dummyPath = Path.GetDirectoryName(fullName) + "\\" + file.fileName;
                    // TODO required?
                    LoadAssetsFromMemory(dummyPath, new EndianBinaryReader(file.stream), parentPath ?? fullName, bundleFile.versionEngine);
                }
            }
            catch
            {
                /*var str = $"Unable to load bundle file {fileName}";
                if (parentPath != null)
                {
                    str += $" from {Path.GetFileName(parentPath)}";
                }
                Logger.Error(str);*/
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
                    if (assetsFile.header.m_Version < 7)
                    {
                        assetsFile.SetVersion(unityVersion);
                    }
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
    }
}
