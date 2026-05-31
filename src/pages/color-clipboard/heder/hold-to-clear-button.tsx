import HoldToButton from "@/components/common/hold-to-button";
import { removeAllData } from "@/features/common/remove-all";
import { Trash2 } from "lucide-react";

const HoldToClear = () => {
  return (
    <HoldToButton
      text={<>
        <Trash2 />
        {"Clear all"}
      </>}
      holdText={<>  <Trash2 />{"Hold..."}</>}
      action={() => { removeAllData(); } } className={""}    />
  );
};

export default HoldToClear;
