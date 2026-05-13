import { useRef, useState } from "react";

const GradientGeneratorPage = () => {
   const circleRef = useRef<HTMLDivElement>(null);
  const [angle, setAngle] = useState(0);
  const dragging = useRef(false);

  const updateAngle = (e: React.MouseEvent) => {
    if (!circleRef.current || !dragging.current) return;
    const rect = circleRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = e.clientX - cx;
    const dy = e.clientY - cy;

    setAngle(Math.atan2(dy, dx)); // radians
  };

  return (
    <div
      ref={circleRef}
      className="w-10 h-10 rounded-full border-3 border-amber-300 flex items-center justify-center "
      onMouseDown={() => (dragging.current = true)}
      onMouseUp={() => (dragging.current = false)}
      onMouseLeave={() => (dragging.current = false)}
      onMouseMove={updateAngle}
    >
      {/* rotate the dot, not the circle */}
      <div
        className="w-2 h-2 bg-amber-300 rounded-full"
        style={{ transform: `rotate(${angle}rad) translateX(12px)` }}
      />
    </div>
  );
};

export default GradientGeneratorPage;
