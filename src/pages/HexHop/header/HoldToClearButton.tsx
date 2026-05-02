import HoldToButton from "@/components/custom/HoldToButton";
import { ColorPallet } from "@/service/colorPallet";
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
      holdText={<>{"Hold..."}</>}
      action={() => ColorPallet.ClearAll()}
    />
  );
};

export default HoldToClear;
