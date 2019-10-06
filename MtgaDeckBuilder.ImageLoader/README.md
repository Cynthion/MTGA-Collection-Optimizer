# Usage

Ensure the following:
- Both projects target the x64 platform. This needs to be configured in VS Configuration Manager.
- The MtgaDeckBuilder.Api project references the MtgaDeckBuilder.ImageLoader project.
- The 'TextureConverter.dll' and 'TextureConverterWrapper.dll' (both target x64) are copied into the MtgaDeckBuilder.Api output directory.

