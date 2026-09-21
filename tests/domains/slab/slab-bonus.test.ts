/**
 * Validates Slab's account-wide multiplier for Slab bonuses.
 *
 * @testCovers Slab.getSlabBonusMultiplier
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Slab, updateSlabBonusMultiplier } from '../../../data/domain/world-5/slab';

const saveName = 'latest';
const extractionResultsName = 'slab-bonus-data.json';

describe('Slab Domain - Slab Bonus', () => {
  let extractionResults: ExtractionResults;
  let slab: Slab;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    slab = loadGameDataFromSave(saveName).get('slab') as Slab;
  });

  it('applies Meritocracy, Legend, and Vault inputs in game order', () => {
    const slab = new Slab('slab');
    const calls: string[] = [];
    const meritocraty = {
      getCurrentBonus: (index: number) => {
        calls.push(`meritocracy:${index}`);
        return 10;
      },
    };
    const legendTalents = {
      getBonusFromIndex: (index: number) => {
        calls.push(`legend:${index}`);
        return 20;
      },
    };
    const upgradeVault = {
      getBonusForId: (id: number) => {
        calls.push(`vault:${id}`);
        return 30;
      },
    };

    updateSlabBonusMultiplier(new Map([
      ['slab', slab],
      ['meritocraty', meritocraty],
      ['legendTalents', legendTalents],
      ['upgradeVault', upgradeVault],
    ]));

    expect(calls).toEqual(['meritocracy:23', 'legend:28', 'vault:74']);
    expect(slab.getSlabBonusMultiplier()).toBeCloseTo(1.1 * 1.2 * 1.3, 12);
  });

  it('validates the account-wide Slab bonus multiplier', () => {
    const liveValue = getExtractedValue(extractionResults, 'slab_bonus_multiplier');
    const domainValue = slab.getSlabBonusMultiplier();
    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Slab account-wide bonus multiplier',
    });
  });
});
