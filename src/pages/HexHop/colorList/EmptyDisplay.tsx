import { Clipboard } from "lucide-react";

const EmptyDisplay = () => {
  return (
    <>
      <div className="h-full w-full  flex items-center justify-center flex-col gap-5 opacity-[0.15]">
        <Clipboard size={120} strokeWidth={2} />
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">HexHop</h2>
          <p className="text-lg mt-2 ">No colors captured</p>
          <p className="text-lg mt-2 ">Pick a color from your screen</p>
        </div>
      </div>
    </>
  );
};

export default EmptyDisplay;