import { lavaLog, lavaLog2, toTime } from "../../../utility";
import { initGambitBonusRepo, GambitBonusBase } from "../../data/GambitBonusRepo";
import { GambitBonusModel } from "../../model/gambitBonusModel";
import type { ImageData } from "../../imageData";
import { Item } from "../../items";
import { Skilling } from "../../skilling";
import { SkillsIndex } from "../../SkillsIndex";
import { Summoning } from "../../world-6/summoning";
import { AtomCollider } from "../../world-3/construction/atomCollider";

export enum GambitChallengeIndex {
    King = 0,
    Horse = 1,
    Bishop = 2,
    Queen = 3,
    Tower = 4,
    Pawn = 5
}

const gambitChallengeMetadata = {
    [GambitChallengeIndex.King]: {
        name: "King's Gambit",
        description: "Survive as long as you can...",
    },
    [GambitChallengeIndex.Horse]: {
        name: "Horsey's Gambit",
        description: "You have but one HP...",
    },
    [GambitChallengeIndex.Bishop]: {
        name: "Bishop's Gambit",
        description: "Damage done to me is done to thee...",
    },  
    [GambitChallengeIndex.Queen]: {
        name: "Queen's Gambit",
        description: "Jewels everywhere...",
    },
    [GambitChallengeIndex.Tower]: {
        name: "Castle's Gambit",
        description: "One lane, one outcome...",
    },
    [GambitChallengeIndex.Pawn]: {
        name: "Noobs' Gambit",
        description: "I like the grey ones!!!",
    },
}

export class GambitChallenge {
    maxTime: number = 0; // in seconds, will have decimals

    constructor(public index: number, public name: string, public description: string) { }

    getImageData(): ImageData | undefined {
        if (this.index === GambitChallengeIndex.King) {
            return undefined;
        }
        return {
            location: `HoleGambit${this.index - 1}`,
            width: 26,
            height: this.index === GambitChallengeIndex.Queen ? 69 : 68,
        };
    }

    getDisplayTime(): string {
        return toTime(this.maxTime, true);
    }

    getScoreValue(): number {
        const points = 100 * (this.maxTime + (3 * Math.floor(this.maxTime / 10) + 10 * Math.floor(this.maxTime / 60)));
        
        if (this.index != 0) {
            // Challenges which are not king get double points
            return points * 2;
        }

        return points ;
    }
}

export class GambitChallenges {
    static getChallenges(): GambitChallenge[] {
        return Object.entries(gambitChallengeMetadata).map(([index, metadata]) => {
            return new GambitChallenge(Number(index), metadata.name, metadata.description);
        });
    }
}

export class GambitBonus {
    unlocked: boolean = false;

    constructor(public index: number, public data: GambitBonusModel) {}

    static fromBase(data: GambitBonusBase[]) {
        return data.map(d => new GambitBonus(d.index, d.data));
    }

    getImageData(): ImageData | undefined {
        switch (this.index) {
            case 0: return Summoning.getDoublerImageData();
            case 1: return { location: "Opal", width: 30, height: 31 };
            case 2: return Item.getImageData("DungCredits2");
            case 3: return { location: "HolePOI0", width: 287, height: 61 };
            case 4: return Item.getImageData("StoneW1");
            case 5: return Skilling.getSkillImageData(SkillsIndex.Summoning);
            case 6: return { location: "Ribbon0", width: 42, height: 41 };
            case 7: return Item.getImageData("Coins1");
            case 8: return { location: "ClickerFeatherCurrency", width: 72, height: 72 };
            case 9: return Skilling.getSkillImageData(SkillsIndex.Construction);
            case 10: return { location: "GamingMail", width: 22, height: 16 };
            case 11: return Skilling.getSkillImageData(SkillsIndex.Sneaking);
            case 12: return { location: "GrimBone0", width: 20, height: 20 };
            case 13: return AtomCollider.getParticleImageData();
            case 14: return Skilling.getSkillImageData(SkillsIndex.Spelunking);
            case 15: return Skilling.getSkillImageData(SkillsIndex.Research);
            default: return undefined;
        }
    }

