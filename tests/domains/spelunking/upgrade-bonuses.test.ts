import { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const bonusCases = [
    {
        index: 59,
        extractionKey: 'spelunking_purchased_bonus_59',
        description: 'the purchased Trackometer stamina EXP bonus before the meter-level modifier',
    },
];

describe('Spelunking purchased upgrade bonuses', () => {
    let extractionResults: ExtractionResults;
    let spelunking: Spelunking;

    beforeAll(() => {
        extractionResults = loadExtractionResults('spelunking-upgrade-bonuses-data.json');
        validateExtractionHealth(extractionResults);
        spelunking = loadGameDataFromSave('latest').get('spelunking') as Spelunking;
    });

    bonusCases.forEach(({ index, extractionKey, description }) => {
        it(`matches ${description}`, () => {
            const liveValue = getExtractedValue(extractionResults, extractionKey);
            const upgradeBonus = spelunking.getUpgradeBonus(index);

            expect(upgradeBonus).toMatchLiveGameWithDetails(liveValue, {
                tolerance: 0,
                context: `Spelunking ${description}`,
            });
        });
    });
});
