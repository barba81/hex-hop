import { createContext } from "react";
import { CommandManager } from "./command-manager";

export const CommandManagerContext =
  createContext<CommandManager | null>(null);