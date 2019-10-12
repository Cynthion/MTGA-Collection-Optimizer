using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace MtgaDeckBuilder.ImageLoader
{
    public class SubMesh
    {
        public uint firstByte;
        public uint indexCount;
        public int topology;
        public uint triangleCount;
        public uint baseVertex;
        public uint firstVertex;
        public uint vertexCount;
        public AABB localAABB;

        public SubMesh(ObjectReader reader)
        {
            var version = reader.version;

            firstByte = reader.ReadUInt32();
            indexCount = reader.ReadUInt32();
            topology = reader.ReadInt32();

            if (version[0] < 4) //4.0 down
            {
                triangleCount = reader.ReadUInt32();
            }

            if (version[0] > 2017 || (version[0] == 2017 && version[1] >= 3)) //2017.3 and up
            {
                baseVertex = reader.ReadUInt32();
            }

            if (version[0] >= 3) //3.0 and up
            {
                firstVertex = reader.ReadUInt32();
                vertexCount = reader.ReadUInt32();
                localAABB = new AABB(reader);
            }
        }
    }

    public class StreamInfo
    {
        public uint channelMask;
        public uint offset;
        public uint stride;
        public uint align;
        public byte dividerOp;
        public ushort frequency;

        public StreamInfo() { }

        public StreamInfo(ObjectReader reader)
        {
            var version = reader.version;

            channelMask = reader.ReadUInt32();
            offset = reader.ReadUInt32();

            if (version[0] < 4) //4.0 down
            {
                stride = reader.ReadUInt32();
                align = reader.ReadUInt32();
            }
            else
            {
                stride = reader.ReadByte();
                dividerOp = reader.ReadByte();
                frequency = reader.ReadUInt16();
            }
        }
    }

    public class ChannelInfo
    {
        public byte stream;
        public byte offset;
        public byte format;
        public byte dimension;

        public ChannelInfo() { }

        public ChannelInfo(ObjectReader reader)
        {
            stream = reader.ReadByte();
            offset = reader.ReadByte();
            format = reader.ReadByte();
            dimension = (byte)(reader.ReadByte() & 0xF);
        }
    }

    public class VertexData
    {
        public uint m_CurrentChannels;
        public uint m_VertexCount;
        public ChannelInfo[] m_Channels;
        public StreamInfo[] m_Streams;
        public byte[] m_DataSize;

        public VertexData(ObjectReader reader)
        {
            var version = reader.version;

            if (version[0] < 2018)//2018 down
            {
                m_CurrentChannels = reader.ReadUInt32();
            }

            m_VertexCount = reader.ReadUInt32();

            if (version[0] >= 4) //4.0 and up
            {
                var m_ChannelsSize = reader.ReadInt32();
                m_Channels = new ChannelInfo[m_ChannelsSize];
                for (int i = 0; i < m_ChannelsSize; i++)
                {
                    m_Channels[i] = new ChannelInfo(reader);
                }
            }

            if (version[0] < 5) //5.0 down
            {
                if (version[0] < 4)
                {
                    m_Streams = new StreamInfo[4];
                }
                else
                {
                    m_Streams = new StreamInfo[reader.ReadInt32()];
                }

                for (int i = 0; i < m_Streams.Length; i++)
                {
                    m_Streams[i] = new StreamInfo(reader);
                }

                if (version[0] < 4) //4.0 down
                {
                    GetChannels(version);
                }
            }
            else //5.0 and up
            {
                GetStreams(version);
            }

            m_DataSize = reader.ReadBytes(reader.ReadInt32());
            reader.AlignStream();
        }

        private void GetStreams(int[] version)
        {
            var streamCount = m_Channels.Max(x => x.stream) + 1;
            m_Streams = new StreamInfo[streamCount];
            uint offset = 0;
            for (int s = 0; s < streamCount; s++)
            {
                uint chnMask = 0;
                uint stride = 0;
                for (int chn = 0; chn < m_Channels.Length; chn++)
                {
                    var m_Channel = m_Channels[chn];
                    if (m_Channel.stream == s)
                    {
                        if (m_Channel.dimension > 0)
                        {
                            chnMask |= 1u << chn;
                            stride += m_Channel.dimension * MeshHelper.GetFormatSize(version, m_Channel.format);
                        }
                    }
                }
                m_Streams[s] = new StreamInfo
                {
                    channelMask = chnMask,
                    offset = offset,
                    stride = stride,
                    dividerOp = 0,
                    frequency = 0
                };
                offset += m_VertexCount * stride;
                //static size_t AlignStreamSize (size_t size) { return (size + (kVertexStreamAlign-1)) & ~(kVertexStreamAlign-1); }
                offset = (offset + (16u - 1u)) & ~(16u - 1u);
            }
        }

        private void GetChannels(int[] version)
        {
            m_Channels = new ChannelInfo[6];
            for (int i = 0; i < 6; i++)
            {
                m_Channels[i] = new ChannelInfo();
            }
            for (var s = 0; s < m_Streams.Length; s++)
            {
                var m_Stream = m_Streams[s];
                var channelMask = new BitArray(new[] { (int)m_Stream.channelMask });
                byte offset = 0;
                for (int i = 0; i < 6; i++)
                {
                    if (channelMask.Get(i))
                    {
                        var m_Channel = m_Channels[i];
                        m_Channel.stream = (byte)s;
                        m_Channel.offset = offset;
                        switch (i)
                        {
                            case 0: //kShaderChannelVertex
                            case 1: //kShaderChannelNormal
                                m_Channel.format = 0; //kChannelFormatFloat
                                m_Channel.dimension = 3;
                                break;
                            case 2: //kShaderChannelColor
                                m_Channel.format = 2; //kChannelFormatColor
                                m_Channel.dimension = 4;
                                break;
                            case 3: //kShaderChannelTexCoord0
                            case 4: //kShaderChannelTexCoord1
                                m_Channel.format = 0; //kChannelFormatFloat
                                m_Channel.dimension = 2;
                                break;
                            case 5: //kShaderChannelTangent
                                m_Channel.format = 0; //kChannelFormatFloat
                                m_Channel.dimension = 4;
                                break;
                        }
                        offset += (byte)(m_Channel.dimension * MeshHelper.GetFormatSize(version, m_Channel.format));
                    }
                }
            }
        }
    }

    public class BoneWeights4
    {
        public float[] weight;
        public int[] boneIndex;

        public BoneWeights4()
        {
            weight = new float[4];
            boneIndex = new int[4];
        }

        public BoneWeights4(ObjectReader reader)
        {
            weight = reader.ReadSingleArray(4);
            boneIndex = reader.ReadInt32Array(4);
        }
    }

    public static class MeshHelper
    {
        private enum VertexChannelFormat
        {
            kChannelFormatFloat,
            kChannelFormatFloat16,
            kChannelFormatColor,
            kChannelFormatByte,
            kChannelFormatUInt32
        }

        private enum VertexFormat
        {
            kVertexFormatFloat,
            kVertexFormatFloat16,
            kVertexFormatColor,
            kVertexFormatUNorm8,
            kVertexFormatSNorm8,
            kVertexFormatUNorm16,
            kVertexFormatSNorm16,
            kVertexFormatUInt8,
            kVertexFormatSInt8,
            kVertexFormatUInt16,
            kVertexFormatSInt16,
            kVertexFormatUInt32,
            kVertexFormatSInt32
        }

        private enum VertexFormatV2019
        {
            kVertexFormatFloat,
            kVertexFormatFloat16,
            kVertexFormatUNorm8,
            kVertexFormatSNorm8,
            kVertexFormatUNorm16,
            kVertexFormatSNorm16,
            kVertexFormatUInt8,
            kVertexFormatSInt8,
            kVertexFormatUInt16,
            kVertexFormatSInt16,
            kVertexFormatUInt32,
            kVertexFormatSInt32
        }

        public static uint GetFormatSize(int[] version, int format)
        {
            if (version[0] < 2017)
            {
                switch ((VertexChannelFormat)format)
                {
                    case VertexChannelFormat.kChannelFormatFloat:
                        return 4u;
                    case VertexChannelFormat.kChannelFormatFloat16:
                        return 2u;
                    case VertexChannelFormat.kChannelFormatColor: //in 4.x is size 4
                        return 1u;
                    case VertexChannelFormat.kChannelFormatByte:
                        return 1u;
                    case VertexChannelFormat.kChannelFormatUInt32: //in 5.x
                        return 4u;
                    default:
                        throw new ArgumentOutOfRangeException(nameof(format), format, null);
                }
            }
            else if (version[0] < 2019)
            {
                switch ((VertexFormat)format)
                {
                    case VertexFormat.kVertexFormatFloat:
                        return 4u;
                    case VertexFormat.kVertexFormatFloat16:
                        return 2u;
                    case VertexFormat.kVertexFormatColor:
                        return 1u;
                    case VertexFormat.kVertexFormatUNorm8:
                        return 1u;
                    case VertexFormat.kVertexFormatSNorm8:
                        return 1u;
                    case VertexFormat.kVertexFormatUNorm16:
                        return 2u;
                    case VertexFormat.kVertexFormatSNorm16:
                        return 2u;
                    case VertexFormat.kVertexFormatUInt8:
                        return 1u;
                    case VertexFormat.kVertexFormatSInt8:
                        return 1u;
                    case VertexFormat.kVertexFormatUInt16:
                        return 2u;
                    case VertexFormat.kVertexFormatSInt16:
                        return 2u;
                    case VertexFormat.kVertexFormatUInt32:
                        return 4u;
                    case VertexFormat.kVertexFormatSInt32:
                        return 4u;
                    default:
                        throw new ArgumentOutOfRangeException(nameof(format), format, null);
                }
            }
            else
            {
                switch ((VertexFormatV2019)format)
                {
                    case VertexFormatV2019.kVertexFormatFloat:
                        return 4u;
                    case VertexFormatV2019.kVertexFormatFloat16:
                        return 2u;
                    case VertexFormatV2019.kVertexFormatUNorm8:
                        return 1u;
                    case VertexFormatV2019.kVertexFormatSNorm8:
                        return 1u;
                    case VertexFormatV2019.kVertexFormatUNorm16:
                        return 2u;
                    case VertexFormatV2019.kVertexFormatSNorm16:
                        return 2u;
                    case VertexFormatV2019.kVertexFormatUInt8:
                        return 1u;
                    case VertexFormatV2019.kVertexFormatSInt8:
                        return 1u;
                    case VertexFormatV2019.kVertexFormatUInt16:
                        return 2u;
                    case VertexFormatV2019.kVertexFormatSInt16:
                        return 2u;
                    case VertexFormatV2019.kVertexFormatUInt32:
                        return 4u;
                    case VertexFormatV2019.kVertexFormatSInt32:
                        return 4u;
                    default:
                        throw new ArgumentOutOfRangeException(nameof(format), format, null);
                }
            }
        }

        public static bool IsIntFormat(int[] version, int format)
        {
            if (version[0] < 2017)
            {
                return format == 4;
            }
            else if (version[0] < 2019)
            {
                return format >= 7;
            }
            else
            {
                return format >= 6;
            }
        }

        public static float[] BytesToFloatArray(byte[] inputBytes, int size)
        {
            var result = new float[inputBytes.Length / size];
            for (int i = 0; i < inputBytes.Length / size; i++)
            {
                var value = 0f;
                switch (size)
                {
                    case 1:
                        value = inputBytes[i] / 255.0f;
                        break;
                    case 2:
                        value = Half.ToHalf(inputBytes, i * 2);
                        break;
                    case 4:
                        value = BitConverter.ToSingle(inputBytes, i * 4);
                        break;
                }
                result[i] = value;
            }
            return result;
        }

        public static int[] BytesToIntArray(byte[] inputBytes, int size)
        {
            var result = new int[inputBytes.Length / size];
            for (int i = 0; i < inputBytes.Length / size; i++)
            {
                switch (size)
                {
                    case 1:
                        result[i] = inputBytes[i];
                        break;
                    case 2:
                        result[i] = BitConverter.ToInt16(inputBytes, i * 2);
                        break;
                    case 4:
                        result[i] = BitConverter.ToInt32(inputBytes, i * 4);
                        break;
                }
            }
            return result;
        }
    }
}
