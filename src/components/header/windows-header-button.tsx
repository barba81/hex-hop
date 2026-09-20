import { getCurrentWindow } from "@tauri-apps/api/window";
import { Minus, X } from "lucide-react";
import { Button } from "../ui/button";

const WindowsHeaderButton = () => {
  return (
    <div className="flex gap-2 ">
        <Button
          variant='ghost'
          size='icon-xs'
          className="hover:bg-gray-400 dark:hover:bg-gray-800"
          onClick={() => {
            getCurrentWindow().minimize();
          }}
        >
          <Minus />
        </Button>
        <Button
           variant='ghost'
          size='icon-xs'
          className="hover:bg-red-700 dark:hover:bg-red-700/50"
          onClick={() => {
            getCurrentWindow().close();
          }}
        >
          <X size={18}/>
        </Button>
      </div>
  );
};

export default WindowsHeaderButton;
