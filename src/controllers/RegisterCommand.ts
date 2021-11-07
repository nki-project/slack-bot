import {Command} from "./Command";

export class RegisterCommand {

    private commands: Array<Command> = new Array<Command>();


    register(command: Command) {
       this.commands.push(command);
    }

    //command => Function

    processCommand(command: Command)  {
        return command.run();
    }
}