import { useEffect } from "react";
import { moveWindow, Position } from "@tauri-apps/plugin-positioner";
import HeaderBar from "./components/header/header-bar";

import "./globals.css";
import HexHopNavigator from "./pages/navigator/hex-hop-navigator";
import { loadState } from "./infrastructure/utils/load-state";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "sonner";

function HexHopApp() {
  useEffect(() => {
    moveWindow(Position.TopRight);
    loadState();
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Toaster/>
      <div className="w-screen h-screen flex flex-col  bg-stone-50/80 dark:bg-stone-800/80 ">
        <HeaderBar />
        <HexHopNavigator />
      </div>
    </ThemeProvider>
  );
}

export default HexHopApp;
