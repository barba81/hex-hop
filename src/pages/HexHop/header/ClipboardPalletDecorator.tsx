const ClipboardPalletDecorator = () => {
  return (
    <div
      data-tauri-drag-region
      className="fixed left-1/2 -translate-x-1/2 
        h-3.5 w-35 
        bg-stone-400 
        dark:bg-stone-600 
        rounded-b-2xl cursor-pointer "
    />
  );
};

export default ClipboardPalletDecorator;
