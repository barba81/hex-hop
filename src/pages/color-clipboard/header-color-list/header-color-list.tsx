import SearchBar from "./search-bar";
import { EllipsisVertical, Palette, Redo, Trash2, Undo } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteClipboard } from "../features/delete-block";
import { IconButton, MicroButton } from "@/components/common/micro-button";


const HeaderDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <MicroButton  >
          <EllipsisVertical className="hover:cursor-pointer" />
        </MicroButton>
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
    <div className="w-full  py-2 flex  items-center justify-between px-2  ">
      <div className="flex ">
        <IconButton icon={Undo} onClick={() => { }} />
        <IconButton icon={Redo} onClick={() => { }} />
      </div>

      <SearchBar />

      <HeaderDropdown />
      {/* <ModeToggle/> */}
    </div>
  );
};

export default HeaderColorList;
