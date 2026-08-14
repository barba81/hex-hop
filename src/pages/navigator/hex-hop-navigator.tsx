import ColorContrastPage from "@/pages/color-contrast/color-contrast-page";

import {  useAppStore } from "@/store/use-app-store";
import PaletteGenerator from "@/pages/palette-generator/palette-generator-page";
import GradientGeneratorPage from "@/pages/gradient-generator/gradient-generator-page";
import ImportExportPage from "@/pages/import-export/import-export-page";
import ColorListPage from "../color-clipboard/clipboard-page";
import { SettingsPage } from "../settings/settings-page";


const HexHopNavigator = () => {
  const activePage = useAppStore((state)=>state.activePage);
  return (
    <>
 
      {activePage === "color-list" && <SettingsPage />}
      {activePage === "gradient-creator" && <GradientGeneratorPage />}
      {activePage === "palette-generator" && <PaletteGenerator />}
      {activePage === "import-export" && <ImportExportPage />}
      {activePage === "color-contrast" && <ColorContrastPage />}
      {activePage === "settings" && <SettingsPage />}
    </>
  );
};

export default HexHopNavigator;
