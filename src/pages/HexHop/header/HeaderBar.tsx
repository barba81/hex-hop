import HoldToClear from "./HoldToClearButton";
import ClipboardPalletDecorator from "./ClipboardPalletDecorator";
import WindowsHeaderButton from "./WindowsHeaderButton";

const HeaderBar = () => {
  return (
    <>
      <ClipboardPalletDecorator />

      <div className="flex bg-stone-50 dark:bg-black/50  w-full justify-between gap-2 px-2 py-1">
        <div className="flex items-center justify-center ">
          <HoldToClear />
        </div>
        <WindowsHeaderButton />
      </div>
    </>
  );
};

export default HeaderBar;
