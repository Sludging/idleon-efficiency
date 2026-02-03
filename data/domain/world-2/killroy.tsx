import { Domain, RawData } from "../base/domain";
import { Item } from "../items";

export class KillRoy extends Domain {
    artifactFindChanceBonus: number = 0;
    farmingNextEvoChanceBonus: number = 0;
    sneakingJadeGainBonus: number = 0;
    podiumsOwnedLv2: number = 0;
    masterClassBonusDrop: number = 0;
    spelunkingExpMulti: number = 0;
    dailyCoralReefGains: number = 0;
    nextUpdateBonus: number = 0;

    thirdBattleUnlocked: boolean = false;
    
    getRawKeys(): RawData[] {
        return [
            {key: "OptLacc", perPlayer: false, default: []}
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const killRoy = data.get(this.getDataKey()) as KillRoy;
        const optionList = data.get("OptLacc") as number[];

        killRoy.artifactFindChanceBonus = 1 + optionList[228] / (300 + optionList[228]);
        killRoy.farmingNextEvoChanceBonus = 1 + 9 * (optionList[229] / (300 + optionList[229]));
        killRoy.sneakingJadeGainBonus = 1 + 2 * (optionList[230] / (300 + optionList[230]));
        killRoy.podiumsOwnedLv2 = 10 * (optionList[467] / (200 + optionList[467]));
        killRoy.masterClassBonusDrop = 1 + 1.3 * (optionList[468] / (200 +  optionList[468]));
        killRoy.spelunkingExpMulti = 1 + .8 * (optionList[469] / (150 +  optionList[469]));
        killRoy.dailyCoralReefGains = 25 * (optionList[470] / (250 +  optionList[470]));
        killRoy.nextUpdateBonus = 1 + 2 * (optionList[471] / (200 +  optionList[471]));

        killRoy.thirdBattleUnlocked = (optionList[230] == 1 ? true : false);
    }
}
