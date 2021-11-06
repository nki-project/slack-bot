import {Command} from "../models/Command";

export class CommandController extends Command {

    constructor(name: string, countArgs: number, properties: Array<String> = []) {
        super(name,countArgs,properties);
    }

    run() : any {
       return this;
    }
}