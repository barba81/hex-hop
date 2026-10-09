import FooterColorPicker from "@/features/block-list/create-color/ui/footer-color-picker";
import HeaderColorList from "@/features/block-list/search-block-list/clipboard-header";

const ClipboardPage = () => {

  return (
    <div className="h-full flex flex-col  overflow-auto">
      <HeaderColorList />
      <ClipboardPage />
      <FooterColorPicker />
    </div>
  );
};

export default ClipboardPage;