import { createContext, useContext } from "react";
import { CommandManager } from "./command-manager";

export const CommandManagerContext =
  createContext<CommandManager | null>(null);


export function useCommandManager(): CommandManager {
  const manager = useContext(CommandManagerContext);

  if (!manager) {
    throw new Error(
      "useCommandManager must be used inside CommandManagerContext.Provider"
    );
  }

  return manager;
}