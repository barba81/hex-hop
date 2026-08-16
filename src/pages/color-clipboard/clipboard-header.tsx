import { EllipsisVertical, Palette, Redo, Trash2, Undo } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteClipboard } from "./features/delete-block";
import { defaultButtonBackground } from "@/components/common/micro-button";
import { MicroInput } from "@/components/common/micro-input";
import {  useCommandManager } from "@/infrastructure/command/command-manager-context";
import { useColorListCommands } from "@/infrastructure/command/command-manager-provider";

const HeaderDropdown = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`p-1 ${defaultButtonBackground} outline-1`}  >
          <EllipsisVertical size={15} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-40   border-stone-700">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="  cursor-pointer "
          >
            <Palette /> Add new palette
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant="destructive"
            className="  cursor-pointer "
            onClick={() => deleteClipboard()}
          >

            <Trash2 /> Clear All
          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};



const DoUnDoArrows = () => {
const { undo, redo, canUndo, canRedo } = useColorListCommands();

  return (
    <div className="flex gap-1">
      <button
        type="button"
        aria-label="Undo"
        disabled={!canUndo}
        onClick={() => undo()}
        className={`
          p-1
          outline-1
          ${defaultButtonBackground}
          disabled:opacity-40
          disabled:cursor-not-allowed
          disabled:pointer-events-none
        `}
      >
        <Undo size={15} />
      </button>

      <button
        type="button"
        aria-label="Redo"
        disabled={!canRedo}
        onClick={() => redo()}
        className={`
          p-1
          outline-1
          ${defaultButtonBackground}
          disabled:opacity-40
          disabled:cursor-not-allowed
          disabled:pointer-events-none
        `}
      >
        <Redo size={15} />
      </button>
    </div>
  );
};

const SearchBar = () => {
  return (
    <MicroInput className="w-full" placeholder="Search for color" />
  );
};


const HeaderColorList = () => {
  return (
    <div className="w-full  flex gap-2  items-center justify-between bg-zinc-100 dark:bg-zinc-900 p-2  ">
      <DoUnDoArrows />
      <SearchBar />
      <HeaderDropdown />
    </div>
  );
};

export default HeaderColorList;
