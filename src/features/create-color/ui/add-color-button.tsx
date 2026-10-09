import { Check } from "lucide-react";
import { Button } from "@/shared/ui/button";
import { useAddColorToClipboard } from "@/features/create-color/hooks/useAddColorToClipboard";

const AddColorButton = () => {
  const {isColorValid, inputColor, addNewColorToClipboard} = useAddColorToClipboard();

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
