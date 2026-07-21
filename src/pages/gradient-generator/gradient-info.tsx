import { Trash2 } from "lucide-react";

const GradientInfo = () => {
  return (
    <>
      <div className="flex w-full justify-between px-2 gap-2 ">
        <div>Gradient name</div>
        <div onClick={() => {}}>
          <Trash2 size={20} />
        </div>
      </div>
    </>
  );
};

export default GradientInfo;
