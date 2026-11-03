import type { Hole } from './hole';

export class Temple {
    torches: number = 0;
    opalsFound: number = 0;
    illuminateLevel: number = 0;
    searchLevel: number = 0;
    amplifyLevel: number = 0;
    extraTorchChance: number = 0;
    private clearedLayers: number = 0;

    parse(holeData: number[][]): void {
        const state = holeData[11] ?? [];
        this.clearedLayers = Number(state[55] ?? 0);
        this.torches = Number(state[56] ?? 0);
        this.illuminateLevel = Number(state[57] ?? 0);
        this.searchLevel = Number(state[58] ?? 0);
        this.amplifyLevel = Number(state[59] ?? 0);
        this.opalsFound = Number(holeData[7]?.[14] ?? 0);
        this.extraTorchChance = 0;
    }

    prepare(hole: Hole): void {
        this.extraTorchChance = hole.bell.bonuses[5].getBonus() +
            (hole.getStudyBolaiaBonuses(14) + hole.getSchematicBonus(77, 25));
    }

    get layer(): number {
        return Math.round(this.clearedLayers + 1);
    }

    get illuminateSearchMultiplier(): number {
        return 1 + 10 * this.illuminateLevel / 100;
    }

    get illuminateCost(): number {
        return 3 * Math.pow(1.075, this.illuminateLevel) + this.illuminateLevel;
    }

    get searchCost(): number {
        return Math.max(5, this.torches / 4);
    }

    get centurionAwakenChancePercent(): number {
        // Match the current displayed chance, before Search spends any torches.
        const probability = 0.05 * this.illuminateSearchMultiplier *
            Math.pow(0.7, this.clearedLayers) * Math.log2(this.searchCost);
        return 100 * Math.min(1, probability);
    }

    get golemRespawnSpeedPercent(): number {
        return 5 * this.amplifyLevel;
    }

    get amplifyCost(): number {
        return 10 * Math.pow(1.1, this.amplifyLevel) + 2 * this.amplifyLevel;
    }
}
