import { createBrowserRouter, Navigate } from "react-router";
import App from "./App";
import { SettingsDanger } from "./pages/settings/settings-danger";
import { SettingsPage } from "./pages/settings/settings-page";
import ImportExportPage from "./pages/import-export/import-export-page";
import PaletteGenerator from "./pages/palette-generator/palette-generator-page";
import GradientGeneratorPage from "./pages/gradient-generator/gradient-generator-page";
import ColorListPage from "./pages/color-clipboard/clipboard-page";
import { SettingsGradientBlock } from "./pages/settings/settings-gradient-block";
import { SettingsPaletteBlock } from "./pages/settings/settings-palette-block";
import { SettingsColorBlock } from "./pages/settings/settings-color-block";


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