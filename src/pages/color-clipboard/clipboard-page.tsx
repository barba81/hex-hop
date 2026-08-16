import FooterColorPicker from "./footer-color-picker/footer-color-picker";
import ColorList from "./color-list/color-list";
import HeaderColorList from "./clipboard-header";
import { colorListCommands } from "@/infrastructure/command/command-manager";
import { CommandManagerContext } from "@/infrastructure/command/command-manager-context";

const ColorListPage = () => {

  return (
    <>
      <CommandManagerContext.Provider value={colorListCommands}>
        <HeaderColorList />
        <ColorList />
        <FooterColorPicker />
      </CommandManagerContext.Provider>
    </>
  );
};

export default ColorListPage;