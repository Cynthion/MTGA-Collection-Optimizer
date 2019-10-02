﻿namespace MtgaDeckBuilder.ImageLoader
{
    public abstract class EditorExtension : Object
    {
        protected EditorExtension(ObjectReader reader) : base(reader)
        {
            if (platform == BuildTarget.NoTarget)
            {
                var m_PrefabParentObject = new PPtr<EditorExtension>(reader);
                var m_PrefabInternal = new PPtr<Object>(reader); //PPtr<Prefab>
            }
        }
    }
}
