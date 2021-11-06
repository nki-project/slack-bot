import {CommandProperty} from "../interfaces/interface";

export abstract class Command {
    name: string
    propertiesForCommand = Array<String>();
    properties: CommandProperty = {};

    protected constructor(name: string, properties: Array<String> = []) {
        this.name = name;
        this.propertiesForCommand = properties;
    }

    initProperties(properties: Array<string>) {
        for(let i = 0; i < this.propertiesForCommand.length;i++) {
            this.properties[this.propertiesForCommand[i] as string] = properties[i];
        }
    }

    abstract run(): any;
}
