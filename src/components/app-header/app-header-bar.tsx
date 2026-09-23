import { platform as getPlatform } from "@tauri-apps/plugin-os";
import MacHeaderButton from "./mac-header-button";
import WindowsHeaderButton from "./windows-header-button";
import DropDownHeader from "@/components/app-header/drop-down-header";
import { ThemeToggleButton } from "../theme/theme-toggle";
import { cn } from "@/lib/utils";

const platform = getPlatform();

const HeaderBar = () => {

  return (
    <div
      data-tauri-drag-region
      className=" flex w-full justify-between items-center gap-2 p-1 select-none bg-background dark:background "
    >
      {platform === "macos" && <MacHeaderButton disabledButtons={['maximize']}  />}
      <div className={cn(" flex justify-center gap-1",
        platform !== "macos" && "flex-row-reverse"
      )} >
        <ThemeToggleButton />
        <DropDownHeader />
      </div>
      {platform !== "macos" && <WindowsHeaderButton />}
    </div>
  );
};

export default HeaderBar;
