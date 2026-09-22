import { EllipsisVertical, Palette, Redo, Trash2, Undo } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useColorListCommands } from "@/store/command-manager-provider";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Search } from "lucide-react"
import { addNewPalette } from "../../features/add-block";
import { deleteClipboard } from "../../features/delete-block";

const HeaderDropdown = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button size='icon-xs' variant='outline'>
          <EllipsisVertical size={15} />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-auto">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => addNewPalette([])}
          >
            <Palette  />
            <span className="text-xs font-medium">
              Add new palette
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
            onClick={() => deleteClipboard()}
          >
            <Trash2  />
            <span className="text-xs font-medium">
              Clear All
            </span>
          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};



const DoUnDoArrows = () => {
  const { undo, redo, canUndo, canRedo } = useColorListCommands();

  return (
    <div className="flex gap-1 items-center justify-center">
      <Button
        size='icon-xs'
        variant='outline'
        disabled={!canUndo}
        onClick={() => undo()}
      >
        <Undo />
      </Button>

      <Button
        size='icon-xs'
        variant='outline'
        disabled={!canRedo}
        onClick={() => redo()}
      >
        <Redo />
      </Button>
    </div>
  );
};

const SearchBar = () => {
  return (
    <InputGroup className="h-6 text-xs">
      <InputGroupInput placeholder="Search..." className="h-full py-0 text-xs" />
      <InputGroupAddon className="w-6">
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="text-xs">
        12 results
      </InputGroupAddon>
    </InputGroup>
  );
};

const HeaderColorList = () => {
  return (
    <div className="w-full  flex gap-2  items-center justify-between bg-background p-1  ">
      <DoUnDoArrows />
      <SearchBar />
      <HeaderDropdown />
    </div>
  );
};

export default HeaderColorList;
