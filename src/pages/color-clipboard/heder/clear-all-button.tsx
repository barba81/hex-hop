import Button from "@/components/common/button";
import { SwatchBook, Trash2 } from "lucide-react";

const ClearAllButton = () => {
    return (<>
     <Button>
        <Trash2 strokeWidth={2} size={17} />
      </Button>
    
    </>)
};

export default ClearAllButton;