    getBonus(gambitTotalScore: number): number {
        return this.unlocked ? this.evaluateBonus(gambitTotalScore) : 0;
    }

    getBonusAtScore(score: number): number {
        return score >= this.getScoreThreshold() ? this.evaluateBonus(score) : 0;
    }

    private evaluateBonus(gambitTotalScore: number): number {
        if (this.index == 0) {
            return Math.max(1, Math.ceil(lavaLog2(gambitTotalScore) - 8 + (lavaLog(gambitTotalScore) - 1)));
        }

        if (this.data.x1 == 1) {
            return this.data.x0 * lavaLog(gambitTotalScore);
        } else {
            return this.data.x0;
        }
    }

    getMultiplier(gambitTotalScore: number): number {
        return 1 + this.getBonus(gambitTotalScore) / 100;
    }

    getMultiplierAtScore(score: number): number {
        return 1 + this.getBonusAtScore(score) / 100;
    }

    static getScoreThreshold(index: number): number {
        return 2E3 + 1E3 * (index + 1) * (1 + index / 5) * Math.pow(1.26, index);
    }

    getScoreThreshold(): number {
        return GambitBonus.getScoreThreshold(this.index);
    }
}

export class Gambit {
    challenges: GambitChallenge[] = [];
    bonuses: GambitBonus[] = [];
    gambitPointsMulti: number = 1;

    constructor() {
        this.challenges = GambitChallenges.getChallenges();
        this.bonuses = GambitBonus.fromBase(initGambitBonusRepo());
    }

    parse(cavernData: number[]): void {
        this.challenges.forEach(challenge => {
            challenge.maxTime = Number(cavernData[challenge.index + 65] ?? 0);
        });
        this.gambitPointsMulti = 1;
        this.bonuses.forEach(bonus => {
            bonus.unlocked = false;
        });
    }

    prepare(pointsMultiplier: number): void {
        this.gambitPointsMulti = pointsMultiplier;
        this.updateUnlockedBonuses();
    }

    getBonus(index: number): number {
        const bonus = this.bonuses.find(bonus => bonus.index == index);

        if (bonus)
        {
            return bonus.getBonus(this.getGambitTotalScore());
        }

        return 0;
    }

    getBonusText(index: number): string {
        const bonus = this.bonuses.find(bonus => bonus.index == index);
        if (bonus)
        {
            // Bonuses increasing with Gambit Score
            if (bonus.data.x1 == 1) {
                const value = bonus.getBonus(this.getGambitTotalTime());
                return bonus.data.name.replace('{', value.toString()).replace('}', (1 + value / 100).toString()+"x");
            } else {
                return bonus.data.name.replace('{', bonus.data.x0.toString()).replace('}', bonus.data.x0.toString()+"x");
            }            
        }

        return "";
    }

    getGambitTotalTime(): number {
        return this.challenges.reduce((sum, challenge) => sum + challenge.maxTime, 0);
    }

    getGambitBaseScore(): number {
        return this.challenges.reduce((sum, challenge) => sum + challenge.getScoreValue(), 0);
    }

    getGambitTotalScore(): number {
        return this.getGambitBaseScore() * this.gambitPointsMulti;
    }

    getNextOpalScore(foundOpals: number): number {
        // Opals use the game's rounded logarithm constant, so exact powers of ten can fall short.
        return Math.ceil(Math.exp(2.30259 * (foundOpals + 1)));
    }

    getOpalsAtScore(score: number): number {
        return Math.floor(lavaLog(score));
    }

    updateUnlockedBonuses() {
        const totalGambitScore = this.getGambitTotalScore();

        this.bonuses.forEach(bonus => {
            bonus.unlocked = totalGambitScore >= bonus.getScoreThreshold();
        });
    }
}
