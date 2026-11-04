import { CoralKid } from '../../../data/domain/world-7/coralKid';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

describe('Coral Kid upgrade and Singularity account outputs', () => {
  let coralKid: CoralKid;
  let results: ExtractionResults;

  beforeAll(() => {
    coralKid = loadGameDataFromSave('latest').get('coralKid') as CoralKid;
    results = loadExtractionResults('divinity-and-coral-kid-data.json');
    validateExtractionHealth(results);
  });

  it('matches saved levels for both Coral Kid upgrade pages', () => {
    const options = loadTestSave('latest').get('OptLacc') as number[];
    for (const upgrade of coralKid.coralKidBonuses) {
      const saveIndex = upgrade.index < 6 ? 427 + upgrade.index : 616 + upgrade.index - 6;
      expect(upgrade.level).toBe(Number(options[saveIndex] ?? 0));
    }
  });

  it('matches current bonuses and next costs for every upgrade in both modes', () => {
    const bonuses = results.extractions.upgrade_bonuses.result as unknown[];
    const costs = results.extractions.upgrade_costs.result as unknown[];
    // The second upgrade page uses different cost and effect rules.
    for (let index = 0; index < 12; index += 1) {
      expect(coralKid.getBonusFromIndex(index)).toMatchLiveGameWithDetails(normalizeExtractedValue(bonuses[index]), {
        tolerance: 0,
        context: `Current effect coefficient for Coral Kid upgrade ${index}`,
      });
      expect(coralKid.getBonusNextlevelCost(index)).toMatchLiveGameWithDetails(normalizeExtractedValue(costs[index]), {
        tolerance: 0,
        context: `Next purchase cost for Coral Kid upgrade ${index}`,
      });
    }
  });

  it('matches saved Singularity kills, elapsed hours, and owned Spirals across chest and all bags', () => {
    const save = loadTestSave('latest');
    const options = save.get('OptLacc') as number[];
    const names = save.get('playerNames') as string[];
    const inventories = [
      { order: save.get('ChestOrder') as string[], quantities: save.get('ChestQuantity') as number[] },
      ...names.map((_name, index) => ({
        order: save.get(`InventoryOrder_${index}`) as string[],
        quantities: save.get(`ItemQTY_${index}`) as number[],
      })),
    ];
    const spiralsOwned = inventories.reduce((total, inventory) => total + inventory.order.reduce(
      (sum, item, index) => sum + (item === 'CKsing' ? Number(inventory.quantities[index]) : 0), 0,
    ), 0);
    expect(coralKid.singularity.kills).toBe(Number(options[623] ?? 0));
    expect(coralKid.singularity.elapsedHours).toBe(Number(options[624] ?? 0));
    expect(coralKid.singularity.spiralsOwned).toBe(spiralsOwned);
  });

  it('matches Singularity unlock, conversion base, kill multiplier, and time multiplier', () => {
    const nativeSingularity = results.extractions.singularity.result as number[];
    expect(coralKid.singularity.unlocked).toBe(nativeSingularity[0] > 0);
    expect(coralKid.singularity.baseValue).toMatchLiveGameWithDetails(nativeSingularity[1], {
      tolerance: 0, context: 'Singularity base value from current Divinity points',
    });
    expect(coralKid.singularity.killMultiplier).toMatchLiveGameWithDetails(nativeSingularity[2], {
      tolerance: 0, context: 'Singularity kill multiplier',
    });
    expect(coralKid.singularity.timeMultiplier).toMatchLiveGameWithDetails(nativeSingularity[3], {
      tolerance: 0, context: 'Singularity elapsed-time multiplier',
    });
  });
});
