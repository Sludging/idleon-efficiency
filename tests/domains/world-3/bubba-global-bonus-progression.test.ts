import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Bubba } from '../../../data/domain/world-3/bubba';

const saveName = 'latest';
const extractionResultsName = 'bubba-global-bonus-progression-data.json';

describe('Bubba next permanent bonus upgrade', () => {
  let extractionResults: ExtractionResults;
  let bubba: Bubba;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    bubba = loadGameDataFromSave(saveName).get('bubba') as Bubba;
  });

  it('matches the next ordered bonus, meat cost, balance, and affordability', () => {
    const nextUpgrade = bubba.getNextGlobalBonusUpgrade();
    const liveBonusIndex = getExtractedValue(extractionResults, 'next_bonus_index');
    const liveCost = getExtractedValue(extractionResults, 'next_bonus_cost');
    const liveMeatBalance = getExtractedValue(extractionResults, 'meat_balance');
    const canAfford = getExtractedValue(extractionResults, 'can_afford_next_bonus') === 1;

    expect(nextUpgrade.bonusIndex).toMatchLiveGameWithDetails(liveBonusIndex, {
      tolerance: 0,
      context: 'The next ordered Bubba Boon effect',
    });
    expect(nextUpgrade.cost).toMatchLiveGameWithDetails(liveCost, {
      tolerance: 0,
      context: 'The next Bubba Boon purchase cost in meat slices',
    });
    expect(nextUpgrade.resourceBalance).toMatchLiveGameWithDetails(liveMeatBalance, {
      tolerance: 0,
      context: 'Current meat slices available for the next Bubba Boon purchase',
    });
    expect(nextUpgrade.canAfford).toBe(canAfford);
  });
});
