import {Command} from "../Command";
import {Task} from "../../entities/Task";
import {TaskStates} from "../../entities/TaskStates";
import {getManager} from "typeorm";
import DateTime from "../../model/DateTime";

export class StopTaskController extends Command {

    private id: string

    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name, countArgs, typeArgs);
    }

    initProperties(args: Array<String>): any {
        this.id = args[0].toString();
        return this;
    }

    async run(data: any) {
        const task: Task = await this.connection.getRepository(Task)
            .findOne({where: {userId: data.user, title: this.id}});
        if (!task) {
            this.bot.postMessageToUser(data["userFullInfo"].name, `Task with name ${this.id} not found!`);
            return;
        }
        if (!task.isStarted) {
            this.bot.postMessageToUser(data["userFullInfo"].name, `Task with name ${this.id} has not started yet`);
            return;
        } else if (task.isStopped) {
            this.bot.postMessageToUser(data["userFullInfo"].name, `Task with name ${this.id} already stopped!`);
            return;
        }

        task.isStopped = true;
        await this.connection.getRepository(Task).save(task);

        //TODO найти последнюю задачу и поставить последнее время остановки

        const result = await getManager().query("SELECT * FROM  task_states ORDER BY id desc");

        let lastTask;
        for(let value of result) {
            if(value.taskId == task.id) {
                lastTask = value;
                break;
            }
        }

        const taskUpdate: TaskStates = await this.connection.getRepository(TaskStates)
            .findOne({where:{id:lastTask.id,task:task.id}});
        taskUpdate.stoppedAt = new DateTime().toString();

        await this.connection.getRepository(TaskStates).save(taskUpdate);

        this.bot.postMessageToUser(data["userFullInfo"].name,`Task with name ${this.id} successfully stopped!`);
    }
}
