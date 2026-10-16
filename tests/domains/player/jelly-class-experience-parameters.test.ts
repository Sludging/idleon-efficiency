import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Jelly Operator Class EXP parameters', () => {
  let jellyOperator: JellyOperator;
  let obstruction30Bonus: number;
  let obstruction62Bonus: number;

  beforeAll(() => {
    const results = loadExtractionResults('jelly-class-experience-parameters-data.json');
    validateExtractionHealth(results);
    obstruction30Bonus = getExtractedValue(results, 'jelly_class_exp_30');
    obstruction62Bonus = getExtractedValue(results, 'jelly_class_exp_62');
    jellyOperator = loadGameDataFromSave('latest').get('jellyOperator') as JellyOperator;
  });

  it('matches the native gated Class EXP bonus for obstruction 30', () => {
    expect(jellyOperator.getObstructionBonus(30)).toMatchLiveGameWithDetails(obstruction30Bonus, {
      tolerance: 0,
      context: 'Jelly Operator obstruction 30 Class EXP bonus',
    });
  });

  it('matches the native gated Class EXP bonus for obstruction 62', () => {
    expect(jellyOperator.getObstructionBonus(62)).toMatchLiveGameWithDetails(obstruction62Bonus, {
      tolerance: 0,
      context: 'Jelly Operator obstruction 62 Class EXP bonus',
    });
  });
});
