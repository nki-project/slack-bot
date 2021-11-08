import {MainController} from "./controllers/MainController";
import {RegisterCommand} from "./controllers/RegisterCommand";
import {CreateTaskController} from "./controllers/CommandsController/CreateTaskController";
import {bot} from "./config/bot";
import {RemoveTaskController} from "./controllers/CommandsController/RemoveTaskController";
import {StartTaskController} from "./controllers/CommandsController/StartTaskController";

const dispatcher: RegisterCommand = new RegisterCommand();

const main : MainController = new MainController();

dispatcher.register(new CreateTaskController("!cr",1, ['string']));
dispatcher.register(new RemoveTaskController("!d",1,['string']));
dispatcher.register(new StartTaskController("!s",1,['string']));

main.initBotDispatcher(bot,dispatcher)

main.start();