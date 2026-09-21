import HeaderBar from "./components/app-header/app-header-bar";
import "./globals.css";
import { ThemeProvider } from "./components/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { TooltipProvider } from "./components/ui/tooltip";
import { cn } from "./lib/utils";
import { platform as getPlatform } from "@tauri-apps/plugin-os";

const platform = getPlatform();

function HexHopApp() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme" >
      <TooltipProvider >
        <Toaster position="top-center" />
        <div className={cn(
          "w-screen h-screen flex flex-col overflow-hidden  bg-stone-50/80 dark:bg-stone-800/80 ",
          platform === "macos" && "rounded-2xl "
        )}>
          <HeaderBar />
          <Outlet />
        </div>
      </TooltipProvider>
    </ThemeProvider>
  );
}

export default HexHopApp;
