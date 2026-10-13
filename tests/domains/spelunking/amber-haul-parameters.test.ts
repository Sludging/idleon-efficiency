import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const denominationGates = [
    { index: 20, name: 'purchased Blue Amber' },
    { index: 41, name: 'purchased Green Amber' },
    { index: 51, name: 'active Red Amber' },
    { index: 66, name: 'locked Pink Amber' },
];

describe('Spelunking recorded haul denomination parameters', () => {
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-amber-haul-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
    });

    // All four shop bonuses directly select the denomination, including the currently locked higher tier.
    denominationGates.forEach(({ index, name }) => {
        it(`matches the ${name} bonus used by current denomination selection`, () => {
            expect(spelunking.getUpgradeBonus(index)).toMatchLiveGame(
                getExtractedValue(extractionResults, `amber_gate_bonus_${index}`), 0,
            );
        });
    });
});
