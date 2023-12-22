import { Domain, RawData } from "./base/domain";
import { ConstellationBase, initConstellationsRepo } from "./data/ConstellationsRepo";
import { Item } from "./items";
import { ConstellationModel } from "./model/constellationModel";

export class Constellation {
    isComplete: boolean = false;
    completedByPlayerIndex: number[] = []

    constructor(public index: number, public data: ConstellationModel) { }

    static fromBase = (data: ConstellationBase[]) => {
        return data.map(constellation => new Constellation(constellation.index, constellation.data))
    }
}

export class Constellations extends Domain {

    getRawKeys(): RawData[] {
        return [
            { key: "SSprog", perPlayer: false, default: [] }
        ]
    }

    init(allItems: Item[], charCount: number) {
        return Constellation.fromBase(initConstellationsRepo());
    }

    parse(data: Map<string, any>): void {
        const constellations = data.get(this.getDataKey()) as Constellation[];
        const constellationData = data.get("SSprog") as any[][];

        function playerLetterToIndex(letter: any) {
            switch (letter) {
                case "_": return 0;
                case "a": return 1;
                case "b": return 2;
                case "c": return 3;
                case "d": return 4;
                case "e": return 5;
                case "f": return 6;
                case "g": return 7;
                case "h": return 8;
                case "i": return 9;
                default: return -1;
            }
        }
        constellations.forEach(constellation => {
            constellation.isComplete = constellationData && constellationData[constellation.index][1] == "1";
            if (constellationData[constellation.index][0]) { // Add a null check because, somehow it can be null sometimes for no reason.
                constellation.completedByPlayerIndex = constellationData[constellation.index][0].split("").map((playerLetter: any) => { return playerLetterToIndex(playerLetter) });
            }
        })
    }

}