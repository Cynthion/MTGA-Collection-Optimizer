using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Runtime.InteropServices;

namespace MtgaDeckBuilder.ImageLoader
{
    public class Texture2DConverter
    {
        //Texture2D
        private int m_Width;
        private int m_Height;
        private TextureFormat m_TextureFormat;
        private int image_data_size;
        private byte[] image_data;
        private int[] version;

        //DDS Start
        private byte[] dwMagic = { 0x44, 0x44, 0x53, 0x20, 0x7c };
        private int dwFlags = 0x1 + 0x2 + 0x4 + 0x1000;
        //public int dwHeight; m_Height
        //public int dwWidth; m_Width
        private int dwPitchOrLinearSize;
        private int dwMipMapCount = 0x1;
        private int dwSize = 0x20;
        private int dwFlags2;
        private int dwFourCC;
        private int dwRGBBitCount;
        private int dwRBitMask;
        private int dwGBitMask;
        private int dwBBitMask;
        private int dwABitMask;
        //private int dwCaps = 0x1000;
        //private int dwCaps2 = 0x0;
        //DDS End
        //PVR Start
        //private int pvrVersion = 0x03525650;
        //private int pvrFlags = 0x0;
        //private long pvrPixelFormat;
        //private int pvrColourSpace = 0x0;
        //private int pvrChannelType = 0x0;
        //public int pvrHeight; m_Height
        //public int pvrWidth; m_Width
        //private int pvrDepth = 0x1;
        //private int pvrNumSurfaces = 0x1; //For texture arrays
        //private int pvrNumFaces = 0x1; //For cube maps
        //public int pvrMIPMapCount; dwMipMapCount
        //private int pvrMetaDataSize = 0x0;
        //PVR End
        //KTX Start
        //private int glType = 0;
        //private int glTypeSize = 1;
        //private int glFormat = 0;
        //private int glInternalFormat;
        //private int glBaseInternalFormat;
        //public int pixelWidth; m_Width
        //public int pixelHeight; m_Height
        //private int pixelDepth = 0;
        //private int numberOfArrayElements = 0;
        //private int numberOfFaces = 1;
        //private int numberOfMipmapLevels = 1;
        //private int bytesOfKeyValueData = 0;
        //KTX End
        //TextureConverter
        private QFORMAT q_format;
        //texgenpack
        //private texgenpack_texturetype texturetype;
        //astc
        //private int astcBlockWidth;
        //private int astcBlockHeight;

        public Texture2DConverter(Texture2D m_Texture2D)
        {
            var image_data_value = m_Texture2D.image_data.Value;
            image_data_size = image_data_value.Length;
            image_data = new byte[image_data_size];
            Buffer.BlockCopy(image_data_value, 0, image_data, 0, image_data_size);
            m_Width = m_Texture2D.m_Width;
            m_Height = m_Texture2D.m_Height;
            m_TextureFormat = m_Texture2D.m_TextureFormat;
            var mMipMap = m_Texture2D.m_MipMap;
            version = m_Texture2D.version;
            var platform = m_Texture2D.platform;

            if (version[0] < 5 || (version[0] == 5 && version[1] < 2))//5.2 down
            {
                if (mMipMap)
                {
                    dwFlags += 0x20000;
                    dwMipMapCount = Convert.ToInt32(Math.Log(Math.Max(m_Width, m_Height)) / Math.Log(2));
                    //dwCaps += 0x400008;
                }
            }
            else
            {
                dwFlags += 0x20000;
                dwMipMapCount = m_Texture2D.m_MipCount;
                //dwCaps += 0x400008;
            }

            switch (m_TextureFormat)
            {
                case TextureFormat.RGBA32: //test pass
                    {
                        var BGRA32 = new byte[image_data_size];
                        for (var i = 0; i < image_data_size; i += 4)
                        {
                            BGRA32[i] = image_data[i + 2];
                            BGRA32[i + 1] = image_data[i + 1];
                            BGRA32[i + 2] = image_data[i + 0];
                            BGRA32[i + 3] = image_data[i + 3];
                        }
                        SetBGRA32Info(BGRA32);
                        break;
                    }
                case TextureFormat.DXT1:
                case TextureFormat.DXT1Crunched:
                    {
                        if (mMipMap)
                        {
                            dwPitchOrLinearSize = m_Height * m_Width / 2;
                        }
                        //dwFlags2 = 0x4;
                        //dwFourCC = 0x31545844;
                        //dwRGBBitCount = 0x0;
                        //dwRBitMask = 0x0;
                        //dwGBitMask = 0x0;
                        //dwBBitMask = 0x0;
                        //dwABitMask = 0x0;

                        q_format = QFORMAT.Q_FORMAT_S3TC_DXT1_RGB;
                        break;
                    }
                default:
                    throw new NotImplementedException();
            }
        }

        public Bitmap ConvertToBitmap(bool flip)
        {
            if (image_data == null || image_data.Length == 0)
                return null;
            Bitmap bitmap;
            switch (m_TextureFormat)
            {
                case TextureFormat.RGBA32:
                    bitmap = BGRA32ToBitmap();
                    break;
                case TextureFormat.DXT1:
                    bitmap = TextureConverter();
                    break;
                default:
                    throw new NotImplementedException();
            }
            if (bitmap != null && flip)
                bitmap.RotateFlip(RotateFlipType.RotateNoneFlipY);
            return bitmap;
        }

