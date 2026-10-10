import { useAppStore } from "@/shared/store/app-store";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import { Button } from "@base-ui/react";
import { EllipsisVertical, Palette, Trash2 } from "lucide-react";

export const ActionButton = () => {
  const addNewPaletteToClipboard = useAppStore((store) => store.addNewPaletteToClipboard);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
        <Button size='icon-xs' variant='outline'>
          <EllipsisVertical size={15} />
        </Button>
        }/>

      <DropdownMenuContent className="w-auto">
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              addNewPaletteToClipboard([]);
            }
            }
          >
            <Palette />
            <span className="text-xs font-medium">
              Add new palette
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem
            variant="destructive"
          >
            <Trash2 />
            <span className="text-xs font-medium">
              Clear All
            </span>
          </DropdownMenuItem>

        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  );
};