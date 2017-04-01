import { CommandStack } from './commandStack';
import { Command } from '../commands/command';

export class CommandFork {

    private commands: CommandStack;
    private childrenForks: Array<CommandFork>;
    private undoLimit: number = 0;
    // private merged: boolean;

    constructor(
        private readonly id: number,
        private start: number,
        private parentFork?: CommandFork
    ) {
        this.commands = new CommandStack();
        this.childrenForks = [];
        // this.merged = false;
    }

    // wasMerged = (): boolean => {
    //     return this.merged;
    // }

    // disable = (): void => {
    //     this.merged = true;
    // }

    getId = (): number => {
        return this.id;
    }

    addChild = (fork: CommandFork): void => {
        this.childrenForks.push(fork);
    }

    getParent = (): CommandFork => {
        return this.parentFork;
    }

    setParent = (newParent: CommandFork): void => {
        this.start = this.start + newParent.getStart();
        this.parentFork = newParent;
    }

    getChildren = (): Array<CommandFork> => {
        return this.childrenForks;
    }

    getStart = (): number => {
        return this.start;
    }

    setStart = (start: number) => {
        this.start = start;
    }
    // getLength = (): number => {
    //     throw new Error("todo: get length of this stack + this.start + parent starts")
    //     //return this.commands.getLength(); 
    // }

    setUndoLimit = (): void => {
        this.undoLimit = this.commands.getLength();
    }

    getCurrentLength = (): number => {
        return this.commands.getLength();
    }

    getUndoLength = (): number => {
        return this.commands.getLength() - this.undoLimit;
    }

    getRedoLength = (): number => {
        return this.commands.getLocation();
    }

    storeCommand = (command: Command): void => {
        this.commands.push(command);
    }

    getUndoCommand = (): Command => {
        return this.commands.pop();
    }

    getRedoCommand = (): Command => {
        return this.commands.unPop();
    }

    getArchive = (): Array<Command> => {
        return this.commands.getArchive();
    }

    clearStack = (): void => {
        this.commands.clear();
    }
}