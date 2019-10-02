﻿using System;
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
        
        public void LoadFiles(params string[] files)
        {
            //var path = Path.GetDirectoryName(files[0]);
            //MergeSplitAssets(path);
            //var toReadFile = ProcessingSplitFiles(files.ToList());
            Load(files);
        }

        private void Load(string[] files)
        {
            foreach (var file in files)
            {
                importFiles.Add(file);
                importFilesHash.Add(Path.GetFileName(file).ToUpper());
            }

            //use a for loop because list size can change
            for (var i = 0; i < importFiles.Count; i++)
            {
                LoadFile(importFiles[i]);
            }

            importFiles.Clear();
            importFilesHash.Clear();
            assetsFileListHash.Clear();

            ReadAssets();
            //ProcessAssets();
        }

        private void LoadFile(string fullName)
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
                    // TODO required? rather directly use byte stream to export to png
                    var dummyPath = Path.GetDirectoryName(fullName) + "\\" + file.fileName;
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
                        //case ClassIDType.Animation:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Animation(objectReader));
                        //    break;
                        //case ClassIDType.AnimationClip:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new AnimationClip(objectReader));
                        //    break;
                        //case ClassIDType.Animator:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Animator(objectReader));
                        //    break;
                        //case ClassIDType.AnimatorController:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new AnimatorController(objectReader));
                        //    break;
                        //case ClassIDType.AnimatorOverrideController:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new AnimatorOverrideController(objectReader));
                        //    break;
                        //case ClassIDType.AssetBundle:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new AssetBundle(objectReader));
                        //    break;
                        //case ClassIDType.AudioClip:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new AudioClip(objectReader));
                        //    break;
                        //case ClassIDType.Avatar:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Avatar(objectReader));
                        //    break;
                        //case ClassIDType.Font:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Font(objectReader));
                        //    break;
                        //case ClassIDType.GameObject:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new GameObject(objectReader));
                        //    break;
                        //case ClassIDType.Material:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Material(objectReader));
                        //    break;
                        //case ClassIDType.Mesh:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Mesh(objectReader));
                        //    break;
                        //case ClassIDType.MeshFilter:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new MeshFilter(objectReader));
                        //    break;
                        //case ClassIDType.MeshRenderer:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new MeshRenderer(objectReader));
                        //    break;
                        //case ClassIDType.MonoBehaviour:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new MonoBehaviour(objectReader));
                        //    break;
                        //case ClassIDType.MonoScript:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new MonoScript(objectReader));
                        //    break;
                        //case ClassIDType.MovieTexture:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new MovieTexture(objectReader));
                        //    break;
                        //case ClassIDType.PlayerSettings:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new PlayerSettings(objectReader));
                        //    break;
                        //case ClassIDType.RectTransform:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new RectTransform(objectReader));
                        //    break;
                        //case ClassIDType.Shader:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Shader(objectReader));
                        //    break;
                        //case ClassIDType.SkinnedMeshRenderer:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new SkinnedMeshRenderer(objectReader));
                        //    break;
                        //case ClassIDType.Sprite:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Sprite(objectReader));
                        //    break;
                        //case ClassIDType.SpriteAtlas:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new SpriteAtlas(objectReader));
                        //    break;
                        //case ClassIDType.TextAsset:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new TextAsset(objectReader));
                        //    break;
                        case ClassIDType.Texture2D:
                            assetsFile.Objects.Add(objectInfo.m_PathID, new Texture2D(objectReader));
                            break;
                        //case ClassIDType.Transform:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new Transform(objectReader));
                        //    break;
                        //case ClassIDType.VideoClip:
                        //    assetsFile.Objects.Add(objectInfo.m_PathID, new VideoClip(objectReader));
                        //    break;
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
                        //case GameObject m_GameObject:
                        //    assetItem.Text = m_GameObject.m_Name;
                        //    break;
                        case Texture2D m_Texture2D:
                            if (!string.IsNullOrEmpty(m_Texture2D.m_StreamData?.path))
                                assetItem.FullSize = asset.byteSize + m_Texture2D.m_StreamData.size;
                            //assetItem.Text = m_Texture2D.m_Name;
                            exportable = true;
                            break;
                        //case AudioClip m_AudioClip:
                        //    if (!string.IsNullOrEmpty(m_AudioClip.m_Source))
                        //        assetItem.FullSize = asset.byteSize + m_AudioClip.m_Size;
                        //    assetItem.Text = m_AudioClip.m_Name;
                        //    exportable = true;
                        //    break;
                        //case VideoClip m_VideoClip:
                        //    if (!string.IsNullOrEmpty(m_VideoClip.m_OriginalPath))
                        //        assetItem.FullSize = asset.byteSize + (long)m_VideoClip.m_Size;
                        //    assetItem.Text = m_VideoClip.m_Name;
                        //    exportable = true;
                        //    break;
                        //case Shader m_Shader:
                        //    assetItem.Text = m_Shader.m_ParsedForm?.m_Name ?? m_Shader.m_Name;
                        //    exportable = true;
                        //    break;
                        //case Mesh _:
                        //case TextAsset _:
                        //case AnimationClip _:
                        //case Font _:
                        //case MovieTexture _:
                        //case Sprite _:
                        //    assetItem.Text = ((NamedObject)asset).m_Name;
                        //    exportable = true;
                        //    break;
                        //case Animator m_Animator:
                        //    if (m_Animator.m_GameObject.TryGet(out var gameObject))
                        //    {
                        //        assetItem.Text = gameObject.m_Name;
                        //    }
                        //    exportable = true;
                        //    break;
                        //case MonoBehaviour m_MonoBehaviour:
                        //    if (m_MonoBehaviour.m_Name == "" && m_MonoBehaviour.m_Script.TryGet(out var m_Script))
                        //    {
                        //        assetItem.Text = m_Script.m_ClassName;
                        //    }
                        //    else
                        //    {
                        //        assetItem.Text = m_MonoBehaviour.m_Name;
                        //    }
                        //    exportable = true;
                        //    break;
                        //case PlayerSettings m_PlayerSettings:
                        //    productName = m_PlayerSettings.productName;
                        //    break;
                        //case AssetBundle m_AssetBundle:
                        //    ab = m_AssetBundle;
                        //    assetItem.Text = ab.m_Name;
                        //    break;
                        //case NamedObject m_NamedObject:
                        //    assetItem.Text = m_NamedObject.m_Name;
                        //    break;
                    }
                    //if (assetItem.Text == "")
                    //{
                    //    assetItem.Text = assetItem.TypeString + assetItem.UniqueID;
                    //}
                    //assetItem.SubItems.AddRange(new[] { assetItem.TypeString, assetItem.FullSize.ToString() });
                    ////处理同名文件
                    //if (!assetsNameHash.Add((assetItem.TypeString + assetItem.Text).ToUpper()))
                    //{
                    //    assetItem.Text += assetItem.UniqueID;
                    //}
                    ////处理非法文件名
                    //assetItem.Text = FixFileName(assetItem.Text);
                    //if (displayAll)
                    //{
                    //    exportable = true;
                    //}
                    if (exportable)
                    {
                        tempExportableAssets.Add(assetItem);
                    }
                }
                //if (displayOriginalName && ab != null)
                //{
                //    foreach (var item in tempExportableAssets)
                //    {
                //        var originalPath = ab.m_Container.FirstOrDefault(y => y.Value.asset.m_PathID == item.Asset.m_PathID).Key;
                //        if (!string.IsNullOrEmpty(originalPath))
                //        {
                //            var extension = Path.GetExtension(originalPath);
                //            if (!string.IsNullOrEmpty(extension) && item.Type == ClassIDType.TextAsset)
                //            {
                //                item.Extension = extension;
                //            }

                //            //item.Text = Path.GetDirectoryName(originalPath) + "\\" + Path.GetFileNameWithoutExtension(originalPath);
                //            //if (!assetsNameHash.Add((item.TypeString + item.Text).ToUpper()))
                //            //{
                //            //    item.Text += item.UniqueID;
                //            //}
                //        }
                //    }
                //}
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
