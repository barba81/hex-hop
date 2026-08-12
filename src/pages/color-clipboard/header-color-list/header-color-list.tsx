import SearchBar from "./search-bar";
import { EllipsisVertical, Redo, Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteClipboard } from "../features/delete-block";
import { ButtonGroup } from "@/components/ui/button-group";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";


const HeaderDropdown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          size="icon" 
          className=" rounded-md shrink-0 select-none hover:cursor-pointer"
        >
          <EllipsisVertical />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-[160px] text-stone-200 border-stone-700">
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => deleteClipboard()} 
            className="flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-stone-700 cursor-pointer rounded-sm"
          >
            <Trash2 className="h-4 w-4" />
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};


const HeaderColorList = () => {
  return (
    <div className="w-full px-2 p-2 bg-stone-800 flex gap-2 items-center justify-end ">
      <ButtonGroup>
        <Button variant="outline" onClick={() => { }}>
          <Undo />
        </Button>
        <Button variant="outline" onClick={() => { }}>
          <Redo />
        </Button>
      </ButtonGroup>

      <SearchBar />

      <HeaderDropdown />
    </div>
  );
};

export default HeaderColorList;
