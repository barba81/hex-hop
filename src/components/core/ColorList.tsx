import { useColorStore } from "@/store/useColorStore";

const ColorList = () => {
  const colors = useColorStore().colors;

  return (
    <div className="flex-1 overflow-y-auto px-2 flex flex-col gap-2">
      {colors.map((color) => {
        return (
          <>
            <div
              className="h-12 rounded-md w-full shrink-0"
              style={{ background: color }}
            />
          </>
        );
      })}
    </div>
  );
};

export default ColorList;
