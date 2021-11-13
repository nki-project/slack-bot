import {Command} from "./Command";
import {log} from "../config/logger";

export class RegisterCommand {

    private commands: Array<Command> = new Array<Command>();


    register(command: Command) {
       this.commands.push(command);
    }

    //command => Function

    processCommand(command: Command,data: any,userFullInfo: any)  {
        try {
            data["userFullInfo"] = userFullInfo;
            return command.run(data);
        }
        catch(e : any) {
            log.error(e.message.toString());
        }
    }
}