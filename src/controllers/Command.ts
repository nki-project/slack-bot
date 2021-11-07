export abstract class Command {
    name: string
    countArgs: number

    protected constructor(name: string,countArgs: number) {
        this.name = name;
        this.countArgs = countArgs;
    }

    abstract run(): any;

    abstract initProperties(args: []) : any
}
