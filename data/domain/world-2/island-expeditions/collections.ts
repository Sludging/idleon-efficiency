import { initTrashIslandRewardRepo, TrashIslandRewardBase } from "../../data/TrashIslandRewardRepo";
import type { Player } from "../../player";

export class BottleCollection {
    unclaimedDays: number = 0;
    completedOmarQuests: Map<number, number> = new Map();
    selectedPlayerID: number | undefined = undefined;
    selectedCompletedOmarQuests: number = 0;
    private bottleServiceBonus: number = 0;
    private bottleUpgradeLevel: number = 0;
    private explorerBundleOwned: boolean = false;

    parse(data: Map<string, any>, characterCount: number): void {
        const options = data.get("OptLacc") as (number | string)[];
        this.unclaimedDays = Number(options[170] ?? 0);
        this.completedOmarQuests.clear();
        this.selectedPlayerID = undefined;
        this.selectedCompletedOmarQuests = 0;
        this.bottleServiceBonus = 0;
        this.bottleUpgradeLevel = 0;
        this.explorerBundleOwned = false;

        for (let playerIndex = 0; playerIndex < characterCount; playerIndex++) {
            const quests = data.get(`QuestComplete_${playerIndex}`) as Record<string, number>;
            let completedQuests = 0;
            for (let questIndex = 1; questIndex <= 6; questIndex++) {
                completedQuests += Math.max(0, Math.min(1, Number(quests[`Omar_Da_Ogar${questIndex}`] ?? 0)));
            }
            this.completedOmarQuests.set(playerIndex, completedQuests);
        }

        for (const [playerID, completedQuests] of this.completedOmarQuests) {
            if (this.selectedPlayerID === undefined
                || completedQuests > this.selectedCompletedOmarQuests
                || (completedQuests === this.selectedCompletedOmarQuests && playerID < this.selectedPlayerID)) {
                this.selectedPlayerID = playerID;
                this.selectedCompletedOmarQuests = completedQuests;
            }
        }
    }

    prepare(inputs: { bottleServiceBonus: number; bottleUpgradeLevel: number; explorerBundleOwned: boolean }): void {
        this.bottleServiceBonus = inputs.bottleServiceBonus;
        this.bottleUpgradeLevel = inputs.bottleUpgradeLevel;
        this.explorerBundleOwned = inputs.explorerBundleOwned;
    }

    getBottleGainPercent(player: Player): number {
        const completedQuests = this.completedOmarQuests.get(player.playerID) ?? 0;
        return this.bottleServiceBonus + 10 * this.bottleUpgradeLevel + 10 * completedQuests + (this.explorerBundleOwned ? 30 : 0);
    }

    // The board shows a daily rate. Each spawned bottle still contains a random amount.
    getBottlesPerDay(player: Player): number {
        return Math.floor(4 * (1 + this.getBottleGainPercent(player) / 100));
    }

    get pendingBottleActors(): number {
        const days = this.unclaimedDays;
        if (days < 1) {
            return 0;
        }
        return Math.ceil(Math.min(16, days < 14 ? days : Math.sqrt(8 * days)));
    }
}

export class TrashIsland {
    garbage: number = 0;
    unclaimedDays: number = 0;
    garbageGainLevel: number = 0;
    bottleGainLevel: number = 0;
    bribeSetUnlocked: boolean = false;
    rewards: TrashIslandRewardBase[] = [];

    init(): void {
        this.rewards = initTrashIslandRewardRepo();
    }

    parse(options: (number | string)[]): void {
        this.unclaimedDays = Number(options[160] ?? 0);
        this.garbage = Number(options[161] ?? 0);
        this.garbageGainLevel = Number(options[163] ?? 0);
        this.bottleGainLevel = Number(options[164] ?? 0);
        this.bribeSetUnlocked = Number(options[165] ?? 0) === 1;
    }

    getNextCost(index: number): number {
        const reward = this.rewards[index].data;
        if (reward.costGrowth === undefined) {
            return reward.baseCost;
        }

        const level = index === 4 ? this.garbageGainLevel : index === 6 ? this.bottleGainLevel : 0;
        return reward.baseCost * reward.costGrowth ** level;
    }

    get garbageGainPercent(): number {
        return this.getGarbageGainPercent();
    }

    get bottleGainPercent(): number {
        return this.getBottleGainPercent();
    }

    getGarbageGainPercent(level: number = this.garbageGainLevel): number {
        return 20 * level;
    }

    getBottleGainPercent(level: number = this.bottleGainLevel): number {
        return 10 * level;
    }
}

export class CrystalIsland {
    unclaimedDays: number = 0;
    readonly dayCap: number = 14;

    parse(options: (number | string)[]): void {
        this.unclaimedDays = Number(options[171] ?? 0);
    }

    get mobsWaiting(): number {
        const days = this.unclaimedDays;
        if (days <= 0) {
            return 0;
        }
        // The capped branch intentionally gives fewer mobs than thirteen pending days.
        return Math.ceil(days < this.dayCap ? 1 + 2 * days : Math.sqrt(16 * days));
    }
}
