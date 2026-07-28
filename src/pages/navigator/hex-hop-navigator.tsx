import ColorContrastPage from "@/pages/color-contrast/color-contrast-page";

import {  useAppStore } from "@/store/use-theme-store";
import PaletteGenerator from "@/pages/palette-generator/palette-generator-page";
import SettingsPage from "@/pages/format-settings/settings-page";
import GradientGeneratorPage from "@/pages/gradient-generator/gradient-generator-page";
import ImportExportPage from "@/pages/import-export/import-export-page";
import ColorListPage from "../color-clipboard/color-list-page";


const HexHopNavigator = () => {
  const activePage = useAppStore().activePage;
  return (
    <>
 
      {activePage === "color-list" && <ColorListPage />}
      {activePage === "gradient-creator" && <GradientGeneratorPage />}
      {activePage === "palette-generator" && <PaletteGenerator />}
      {activePage === "import-export" && <ImportExportPage />}
      {activePage === "color-contrast" && <ColorContrastPage />}
      {activePage === "settings" && <SettingsPage />}
    </>
  );
};

export default HexHopNavigator;
