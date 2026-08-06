import SearchBar from "./search-bar";
import { Redo, Trash2, Undo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteClipboard } from "../features/delete-clipboard";
import { ButtonGroup } from "@/components/ui/button-group";

const HeaderColorList = () => {
  return (
    <div className="w-full px-2 p-2 bg-stone-800 flex gap-2 items-center justify-end ">
      <ButtonGroup>
        <Button variant="outline" onClick={() => {}}>
          <Undo />
        </Button>
        <Button variant="outline" onClick={() => {}}>
          <Redo />
        </Button>
      </ButtonGroup>

      <SearchBar />
      <Button variant="destructive" onClick={() => deleteClipboard()}>
        <Trash2 />
      </Button>
    </div>
  );
};

export default HeaderColorList;
