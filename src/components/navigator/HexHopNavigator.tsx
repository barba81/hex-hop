import ColorListPage from "@/pages/colorClipboard/ColorListPage";
import ColorContrastPage from "@/pages/colorContrast/ColorContrastPage";
import GradientGeneratorPage from "@/pages/gradientGenerator/GradientGeneratorPage";
import ImportExportPage from "@/pages/importExport/ImportExportPage";
import PaletteGenerator from "@/pages/paletteGenerator/PaletteGeneratorPage";
import SettingsPage from "@/pages/settings/SettingsPage";

import { PagesTypes, useAppStore } from "@/store/useThemeStore";
import { Clipboard, Eye, Import, Settings, SwatchBook } from "lucide-react";

const navItems = [
    { id: "color-list", icon: <Clipboard /> },
    { id: "palette-generator", icon: <SwatchBook /> },
    { id: "import-export", icon: <Import /> },
    { id:  "color-contrast", icon: <Eye /> },
    { id: "settings", icon: <Settings /> },
    { id: "settings", icon: <Settings /> },
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
