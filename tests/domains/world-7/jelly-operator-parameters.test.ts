import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  type ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'jelly-operator-data.json';

describe('Jelly Operator shop cost parameters', () => {
  let jellyOperator: JellyOperator;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    jellyOperator = gameData.get('jellyOperator') as JellyOperator;
  });

  it('matches Lower Cholesterol quantity used to reduce Jelly shop costs', () => {
    expect(jellyOperator.upgrades.find(upgrade => upgrade.index === 34)!.getQuantity()).toMatchLiveGame(
      getExtractedValue(extractionResults, 'jelly_upgrade_quantity_34'),
      0,
    );
  });
});
