import { ExtractionResults, getExtractedValue } from '../../utils/live-game-data-loader';

export interface OriginalGridUpgrade {
    index: number;
    name: string;
    template: string;
    cap: number;
    level: number;
    primary: number;
    secondary: number;
    reachable: number;
    canUpgrade: number;
}

export interface OriginalGridInputs {
    levels: number[];
    owners: number[];
    placements: number[];
    found: number[];
    insightLevels: number[];
    crowns: string[];
    trades: number[];
    researchLevel: number;
    artifactStatus: number;
    researchMerit: number;
    rift: number[];
    accumulatedReduction: number;
    spelunkingReduction: number;
}

export interface OriginalBoatQualification {
    index: number;
    lootUpgrades: number;
    speedUpgrades: number;
    qualifies: number;
    frame: number;
}


export const resultName = 'research-grid-catalogue-data.json';
export function extracted<T>(results: ExtractionResults, label: string): T {
    if (results.errors[label]) throw new Error(results.errors[label].error);
    if (!results.extractions[label]) throw new Error('Missing original-game extraction: ' + label);
    return results.extractions[label].result as T;
}

export function numeric(results: ExtractionResults, label: string): number {
    extracted(results, label);
    return getExtractedValue(results, label);
}
