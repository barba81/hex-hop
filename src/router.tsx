import { createBrowserRouter } from "react-router";
import App from "./App";
import { SettingsDanger } from "./pages/settings/settings-danger";
import { SettingsColorBlock } from "./pages/settings/settings-color-box";
import { SettingsView } from "./pages/settings/settings-view";
import { SettingsPage } from "./pages/settings/settings-page";
import ColorContrastPage from "./pages/color-contrast/color-contrast-page";
import ImportExportPage from "./pages/import-export/import-export-page";
import PaletteGenerator from "./pages/palette-generator/palette-generator-page";
import GradientGeneratorPage from "./pages/gradient-generator/gradient-generator-page";
import ColorListPage from "./pages/color-clipboard/clipboard-page";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <ColorListPage />,
      },
      {
        path: "gradient",
        element: <GradientGeneratorPage />,
      },
      {
        path: "palette",
        element: <PaletteGenerator />,
      },
      {
        path: "color-contrast",
        element: <ColorContrastPage />,
      },
      {
        path: "import-export",
        element: <ImportExportPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <SettingsView />,
          },
          {
            path: "general",
            element: <SettingsColorBlock />,
          },
          {
            path: "danger",
            element: <SettingsDanger />,
          },
        ],
      },
    ],
  },
]);