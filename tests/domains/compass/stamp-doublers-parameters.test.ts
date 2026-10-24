import type { Compass } from '../../../data/domain/compass';
import type { EventShop } from '../../../data/domain/eventShop';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Compass Exalted Stamp use count direct parameters', () => {
    let compass: Compass;
    let eventShop: EventShop;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults('compass-stamp-doublers-data.json');
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave('latest');
        compass = gameData.get('compass') as Compass;
        eventShop = gameData.get('eventShop') as EventShop;
    });

    it('matches Exalted Stamp uses granted by the Compass upgrade', () => {
        expect(compass.getUpgradeBonus(44)).toMatchLiveGame(
            getExtractedValue(extractionResults, 'compass_bonus_44'),
            0,
        );
    });

    it('matches the extra Exalted Stamp use granted by Extra Exaltedness ownership', () => {
        expect(Number(eventShop.isBonusOwned(18))).toMatchLiveGame(
            getExtractedValue(extractionResults, 'event_shop_owned_18'),
            0,
        );
    });
});
