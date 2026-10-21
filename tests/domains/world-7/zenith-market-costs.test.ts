import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ZenithMarket } from '../../../data/domain/world-7/zenithShop';

const extractionResultsName = 'zenith-market-data.json';
const upgradeIndices = Array.from({ length: 11 }, (_, index) => index);

describe('Zenith Market next-level costs', () => {
    let extractionResults: ExtractionResults;
    let zenithMarket: ZenithMarket;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        zenithMarket = loadGameDataFromSave('latest').get('zenithMarket') as ZenithMarket;
    });

    it.each(upgradeIndices)('matches saved next-level cost for upgrade %i', (index) => {
        const expectedCost = getExtractedValue(extractionResults, `zenith_market_${index}_cost`);
        const upgrade = zenithMarket.bonuses.find((bonus) => bonus.index === index)!;

        expect(upgrade.getNextLevelCost()).toMatchLiveGame(expectedCost, 0);
    });
});
