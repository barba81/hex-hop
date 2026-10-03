import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/app-store";

const AddColorButton = () => {
  const isColorValid = useAppStore((state) => state.isColorValid);
  const inputColor = useAppStore((state) => state.inputColor);
  const addNewColorToClipboard = useAppStore((state) => state.addNewColorToClipboard);

  const handleOnClick = () => {
    addNewColorToClipboard(inputColor, null);
  }

  return (
    <Button size='icon-sm'
      disabled={!isColorValid}
      variant={isColorValid ? "default" : "outline"}
      className={`
            ${isColorValid && "bg-green-400  dark:bg-green-900  hover:bg-green-400/50"} 
          `}
      onClick={() => handleOnClick()}
    >
      <Check strokeWidth={3.5} size={16} />
    </Button>
  );
};

export default AddColorButton;
