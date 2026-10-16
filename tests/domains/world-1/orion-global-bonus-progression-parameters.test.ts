import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Orion } from '../../../data/domain/world-1/orion';

const saveName = 'latest';
const extractionResultsName = 'orion-global-bonus-progression-data.json';

describe('Orion permanent bonus upgrade cost parameter', () => {
  let extractionResults: ExtractionResults;
  let orion: Orion;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    orion = loadGameDataFromSave(saveName).get('orion') as Orion;
  });

  it('matches the direct game price for Bonuses of Orion', () => {
    expect(orion.getUpgradeCost(1)).toMatchLiveGame(
      getExtractedValue(extractionResults, 'next_bonus_cost'),
      0
    );
  });
});
