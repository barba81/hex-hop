import HoldToButton from "@/components/common/HoldToButton";
import { ColorPallet } from "@/features/Colors/colorPallet";
import { Trash2 } from "lucide-react";

const HoldToClear = () => {
  return (
    <HoldToButton
      text={
        <>
          <Trash2 />
          {"Clear all"}
        </>
      }
      holdText={<>  <Trash2 />{"Hold..."}</>}
      action={() => ColorPallet.ClearAll()}
    />
  );
};

export default HoldToClear;
