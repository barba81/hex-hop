import { Plus, SwatchBook } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addNewPalette } from "@/features/palettes/add-new-palette";

export const AddNewPalette = () => {
  return <>
     <Button variant="outline" size="sm" className="h-6" onClick={()=>addNewPalette()}>
        <Plus/>
        <SwatchBook />
      </Button>
  </>;
};
