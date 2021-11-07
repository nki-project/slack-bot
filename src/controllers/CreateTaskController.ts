import {Command} from "./Command";
import {Connection, getConnection} from "typeorm";
import {Task} from "../entities/Task";

export class CreateTaskController extends Command {

    private connection: Connection = getConnection("default");

    private task?: Task

    constructor(name: string,countArgs: number) {
        super(name,countArgs);
    }

    async run()  {
       return await this.connection.getRepository(Task).save(this.task as Task);
    }

    initProperties(value: Array<string>) {
        this.task = new Task();
        this.task.title = value[0];
    }
}