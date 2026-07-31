import { Pipette } from "lucide-react";
import { buttonStyle } from "../../../style/default-style";
import { colorPicker } from "@/pages/color-clipboard/features/color/eye-dropper";

const PipetButton = () => {


  return (
    <>
      <div
        className={`
          ${buttonStyle}       
          flex  
          items-center 
          justify-center
          dark:bg-foreground/10
          hover:bg-foreground/25
        bg-stone-100
        text-gray-900 
        dark:text-white `}
        onClick={() => {
          colorPicker();
        }}
      >
        <Pipette strokeWidth={2} size={15} />
      </div>
    </>
  );
};

export default PipetButton;
