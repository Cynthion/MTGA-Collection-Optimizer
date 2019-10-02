using System.Collections.Generic;

namespace MtgaDeckBuilder.ImageLoader
{
    public class SerializedType
    {
        public int classID;
        public bool m_IsStrippedType;
        public short m_ScriptTypeIndex = -1;
        public List<TypeTreeNode> m_Nodes;
        public byte[] m_ScriptID; //Hash128
        public byte[] m_OldTypeHash; //Hash128
    }
}