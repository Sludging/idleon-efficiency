import { lavaLog, lavaLog2 } from "../../../utility";
import { initGambitBonusRepo } from "../../data/GambitBonusRepo";
import { GambitBonusModel } from "../../model/gambitBonusModel";

export enum GambitLevelIndex {
    King = 0,
    Horse = 1,
    Bishop = 2,
    Queen = 3,
    Tower = 4,
    Pawn = 5
}

const gambitLevelMetadata = {
    [GambitLevelIndex.King]: {
        name: "King's Gambit",
        description: "Survive as long as you can...",
    },
    [GambitLevelIndex.Horse]: {
        name: "Horsey's Gambit",
        description: "You have but one HP...",
    },
    [GambitLevelIndex.Bishop]: {
        name: "Bishop's Gambit",
        description: "Damage done to me is done to thee...",
    },  
    [GambitLevelIndex.Queen]: {
        name: "Queen's Gambit",
        description: "Jewels everywhere...",
    },
    [GambitLevelIndex.Tower]: {
        name: "Castle's Gambit",
        description: "One lane, one outcome...",
    },
    [GambitLevelIndex.Pawn]: {
        name: "Noobs' Gambit",
        description: "I like the grey ones!!!",
    },
}

export class GambitLevel {
    maxTime: number = 0; // in seconds, will have decimals

    constructor(public index: number, public name: string, public description: string) { }

    getDisplayTime(): string {
        let timeLeft = this.maxTime;
        const hours = Math.floor(timeLeft / 3600);
        timeLeft -= (hours * 3600);
        const minutes = Math.floor(timeLeft / 60);
        timeLeft -= (minutes * 60);

        return (hours > 0 ? hours+"h " : "") + (minutes > 0 ? minutes+"min " : "") + (timeLeft > 0 ? (Math.trunc(timeLeft * 10) / 10)+"sec" : "");
    }

    getScoreValue(): number {
        let points = 100 * (this.maxTime + (3 * Math.floor(this.maxTime / 10) + 10 * Math.floor(this.maxTime / 60)));
        
        if (this.index != 0) {
            // Levels which are not king get double points
            return points * 2;
        }

        return points ;
    }
}

export class GambitLevels {
    static getLevels(): GambitLevel[] {
        return Object.entries(gambitLevelMetadata).map(([index, metadata]) => {
            return new GambitLevel(Number(index), metadata.name, metadata.description);
        });
    }
}

export class GambitBonus {
    unlocked: boolean = false;

    constructor(public index: number, public data: GambitBonusModel) {}

    getBonus(gambitTotalScore: number): number {
        if(!this.unlocked)
        {
            return 0;
        }

        // Special case
        if (this.index == 0) {
            return Math.max(1, Math.ceil(lavaLog2(gambitTotalScore) - 8 + (lavaLog(gambitTotalScore) - 1)))
        }

        if (this.data.x1 == 1) {
            return this.data.x0 * gambitTotalScore;
        } else {
            return this.data.x0;
        }
    }

    getScoreThreshold(): number {
        return 2E3 + 1E3 * (this.index + 1) * (1 + this.index / 5) * Math.pow(1.26, this.index);
    }
}

export class Gambit {
    bonuses: GambitBonus[] = [];
    levels: GambitLevel[] = GambitLevels.getLevels();
    gambitPointsMulti: number = 1;

    constructor() {
        const gambitBonusesData = initGambitBonusRepo();
        gambitBonusesData.forEach(bonus => {
            this.bonuses.push(new GambitBonus(bonus.index, bonus.data));
        });
    }

    getBonus(index: number): number {
        const bonus = this.bonuses.find(bonus => bonus.index == index);
        if (bonus)
        {
            return bonus.getBonus(this.getGambitTotalTime());
        }

        return 0;
    }

    getBonusText(index: number): string {
        const bonus = this.bonuses.find(bonus => bonus.index == index);
        if (bonus)
        {
            switch(bonus.index) {

            }
            const value = bonus.getBonus(this.getGambitTotalTime());
        }

        return "";
    }

    getGambitTotalTime(): number {
        return this.levels.reduce((sum, level) => sum + level.maxTime, 0);
    }

    getGambitTotalScore(): number {
        return this.levels.reduce((sum, level) => level.getScoreValue(), 0) * this.gambitPointsMulti;
    }

    updateUnlockedBonuses() {
        const totalGambitScore = this.getGambitTotalScore();

        this.bonuses.forEach(bonus => {
            bonus.unlocked = totalGambitScore >= bonus.getScoreThreshold();
        });
    }
}