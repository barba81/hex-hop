import { getCurrentWindow } from "@tauri-apps/api/window";

const MacHeaderButton = () => {
  const appWindow = getCurrentWindow();

  return (
    <div className="flex gap-[8px] px-3 items-center group">
      <div
        onClick={() => appWindow.close()}
        className="w-4 h-4 rounded-full bg-[#ff5f57] border-[0.5px] border-[#e0443e] flex items-center justify-center cursor-default relative"
      >
        <span className="hidden group-hover:block text-[8px] text-[#4c0000] font-bold">✕</span>
      </div>

      <div
        onClick={() => appWindow.minimize()}
        className="w-4 h-4 rounded-full bg-[#febc2e] border-[0.5px] border-[#d8a124] flex items-center justify-center cursor-default"
      >
        <span className="hidden group-hover:block text-[10px] text-[#5c3c00] font-bold mb-[2px]">−</span>
      </div>

      <div
        className="w-4 h-4 rounded-full bg-[#e6e6e6] dark:bg-[#3d3d3d] border-[0.5px] border-[#d1d1d1] dark:border-[#2b2b2b] flex items-center justify-center cursor-default"
      >
      </div>
    </div>
  );
};

export default MacHeaderButton;