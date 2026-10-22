import { Poppy } from '../../../data/domain/world-2/poppy';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'poppy-fish-per-catch-data.json';

describe('Poppy fish quantity per catch', () => {
  it('matches the fish added by each completed catch', () => {
    const extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const poppy = loadGameDataFromSave(saveName).get('poppy') as Poppy;
    const actual = poppy.getFishPerCatch();

    expect(actual).toMatchLiveGameWithDetails(getExtractedValue(extractionResults, 'fish_per_catch'), {
      tolerance: 0,
      context: 'Poppy fish quantity added to stock by each completed catch',
    });
  });
});

describe('Poppy Megafish ownership', () => {
    it('uses the owned count as an exclusive Megafish boundary', () => {
        const poppy = new Poppy('poppy');
        poppy.ownedMegafishes = 5;

        expect(poppy.getMegafishQuantity(poppy.ownedMegafishes - 1)).toBe(1);
        expect(poppy.getMegafishQuantity(poppy.ownedMegafishes)).toBe(0);
    });
});