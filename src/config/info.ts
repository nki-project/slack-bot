export const information = {
    "about": "Бот-трекер который позволяет логировать время выполнения задач, очень легко расширяемый ",
    "commands": [{
        "name": "!create <title task>",
        "description": "Создать задачу"
    },{
        "name": "!start <title task>",
        "description": "Начать выполнение задачи"
    },{
        "name": "!stop <title task>",
        "description": "Поставить задачу на паузу"
    },{
        "name": "!start <title task>",
        "description": "Запустить задачу если она была остановлена"
    },{
        "name": "!time -all/<not flag> <title task>",
        "description": "Узнать количество всего времени потраченого на задачу"
    },{
        "name": "!time -l/-last <title task>",
        "description": "Узнать количество последнего сохраненного времени по задаче"
    },{
        "name": "!time -d <title task>",
        "description": "Узнать количество времени потраченгого на задачу за текущий день"
    },{
        "name": "!status <title task>",
        "description": "Получить информацию о статусе задачи"
    },{
        "name" : "!del <title task>",
        "description": "Удалить задачу"
    },{
        "name": "!quotes",
        "description": "Позволяет отправлять цитату в определенное время"
    },{
        "name": "!all",
        "description": "Команда позволяет просмотреть все задачи которые были созданы"
    }]
}