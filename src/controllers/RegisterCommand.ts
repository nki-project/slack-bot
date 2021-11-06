import {Command} from "../models/Command";

export class RegisterCommand {

    private commands: Array<Command> = new Array<Command>();


    register(command: Command) {
       this.commands.push(command);
    }

    //command => Function

    processCommand(command: Command)  {
        return command.run();
    }

    validateRegisterCommand(name: string,countArgs: number) : Command {
       let commandSearch = null;
       for(let command of this.commands) {
           if(command.name === name) {
               commandSearch = command;
               break;
           }
       }
       if(!commandSearch) throw new Error("Command not found!");
       if(countArgs!==commandSearch.propertiesForCommand.length) throw new Error("Invalid count args!");
       return commandSearch;
    }
}