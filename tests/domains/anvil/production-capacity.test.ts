import type { Anvil, AnvilWrapper } from '../../../data/domain/world-1/anvil';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';

describe('Anvil production capacity', () => {
    let anvil: Anvil;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('anvil-production-data.json');
        validateExtractionHealth(results);

        const account = loadGameDataFromSave('latest');
        const anvilWrapper = account.get('anvil') as AnvilWrapper;
        anvil = anvilWrapper.playerAnvils[TARGET_PLAYER_INDEX];
    });

    it('matches native per-product storage capacity', () => {
        expect(anvil.productCapacity).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'anvil_product_capacity'),
            {
                tolerance: 0,
                context: `Character ${TARGET_PLAYER_INDEX}: direct native Anvil product capacity in items`,
            },
        );
    });
});
