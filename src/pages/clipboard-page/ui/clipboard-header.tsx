import { EllipsisVertical, Palette, Redo, Trash2, Undo } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { IconButton } from "@/components/custom/icon-button";
import { CustomInput } from "@/components/custom/custom-input";
import { useColorListCommands } from "@/store/command-manager-provider";
import { addNewPalette } from "../features/add-block";
import { deleteClipboard } from "../features/delete-block";

const HeaderDropdown = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <IconButton   >
          <EllipsisVertical size={15} />
        </IconButton>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-40   border-stone-700">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="  cursor-pointer "
            onClick={() => addNewPalette([])}
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
      <IconButton
        disabled={!canUndo}
        onClick={() => undo()}
      >
        <Undo  />
      </IconButton>

      <IconButton
        disabled={!canRedo}
        onClick={() => redo()}
      >
        <Redo  />
      </IconButton>
    </div>
  );
};

const SearchBar = () => {
  return (
    <CustomInput className="w-full" placeholder="Search for color" />
  );
};

const HeaderColorList = () => {
  return (
    <div className="w-full  flex gap-2  items-center justify-between bg-background dark:bg-background p-1  ">
      <DoUnDoArrows />
      <SearchBar />
      <HeaderDropdown />
    </div>
  );
};

export default HeaderColorList;
