import { createPortal } from 'react-dom';

const CopyUx = ({ anchorRect }: { anchorRect: DOMRect }) => {
  // We render this into document.body to escape all parent clipping
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: anchorRect.top - 25,
        left: anchorRect.left,
        zIndex: 9999,
      }}
      className="
        select-none 
        pointer-events-none
        rotate-345  
        bg-amber-50/70 
        rounded-4xl px-2 
        font-bold
        text-gray-700
        shadow-sm
      "
    >
      Copied
    </div>,
    document.body
  );
};

export default CopyUx;