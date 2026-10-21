import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Poppy } from '../../../data/domain/world-2/poppy';

const saveName = 'latest';
const extractionResultsName = 'poppy-global-bonus-progression-data.json';

describe('Poppy next permanent bonus upgrade', () => {
  let extractionResults: ExtractionResults;
  let poppy: Poppy;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    poppy = loadGameDataFromSave(saveName).get('poppy') as Poppy;
  });

  it('matches the next ordered bonus, fish cost, and current affordability', () => {
    const nextUpgrade = poppy.getNextGlobalBonusUpgrade();
    const liveBonusIndex = getExtractedValue(extractionResults, 'next_bonus_index');
    const liveCost = getExtractedValue(extractionResults, 'next_bonus_cost');
    const canAfford = getExtractedValue(extractionResults, 'can_afford_next_bonus') === 1;

    expect(nextUpgrade.bonusIndex).toMatchLiveGameWithDetails(liveBonusIndex, {
      tolerance: 0,
      context: 'The next ordered Bonuses from Poppy effect',
    });
    expect(nextUpgrade.cost).toMatchLiveGameWithDetails(liveCost, {
      tolerance: 0,
      context: 'The next Bonuses from Poppy purchase cost in fish',
    });
    expect(nextUpgrade.canAfford).toBe(canAfford);
  });
});
