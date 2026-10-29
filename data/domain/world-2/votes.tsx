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
import { BallotRotation } from "../ballotRotation";

export class Votes extends Domain {
    private rotation!: BallotRotation;
    private selectedCandidateSlot: number = 0;
    private savedVotePeriod: number = -1;

    multiFromBonuses: number = 0;
    multiFromMeritocraty: number = 0;
    multiFromCompanion161: number = 0;
    bonusSources = {
        crystalCuttlefish: 0,
        equinox: 0,
        cosmo: 0,
        summoning: 0,
        eventShop7: 0,
        eventShop16: 0,
        mashedPotato: 0,
        palette: 0,
        legendTalent: 0,
        sushi: 0,
    };

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
        this.rotation = BallotRotation.forBonusBallot();

        return this;
    }

    parse(data: Map<string, any>): void {
        const votes = data.get(this.getDataKey()) as Votes;
        const serverVars = data.get("servervars") as Record<string, any>;
        const optionList = data.get("OptLacc") as number[] | undefined;

        votes.selectedCandidateSlot = Number(optionList?.[308] ?? 0);
        votes.savedVotePeriod = Number(optionList?.[309] ?? -1);

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

    getNextRotationAt(unixTimeSeconds: number): number {
        return this.rotation.getNextRotationAt(unixTimeSeconds);
    }

    hasVotedThisWeek(unixTimeSeconds: number): boolean {
        return Number.isInteger(this.selectedCandidateSlot)
            && this.selectedCandidateSlot >= 1
            && this.selectedCandidateSlot <= 3
            && this.savedVotePeriod === this.rotation.getPeriod(unixTimeSeconds);
    }

    getCurrentBonus = (index: number) => {
        return this.currentBonusIndex == index ? (this.bonuses.find(bonus => bonus.index == index)?.data.bonus ?? 0) * this.getBonusMultiplier() : 0;
    }

    getPotentialBonus = (index: number): number => {
        return (this.bonuses.find(bonus => bonus.index == index)?.data.bonus ?? 0) * this.getBonusMultiplier();
    }

    getPotentialBonusMultiplier = (index: number): number => {
        return 1 + this.getPotentialBonus(index) / 100;
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
    // Masago's unlock bonus applies only after 51 unique Sushi are unlocked.
    const multiFromSushi50 = sushi.getUniqueSushi() > 50 ? sushi.getBonusFromIndex(50) : 0;
    votes.bonusSources.crystalCuttlefish = multiFromCompanion41;
    votes.bonusSources.equinox = multiFromDream13;
    votes.bonusSources.cosmo = multiFromHoleCosmo;
    votes.bonusSources.summoning = multiFromSUmmoningWinningBonus22;
    votes.bonusSources.eventShop7 = multiFromEventShop7;
    votes.bonusSources.eventShop16 = multiFromEventShop16;
    votes.bonusSources.mashedPotato = multiFromCompanion19;
    votes.bonusSources.palette = multiFromGamingPalette32;
    votes.bonusSources.legendTalent = multiFromLegendTalents22;
    votes.bonusSources.sushi = multiFromSushi50;
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
