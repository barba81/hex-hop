;
import { useAppStore } from "@/store/app-store";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { handleColorChange } from "../../features/color-actions";

const ColorInput = () => {
  const colorFormat = useAppStore((state) => state.colorMode);
  const isColorValid = useAppStore((state) => state.isColorValid);
  const inputColor = useAppStore((state) => state.inputColor);

  const handleOnChange = (color: string) => { 
    handleColorChange(color);
  };

  return (
    <InputGroup className="h-8" >
      <InputGroupInput value={inputColor} placeholder="Enter color" className="h-full py-0 text-sm"

        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
      />
      {isColorValid ? <InputGroupAddon align="inline-end" className=" px-2 text-sm ">{colorFormat}</InputGroupAddon> : null
      }
    </InputGroup>
  );
};

export default ColorInput;
