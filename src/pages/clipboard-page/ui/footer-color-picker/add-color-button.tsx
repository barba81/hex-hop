import { Check } from "lucide-react";
import { useClipboardStore } from "@/store/clipboard-store";
import { addNewColorToClipboard } from "../../features/add-block";
import { Button } from "@/components/ui/button";

const AddColorButton = () => {
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);


  return (
    <Button size='icon-sm'
      disabled={!isColorValid}
      variant={isColorValid ? "default" : "outline"}
      className={`
            ${isColorValid && "bg-green-400  dark:bg-green-900  hover:bg-green-400/50"} 
          `}
      onClick={async () => {
        addNewColorToClipboard(inputColor, null);
      }}
    >
      <Check strokeWidth={3.5} size={16} />
    </Button>
  );
};

export default AddColorButton;
