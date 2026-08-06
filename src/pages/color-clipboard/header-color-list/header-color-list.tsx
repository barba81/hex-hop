import SearchBar from "./search-bar";
import FilterPalette from "./filter-palette";
import FilterGradient from "./filter-gradient";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteClipboard } from "../features/delete-clipboard";
import { addNewPalette } from "../features/add-new-block";

const HeaderColorList = () => {
  return (
    <div className="w-full px-2 p-2 bg-stone-800 flex gap-2 items-center justify-end ">
      <Button onClick={()=>addNewPalette({})}>
        <Plus className="" />
      </Button>
      <FilterGradient selected={true} />
      <FilterPalette />

      <SearchBar />
      <X onClick={()=>deleteClipboard()} />
    </div>
  );
};

export default HeaderColorList;
