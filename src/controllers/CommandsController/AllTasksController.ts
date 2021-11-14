import {Command} from "../Command";
import {Task} from "../../entities/Task";

export class AllTasksController extends Command {

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name, countArgs, typeArgs);
    }

    initProperties(args: []): any {
        return this;
    }

    async run(data: any) {

        const tasks: Array<Task> = await this.connection
            .getRepository(Task).find({where:{userId:data.user}});

        if(tasks.length === 0) {
            this.bot.postMessageToUser(data["userFullInfo"].name,"You have no tasks!");
            return;
        }
        let taskLines = [];

        for(let task of tasks) {
            taskLines.push(`Id: ${task.id}; Title task: ${task.title}; Created_at: ${task.createdAt}`);
        }

        this.bot.postMessageToUser(data["userFullInfo"].name,taskLines.join("\n"));
    }

}