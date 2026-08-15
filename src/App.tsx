import { useEffect } from "react";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import HeaderBar from "./components/header/header-bar";

import "./globals.css";
import { loadState } from "./infrastructure/utils/load-state";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";

function HexHopApp() {
  useEffect(() => {
    moveWindow(Position.TopRight);
    loadState();
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <TooltipProvider>
        <Toaster position="top-center" />
          <div className="w-screen h-screen flex flex-col  bg-stone-50/80 dark:bg-stone-800/80 ">
            <HeaderBar />
            <Outlet />
          </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default HexHopApp;
