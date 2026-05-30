import { useDroppable } from "@dnd-kit/react";

const DropLine = ({
  id,
  parentId,
}: {
  id: number;
  parentId?: number;
}) => {
  const { ref, isDropTarget } = useDroppable({ id, data: { parentId } });

  return (
    <div
      ref={ref}
      className="w-full  cursor-pointer transition-all duration-200"
    >
      <div
        className={`w-full rounded-xl transition-all duration-200 ${
          isDropTarget 
            ? "h-1 bg-stone-600 scale-y-110"
            : "h-0.5 bg-transparent"     
        }`}
      />
    </div>
  );
};

export default DropLine;