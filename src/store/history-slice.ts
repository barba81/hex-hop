import { CommandHistory } from "./clipboard-store";

export type CommandScope = 'clipboard' | 'colorBlockSettings';

export interface ClipboardStore {
  history: Record<CommandScope, CommandHistory>;
}

const initialScopeHistory: CommandHistory = {
  undoStack: [],
  redoStack: [],
};
