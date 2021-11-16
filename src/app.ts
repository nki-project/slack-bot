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
import {InfoController} from "./controllers/CommandsController/InfoController";
import {TimeTaskController} from "./controllers/CommandsController/TimeTaskController";
import {AllTasksController} from "./controllers/CommandsController/AllTasksController";

log.info("Init dispatcher!");

const dispatcher: RegisterCommand = new RegisterCommand();

log.info("Init main controller - main logic!");

const main : MainController = new MainController();

log.info("Register all commands!");

dispatcher.register(new CreateTaskController("!create",1, ['string']));
dispatcher.register(new RemoveTaskController("!del",1,['string']));
dispatcher.register(new StartTaskController("!start",1,['string']));
dispatcher.register(new StopTaskController("!stop",1,['string']));
dispatcher.register(new TimeTaskController("!time",1,['string']));
dispatcher.register(new StatusTaskController("!status",1,['string']));
//dispatcher.register(new LiveQuotesController("!quotes",0,[]));
dispatcher.register(new InfoController("!info",0,[]));
dispatcher.register(new AllTasksController("!all",0,[]));

main.initBotDispatcher(bot,dispatcher)

log.info("Start Server!");

main.start();