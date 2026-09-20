;
import { useClipboardStore } from "@/store/clipboard-store";
import { setInputColor } from "../../features/clipboard-store-actions";
import { setColorValidityAndMode } from "../../features/set-color-validity-and-mode";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

const ColorInput = () => {
  const colorFormat = useClipboardStore((state) => state.colorFormat);
  const isColorValid = useClipboardStore((state) => state.isColorValid);
  const inputColor = useClipboardStore((state) => state.inputColor);

  const handleOnChange = (color: string) => {
    setInputColor(color);
    setColorValidityAndMode(color);
  };

  return (
    <InputGroup className="h-8" >
      <InputGroupInput value={inputColor} placeholder="Enter color" className="h-full py-0 text-sm"

        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
      />
      {isColorValid &&
        <InputGroupAddon align="inline-end" className="border-l-2 px-2 text-sm ">{colorFormat}</InputGroupAddon>
      }
    </InputGroup>
  );
};

export default ColorInput;
