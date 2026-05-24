import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, X } from "lucide-react";

const WindowsHeaderButton = () => {
  return (
    <>
      <div className="flex gap-2">
        <div
          className="text-gray-900 dark:text-white cursor-pointer hover:bg-gray-400/50 dark:hover:bg-gray-500/50 p-1 rounded-md"
          onClick={() => {
            getCurrentWindow().minimize();
          }}
        >
          <Minus />
        </div>
        <div
          className="text-gray-900 dark:text-white cursor-pointer  hover:bg-red-400/50 p-1 rounded-md"
          onClick={() => {
            getCurrentWindow().close();
          }}
        >
          <X />
        </div>
      </div>
    </>
  );
};

export default WindowsHeaderButton;
