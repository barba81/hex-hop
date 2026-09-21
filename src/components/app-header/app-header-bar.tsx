import { platform as getPlatform } from "@tauri-apps/plugin-os";
import MacHeaderButton from "./mac-header-button";
import WindowsHeaderButton from "./windows-header-button";
import DropDownHeader from "@/components/app-header/drop-down-header";
import { ThemeToggleButton } from "../theme/mode-toggle";

const platform =  getPlatform();

const HeaderBar = () => {
  
  return (
    <div
        data-tauri-drag-region
        className=" flex w-full justify-between items-center gap-2 p-1 select-none bg-background dark:background "
      >
        {platform === "macos" && <MacHeaderButton />}
        <div className=" flex justify-center gap-1" >
          <ThemeToggleButton/>
          <DropDownHeader />
        </div>
        {platform !== "macos" && <WindowsHeaderButton />}
      </div>
  );
};

export default HeaderBar;
