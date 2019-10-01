using System;
using System.Collections.Generic;
using System.Text;

namespace MtgaDeckBuilder.ImageLoader
{
    public class Exporter
    {

        public static List<AssetItem> exportableAssets = new List<AssetItem>();

        public void ExportAssets(int type, ExportType exportType)
        {
            if (exportableAssets.Count > 0)
            {
                var saveFolderDialog1 = new OpenFolderDialog();
                if (saveFolderDialog1.ShowDialog(this) == DialogResult.OK)
                {
                    timer.Stop();

                    List<AssetItem> toExportAssets = null;
                    switch (type)
                    {
                        case 1: //All Assets
                            toExportAssets = exportableAssets;
                            break;
                        case 2: //Selected Assets
                            toExportAssets = GetSelectedAssets();
                            break;
                        case 3: //Filtered Assets
                            toExportAssets = visibleAssets;
                            break;
                    }
                    Studio.ExportAssets(saveFolderDialog1.Folder, toExportAssets, assetGroupOptions.SelectedIndex, openAfterExport.Checked, exportType);
                }
            }
            else
            {
                StatusStripUpdate("No exportable assets loaded");
            }
        }
    }
}
