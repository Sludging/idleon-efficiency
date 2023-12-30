// (b.engine.getGameAttribute("Tasks")[0] = D.getLoadJsonList("TaskZZ0")), [[60474006,4761,40796.511388888764,2,0,1610,0,45,0],[4147190.066356501,2711,90,4,218851.49605092796,535,0,37,0],[109913,1345,32,205965691,254,19354,1,26,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]
// (b.engine.getGameAttribute("Tasks")[1] = D.getLoadJsonList("TaskZZ1")),
// (b.engine.getGameAttribute("Tasks")[2] = D.getLoadJsonList("TaskZZ2")),
// (b.engine.getGameAttribute("Tasks")[3] = D.getLoadJsonList("TaskZZ3")),
// (b.engine.getGameAttribute("Tasks")[4] = D.getLoadJsonList("TaskZZ4")),
// (b.engine.getGameAttribute("Tasks")[5] = D.getLoadJsonList("TaskZZ5"));

import { GroupBy, nFormatter } from "../utility"
import { Domain, RawData } from "./base/domain"
import { initTaskDescriptionRepo, TaskDescriptionBase } from "./data/TaskDescriptionRepo"
import { initTaskShopDescRepo, TaskShopDescBase } from "./data/TaskShopDescRepo"
import { ImageData } from "./imageData"
import { Item } from "./items"
import { TaskDescriptionModel } from "./model/taskDescriptionModel"
import { TaskShopDescModel } from "./model/taskShopDescModel"

export class Task {
    name: string
    description: string
    extraStr: string
    number1: number
    descLine2: string
    numbers: number[]

    level: number = 0
    count: number = 0

    constructor(public index: number, public data: TaskDescriptionModel, public world: number) {
        this.name = data.name;
        this.description = data.description;
        this.extraStr = data.extraStr;
        this.number1 = data.number1;
        this.descLine2 = data.descLine2;
        this.numbers = data.numbers;
    }

    isDaily = () => {
        return this.descLine2 == "0";
    }

    getDescription = () => {
        let numbersIndex = this.level;
        // This only happens to the first world achievement hunter task, so we need to adjust the index matching by 1.
        if (this.extraStr == "") {
            numbersIndex += 1;
        }
        let toReturn = this.description;
        let keyValue = this.numbers[numbersIndex] ?? -1;
        if (this.level == this.numbers.length) {
            toReturn = this.descLine2.split("|").slice(-1)[0];
            keyValue = this.count;
        }
        if (toReturn.includes("{")) {
            toReturn = toReturn.replace(/{/g, nFormatter(keyValue))
        }
        if (toReturn.includes("}")) {
            toReturn = toReturn.replace("}", this.extraStr.split("|")[this.level]);
        }
        return toReturn;
    }

    getLevelImageData = (): ImageData => {
        return {
            location: `TaskRank${this.level}`,
            height: 40,
            width: 60
        }
    }

    static fromBase = (data: TaskDescriptionBase[]) => {
        let tasksHandled = 0;
        let notDaily = false;
        let worldIndex = 1;
        return data.map(task => {
            if (task.data.descLine2 == "0") {
                notDaily = false
            }
            else {
                notDaily = true
            }
            if (tasksHandled == 8 && notDaily) {
                worldIndex += 1
                tasksHandled = 0
            }
            if (tasksHandled < 8) {
                tasksHandled += 1
            }
            return new Task(task.index, task.data, worldIndex)
        })
    }
}

export class Merit {
    descLine1: string
    descLine2: string
    number1: number
    number2: number
    number3: number
    totalLevels: number
    meritCost: number
    text1: string
    text2: string
    extraStr: string
    icon: string
    bonusPerLevel: number
    world: number

    level: number = 0

    constructor(public index: number, public data: TaskShopDescModel) {
        this.descLine1 = data.descLine1;
        this.descLine2 = data.descLine2;
        this.number1 = data.number1;
        this.number2 = data.number2;
        this.number3 = data.number3;
        this.totalLevels = data.totalLevels;
        this.meritCost = data.meritCost;
        this.text1 = data.text1;
        this.text2 = data.text2;
        this.extraStr = data.extraStr;
        this.icon = data.icon;
        this.bonusPerLevel = data.bonusPerLevel;
        this.world = Math.trunc(index / 8) + 1;
    }

    getDescription = () => {
        let toReplace = this.descLine1;
        if (this.extraStr != "Blank420q") {
            toReplace = toReplace.replace(/}/, this.extraStr.split(" ")[this.level]);
        }
        else if (toReplace.includes("{")) {
            toReplace = toReplace.replace(/{/, (this.bonusPerLevel * this.level).toString());
        }
        return `${toReplace} ${this.descLine2 != "Descline2" ? this.descLine2 : ""}`
    }

    getBonus = () => {
        return this.level * this.bonusPerLevel;
    }

    getImageData = (): ImageData => {
        return {
            location: this.icon,
            width: 72,
            height: 72
        }
    }

    static fromBase = (data: TaskShopDescBase[]) => {
        return data.map(merit => new Merit(merit.index, merit.data))
    }
}

export class TaskBoard extends Domain {
    tasks: Task[] = [];
    merits: Merit[] = [];

    getRawKeys(): RawData[] {
        return [
            {key: "TaskZZ0", perPlayer: false, default: []},
            {key: "TaskZZ1", perPlayer: false, default: []},
            {key: "TaskZZ2", perPlayer: false, default: []},
            // Currently not in use.
            // {key: "TaskZZ3", perPlayer: false, default: []},
            // {key: "TaskZZ4", perPlayer: false, default: []},
            // {key: "TaskZZ5", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.tasks = Task.fromBase(initTaskDescriptionRepo());
        this.merits = Merit.fromBase(initTaskShopDescRepo());
        return this;
    }

    parse(data: Map<string, any>): void {
        const taskBoard = data.get(this.getDataKey()) as TaskBoard;
        const taskInfo0 = data.get(`TaskZZ0`) as number[][];
        const taskInfo1 = data.get(`TaskZZ1`) as number[][];
        const taskInfo2 = data.get(`TaskZZ2`) as number[][];

        const tasksByWorld = GroupBy(taskBoard.tasks, "world");
        const meritsByWorld = GroupBy(taskBoard.merits, "world");

        if (taskInfo0.length >= tasksByWorld.size && taskInfo1.length >= tasksByWorld.size) {
            tasksByWorld.forEach((world, worldIndex) => {
                world.forEach((task, taskIndex) => {
                    if (!task.isDaily()) {
                        task.count = taskInfo0[worldIndex - 1][taskIndex];
                        task.level = taskInfo1[worldIndex - 1][taskIndex];
                    }
                })
            })
        }

        if (taskInfo2.length >= meritsByWorld.size) {
            meritsByWorld.forEach((world, worldIndex) => {
                world.forEach((merit, meritIndex) => {
                    merit.level = taskInfo2[worldIndex - 1][meritIndex];
                })
            })
        }
    }
}