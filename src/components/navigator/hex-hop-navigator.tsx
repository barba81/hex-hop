import ColorListPage from "@/pages/color-clipboard/color-list-page";
import ColorContrastPage from "@/pages/color-contrast/color-contrast-page";

import {  useAppStore } from "@/store/use-theme-store";
import PaletteGenerator from "@/pages/palette-generator/palette-generator-page";
import SettingsPage from "@/pages/format-settings/settings-page";
import GradientGeneratorPage from "@/pages/gradient-generator/gradient-generator-page";
import ImportExportPage from "@/pages/import-export/import-export-page";


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
