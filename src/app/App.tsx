import "./globals.css";
import { ThemeProvider } from "../shared/theme/theme-provider";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router";
import { platform as getPlatform } from "@tauri-apps/plugin-os";
import { TooltipProvider } from "@/shared/ui/tooltip";
import { cn } from "cn";
import HeaderBar from "@/app/components/app-header/app-header-bar";

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
