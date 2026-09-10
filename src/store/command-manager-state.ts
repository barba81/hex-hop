import { create } from 'zustand';

export interface Command {
  undo(): Promise<void>;
  redo(): Promise<void>;
}

export interface CommandStore {
  undoStack: Command[];
  redoStack: Command[];
  canUndo: boolean;
  canRedo: boolean;
  push: (command: Command) => Promise<void>;
  undo: () => Promise<void>;
  redo: () => Promise<void>;
}

export const createCommandStore = (maxHistory = 50) =>
  create<CommandStore>((set, get) => ({
    undoStack: [],
    redoStack: [],
    canUndo: false,
    canRedo: false,

    push: async (command: Command) => {
      set((state) => {
        const nextUndo = [...state.undoStack, command];
        if (nextUndo.length > maxHistory) {
          nextUndo.shift();
        }
        return {
          undoStack: nextUndo,
          redoStack: [],
          canUndo: true,
          canRedo: false,
        };
      });
    },

    undo: async () => {
      const { undoStack } = get();
      if (undoStack.length === 0) return;

      const command = undoStack[undoStack.length - 1];
      await command.undo();
      set((state) => {
        const nextUndo = state.undoStack.slice(0, -1);
        const nextRedo = [...state.redoStack, command];
        return {
          undoStack: nextUndo,
          redoStack: nextRedo,
          canUndo: nextUndo.length > 0,
          canRedo: true,
        };
      });
    },

    redo: async () => {
      const { redoStack } = get();
      if (redoStack.length === 0) return;

      const command = redoStack[redoStack.length - 1];
      await command.redo();

      set((state) => {
        const nextRedo = state.redoStack.slice(0, -1);
        const nextUndo = [...state.undoStack, command];
        return {
          undoStack: nextUndo,
          redoStack: nextRedo,
          canUndo: true,
          canRedo: nextRedo.length > 0,
        };
      });
    },
  }));