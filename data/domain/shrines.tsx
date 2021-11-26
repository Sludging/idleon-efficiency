export const ShrineConstants = {
    DmgShrine: 0,
    HpDefShrine: 1,
    CarryShrine: 3
}

export class Shrine {
    currentMap: number = 0;
    currentLevel: number = 0;
    accumulatedHours: number = 0;

    constructor(public name: string, public boost: string, public initialBonus: number, public increment: number) {}

    getBonus = (map: number | undefined = undefined) => {
        if (map && map != this.currentMap) {
            return 0;
        }

        if (this.currentLevel == 0) {
            return 0;
        }

        return this.initialBonus + ((this.currentLevel - 1) * this.increment);
    }
}

const initShrines = () => {
    return [
    new Shrine("Woodular Shrine", "Boosts Total Damage of players on this map by +%. @ AFK Time to next Lv: @", 12, 3),
    new Shrine("Isaccian Shrine", "Boosts Max HP and DEF of players on this map by +%. @ AFK Time to next Lv: @", 12, 3),
    new Shrine("Crystal Shrine", "Boosts the Lv Up Rate of all Shrines on this map by +%. @ AFK Time to next Lv: @", 20, 4),
    new Shrine("Pantheon Shrine", "Boosts Carry Capacity of players on this map by +%. @ AFK Time to next Lv: @", 10, 2),
    new Shrine("Clover Shrine", "Boosts Drop Rate of players on this map by +%. @ AFK Time to next Lv: @", 15, 3),
    new Shrine("Summereading Shrine", "Boosts ALL Exp Gain of players on this map by +%. @ AFK Time to next Lv: @", 6, 1),
    new Shrine("Crescent Shrine", "Boosts Crystal and Giant Spawn chance on this map by +%. @ AFK Time to next Lv: @", 50, 10),
    new Shrine("Undead Shrine", "Boosts Respawn Rate of monsters on this map by +%. @ AFK Time to next Lv: @", 5, 1),
    new Shrine("Primordial Shrine", "Boosts AFK Gain Rate on this map by +%, up to 80% total. @ AFK Time to next Lv: @", 5, 1),
    ];
}

export default function parseShrines(rawData: Array<Array<number>>) {
    const shrineData = initShrines(); // Initialize stamp array with all pre-populated data
    if (rawData) {
        rawData.forEach((shrine, index) => { // for each shrine
            shrineData[index].currentMap = shrine[0];
            shrineData[index].currentLevel = shrine[3];
            shrineData[index].accumulatedHours = shrine[4];
        });
    }
    shrineData.forEach((shrine) => {
        console.log(shrine.name,shrine.getBonus());
    })
    return shrineData;
}