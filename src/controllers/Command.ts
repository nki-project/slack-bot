export abstract class Command {
    name: string;
    countArgs: number;
    typeArgs: Array<string>;

    protected constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        this.name = name;
        this.countArgs = countArgs;
        this.typeArgs = typeArgs;
    }

    abstract run(): any;

    abstract initProperties(args: []) : any
}
