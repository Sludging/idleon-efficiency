import { Domain, RawData } from "../base/domain";
import { initVotesBonusRepo, VoteBonusBase } from "../data/VoteBonusRepo";
import { Equinox } from "../equinox";
import { Item } from "../items";
import { VoteBonusModel } from "../model/voteBonusModel";

export class Votes extends Domain {
    multiFromEquinox: number = 0;
    multiFromSummoning: number = 0;
    multiFromHole: number = 0;
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
        return 1 + (this.multiFromEquinox + this.multiFromSummoning + this.multiFromHole) / 100;
    }
}

export const updateVotesBonus = (data: Map<string, any>) => {
    const equinox = data.get("equinox") as Equinox;
    const votes = data.get("votes") as Votes;

    votes.multiFromEquinox = (equinox.upgrades[11]?.getBonus() ?? 0);
    votes.multiFromHole = 0; // TODO : Need to update this once Hole have been implemanted
}

export class VoteBonus {
    constructor(public index: number, public data: VoteBonusModel) {}

    static fromBase(data: VoteBonusBase[]) {
        return data.map(bonus => new VoteBonus(bonus.index, bonus.data));
    }
}
