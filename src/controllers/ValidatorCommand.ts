import {Command} from "./Command";


export class ValidatorCommand {

    static validate(commands: Array<Command>, data: any):any {
        const splitData = data.split(' ');
        const [nameCommand, ...properties] = splitData;
        const [commandSearch] = commands.filter(command => command.name === nameCommand);
        if(!commandSearch) throw new Error("Command not found!");

        if(properties.length!==commandSearch.countArgs) throw new Error("Invalid count args!");

        for (let indexType = 0; indexType<commandSearch.typeArgs.length; indexType++) {
            if(commandSearch.typeArgs[indexType] == 'number' && (Number(properties[indexType]) || Number(properties[indexType]) === 0) ) {
                continue;
            }else if(commandSearch.typeArgs[indexType] == 'date' && new Date(properties[indexType]).toString() !== 'Invalid Date') {
                continue;
            }
            else if(commandSearch.typeArgs[indexType] == 'string' && String(properties[indexType])) {
                continue;
            }
            throw new Error("Invalid type args!");
        }

        return commandSearch.initProperties(properties);
    }

}