import { Search } from "lucide-react"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/shared/ui/input-group";

export const SearchBar = () => {
  return (
    <InputGroup className="h-6 text-xs">
      <InputGroupInput placeholder="Search..." className="h-full py-0 text-xs" />
      <InputGroupAddon className="w-6">
        <Search />
      </InputGroupAddon>
      <InputGroupAddon align="inline-end" className="text-xs">
        12 results
      </InputGroupAddon>
    </InputGroup>
  );
};


