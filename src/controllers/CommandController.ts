import {Command} from "./Command";

export class CommandController extends Command {

    constructor(name: string, properties: Array<String> = []) {
        super(name,properties);
    }

    run() : any {
       return this;
    }
}