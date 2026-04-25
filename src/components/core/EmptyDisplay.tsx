import { Clipboard } from "lucide-react";

const EmptyDisplay = () => {
  return (
    <>
      <div className="h-full w-full flex items-center justify-center flex-col gap-5 opacity-[0.07] dark:opacity-[0.15]">
        <Clipboard size={120} strokeWidth={1} />
        <div className="text-center">
          <h2 className="text-4xl font-bold tracking-tight">Color Clipboard</h2>
          <p className="text-lg mt-2">Press check box to add color</p>
        </div>
      </div>
    </>
  );
};

export default EmptyDisplay;