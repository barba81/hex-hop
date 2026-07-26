import { createPortal } from 'react-dom';

const AcceptedUx = ({ anchorRect }: { anchorRect: DOMRect }) => {
  return createPortal(
    <div
      style={{
        position: 'fixed',
        top: anchorRect.top - 30,
        left: anchorRect.left-40,
      }}
      className="
        select-none 
        pointer-events-none
        bg-amber-50/70 
        rounded-4xl px-2 
        font-bold
        text-gray-700
        shadow-sm
      "
    >
      Added
    </div>,
    document.body
  );
};

export default AcceptedUx;