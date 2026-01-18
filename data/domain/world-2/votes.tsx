import { Domain, RawData } from "../base/domain";
import { Companion } from "../companions";
import { Equinox } from "../equinox";
import { Item } from "../items";
import { Hole } from "../world-5/hole/hole";
import { Summoning } from "../world-6/summoning";
//import { LegendTalents } from "../world-7/legendTalents"; don't keep this commented once merged
import { EventShop } from "../eventShop";
import { initVotesBonusRepo, VoteBonusBase } from "../data/VoteBonusRepo";
import { VoteBonusModel } from "../model/voteBonusModel";
import { Meritocraty } from "../world-7/meritocraty";

export class Votes extends Domain {
    multiFromBonuses: number = 0;
    multiFromMeritocraty: number = 0;

    bonuses: VoteBonus[] = [];
    currentBonusIndex: number = 0;
    ongoingVoteTopOptionIndex: number = 0;
    ongoingVoteMiddleOptionIndex: number = 0;
    ongoingVoteBottomOptionIndex: number = 0;

    ongoingVoteTopOptionPercent: number = 0;
    ongoingVoteMiddleOptionPercent: number = 0;
    ongoingVoteBottomOptionPercent: number = 0;

    getRawKeys(): RawData[] {
        return [
            { key: "servervars", perPlayer: false, default: {} },
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.bonuses = VoteBonus.fromBase(initVotesBonusRepo());

        return this;
    }

    parse(data: Map<string, any>): void {
        const votes = data.get(this.getDataKey()) as Votes;
        const serverVars = data.get("servervars") as Record<string, any>;

        // If we are missing the vote categories, we can't do anything.
        if (!serverVars.voteCategories || serverVars.voteCategories.length == 0) {
            return;
        }
        
        votes.currentBonusIndex = (serverVars.voteCategories[0] ?? 0);

        votes.ongoingVoteTopOptionIndex = (serverVars.voteCategories[1] ?? 0);
        votes.ongoingVoteMiddleOptionIndex = (serverVars.voteCategories[2] ?? 0);
        votes.ongoingVoteBottomOptionIndex = (serverVars.voteCategories[3] ?? 0);

        votes.ongoingVoteTopOptionPercent = (serverVars.votePercent[0] ?? 0);
        votes.ongoingVoteMiddleOptionPercent = (serverVars.votePercent[1] ?? 0);
        votes.ongoingVoteBottomOptionPercent = (serverVars.votePercent[2] ?? 0);
    }

    getCurrentBonus = (index: number) => {
        return this.currentBonusIndex == index ? (this.bonuses.find(bonus => bonus.index == index)?.data.bonus ?? 0) * this.getBonusMultiplier() : 0;
    }

    getBonusText = (index: number) => {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (bonus) {
            const bonusValue = bonus.data.value * this.getBonusMultiplier();
            return bonus.data.text.replace('{', bonusValue.toString()).replace('}', (1 + bonusValue/100).toString());
        }

        return "";
    }

    getBonusMultiplier = () => {
        return (1 + this.multiFromMeritocraty / 100) * (1 + this.multiFromBonuses / 100);
    }
}

export const updateVotesBonus = (data: Map<string, any>) => {
    const equinox = data.get("equinox") as Equinox;
    const votes = data.get("votes") as Votes;
    const companions = data.get("companions") as Companion[];
    const hole = data.get("hole") as Hole;
    const summoning = data.get("summoning") as Summoning;
    //const legendTalents = data.get("legendTalents") as LegendTalents; don't keep this commented once emerged
    const eventShop = data.get("eventShop") as EventShop;
    const meritocraty = data.get("meritocraty") as Meritocraty;

    const companion41 = companions.find(companion => companion.id == 41);
    const multiFromCompanion41 = companion41?.owned || false ? companion41.data.bonus : 0;
    const companion19 = companions.find(companion => companion.id == 19);
    const multiFromCompanion19 = companion19?.owned || false ? companion19.data.bonus : 0;
    const multiFromDream13 = (equinox.upgrades[11]?.getBonus() ?? 0);
    const multiFromHoleCosmo = hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index == 3)?.getBonus() ?? 0;
    const multiFromSUmmoningWinningBonus22 = summoning.summonBonuses.find(bonus => bonus.index == 22)?.getBonus() ?? 0;
    const multiFromEventShop7 = eventShop.isBonusOwned(7) ? 17 : 0;
    const multiFromEventShop16 = eventShop.isBonusOwned(16) ? 13 : 0;
    // TODO : update this once gaming palette is added
    const multiFromGamingPalette32 = 0;
    const multiFromLegendTalents22 = /*legendTalents.legendTalents.find(talent => talent.index == 22)?.getBonus() ?? don't keep this commented once merged*/ 0;

    const multiFromMeritocraty = 0;

    votes.multiFromBonuses = multiFromCompanion41 + multiFromDream13 + multiFromHoleCosmo + multiFromSUmmoningWinningBonus22 + multiFromEventShop7 + multiFromEventShop16 
        + multiFromCompanion19 + multiFromGamingPalette32 + multiFromLegendTalents22;
    votes.multiFromMeritocraty = multiFromMeritocraty;

    return votes;
}

export class VoteBonus {
    constructor(public index: number, public data: VoteBonusModel) {}

    static fromBase(data: VoteBonusBase[]) {
        return data.map(bonus => new VoteBonus(bonus.index, bonus.data));
    }
}
