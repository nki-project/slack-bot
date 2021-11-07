import {Command} from "./Command";
import {Connection, getConnection} from "typeorm";
import {Task} from "../entities/Task";

export class CreateTaskController extends Command {

    private connection: Connection = getConnection("default");

    public task: Task|null = null

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name, countArgs, typeArgs);
    }

    async run()  {
       return await this.connection.getRepository(Task).save(this.task as Task);
    }

    initProperties(value: Array<string>) {
        this.task = new Task();
        this.task.title = value[0];
        return this;
    }
}