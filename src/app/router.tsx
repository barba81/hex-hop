import App from "@/app/App";
import GradientGeneratorPage from "@/app/routes/gradient-generator-page";
import ImportExportPage from "@/app/routes/import-export-page";
import PaletteGenerator from "@/app/routes/palette-generator-page";
import { SettingsColorBlock } from "@/features/settings-page/color-block-settings-page/ui/settings-color-block";
import { SettingsDanger } from "@/app/routes/settings/settings-danger";
import { SettingsGradientBlock } from "@/app/routes/settings/settings-gradient-block";
import { SettingsPaletteBlock } from "@/app/routes/settings/settings-palette-block";
import SettingsPage from "@/features/settings-page/ui/settings-page";
import { createBrowserRouter, isRouteErrorResponse, Navigate, useRouteError } from "react-router";
import ColorListPage from "@/app/routes/clipboard/clipboard-page";



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