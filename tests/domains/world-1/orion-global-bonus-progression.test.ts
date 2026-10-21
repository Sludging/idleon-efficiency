import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Orion } from '../../../data/domain/world-1/orion';

const saveName = 'latest';
const extractionResultsName = 'orion-global-bonus-progression-data.json';

describe('Orion next permanent bonus upgrade', () => {
  let extractionResults: ExtractionResults;
  let orion: Orion;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    orion = loadGameDataFromSave(saveName).get('orion') as Orion;
  });

  it('matches the next ordered bonus, feather cost, and current affordability', () => {
    const nextUpgrade = orion.getNextGlobalBonusUpgrade();
    const liveBonusIndex = getExtractedValue(extractionResults, 'next_bonus_index');
    const liveCost = getExtractedValue(extractionResults, 'next_bonus_cost');
    const canAfford = getExtractedValue(extractionResults, 'can_afford_next_bonus') === 1;

    expect(nextUpgrade.bonusIndex).toMatchLiveGameWithDetails(liveBonusIndex, {
      tolerance: 0,
      context: 'The next ordered Bonuses of Orion effect',
    });
    expect(nextUpgrade.cost).toMatchLiveGameWithDetails(liveCost, {
      tolerance: 0,
      context: 'The next Bonuses of Orion purchase cost in feathers',
    });
    expect(nextUpgrade.canAfford).toBe(canAfford);
  });
});
