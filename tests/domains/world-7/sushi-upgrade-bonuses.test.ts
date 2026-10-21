import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-upgrade-bonuses-data.json';

type UpgradeComparison = {
  index: number;
  selected: boolean;
  quantity: number;
};

describe('Sushi Station upgrade bonuses', () => {
  let extractionResults: ExtractionResults;
  let station: SushiStation;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    station = loadGameDataFromSave(saveName).get('sushi') as SushiStation;
  });

  it('matches upgrade bonuses with the game', () => {
    const expected = extractionResults.extractions['sushi_upgrade_bonuses'].result as UpgradeComparison[];

    for (const { index, selected, quantity } of expected) {
      const upgrade = station.upgrades.find(candidate => candidate.index === index);
      if (!upgrade) throw new Error(`Sushi Station upgrade record ${index} not found`);

      expect(upgrade.getBonus()).toMatchLiveGameWithDetails(quantity, {
        tolerance: 0,
        context: `Sushi Station upgrade ${upgrade.data.name}`,
        debugInfo: { index, selected },
      });
    }
  });
});
