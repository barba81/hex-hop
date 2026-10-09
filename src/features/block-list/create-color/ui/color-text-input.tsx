;
import { useAddColorToClipboard } from "@/features/block-list/create-color/hooks/useAddColorToClipboard";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/input-group";

const ColorInput = () => {
  const { isColorValid, inputColor, colorMode, handleColorChange } = useAddColorToClipboard();


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
      {isColorValid ? <InputGroupAddon align="inline-end" className=" px-2 text-sm ">{colorMode}</InputGroupAddon> : null
      }
    </InputGroup>
  );
};

export default ColorInput;
