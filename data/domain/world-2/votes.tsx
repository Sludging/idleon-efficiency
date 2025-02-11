import { Domain, RawData } from "../base/domain";
import { Equinox } from "../equinox";
import { Item } from "../items";
import { Summoning } from "../world-6/summoning";

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

    init(allItems: Item[], charCount: number) {
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

        votes.bonuses.push(new VoteBonus(0,"All your characters deal }x more damage to enemies",25,0));
        votes.bonuses.push(new VoteBonus(1,"All your characters deal }x more damage to enemies",25,0));
        votes.bonuses.push(new VoteBonus(2,"Increases STR AGI WIS and LUK for all characters by +{%",15,0));
        votes.bonuses.push(new VoteBonus(3,"Increases Defence and Accuracy by +{% for all characters",30,0));
        votes.bonuses.push(new VoteBonus(4,"Logging in each day gives +{ more GP to your guild than you normally do",30,0));
        votes.bonuses.push(new VoteBonus(5,"}x Kill per Kill, making monster kills worth more for portals and Deathnote",20,0));
        votes.bonuses.push(new VoteBonus(6,"+{% AFK gain for both fighting and skills for all characters",15,0));
        votes.bonuses.push(new VoteBonus(7,"Boosts all Mining EXP gain and Mining Efficiency by +{%",42,0));
        votes.bonuses.push(new VoteBonus(8,"Boosts all Fishing EXP gain and Fishing Efficiency by +{%",50,0));
        votes.bonuses.push(new VoteBonus(9,"Boosts all Choppin' EXP gain and Choppin' Efficiency by +{%",38,0));
        votes.bonuses.push(new VoteBonus(10,"Boosts all Catching EXP gain and Catching Efficiency by +{%",46,0));
        votes.bonuses.push(new VoteBonus(11,"Increases the amount of resources produced by the 3D Printer by }x",20,3));
        votes.bonuses.push(new VoteBonus(12,"Boosts liquid generation rate for all Alchemy liquids by +{%",25,0));
        votes.bonuses.push(new VoteBonus(13,"Boosts all Cooking EXP gain and Cooking Speed by +{%",63,4));
        votes.bonuses.push(new VoteBonus(14,"Boosts Dungeon Credit and Dungeon Flurbo gain by }x",50,0));
        votes.bonuses.push(new VoteBonus(15,"All your characters gain +{% more Class EXP from monsters",60,0));
        votes.bonuses.push(new VoteBonus(16,"Speeds up Egg Incubation time and Breeding EXP gain by +{%",50,4));
        votes.bonuses.push(new VoteBonus(17,"Boosts Sigil EXP gain by }x, still requires Sigils active in Lab",80,4));
        votes.bonuses.push(new VoteBonus(18,"Boosts Construction Build Rate and Construction EXP gain by +{%",40,3));
        votes.bonuses.push(new VoteBonus(19,"Boosts Shrine EXP gain by a staggering }x",53,3));
        votes.bonuses.push(new VoteBonus(20,"Boosts Artifact Find chance in Sailing by }x",31,5));
        votes.bonuses.push(new VoteBonus(21,"Boosts New Species chance when using DNA in Gaming by }x",80,5));
        votes.bonuses.push(new VoteBonus(22,"Find +{% more Gold Nuggets when digging with the Shovel in Gaming",75,5));
        votes.bonuses.push(new VoteBonus(23,"Boosts Divinity PTS gain by }x and Divinity EXP Gain by +{%",60,5));
        votes.bonuses.push(new VoteBonus(24,"Boosts Sailing Captain EXP gain and Sailing Speed by }x",50,5));
        votes.bonuses.push(new VoteBonus(25,"Boosts Sneaking Stealth by }x and EXP Gain by +{% for all your Ninja Twins",65,6));
        votes.bonuses.push(new VoteBonus(26,"Boosts bonuses from all Golden Food by +{%",30,0));
        votes.bonuses.push(new VoteBonus(27,"Increases Drop Rate for all your characters by +{%",38,0));
        votes.bonuses.push(new VoteBonus(28,"Boosts Summoning EXP gain by +{% and all Essence gained by }x",40,6));
        votes.bonuses.push(new VoteBonus(29,"Boosts Crop Value, and Farming EXP gain, AND Next Crop Chance by +{%",40,6));
        votes.bonuses.push(new VoteBonus(30,"Increases Trapping EXP gain and Worship EXP gain by +{%",54,3));
        votes.bonuses.push(new VoteBonus(31,"Increases Lab EXP gain by +{%",90,4));
        votes.bonuses.push(new VoteBonus(32,"Boosts Equinox Bar Fill rate by }x",40,3));
        votes.bonuses.push(new VoteBonus(33,"Boosts Refinery Cycle Speed by +{%",50,3));
        votes.bonuses.push(new VoteBonus(34,"Increases cash earned from monsters by +{%",52,0));
    }

    getCurrentBonus = (index: number) => {
        return this.currentBonusIndex == index ? (this.bonuses.find(bonus => bonus.index == index)?.bonus ?? 0) * this.getBonusMultiplier() : 0;
    }

    getBonusText = (index: number) => {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (bonus) {
            const bonusValue = bonus.value * this.getBonusMultiplier();
            return bonus.text.replace('{', bonusValue.toString()).replace('}', (1 + bonusValue/100).toString());
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
    constructor(public index: number, public text: string, public bonus: number, public value: number) {}
}