import { createBrowserRouter, isRouteErrorResponse, Navigate, useRouteError } from "react-router";
import App from "./App";
import ImportExportPage from "./pages/import-export-page/import-export-page";
import PaletteGenerator from "./pages/palette-generator-page/palette-generator-page";
import ColorListPage from "./pages/clipboard-page/ui/clipboard-page";
import SettingsPage from "./pages/settings-page/ui/settings-page";
import { SettingsColorBlock } from "./pages/settings-page/color-block-settings-page/ui/settings-color-block";
import { SettingsGradientBlock } from "./pages/settings-page/gradient-block-settings-page/settings-gradient-block";
import { SettingsPaletteBlock } from "./pages/settings-page/palette-settings-page/settings-palette-block";
import { SettingsDanger } from "./pages/settings-page/dangrous-settings-page/settings-danger";
import GradientGeneratorPage from "./pages/gradient-generator-page/ui/gradient-generator-page";


export const router = createBrowserRouter([
  {
    path: "/",
    ErrorBoundary: RootErrorBoundary,
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


function RootErrorBoundary() {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <>
        <h1>
          {error.status} {error.statusText}
        </h1>
        <p>{error.data}</p>
      </>
    );
  } else if (error instanceof Error) {
    return (
      <div>
        <h1>Error</h1>
        <p>{error.message}</p>
        <p>The stack trace is:</p>
        <pre>{error.stack}</pre>
      </div>
    );
  } else {
    return <h1>Unknown Error</h1>;
  }
}