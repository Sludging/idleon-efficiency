import { SedimentModel } from "../../model/sedimentModel";
import { initSedimentRepo } from "../../data/SedimentRepo";
import { Hole } from "./hole";
import { range } from "../../../utility";
import { initHoleBuildingRepo } from "../../data/HoleBuildingRepo";

export class WellSediment {
    current: number = 0;
    // Assume all sediments are unlocked, can't be bothered to find the logic for it.
    unlocked: boolean = true;
    expansions: number = 0;
    currentMax: number = 1;

    constructor(public index: number, public data: SedimentModel) { }
}

const configureUnlockMethod = (buckets: { 
    unlocked: boolean,
    unlockMethod: string,
    sedimentIndex: number
}[]) => {
    const schematicUpgrades = initHoleBuildingRepo();
    buckets.forEach((bucket, index) => {
        if (bucket.unlocked) {
            return;
        }

        // Schematics 3 to 11 are the ones that unlock the buckets.
        const upgrade = schematicUpgrades[2 + index];
        if (upgrade) {
            bucket.unlockMethod = `Schematic Upgrade: ${upgrade.data.name}`;
        }
    });

    return buckets;
}

export class Well {
    sediments: WellSediment[] = [];
    buckets: { 
        unlocked: boolean,
        unlockMethod: string,
        sedimentIndex: number
    }[] = [];   

    constructor() {
        const data = initSedimentRepo();
        data.forEach(sediment => {
            this.sediments.push(new WellSediment(sediment.index, sediment.data));
        })

        // TODO: Check how many buckets can be unlocked currently.
        this.buckets = range(0, 10).map(index => ({
            // First bucket is unlocked by default.
            unlocked: index == 0 ? true : false,
            unlockMethod: "",
            sedimentIndex: 0
        }));

        this.buckets = configureUnlockMethod(this.buckets);
    }

    parse(hole: Hole, holeData: number[][]) {
        const sedimentMulti = holeData[8];
        const currentSediment = holeData[9];
        const bucketConfiguration = holeData[10];

        this.sediments.forEach((sediment, index) => {
            sediment.current = currentSediment[index];
            sediment.expansions = sedimentMulti[index];
            sediment.currentMax = 100 * Math.pow(1.5, sediment.expansions) * (1 + sediment.data.unlockRequirement / 100);
        });

        this.buckets.forEach((bucket, index) => {
            bucket.sedimentIndex = bucketConfiguration[index];

            if (index == 0) {
                return;
            }

            const matchingSchematic = hole.schematics[2 + index];
            if (matchingSchematic && matchingSchematic.unlocked) {
                bucket.unlocked = true;
            }
        });
    }
}