        private void SetBGRA32Info(byte[] BGRA32)
        {
            image_data = BGRA32;
            image_data_size = BGRA32.Length;
            dwFlags2 = 0x41;
            dwRGBBitCount = 0x20;
            dwRBitMask = 0xFF0000;
            dwGBitMask = 0xFF00;
            dwBBitMask = 0xFF;
            dwABitMask = -16777216;
        }

        private Bitmap BGRA32ToBitmap()
        {
            var hObject = GCHandle.Alloc(image_data, GCHandleType.Pinned);
            var pObject = hObject.AddrOfPinnedObject();
            var bitmap = new Bitmap(m_Width, m_Height, m_Width * 4, PixelFormat.Format32bppArgb, pObject);
            hObject.Free();
            return bitmap;
        }

        private Bitmap TextureConverter()
        {
            var imageBuff = new byte[m_Width * m_Height * 4];
            var gch = GCHandle.Alloc(imageBuff, GCHandleType.Pinned);
            var imagePtr = gch.AddrOfPinnedObject();
            //var fixAlpha = glBaseInternalFormat == KTXHeader.GL_RED || glBaseInternalFormat == KTXHeader.GL_RG;
            if (!NativeMethods.Ponvert(image_data, image_data_size, m_Width, m_Height, (int)q_format, false, imagePtr))
            {
                gch.Free();
                return null;
            }
            var bitmap = new Bitmap(m_Width, m_Height, m_Width * 4, PixelFormat.Format32bppArgb, imagePtr);
            gch.Free();
            return bitmap;
        }

        internal static class NativeMethods
        {
            [DllImport("TextureConverterWrapper.dll", CallingConvention = CallingConvention.Cdecl)]
            public static extern bool Ponvert(byte[] data, int dataSize, int width, int height, int type, bool fixAlpha, IntPtr image);
        }
    }

    public static class KTXHeader
    {
        public static byte[] IDENTIFIER = { 0xAB, 0x4B, 0x54, 0x58, 0x20, 0x31, 0x31, 0xBB, 0x0D, 0x0A, 0x1A, 0x0A };
        public static byte[] ENDIANESS_LE = { 1, 2, 3, 4 };

        // constants for glInternalFormat
        public static int GL_ETC1_RGB8_OES = 0x8D64;

        public static int GL_COMPRESSED_RGB_PVRTC_4BPPV1_IMG = 0x8C00;
        public static int GL_COMPRESSED_RGB_PVRTC_2BPPV1_IMG = 0x8C01;
        public static int GL_COMPRESSED_RGBA_PVRTC_4BPPV1_IMG = 0x8C02;
        public static int GL_COMPRESSED_RGBA_PVRTC_2BPPV1_IMG = 0x8C03;

        public static int GL_ATC_RGB_AMD = 0x8C92;
        public static int GL_ATC_RGBA_INTERPOLATED_ALPHA_AMD = 0x87EE;

        public static int GL_COMPRESSED_RGB8_ETC2 = 0x9274;
        public static int GL_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 0x9276;
        public static int GL_COMPRESSED_RGBA8_ETC2_EAC = 0x9278;
        public static int GL_COMPRESSED_R11_EAC = 0x9270;
        public static int GL_COMPRESSED_SIGNED_R11_EAC = 0x9271;
        public static int GL_COMPRESSED_RG11_EAC = 0x9272;
        public static int GL_COMPRESSED_SIGNED_RG11_EAC = 0x9273;

        public static int GL_COMPRESSED_RED_RGTC1 = 0x8DBB;
        public static int GL_COMPRESSED_RG_RGTC2 = 0x8DBD;
        public static int GL_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT = 0x8E8F;
        public static int GL_COMPRESSED_RGBA_BPTC_UNORM = 0x8E8C;

        public static int GL_R16F = 0x822D;
        public static int GL_RG16F = 0x822F;
        public static int GL_RGBA16F = 0x881A;
        public static int GL_R32F = 0x822E;
        public static int GL_RG32F = 0x8230;
        public static int GL_RGBA32F = 0x8814;

        // constants for glBaseInternalFormat
        public static int GL_RED = 0x1903;
        public static int GL_RGB = 0x1907;
        public static int GL_RGBA = 0x1908;
        public static int GL_RG = 0x8227;
    }

    public enum QFORMAT
    {
        // General formats
        Q_FORMAT_RGBA_8UI = 1,
        Q_FORMAT_RGBA_8I,
        Q_FORMAT_RGB5_A1UI,
        Q_FORMAT_RGBA_4444,
        Q_FORMAT_RGBA_16UI,
        Q_FORMAT_RGBA_16I,
        Q_FORMAT_RGBA_32UI,
        Q_FORMAT_RGBA_32I,

