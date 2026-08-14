import SearchBar from "./search-bar";
import { EllipsisVertical, Palette, Redo, Trash2, Undo } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteClipboard } from "../features/delete-block";
import { defaultButtonBackground } from "@/components/common/micro-button";


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


const HeaderColorList = () => {
  return (
    <div className="w-full  flex gap-2  items-center justify-between bg-zinc-100 dark:bg-zinc-900 p-2  ">
      <div className="flex gap-1">
        <button
          type="button"
          aria-label="Undo"
          className={`
          p-1
          outline-1
          ${defaultButtonBackground}
          `}
        >
          <Undo size={15} />
        </button>

        <button
          type="button"
          aria-label="Redo"
          className={`
          p-1
          outline-1
          ${defaultButtonBackground}
          `}
        >
          <Redo size={15} />
        </button>
      </div>

      <SearchBar />

      <HeaderDropdown />
      {/* <ModeToggle/> */}
    </div>
  );
};

export default HeaderColorList;
