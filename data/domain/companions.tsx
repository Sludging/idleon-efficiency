import { CompanionBase, initCompanionRepo } from "./data/CompanionRepo";
import { EnemyInfo } from "./enemies";
import { ImageData } from "./imageData";
import { CompanionModel } from "./model/companionModel";

export class Companion {
    owned: boolean = false;
    constructor(public id: number, public data: CompanionModel, public imageData: ImageData) { }

    getBonus = () => {
        return this.data.desc.replace(/{/g, "+");
    } 

    static fromBase(data: CompanionBase[]) {
        return data.map(c => {
            const enemy = EnemyInfo.find(enemy => enemy.id == c.data.id);
            const imageData = { location: enemy?.id.toLowerCase() ?? "Unknown", width: 67, height: 67 }

            return new Companion(c.index, c.data, imageData);
        });
    }
}

export default function parseCompanions(ownedCompanions: number[]) {
    const companions = Companion.fromBase(initCompanionRepo());

    ownedCompanions.forEach(owned => {
        const matchingCompanion = companions.find(c => c.id === owned);
        if (matchingCompanion) {
            matchingCompanion.owned = true;
        }
    });

    return companions;
}