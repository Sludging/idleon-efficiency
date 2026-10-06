/**
 * Direct external calculation for correctness case #429: the settled account
 * Orblet balance used by Royal Armory's balance-only affordability consumer.
 * Compare Storage's actual calculated result with the game's currency actor;
 * do not replace it with a mocked forwarded value or inspect its upstream inputs.
 * Own current price/raw bonus/next-preview calculations are selected cores in
 * royal-armory-orblet-upgrades.test.ts, not external parameter calculations.
 */
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Storage } from '../../../data/domain/storage';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-orblet-upgrades-data.json';

describe('Royal Armory Orblet upgrade direct parameters', () => {
    it('matches the settled Orblet balance used to decide whether upgrade prices are affordable', () => {
        const gameData = loadGameDataFromSave(saveName);
        const storage = gameData.get('storage') as Storage;
        const extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);

        expect(storage.amountInStorage('Orblet')).toMatchLiveGame(
            getExtractedValue(extractionResults, 'calculationStorage.amountInStorageOrblet'),
            0,
        );
    });
});
