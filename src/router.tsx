import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import ImportExportPage from "./pages/import-export/import-export-page";
import PaletteGenerator from "./pages/palette-generator/palette-generator-page";
import GradientGeneratorPage from "./pages/gradient-generator/gradient-generator-page";
import ColorListPage from "./pages/color-clipboard/clipboard-page";
import SettingsPage from "./pages/settings-page/settings-page";
import { SettingsColorBlock } from "./pages/settings-page/settings-color-block";
import { SettingsGradientBlock } from "./pages/settings-page/settings-gradient-block";
import { SettingsPaletteBlock } from "./pages/settings-page/settings-palette-block";
import { SettingsDanger } from "./pages/settings-page/settings-danger";


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
        path: "import-export",
        element: <ImportExportPage />,
      },
      {
        path: "settings",
        element: <SettingsPage />,
        children: [
          {
            index: true,
            element: <Navigate to="color-block" replace />,
          },
          {
            path: "color-block",
            element: <SettingsColorBlock />,
          },
          {
            path: "gradient-block",
            element: <SettingsGradientBlock />,
          },
          {
            path: "palette-block",
            element: <SettingsPaletteBlock />,
          },
          {
            path: "danger-settings",
            element: <SettingsDanger />,
          },
        ],
      },
    ],
  },
]);