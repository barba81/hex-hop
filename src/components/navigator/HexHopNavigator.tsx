import ColorListPage from "@/pages/colorClipboard/ColorListPage";
import ColorContrastPage from "@/pages/colorContrast/ColorContrastPage";

import {  useAppStore } from "@/store/useThemeStore";
import PaletteGenerator from "@/pages/paletteGenerator/PaletteGeneratorPage";
import ImportExportPage from "@/pages/importExport/ImportExportPage";
import SettingsPage from "@/pages/settings/SettingsPage";
import GradientGeneratorPage from "@/pages/gradientGenerator/GradientGeneratorPage";


const HexHopNavigator = () => {
  const activePage = useAppStore().activePage;
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
