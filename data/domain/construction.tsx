import { Building, initBuildings } from "./buildings";

export class Construction {
    buildings: Building[] = initBuildings();
    buildingSlots: number[] = [-1,-1,-1,-1,-1,-1,-1,-1];
    cogProgress: { name: string, progress: number}[] = [
        { name: "Nooby", progress: 0},
        { name: "Decent", progress: 0},
        { name: "Superb", progress: 0},
        { name: "Ultimate", progress: 0},
    ];
}

export default function parseConstruction(towerData: number[]) {
    const construction = new Construction();
    construction.buildings.forEach((building) => {
        building.level = towerData[building.index];
        // Next level is unlocked if the next index for this building is +1.
        building.nextLevelUnlocked = (building.level + 1) == towerData[building.index + construction.buildings.length];
        // Current XP is the last set of indexes, with 12 in the middle of misc info.
        building.currentXP =  towerData[building.index + 12 + construction.buildings.length * 2];
    });
    // 55 = building slot 1 = tower number
    // 56 = building slot 2 = -1 if empty
    // 57 = building slot 3 = -1 if empty
    // 58 = building slot 4 = -1 if empty
    // 59 = building slot 5 = -1 if empty
    // 60 = building slot 6 = -1 if empty
    // 61 = building slot 7 = -1 if empty
    // 62 = building slot 8 = -1 if empty
    towerData.slice(54, 62).forEach((buildingSlot, index) => {
        construction.buildingSlots[index] = buildingSlot;
    })
    // 63 = Progress on nooby cogs
    // 64 = Progress on decent cogs
    // 65 = Progress on superb cogs
    // 66 = Progress on ultimate cogs
    towerData.slice(62, 66).forEach((cogProgress, index) => {
        construction.cogProgress[index].progress = cogProgress;
    })
    return construction;
}