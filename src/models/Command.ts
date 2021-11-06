import {CommandProperty} from "../interfaces/interface";

export class Command {
    name: string
    propertiesForCommand = Array<String>();
    properties: CommandProperty = {};

    constructor(name: string, properties: Array<String> = []) {
        this.name = name;
        this.propertiesForCommand = properties;
    }

    initProperties(properties: Array<string>) {
        for(let i = 0; i < this.propertiesForCommand.length;i++) {
            this.properties[this.propertiesForCommand[i] as string] = properties[i];
        }
    }

    run() : any {

    }
}
