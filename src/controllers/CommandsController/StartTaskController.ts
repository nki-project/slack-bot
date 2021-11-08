import {Command} from "../Command";
import {Task} from "../../entities/Task";

export class StartTaskController extends Command {

    private id: string

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name,countArgs,typeArgs);
    }

    initProperties(args: Array<String>): any {
        this.id = args[0].toString();
        return this;
    }

    async run(data: any) {
        const task: Task = await this.connection.getRepository(Task).findOne({
            where: {
                userId: data.user,
                title: this.id
            }
        });
        const users = await this.bot.getUsers();
        const userSearch = users.members.find((v: any) => v.id == data.user);
        if(!task) {
            this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} not found!`);
            return;
        }
        if(task.isStopped) {
            this.bot.postMessageToUser(userSearch.name,`Please unpause the task ${this.id}`);
        }
        else if(task.isStarted) {
            this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} already started!`);
            return;
        }
        task.startedAt = new Date();
        task.isStarted = true;
        await this.connection.getRepository(Task).save(task);
        this.bot.postMessageToUser(userSearch.name,`Task with name ${this.id} successfully started!`);
    }

}