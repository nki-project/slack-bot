import {Connection, getConnection} from "typeorm";

export abstract class Command {
    connection: Connection = getConnection("default");
    name: string;
    countArgs: number;
    typeArgs: Array<string>;

    protected constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        this.name = name;
        this.countArgs = countArgs;
        this.typeArgs = typeArgs;
    }

    abstract run(data: any): any;

    abstract initProperties(args: []) : any
}
