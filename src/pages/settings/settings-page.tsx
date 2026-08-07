import { X } from "lucide-react";
import { hardDelete } from "../color-clipboard/features/delete-block";

const SettingsPage = () => {
  return (
    <div>
        <X onClick={() => hardDelete()}/>
      </div>
  );
};

export default SettingsPage;
