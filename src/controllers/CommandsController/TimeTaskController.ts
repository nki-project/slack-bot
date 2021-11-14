import {Command} from "../Command";
import {Task} from "../../entities/Task";
import {TaskStates} from "../../entities/TaskStates";
import DateTime, {DateTimeFormat} from "../../model/DateTime";

export class TimeTaskController extends Command {

    private id: string


    constructor(name: string, countArgs: number, typeArgs: Array<string>) {
        super(name, countArgs, typeArgs);
    }

    initProperties(args: Array<String>): any {
        this.id = args[0].toString();
        return this;
    }

    async run(data: any) {
        const task: Task = await this.connection.getRepository(Task).findOne({
            where: {
                title: this.id, userId: data.user
            }
        });

        if (!task) {
            this.bot.postMessageToUser(data["userFullInfo"].name, `Task with name ${this.id} not found!`);
            return;
        }

        if (task.isStarted && task.isStopped) {
            const tasksStates: Array<TaskStates> = await this.connection.getRepository(TaskStates).find({
                where: {
                    task: task
                }
            });


            let allTimes;
            for (let taskState of tasksStates) {
                if (taskState.startedAt.length > 0 && taskState.stoppedAt.length > 0) {
                    let startDate = new DateTime(taskState.startedAt);
                    let times = startDate.intervalTimeTo(new DateTime(taskState.stoppedAt), DateTimeFormat.FORMAT_API);
                    if (!allTimes) {
                        allTimes = new DateTime(times);
                    } else {
                        allTimes = new DateTime(allTimes.addTime(new DateTime(times), DateTimeFormat.FORMAT_API));
                    }
                }
            }

            if (allTimes != null) {
                this.bot.postMessageToUser(data["userFullInfo"].name, `Time spent on a task ${task.title} : ${allTimes.toString(DateTimeFormat.TIME)}`);
                return;
            }
        } else {
            this.bot.postMessageToUser(data["userFullInfo"].name, `Task status not completed!`);
            return;
        }
    }

}