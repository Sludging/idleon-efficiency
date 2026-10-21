import { getCompanionActiveBonus } from '../../../data/domain/companions';
import type { Companion } from '../../../data/domain/companions';
import type { ResearchGrid } from '../../../data/domain/world-7/research';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('The Button calculated inputs', () => {
  let data: Map<string, unknown>;
  let results: ExtractionResults;

  beforeAll(() => {
    data = loadGameDataFromSave('latest');
    results = loadExtractionResults('button-bonus-data.json');
    validateExtractionHealth(results);
  });

  it('matches the active Button companion bonus', () => {
    const companions = data.get('companions') as Companion[];
    const expected = getExtractedValue(results, 'companion_bonus_147');

    expect(getCompanionActiveBonus(companions, 147)).toMatchLiveGame(expected, 0);
  });

  it('matches the Better Button Research Grid bonus', () => {
    const research = data.get('research') as ResearchGrid;
    const expected = getExtractedValue(results, 'grid_bonus_125');

    expect(research.getBonusForId(125)).toMatchLiveGame(expected, 0);
  });
});
