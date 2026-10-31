import { Domain, RawData } from "../base/domain";
import { initMeritocratyBonusRepo, MeritocratyBonusBase } from "../data/MeritocratyBonusRepo";
import { Item } from "../items";
import { VoteBonusModel } from "../model/voteBonusModel";
import { Clamworks } from "./clamworks";
import { Companion, getCompanionActiveBonus } from "../companions";
import { Arcade } from "../world-2/arcade";
import { EventShop } from "../eventShop";
import { LegendTalents } from "./legendTalents";
import { SushiStation } from "./sushi";
import { JellyOperator } from "./jellyOperator";
import { BallotRotation } from "../ballotRotation";

export class Meritocraty extends Domain {
    private rotation!: BallotRotation;
    private selectedCandidateSlot: number = 0;
    private savedVotePeriod: number = -1;

    clamWorkBonus: number = 0;
    companionBonus: number = 0;
    companionBonus161: number = 0;
    legendTalentBonus: number = 0;
    arcadeBonus: number = 0;
    eventShopBonus: number = 0;
    sushiBonus: number = 0;
    jellyBonus: number = 0;

    bonuses: MeritocratyBonus[] = [];
    currentBonusIndex: number = 0;
    ongoingVoteTopOptionIndex: number = 0;
    ongoingVoteMiddleOptionIndex: number = 0;
    ongoingVoteBottomOptionIndex: number = 0;

    ongoingVoteTopOptionPercent: number = 0;
    ongoingVoteMiddleOptionPercent: number = 0;
    ongoingVoteBottomOptionPercent: number = 0;

    haveReachedW7: boolean = false;
    canVote: boolean = false;

    getRawKeys(): RawData[] {
        return [
            { key: "servervars", perPlayer: false, default: {} },
            { key: "KLA_", perPlayer: true, default: [] }
        ]
    }

    init(_allItems: Item[], _charCount: number) {
        this.bonuses = MeritocratyBonus.fromBase(initMeritocratyBonusRepo());
        this.rotation = BallotRotation.forMeritocracy();

        return this;
    }

    parse(data: Map<string, any>): void {
        const meritocraty = data.get(this.getDataKey()) as Meritocraty;
        const serverVars = data.get("servervars") as Record<string, any>;
        const optionList = data.get("OptLacc") as number[];

        meritocraty.selectedCandidateSlot = Number(optionList?.[450] ?? 0);
        meritocraty.savedVotePeriod = Number(optionList?.[451] ?? -1);

        const charCount = data.get("charCount") as number;
        // Website bonuses are account-wide: a known cleared W7 portal on any character
        // qualifies the account. Missing portal data is not evidence of an unlock.
        meritocraty.haveReachedW7 = false;
        for (let playerIndex = 0; playerIndex < charCount; playerIndex++) {
            const killsLeft = (data.get(`KLA_${playerIndex}`) as number[][] | undefined)?.[250]?.[0];
            if (killsLeft !== undefined && killsLeft <= 0) {
                meritocraty.haveReachedW7 = true;
                break;
            }
        }

        meritocraty.canVote = optionList[472] == 1;
        // On startup, the game replaces the saved selection with the server's current winner.
        meritocraty.currentBonusIndex = serverVars.voteCat2?.[0] ?? 1;

        // The game server payload names these categories voteCat2.
        if (!serverVars.voteCat2 || serverVars.voteCat2.length == 0) {
            return;
        }

        meritocraty.ongoingVoteTopOptionIndex = (serverVars.voteCat2[1] ?? 0);
        meritocraty.ongoingVoteMiddleOptionIndex = (serverVars.voteCat2[2] ?? 0);
        meritocraty.ongoingVoteBottomOptionIndex = (serverVars.voteCat2[3] ?? 0);

        meritocraty.ongoingVoteTopOptionPercent = (serverVars.votePercent2[0] ?? 0);
        meritocraty.ongoingVoteMiddleOptionPercent = (serverVars.votePercent2[1] ?? 0);
        meritocraty.ongoingVoteBottomOptionPercent = (serverVars.votePercent2[2] ?? 0);
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
        if (!this.haveReachedW7) {
            // If haven't reached W7 yet, won't get any bonus from meritocraty
            return 0;
        }

        const baseValue = Math.min(1, Math.max(.25, .25 + Number(this.canVote)));
        return (1 + this.companionBonus161 / 100)
            * (baseValue + (this.clamWorkBonus
                + (this.companionBonus
                    + (this.legendTalentBonus
                        + (this.arcadeBonus
                            + (this.eventShopBonus + (this.sushiBonus + this.jellyBonus)))))) / 100);
    }
}

export const updateMeritocratyBonus = (data: Map<string, any>) => {
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const clamworks = data.get("clamworks") as Clamworks;
    const companions = data.get("companions") as Companion[];
    const arcade = data.get("arcade") as Arcade;
    const eventShop = data.get("eventShop") as EventShop;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const sushi = data.get("sushi") as SushiStation;
    const jelly = data.get("jellyOperator") as JellyOperator;

    const clamworksBonus3 = clamworks.isBonusUnlocked(3) ? 5 : 0;
    const companionBonus39 = getCompanionActiveBonus(companions, 39);
    const companionBonus161 = getCompanionActiveBonus(companions, 161);
    const legendTalentsBonus24 = legendTalents.getBonusFromIndex(24);
    const arcadeBonus59 = arcade.bonuses.find(bonus => bonus.index == 59)?.getBonus() || 0;
    const eventShopBonus23 = eventShop.isBonusOwned(23) ? 20 : 0;
    // Masago Temaki's unlock bonus applies once 52 unique Sushi are unlocked.
    const sushiBonus51 = sushi.getUniqueSushi() > 51 ? sushi.getBonusFromIndex(51) : 0;
    const jellyBonus33 = jelly.obstructions.find(obstruction => obstruction.index == 33)?.getBonus() ?? 0;

    meritocraty.clamWorkBonus = clamworksBonus3;
    meritocraty.companionBonus = companionBonus39;
    meritocraty.companionBonus161 = companionBonus161;
    meritocraty.legendTalentBonus = legendTalentsBonus24;
    meritocraty.arcadeBonus = arcadeBonus59;
    meritocraty.eventShopBonus = eventShopBonus23;
    meritocraty.sushiBonus = sushiBonus51;
    meritocraty.jellyBonus = jellyBonus33;

    return meritocraty;
}

// Reprepare the canonical producer after its dependencies settle, before Gaming.
// The ordinary registration remains available for existing earlier consumers.
export const updateMeritocratyLate = (data: Map<string, any>): Meritocraty => {
    return updateMeritocratyBonus(data);
}

export class MeritocratyBonus {
    constructor(public index: number, public data: VoteBonusModel) {}

    static fromBase(data: MeritocratyBonusBase[]) {
        return data.map(bonus => new MeritocratyBonus(bonus.index, bonus.data));
    }
}