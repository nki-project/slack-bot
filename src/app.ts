import {MainController} from "./controllers/MainController";
import {RegisterCommand} from "./controllers/RegisterCommand";
import {CreateTaskController} from "./controllers/CommandsController/CreateTaskController";
import {bot} from "./config/bot";
import {RemoveTaskController} from "./controllers/CommandsController/RemoveTaskController";

const dispatcher: RegisterCommand = new RegisterCommand();

const main : MainController = new MainController();

dispatcher.register(new CreateTaskController("!cr",1, ['number']))
dispatcher.register(new RemoveTaskController("!d",1,['number']))

main.initBotDispatcher(bot,dispatcher)

main.start();