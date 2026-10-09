import ColorList from "@/features/block-list/block-list/ui/block-list";
import FooterColorPicker from "@/features/block-list/create-color/ui/footer-color-picker";
import HeaderColorList from "@/features/block-list/search-block-list/clipboard-header";
import { ClipboardList, HamIcon } from "lucide-react";

const ClipboardPage = () => {

  return (
    <div className="h-full flex flex-col  overflow-auto">
      <HeaderColorList />
      <ColorList />
      <FooterColorPicker />
    </div>
  );
};

export default ClipboardPage; 