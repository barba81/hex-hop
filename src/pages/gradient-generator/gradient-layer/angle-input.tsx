import { useEffect, useRef, useState } from "react";

const AngleInput = () => {
   const circleRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);

useEffect(() => {
  const handleMouseMove = (e: MouseEvent) => {
    if (!circleRef.current || !dragging.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setAngle(Math.atan2(e.clientY - cy, e.clientX - cx));
  };

  const stopDrag = () => (dragging.current = false);

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mouseup', stopDrag);
  return () => {
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', stopDrag);
  };
}, []);

  return (
  <div
  ref={circleRef}
  className="w-10 h-10 rounded-full border-3 border-amber-300 flex items-center justify-center cursor-crosshair"
  onMouseDown={() => (dragging.current = true)}
>
  <div
    className="w-2 h-2 bg-amber-300 rounded-full"
    style={{ transform: `rotate(${angle}rad) translateX(12px)` }}
  />
</div>
  );
};

export default AngleInput;
