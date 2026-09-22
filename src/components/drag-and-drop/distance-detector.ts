import { CollisionDetector, CollisionPriority, CollisionType } from "@dnd-kit/abstract";

export const distanceDetector: CollisionDetector = ({dragOperation, droppable}) => {
  const dragShape = dragOperation.shape?.current;
  const dropShape = droppable.shape;

  if (!dragShape || !dropShape) return null;

  const distance = Math.abs( dragShape.center.y - dropShape.center.y);
  
  return {
    id: droppable.id,
    value: -distance,
    type: CollisionType.Collision,
    priority: CollisionPriority.Normal,
  };
};
