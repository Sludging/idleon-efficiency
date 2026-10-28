import { ExtractionResults, getExtractedValue, loadExtractionResults } from '../../utils/live-game-data-loader';
import { loadTestSave } from '../../utils/cloudsave-loader';

export interface PreviewExpectations {
    owned_lenses: number;
    magnifying_glasses: number;
    lens_capacity: number;
    shape_count: number;
    point_term: number;
    points_earned: number;
    points_spent: number;
    points_available: number;
    point_milestone: number;
}

function numeric(results: ExtractionResults, label: string): number {
    const extraction = results.extractions[label];
    if (results.errors[label] || !extraction || extraction.result === null || extraction.result === undefined) {
        throw new Error(`Missing native Research capture: ${label}`);
    }
    const value = getExtractedValue(results, label);
    if (!Number.isFinite(value)) throw new Error(`Invalid native Research capture: ${label}`);
    return value;
}

export function highestSavedResearchLevel(): number {
    const save = loadTestSave('latest');
    const names = save.get('playerNames') as string[];
    return Math.max(...names.map((_, index) => {
        const levels = save.get(`Lv0_${index}`) as number[];
        return Number(levels[20]);
    }));
}

export function researchPreviewExpectations() {
    const progress = loadExtractionResults('research-account-progress-data.json');
    const reference = progress.extractions.reference_state?.result as {level: number} | undefined;
    if (progress.errors.reference_state || !reference || !Number.isFinite(reference.level)) {
        throw new Error('Missing native Research level');
    }
    if (highestSavedResearchLevel() > 0) return undefined;

    const points = loadExtractionResults('research-points-earned-data.json');
    const catalogue = loadExtractionResults('research-grid-catalogue-data.json');
    const bundle = loadExtractionResults('bundle-ownership-data.json');
    const receiptCapture = bundle.extractions.bundles_received;
    if (bundle.errors.bundles_received || !receiptCapture || receiptCapture.result === undefined) {
        throw new Error('Missing native bundle receipt ledger capture');
    }
    const ledger = receiptCapture.result as Record<string, number> | null;

    const monocles = numeric(progress, 'owned_monocles');
    const kaleidoscopes = numeric(progress, 'owned_kaleidoscopes');
    const lenses = Math.min(80, Math.round(1 + monocles + kaleidoscopes
        + numeric(progress, 'minehead_2') + numeric(progress, 'minehead_12') + numeric(progress, 'minehead_20')
        + numeric(progress, 'event_34') + numeric(progress, 'companion_153') + numeric(progress, 'sushi_8')));
    const earned = Math.floor(numeric(points, 'points_earned') - reference.level
        - Math.floor(reference.level / 10) * numeric(progress, 'point_term'));
    const spent = numeric(catalogue, 'points_spent');

    return {
        owned_lenses: lenses,
        magnifying_glasses: lenses - monocles - kaleidoscopes,
        lens_capacity: 1,
        shape_count: Math.min(10, Math.round(Number(ledger?.ban_m === 1) + numeric(progress, 'event_36'))),
        point_term: 1 + numeric(progress, 'grid_50_1'),
        points_earned: earned,
        points_spent: spent,
        points_available: earned - spent,
        point_milestone: 0,
    };
}

export function researchExpected(
    preview: PreviewExpectations | undefined,
    key: keyof PreviewExpectations,
    native: () => number,
): number {
    if (preview) return preview[key];
    const value = native();
    if (!Number.isFinite(value)) throw new Error(`Invalid native Research capture: ${key}`);
    return value;
}

export function nativeResearchNumber(results: ExtractionResults, label: string): number {
    return numeric(results, label);
}
