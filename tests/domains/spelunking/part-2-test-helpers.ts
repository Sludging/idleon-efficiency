import fs from 'fs';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { getExtractedValue, loadExtractionResults } from '../../utils/live-game-data-loader';

const accountDataset = require('../../helpers/account-dataset.cjs') as {
    resolveTestSavePath(saveName: string): string;
};

export const results = loadExtractionResults('spelunking-part-2-data.json');
export const expected = (label: string): number => getExtractedValue(results, label);
export const chapterBonuses = results.extractions.chapter_bonus_matrix.result as number[][];
const rawSave = JSON.parse(fs.readFileSync(accountDataset.resolveTestSavePath('latest'), 'utf8'));

export function saved(key: 'Spelunk'): number[][];
export function saved(key: 'playerNames'): string[];
export function saved(key: string): number[];
export function saved(key: string): number[] | number[][] | string[] {
    return typeof rawSave[key] === 'string' ? JSON.parse(rawSave[key]) : rawSave[key];
}

export const characterIDs = Array.from({ length: saved('playerNames').length }, (_, index) => index);

export function assertChapterBonuses(owner: Spelunking): void {
    chapterBonuses.forEach((bonuses, chapterIndex) => {
        bonuses.forEach((expectedBonus, bonusIndex) => {
            const chapter = owner.chapters[chapterIndex];
            const bonus = chapter.bonuses[bonusIndex];
            expect(bonus.getBonus()).toMatchLiveGameWithDetails(expectedBonus, {
                tolerance: 0, context: `${chapter.name}: ${bonus.data.bonus}`,
            });
        });
    });
}
