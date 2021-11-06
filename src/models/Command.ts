import {CommandProperty} from "../interfaces/interface";

export class Command {
    name: string
    countArgs: number
    propertiesForCommand = Array<String>();
    properties: CommandProperty

    constructor(name: string, countArgs: number, properties: Array<String> = []) {
        this.name = name;
        this.countArgs = countArgs;
        this.propertiesForCommand = properties;

        if(this.countArgs!==this.propertiesForCommand.length) {
            throw new Error("CountArgs === propertiesForCommand");
        }

        this.properties = {};
    }

    initProperties(properties: Array<string>) {
        for(let i = 0; i < this.propertiesForCommand.length;i++) {
            this.properties[this.propertiesForCommand[i] as string] = properties[i];
        }
    }

    run() : any {

    }
}
