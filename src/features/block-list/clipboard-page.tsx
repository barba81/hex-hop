import { ActionButton } from "@/features/block-list/action-button/ui/action-button";
import ColorList from "@/features/block-list/block-list/ui/block-list";
import AddColorButton from "@/features/block-list/create-color/ui/add-color-button";
import AiColorButton from "@/features/block-list/create-color/ui/ai-color-button";
import ColorInput from "@/features/block-list/create-color/ui/color-text-input";
import EyeDropButton from "@/features/block-list/create-color/ui/eye-drop-button";
import ColorBoxPicker from "@/features/block-list/create-color/ui/preview-color-box";
import { RedoUndo } from "@/features/block-list/redo-undo/ui/redo-undo";
import { SearchBar } from "@/features/block-list/search-block-list/clipboard-header";

const ClipboardPage = () => {

  return (
    <div className="h-full flex flex-col  overflow-auto">
      <div className="w-full  flex gap-2  items-center justify-between bg-background p-1  ">
        <RedoUndo/>
        <SearchBar />
        <ActionButton />
      </div>
      <ColorList />
      <div className="flex  items-center justify-between p-1 gap-1 bg-background dark:background">
        <EyeDropButton />
        <ColorBoxPicker />
        <ColorInput />
        <AddColorButton />
        <AiColorButton />
      </div>
    </div>
  );
};

export default ClipboardPage; 