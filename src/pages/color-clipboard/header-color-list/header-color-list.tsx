import SearchBar from "./search-bar";
import { EllipsisVertical, Palette, Redo, Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteClipboard } from "../features/delete-block";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/theme/mode-toggle";


const HeaderDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon-sm' variant="outline">
          <EllipsisVertical className="hover:cursor-pointer" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className=" text-stone-200 border-stone-700">
        <DropdownMenuGroup>
           <DropdownMenuItem
            className="  cursor-pointer "
          >
            <Palette /> Add new palette
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            className="  cursor-pointer "
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
      <ButtonGroup>
        <Button variant="outline" size='icon-sm' onClick={() => { }}>
          <Undo />
        </Button>
        <Button variant="outline" size='icon-sm' onClick={() => { }} disabled={true}>
          <Redo />
        </Button>
      </ButtonGroup>

      <SearchBar />

      <HeaderDropdown />
      {/* <ModeToggle/> */}
    </div>
  );
};

export default HeaderColorList;
