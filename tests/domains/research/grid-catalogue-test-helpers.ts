import { loadTestSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, validateExtractionHealth } from '../../utils/live-game-data-loader';
const accountDataset = require('../../helpers/account-dataset.cjs') as {
    resolveTestSavePath(saveName: string): string;
    hashFile(filePath: string): string;
    getSelectedAccountDataset(): { manifest: { saveSha256: string } } | undefined;
};

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
export const save = loadTestSave('latest');
export function saved<T>(key: string): T {
    const value = save.get(key);
    return (typeof value === 'string' ? JSON.parse(value) : value) as T;
}
export const savedResearch = saved<number[][]>('Research');
export const savePath = accountDataset.resolveTestSavePath('latest');
export const saveHash = (): string => accountDataset.hashFile(savePath);

export function extracted<T>(results: ExtractionResults, label: string): T {
    if (results.errors[label]) throw new Error(results.errors[label].error);
    if (!results.extractions[label]) throw new Error('Missing original-game extraction: ' + label);
    return results.extractions[label].result as T;
}

export function numeric(results: ExtractionResults, label: string): number {
    extracted(results, label);
    return getExtractedValue(results, label);
}

export function assertPairing(results: ExtractionResults): void {
    validateExtractionHealth(results);
    const selectedDataset = accountDataset.getSelectedAccountDataset();
    expect(saveHash()).toBe(selectedDataset?.manifest.saveSha256 ?? '42139b34b95e9fcad751187d25a04ae760238e798410a1a397902f826261a6b0');
    const before = extracted<OriginalGridInputs>(results, 'pairing_before');
    expect(extracted<OriginalGridInputs>(results, 'pairing_after')).toEqual(before);
    expect(before.levels.map(Number)).toEqual(savedResearch[0].map(Number));
    expect(before.owners.map(Number)).toEqual(savedResearch[1].map(Number));
    expect(before.placements.map(Number)).toEqual(savedResearch[6].map(Number));
    expect(before.found.map(Number)).toEqual(savedResearch[2].map(Number));
    expect(before.insightLevels.map(Number)).toEqual(savedResearch[4].map(Number));
    expect(before.crowns).toEqual(savedResearch[11]);
    expect(before.trades.map(Number)).toEqual(savedResearch[12].map(Number));
    expect(before.researchLevel).toBe(Number(saved<number[]>('Lv0_3')[20]));
    expect(before.artifactStatus).toBe(Number(saved<number[][]>('Sailing')[3][37]));
    expect(before.researchMerit).toBe(Number(saved<number[][]>('TaskZZ2')[6][3]));
    expect(before.rift.map(Number)).toEqual(saved<number[]>('Rift').map(Number));
    expect(before.accumulatedReduction).toBe(Number(saved<number[]>('OptLacc')[499]));
    expect(before.spelunkingReduction).toBe(Number(saved<number[]>('OptLacc')[500]));
}

