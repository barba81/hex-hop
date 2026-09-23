import { CommandHistory } from "./hexhop-store";

export type CommandScope = 'clipboard' | 'colorBlockSettings';

export interface ClipboardStore {
  history: Record<CommandScope, CommandHistory>;
}

const initialScopeHistory: CommandHistory = {
  undoStack: [],
  redoStack: [],
};
