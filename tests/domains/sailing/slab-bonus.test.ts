/**
 * Validates Sailing's account-wide multiplier for Slab bonuses.
 *
 * @testCovers Sailing.getSlabBonusMultiplier
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';

const saveName = 'latest';
const extractionResultsName = 'sailing-slab-bonus-data.json';

describe('Sailing Domain - Slab Bonus', () => {
  let extractionResults: ExtractionResults;
  let sailing: Sailing;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    sailing = loadGameDataFromSave(saveName).get('sailing') as Sailing;
  });

  it('validates the account-wide Slab bonus multiplier', () => {
    const liveValue = getExtractedValue(extractionResults, 'sailing_slab_bonus_multiplier');
    const domainValue = sailing.getSlabBonusMultiplier();
    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Sailing account-wide Slab bonus multiplier',
    });
  });
});
