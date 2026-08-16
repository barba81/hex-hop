export interface Command {
  execute(): Promise<void>;
  undo(): Promise<void>;
  redo(): Promise<void>;
}

export class CommandManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  constructor(private maxHistory = 50) { }

  execute = async (command: Command): Promise<void> => {
    await command.execute();

    this.undoStack.push(command);

    if (this.undoStack.length > this.maxHistory) {
      this.undoStack.shift();
    }

    this.redoStack = [];
    console.log(this.undoStack);
    console.log(this.redoStack);
  };

  undo = async (): Promise<void> => {
    const command = this.undoStack.pop();

    if (!command) {
      return;
    }

    await command.undo();

    this.redoStack.push(command);

        console.log(this.undoStack);
    console.log(this.redoStack);
  };

  redo = async (): Promise<void> => {
    const command = this.redoStack.pop();

    if (!command) {
      return;
    }

    await command.redo();

    this.undoStack.push(command);
  };

  canUndo(): boolean {
    return this.undoStack.length > 0;
  }

  canRedo(): boolean {
    return this.redoStack.length > 0;
  }
}

export const colorListCommands = new CommandManager();
export const imageEditorCommands = new CommandManager();