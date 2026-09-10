import FooterColorPicker from "./footer-color-picker/footer-color-picker";
import ColorList from "./color-list/color-list";
import HeaderColorList from "./clipboard-header";
import { useEffect } from "react";
import { useClipboardStore } from "../../store/clipboard-store";

const ColorListPage = () => {

  const initBlock = useClipboardStore((state) => state.initBlocks);


  useEffect(() => {
    const init = async () => {
      await initBlock();
    };

    init();
  }, []);



  return (
    <div className="h-full flex flex-col gap-1 overflow-auto">
      <HeaderColorList />
      <ColorList />
      <FooterColorPicker />
    </div>
  );
};

export default ColorListPage;