import { Domain, RawData } from "../base/domain";
import { Companion, getCompanionActiveBonus } from "../companions";
import { Equinox } from "../world-3/equinox";
import { Item } from "../items";
import { Hole } from "../world-5/hole/hole";
import { Summoning } from "../world-6/summoning";
import { LegendTalents } from "../world-7/legendTalents";
import { EventShop } from "../eventShop";
import { initVoteBonusRepo, VoteBonusBase } from "../data/VoteBonusRepo";
import { VoteBonusModel } from "../model/voteBonusModel";
import { Meritocraty } from "../world-7/meritocraty";
import { Gaming } from "../world-5/gaming";
import { SushiStation } from "../world-7/sushi";

export class Votes extends Domain {
    multiFromBonuses: number = 0;
    multiFromMeritocraty: number = 0;
    multiFromCompanion161: number = 0;

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
        this.bonuses = VoteBonus.fromBase(initVoteBonusRepo());

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
        // Keep Poppy, Meritocracy, and the additive vote bonuses as separate factors in game order.
        return (1 + this.multiFromCompanion161 / 100)
            * (1 + this.multiFromMeritocraty / 100)
            * (1 + this.multiFromBonuses / 100);
    }
}

export const updateVotesBonus = (data: Map<string, any>) => {
    const equinox = data.get("equinox") as Equinox;
    const votes = data.get("votes") as Votes;
    const companions = data.get("companions") as Companion[];
    const hole = data.get("hole") as Hole;
    const summoning = data.get("summoning") as Summoning;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const eventShop = data.get("eventShop") as EventShop;
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const gaming = data.get("gaming") as Gaming;
    const sushi = data.get("sushi") as SushiStation;

    const multiFromCompanion161 = getCompanionActiveBonus(companions, 161);
    const multiFromCompanion41 = getCompanionActiveBonus(companions, 41);
    const multiFromDream13 = (equinox.upgrades[11]?.getBonus() ?? 0);
    const multiFromHoleCosmo = hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index == 24)?.getBonus() ?? 0;
    const multiFromSUmmoningWinningBonus22 = summoning.summonBonuses.find(bonus => bonus.index == 22)?.getBonus() ?? 0;
    const multiFromEventShop7 = eventShop.isBonusOwned(7) ? 17 : 0;
    const multiFromEventShop16 = eventShop.isBonusOwned(16) ? 13 : 0;
    const multiFromGamingPalette32 = gaming.getPaletteBonus(32);
    const multiFromLegendTalents22 = legendTalents.getBonusFromIndex(22);
    const multiFromCompanion19 = getCompanionActiveBonus(companions, 19);
    // RoG_BonusQTY(50, 0) returns Sushi 50's unlock bonus only after 51 unique Sushi are unlocked.
    const multiFromSushi50 = sushi.getUniqueSushi() > 50 ? sushi.getBonusFromIndex(50) : 0;
    votes.multiFromCompanion161 = multiFromCompanion161;
    votes.multiFromBonuses = multiFromCompanion41 + multiFromDream13 + multiFromHoleCosmo + multiFromSUmmoningWinningBonus22 + multiFromEventShop7 + multiFromEventShop16
        + multiFromCompanion19 + multiFromGamingPalette32 + multiFromLegendTalents22 + multiFromSushi50;


    const multiFromMeritocraty9 = meritocraty.getCurrentBonus(9);
    votes.multiFromMeritocraty = multiFromMeritocraty9;

    return votes;
}

export class VoteBonus {
    constructor(public index: number, public data: VoteBonusModel) {}

    static fromBase(data: VoteBonusBase[]) {
        return data.map(bonus => new VoteBonus(bonus.index, bonus.data));
    }
}
