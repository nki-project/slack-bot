import {Command} from "../Command";
import {Task} from "../../entities/Task";
import {TaskStates} from "../../entities/TaskStates";
import DateTime, {DateTimeFormat} from "../../model/DateTime";

enum FLAGS {
    L = '-l',
    LAST = '-last',
    ALL = '-all',
    NULL = 0,
    DAY = '-d'
}

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
            let tasksStates: Array<TaskStates> = await this.connection.getRepository(TaskStates).find({
                where: {
                    task: task
                }
            });

            let message = '';

            if(this.flags.every(f => f.toLowerCase() == FLAGS.L || f.toLowerCase() == FLAGS.LAST)) {
                tasksStates = [tasksStates[tasksStates.length - 1]];
                message = 'Time that was last recorded task';
            }else if(this.flags.every(f => f.toLowerCase() == FLAGS.DAY)) {
                tasksStates = tasksStates.filter(tS =>
                    new DateTime(tS.startedAt).dateTime.format(DateTimeFormat.DATE)
                    == new DateTime().dateTime.format(DateTimeFormat.DATE)
                );
                message = 'Time spent today on the task';
            }else if (this.flags.length == FLAGS.NULL || this.flags.every(f => f.toLowerCase() == FLAGS.ALL)) {
                message = 'Time spent on a task';
            }else {
                this.bot.postMessageToUser(data["userFullInfo"].name, `This command has no such flag '${this.flags[0]}'!`);
                return;
            }


            let allTimes;
            for (let taskState of tasksStates) {
                if (taskState.startedAt.length > 0 && taskState.stoppedAt.length > 0) {
                    let startDate : DateTime = new DateTime(taskState.startedAt);
                    let times = startDate.intervalTimeTo(new DateTime(taskState.stoppedAt), DateTimeFormat.FORMAT_API);
                    if (!allTimes) {
                        allTimes = new DateTime(times);
                    } else {
                        allTimes = new DateTime(allTimes.addTime(new DateTime(times), DateTimeFormat.FORMAT_API));
                    }
                }
            }
            if (allTimes != null) {
                this.bot.postMessageToUser(data["userFullInfo"].name, `${message} ${task.title} : ${allTimes.toString(DateTimeFormat.TIME)}`);
                return;
            }
        } else {
            this.bot.postMessageToUser(data["userFullInfo"].name, `Task status not completed!`);
            return;
        }
    }

}