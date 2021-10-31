import { itemMap, classMap, monstersMap, mapsMap, starSignMap } from "../maps";

export interface rawPlayerData {
    equipment: Array<Map<string, string>>
    equipmentStoneData: Map<string, Map<string, number>>
    toolsStoneData: Map<string, Map<string, number>>
    stats: Array<number>
    classNumber: number
    afkTarget: number
    currentMap: number
    starSigns: Array<string>
    money: number,
    skills: Array<number>
}

export class PlayerStats {
    strength: number = 0;
    agility: number = 0;
    wisdom: number = 0;
    luck: number = 0;

    constructor() { }

    setStats(statsArray: Array<number>) {
        this.strength = statsArray[0];
        this.agility = statsArray[1];
        this.wisdom = statsArray[2];
        this.luck = statsArray[3];
    }
}

export class Item {
    raw_name: string;
    raw_item_data: any;
    icon: string;
    location: number;
    type: string;
    display_name: string;

    constructor(raw_name: string, location: number, type: string) {
        this.raw_name = raw_name;
        this.raw_item_data = itemMap.get(raw_name);
        this.location = location;
        this.type = type;
        this.display_name = this.raw_item_data?.displayName.replace(/_/g, " ") || "Unknown";
    }
}

export class Equipment extends Item {
    constructor(raw_name: string, location: number, type: string) {
        super(raw_name, location, type);
    }
}

export class Tool extends Item {
    constructor(raw_name: string, location: number, type: string) {
        super(raw_name, location, type);
    }
}

export class Food extends Item {
    constructor(raw_name: string, location: number, type: string) {
        super(raw_name, location, type);
    }
}

export class PlayerEquipment {
    equipment: Array<Item>;
    tools: Array<Item>;
    food: Array<Item>;

    constructor() {
        this.equipment = [];
        this.tools = [];
        this.food = [];
    }
}

export enum SkillsIndex {
    Mining = 1,
    Smithing = 2,
    Chopping = 3,
    Fishing = 4,
    Alchemy = 5,
    Catching = 6,
    Trapping = 7,
    Construction = 8,
    Worship = 9
}

export class Player {
    playerID: number;
    playerName: string;
    gear: PlayerEquipment = new PlayerEquipment();
    stats: PlayerStats = new PlayerStats();
    level: number = 0;
    class: string = "Blank";
    currentMonster: string = "Blank";
    currentMap: string = "Blank";
    starSigns: Array<string> = [];
    money: number = 0;
    skills: Map<SkillsIndex, number>;
    skillsRank: Map<SkillsIndex, number>;

    constructor(playerID: number, playerName: string) {
        this.playerID = playerID;
        this.playerName = playerName;
        this.skills = new Map<SkillsIndex, number>();
        this.skillsRank = new Map<SkillsIndex, number>();
    }
}


function parseEquipment(rawPlayerData: rawPlayerData) {
    let currentPlayer = new PlayerEquipment();
    rawPlayerData.equipment?.forEach((data, equipIndex) => {
        if (equipIndex == 0) { // armor 
            Object.entries(data).forEach(([location, name], _) => {
                currentPlayer.equipment.push(new Equipment(name, parseInt(location), "armor"));
            })
        }
        if (equipIndex == 1) { // tools
            Object.entries(data).forEach(([location, name], _) => {
                currentPlayer.tools.push(new Tool(name, parseInt(location), "tools"));
            })
        }
        if (equipIndex == 2) { // food
            Object.entries(data).forEach(([location, name], _) => {
                currentPlayer.food.push(new Food(name, parseInt(location), "food"));
            })
        }
    });

    return currentPlayer;
}

export default function parsePlayer(rawData: Array<rawPlayerData>, playerNames: Array<string>) {
    const allSkillsMap: Map<SkillsIndex, Array<number>> = new Map<SkillsIndex, Array<number>>();
    const parsedData = rawData.map((rawPlayerData, index) => {
        if (!playerNames) {
            console.log("Player Names is missing!");
        }
        let currentPlayer = new Player(index, playerNames ? playerNames[index] : "");
        currentPlayer.gear = parseEquipment(rawPlayerData);
        currentPlayer.stats.setStats(rawPlayerData.stats);
        currentPlayer.level = rawPlayerData.stats[4];
        if (rawPlayerData.classNumber) {
            currentPlayer.class = classMap.get(rawPlayerData.classNumber.toString())?.replace(/_/g, " ") || "New Class?";
        }
        if (rawPlayerData.afkTarget) {
            currentPlayer.currentMonster = monstersMap.get(rawPlayerData.afkTarget.toString())?.replace(/_/g, " ") || "New Monster?";
        }
        if (rawPlayerData.currentMap) {
            currentPlayer.currentMap = mapsMap.get(rawPlayerData.currentMap.toString())?.replace(/_/g, " ") || "New Map?";
        }
        if (rawPlayerData.starSigns) {
            currentPlayer.starSigns = rawPlayerData.starSigns.map((sign: string) => {
                const signData = starSignMap.get(sign);
                if (!signData) {
                    return "";
                }
                return `${signData.name.replace(/_/g, " ")} | ${signData.description.replace(/_/g, " ")}`;
            });
            // Remove empty sign, need to handle this better in the future. 
            // This is due to the array ending with a trailing ',' before the split.
            currentPlayer.starSigns = currentPlayer.starSigns.filter((sign) => { if (sign) return sign; });
        }
        if (rawPlayerData.money) {
            currentPlayer.money = rawPlayerData.money;
        }
        rawPlayerData.skills.forEach((skillLevel, skillIndex) => {
            // Only get the indexes we care about
            if (skillIndex in SkillsIndex) {
                // update the player skill level
                currentPlayer.skills.set(skillIndex as SkillsIndex, skillLevel);
                // record skill levels across all players in a map
                if (!allSkillsMap.has(skillIndex)) {
                    allSkillsMap.set(skillIndex, []);
                }
                allSkillsMap.get(skillIndex).push(skillLevel);
            }
        })
        return currentPlayer;
    });

    // identify player ranking in each skill
    parsedData.forEach((player) => {
        for (const [skillIndex, skillLevel] of player.skills) {
            const sortedList = allSkillsMap.get(skillIndex).sort((a, b) => b - a);
            const skillRank = sortedList.indexOf(skillLevel);
            player.skillsRank.set(skillIndex, skillRank);
        }
    })

    return parsedData;
}