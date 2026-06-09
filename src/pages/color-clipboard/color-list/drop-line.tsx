import { useDroppable } from "@dnd-kit/react";
const DropLine = ({
  id,
  order,
  parentId,
}: {
  id: string;
  order: number;
  parentId?: number;
}) => {
  const { ref, isDropTarget } = useDroppable({
    id: id,     
    data: { parentId, order } 
  });

  return (
    <div ref={ref} className="w-full cursor-pointer transition-all duration-200">
      <div
        className={`w-full   rounded-xl transition-all duration-200 ${
          isDropTarget ? "h-15 bg-stone-600" : "h-0.5 "
        }`}
      />
    </div>
  );
};
export default DropLine;