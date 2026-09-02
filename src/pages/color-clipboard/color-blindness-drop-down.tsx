import { CustomButton, defaultButtonBackground } from "@/components/common/custom-button";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { EllipsisVertical, Eye, Palette, Trash2 } from "lucide-react";
import { deleteClipboard } from "./features/delete-block";

const ColorBlindsDropDown = () => {

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`p-1 ${defaultButtonBackground} outline-1`}  >
          <Eye size={15} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-40   border-stone-700">
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="  cursor-pointer "
          >
            <Palette /> Add new palette
          </DropdownMenuItem>
        
        </DropdownMenuGroup>

      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ColorBlindsDropDown
;