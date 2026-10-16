import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Poppy } from '../../../data/domain/world-2/poppy';

const saveName = 'latest';
const extractionResultsName = 'poppy-global-bonus-progression-data.json';

describe('Poppy permanent bonus upgrade cost parameter', () => {
  let extractionResults: ExtractionResults;
  let poppy: Poppy;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    poppy = loadGameDataFromSave(saveName).get('poppy') as Poppy;
  });

  it('matches the direct game price for Bonuses from Poppy', () => {
    expect(poppy.getUpgradeCost(3)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'next_bonus_cost'),
      0
    );
  });
});
