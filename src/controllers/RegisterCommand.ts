export class RegisterCommand {

    private commandsCallback: Map<any,any> = new Map();


    register(command: string,callback: Function) {
        this.commandsCallback.set(command,callback);
    }

    //command => Function

    processCommand(command: string,args: string = "") {
        if(this.commandsCallback.has(command)) {
            this.commandsCallback.get(command)(args);
            return;
        }
        throw new Error("Command not found!");
    }
}