        Q_FORMAT_PALETTE_8_RGBA_8888,
        Q_FORMAT_PALETTE_8_RGBA_5551,
        Q_FORMAT_PALETTE_8_RGBA_4444,
        Q_FORMAT_PALETTE_4_RGBA_8888,
        Q_FORMAT_PALETTE_4_RGBA_5551,
        Q_FORMAT_PALETTE_4_RGBA_4444,
        Q_FORMAT_PALETTE_1_RGBA_8888,
        Q_FORMAT_PALETTE_8_RGB_888,
        Q_FORMAT_PALETTE_8_RGB_565,
        Q_FORMAT_PALETTE_4_RGB_888,
        Q_FORMAT_PALETTE_4_RGB_565,

        Q_FORMAT_R2_GBA10UI,
        Q_FORMAT_RGB10_A2UI,
        Q_FORMAT_RGB10_A2I,
        Q_FORMAT_RGBA_F,
        Q_FORMAT_RGBA_HF,

        Q_FORMAT_RGB9_E5,   // Last five bits are exponent bits (Read following section in GLES3 spec: "3.8.17 Shared Exponent Texture Color Conversion")
        Q_FORMAT_RGB_8UI,
        Q_FORMAT_RGB_8I,
        Q_FORMAT_RGB_565,
        Q_FORMAT_RGB_16UI,
        Q_FORMAT_RGB_16I,
        Q_FORMAT_RGB_32UI,
        Q_FORMAT_RGB_32I,

        Q_FORMAT_RGB_F,
        Q_FORMAT_RGB_HF,
        Q_FORMAT_RGB_11_11_10_F,

        Q_FORMAT_RG_F,
        Q_FORMAT_RG_HF,
        Q_FORMAT_RG_32UI,
        Q_FORMAT_RG_32I,
        Q_FORMAT_RG_16I,
        Q_FORMAT_RG_16UI,
        Q_FORMAT_RG_8I,
        Q_FORMAT_RG_8UI,
        Q_FORMAT_RG_S88,

        Q_FORMAT_R_32UI,
        Q_FORMAT_R_32I,
        Q_FORMAT_R_F,
        Q_FORMAT_R_16F,
        Q_FORMAT_R_16I,
        Q_FORMAT_R_16UI,
        Q_FORMAT_R_8I,
        Q_FORMAT_R_8UI,

        Q_FORMAT_LUMINANCE_ALPHA_88,
        Q_FORMAT_LUMINANCE_8,
        Q_FORMAT_ALPHA_8,

        Q_FORMAT_LUMINANCE_ALPHA_F,
        Q_FORMAT_LUMINANCE_F,
        Q_FORMAT_ALPHA_F,
        Q_FORMAT_LUMINANCE_ALPHA_HF,
        Q_FORMAT_LUMINANCE_HF,
        Q_FORMAT_ALPHA_HF,
        Q_FORMAT_DEPTH_16,
        Q_FORMAT_DEPTH_24,
        Q_FORMAT_DEPTH_24_STENCIL_8,
        Q_FORMAT_DEPTH_32,

        Q_FORMAT_BGR_565,
        Q_FORMAT_BGRA_8888,
        Q_FORMAT_BGRA_5551,
        Q_FORMAT_BGRX_8888,
        Q_FORMAT_BGRA_4444,
        // Compressed formats
        Q_FORMAT_ATITC_RGBA,
        Q_FORMAT_ATC_RGBA_EXPLICIT_ALPHA = Q_FORMAT_ATITC_RGBA,
        Q_FORMAT_ATITC_RGB,
        Q_FORMAT_ATC_RGB = Q_FORMAT_ATITC_RGB,
        Q_FORMAT_ATC_RGBA_INTERPOLATED_ALPHA,
        Q_FORMAT_ETC1_RGB8,
        Q_FORMAT_3DC_X,
        Q_FORMAT_3DC_XY,

        Q_FORMAT_ETC2_RGB8,
        Q_FORMAT_ETC2_RGBA8,
        Q_FORMAT_ETC2_RGB8_PUNCHTHROUGH_ALPHA1,
        Q_FORMAT_ETC2_SRGB8,
        Q_FORMAT_ETC2_SRGB8_ALPHA8,
        Q_FORMAT_ETC2_SRGB8_PUNCHTHROUGH_ALPHA1,
        Q_FORMAT_EAC_R_SIGNED,
        Q_FORMAT_EAC_R_UNSIGNED,
        Q_FORMAT_EAC_RG_SIGNED,
        Q_FORMAT_EAC_RG_UNSIGNED,

        Q_FORMAT_S3TC_DXT1_RGB,
        Q_FORMAT_S3TC_DXT1_RGBA,
        Q_FORMAT_S3TC_DXT3_RGBA,
        Q_FORMAT_S3TC_DXT5_RGBA,

        // YUV formats
        Q_FORMAT_AYUV_32,
        Q_FORMAT_I444_24,
        Q_FORMAT_YUYV_16,
        Q_FORMAT_UYVY_16,
        Q_FORMAT_I420_12,
        Q_FORMAT_YV12_12,
        Q_FORMAT_NV21_12,
        Q_FORMAT_NV12_12,

        // ASTC Format
        Q_FORMAT_ASTC_8,
        Q_FORMAT_ASTC_16,
    };
}
