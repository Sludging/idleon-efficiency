import { Domain, RawData } from "../base/domain";
import { range } from "../../utility";
import { initMeritocratyBonusRepo, MeritocratyBonusBase } from "../data/MeritocratyBonusRepo";
import { Item } from "../items";
import { VoteBonusModel } from "../model/voteBonusModel";
import { Clamworks } from "./clamworks";
import { Companion } from "../companions";
import { Arcade } from "../world-2/arcade";
import { EventShop } from "../eventShop";
import { LegendTalents } from "./legendTalents";

export class Meritocraty extends Domain {
    clamWorkBonus: number = 0;
    companionBonus: number = 0;
    legendTalentBonus: number = 0;
    arcadeBonus: number = 0;
    eventShopBonus: number = 0;

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

        return this;
    }

    parse(data: Map<string, any>): void {
        const meritocraty = data.get(this.getDataKey()) as Meritocraty;
        const serverVars = data.get("servervars") as Record<string, any>;
        const optionList = data.get("OptLacc") as number[];

        const charCount = data.get("charCount") as number;
        const klaData = range(0, charCount).map((_, i) => { return data.get(`KLA_${i}`) }) as number[][][];

        // Not sure how it's managed when one character have gone to the W7 town and some others haven't, so to be sure just check every char
        meritocraty.haveReachedW7 = klaData.some((playerKillData) => 0 <= (playerKillData[250][0] || 1));

        meritocraty.canVote = (optionList[472] || 0) == 1;

        // If we are missing the vote categories, we can't do anything.
        if (!serverVars.voteCategories2 || serverVars.voteCategories2.length == 0) {
            return;
        }
        
        meritocraty.currentBonusIndex = (serverVars.voteCategories2[0] ?? 0);

        meritocraty.ongoingVoteTopOptionIndex = (serverVars.voteCategories2[1] ?? 0);
        meritocraty.ongoingVoteMiddleOptionIndex = (serverVars.voteCategories2[2] ?? 0);
        meritocraty.ongoingVoteBottomOptionIndex = (serverVars.voteCategories2[3] ?? 0);

        meritocraty.ongoingVoteTopOptionPercent = (serverVars.votePercent2[0] ?? 0);
        meritocraty.ongoingVoteMiddleOptionPercent = (serverVars.votePercent2[1] ?? 0);
        meritocraty.ongoingVoteBottomOptionPercent = (serverVars.votePercent2[2] ?? 0);
    }

    getCurrentBonus = (index: number) => {
        return this.currentBonusIndex == index ? (this.bonuses.find(bonus => bonus.index == index)?.data.bonus ?? 0) * this.getBonusMultiplier() : 0;
    }

    getBonusMultiplier = () => {
        if (!this.haveReachedW7) {
            // If haven't reached W7 yet, won't get any bonus from meritocraty
            return 0;
        }

        const baseValue = this.canVote ? 1 : .25;
        // For some reason the Event Shop bonus is only included if the player can vote
        return baseValue + (this.clamWorkBonus + this.companionBonus + this.legendTalentBonus + this.arcadeBonus + (this.canVote ? this.eventShopBonus : 0)) / 100;
    }
}

export const updateMeritocratyBonus = (data: Map<string, any>) => {
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const clamworks = data.get("clamworks") as Clamworks;
    const companions = data.get("companions") as Companion[];
    const arcade = data.get("arcade") as Arcade;
    const eventShop = data.get("eventShop") as EventShop;
    const legendTalents = data.get("legendTalents") as LegendTalents;

    const clamworksBonus3 = clamworks.isBonusUnlocked(3) ? 5 : 0;
    const companionBonus39 = companions.find(companion => companion.id == 39)?.owned || false ? companions.find(companion => companion.id == 39)?.data.bonus || 0 : 0;
    const legendTalentsBonus24 = legendTalents.getBonusFromIndex(24);
    const arcadeBonus59 = arcade.bonuses.find(bonus => bonus.index == 59)?.getBonus() || 0;
    const eventShopBonus23 = eventShop.isBonusOwned(23) ? 20 : 0;

    meritocraty.clamWorkBonus = clamworksBonus3;
    meritocraty.companionBonus = companionBonus39;
    meritocraty.legendTalentBonus = legendTalentsBonus24;
    meritocraty.arcadeBonus = arcadeBonus59;
    meritocraty.eventShopBonus = eventShopBonus23;

    return meritocraty;
}

export class MeritocratyBonus {
    constructor(public index: number, public data: VoteBonusModel) {}

    static fromBase(data: MeritocratyBonusBase[]) {
        return data.map(bonus => new MeritocratyBonus(bonus.index, bonus.data));
    }
}