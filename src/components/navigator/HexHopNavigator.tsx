import ColorListPage from "@/pages/colorClipboard/ColorListPage";
import ColorContrastPage from "@/pages/colorContrast/ColorContrastPage";

import { PagesTypes, useAppStore } from "@/store/useThemeStore";
import { Clipboard, Eye, Import, Settings, SwatchBook } from "lucide-react";
import MyCustomIcon from "../icons/MyIcon";
import PaletteGenerator from "@/pages/paletteGenerator/paletteGeneratorPage";
import ImportExportPage from "@/pages/importExport/importExportPage";
import SettingsPage from "@/pages/settings/settingsPage";
import GradientGeneratorPage from "@/pages/gradientGenerator/gradientGeneratorPage";

const navItems = [
    { id: "color-list", icon: <Clipboard /> },
    { id: "palette-generator", icon: <SwatchBook /> },
    { id: "import-export", icon: <Import /> },
    { id:  "color-contrast", icon: <Eye /> },
    { id: "gradient-creator", icon: <MyCustomIcon /> },
  ];

const HexHopNavigator = () => {
  const activePage = useAppStore().activePage;
  const setActivePage = useAppStore().setActivePage;
  return (
    <>
 
      {activePage === "color-list" && <ColorListPage />}
      {activePage === "palette-generator" && <PaletteGenerator />}
      {activePage === "import-export" && <ImportExportPage />}
      {activePage === "color-contrast" && <ColorContrastPage />}
      {activePage === "settings" && <SettingsPage />}
      {activePage === "gradient-creator" && <GradientGeneratorPage />}
    </>
  );
};

export default HexHopNavigator;
