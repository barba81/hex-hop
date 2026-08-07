import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { GradientEntity } from "@/infrastructure/models/entity";
import { Copy, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { updateGradient } from "./feature/update-gradient";
import { deleteGradient } from "./feature/delete-gradient";
import { addNewLayer } from "./feature/add-new-gradient";

interface GradientInfoParm {
  gradient: GradientEntity;
}
const GradientInfo = ({ gradient }: GradientInfoParm) => {
  // 1. Keep local controlled state for the input value
  const [text, setText] = useState(gradient.name || "");

  // 2. Debounce the text changes
  useEffect(() => {
    // Set a timer to trigger updateGradient 500ms after user stops typing
    const timer = setTimeout(() => {
      // Avoid firing on initial render if text hasn't changed
      if (text !== gradient.name) {
        updateGradient({ ...gradient, name: text });
      }
    }, 500);

    // Clear timer if user types again before 500ms elapses
    return () => clearTimeout(timer);
  }, [text, gradient]);

  return (
    <div className="flex w-full justify-between px-2 gap-2">
      <Input
        placeholder="Enter text"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <div>{gradient.name}</div>
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          className="relative select-none hover:cursor-pointer text-xs rounded-md h-6"
          onClick={() => addNewLayer(gradient.id)}
        >
          <Plus />
          Add layer
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="relative select-none hover:cursor-pointer text-xs rounded-md h-6"
        >
          <Copy />
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="relative select-none hover:cursor-pointer text-xs rounded-md h-6"
          onClick={async () => await deleteGradient(gradient.id)}
        >
          <Trash2 size={20} className="stroke-red-400" />
        </Button>
      </div>
    </div>
  );
};

export default GradientInfo;