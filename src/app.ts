import {MainController} from "./controllers/MainController";
import {RegisterCommand} from "./controllers/RegisterCommand";
import {CreateTaskController} from "./controllers/CommandsController/CreateTaskController";
import {bot} from "./config/bot";
import {RemoveTaskController} from "./controllers/CommandsController/RemoveTaskController";
import {StartTaskController} from "./controllers/CommandsController/StartTaskController";
import {StopTaskController} from "./controllers/CommandsController/StopTaskController";

const dispatcher: RegisterCommand = new RegisterCommand();

const main : MainController = new MainController();

dispatcher.register(new CreateTaskController("!create",1, ['string']));
dispatcher.register(new RemoveTaskController("!del",1,['string']));
dispatcher.register(new StartTaskController("!start",1,['string']));
dispatcher.register(new StopTaskController("!stop",1,['string']));


main.initBotDispatcher(bot,dispatcher)

main.start();