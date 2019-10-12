using System.Numerics;

namespace MtgaDeckBuilder.ImageLoader
{
    public class AABB
    {
        public Vector3 m_Center;
        public Vector3 m_Extent;

        public AABB(ObjectReader reader)
        {
            m_Center = reader.ReadVector3();
            m_Extent = reader.ReadVector3();
        }
    }
}
