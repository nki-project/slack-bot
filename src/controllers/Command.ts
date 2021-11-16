import {Connection, getConnection} from "typeorm";
import {bot} from "../config/bot";
import {log} from "../config/logger";

export abstract class Command {
    connection: Connection = getConnection("default");
    name: string;
    countArgs: number;
    typeArgs: Array<string>;
    bot = bot;
    flags: Array<string>;

    protected constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        this.name = name;
        this.countArgs = countArgs;
        this.typeArgs = typeArgs;
        log.info(`Register command ${this.name}`);
    }

    initFlags(flags: Array<string>) : Command {
        this.flags = [...flags];
        return this;
    }

    abstract run(data: any): any;

    abstract initProperties(args: []) : any
}
