import { Domain, RawData } from "../base/domain";
import { Item } from "../items";

export const FractIslandBonusesThresholds = [
    24,
    200,
    750,
    2500,
    1E4,
    2E4,
    4E4,
    6E4,
]

export class IslandExpeditions extends Domain {
    bonusToShovelSpeed: number = 0;
    reductionToKitchenCosts: number = 0;
    bonusStarTalentPoints: number = 0;

    getRawKeys(): RawData[] {
        return [
            {key: "OptLacc", perPlayer: false, default: []}
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const expeditions = data.get(this.getDataKey()) as IslandExpeditions;
        const optionList = data.get("OptLacc") as number[];

        expeditions.bonusToShovelSpeed = optionList[184] >= FractIslandBonusesThresholds[4] ? 25 : 0;
        expeditions.reductionToKitchenCosts = optionList[184] >= FractIslandBonusesThresholds[2] ? 30 : 0;
        expeditions.bonusStarTalentPoints = optionList[184] >= FractIslandBonusesThresholds[5] ? 100 : 0;
    }
}
