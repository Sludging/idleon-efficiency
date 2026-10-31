import { Storage } from '../../../data/domain/storage';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Storage greenstacks', () => {
    let storage: Storage;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        storage = loadGameDataFromSave('latest').get('storage') as Storage;
        extractionResults = loadExtractionResults('player-damage-lab-parameters-data.json');
        validateExtractionHealth(extractionResults);
    });

    it('reports the number of credited greenstacks', () => {
        const expected = getExtractedValue(extractionResults, 'player_damage_storage_credited_green_stack_count');
        expect(storage.getGreenstackCount()).toMatchLiveGameWithDetails(expected, {
            tolerance: 0,
            context: 'Storage credited greenstack count',
        });
    });
});
