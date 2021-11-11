import {MainController} from "./controllers/MainController";
import {RegisterCommand} from "./controllers/RegisterCommand";
import {CreateTaskController} from "./controllers/CommandsController/CreateTaskController";
import {bot} from "./config/bot";
import {RemoveTaskController} from "./controllers/CommandsController/RemoveTaskController";
import {StartTaskController} from "./controllers/CommandsController/StartTaskController";
import {StopTaskController} from "./controllers/CommandsController/StopTaskController";
import {StatusTaskController} from "./controllers/CommandsController/StatusTaskController";
import {log} from "./config/logger";
import {LiveQuotesController} from "./controllers/CustomsController/LiveQuotesController";

log.info("Init dispatcher!");

const dispatcher: RegisterCommand = new RegisterCommand();

log.info("Init main controller - main logic!");

const main : MainController = new MainController();

log.info("Register all commands!");

dispatcher.register(new CreateTaskController("!create",1, ['string']));
dispatcher.register(new RemoveTaskController("!del",1,['string']));
dispatcher.register(new StartTaskController("!start",1,['string']));
dispatcher.register(new StopTaskController("!stop",1,['string']));
dispatcher.register(new StatusTaskController("!status",1,['string']));

LiveQuotesController.startCronJobForQuotes();

main.initBotDispatcher(bot,dispatcher)

log.info("Start Server!");

main.start();