import { Eye } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"; // Update import path if needed
import { defaultButtonBackground } from "@/components/common/custom-button";
import { ColorBlindnessType } from "@/infrastructure/models/color-blindness-types";
import { useColorBlindnessStore } from "./store/color-blindness-store";

interface ColorBlindOption {
  label: string;
  value: ColorBlindnessType;
}

const COLOR_BLIND_OPTIONS: ColorBlindOption[] = [
  { label: "No simulator", value: "regular" },
  { label: "Protanopia (Red-blind)", value: "protanopia" },
  { label: "Deuteranopia (Green-blind)", value: "deuteranopia" },
  { label: "Tritanopia (Blue-blind)", value: "tritanopia" },
  { label: "Achromatopsia (Monochromacy)", value: "achromatopsia" },
];

const ColorBlindsDropDown = () => {
  const { updateColorBlindness } = useColorBlindnessStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={`p-1 ${defaultButtonBackground} outline-1`}>
          <Eye size={15} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="min-w-40 border-stone-700">
        <DropdownMenuGroup>
          {COLOR_BLIND_OPTIONS.map(({ label, value }) => (
            <DropdownMenuItem
              key={value}
              onClick={() => updateColorBlindness(value)}
              className="cursor-pointer"
            >
              {label}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ColorBlindsDropDown;