import type { Cloudsave } from '../../../data/domain/cloudsave';
import { EquipmentSets } from '../../../data/domain/misc/equipmentSets';
import type { EquipmentSetItemLocation } from '../../../data/domain/misc/equipmentSets';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'armor-smithy-unlock-progress-data.json';

// Native requirement rule: docs/game-snippets/armor-smithy/GetSetBonus.1.25.js.
// Ownership is saved inventory, not progress from wearing a set on one character.
describe('Armor Smithy requirements and item availability', () => {
  let results: ExtractionResults;
  let equipmentSets: EquipmentSets;
  let save: Cloudsave;
  beforeAll(() => {
    results = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(results);
    equipmentSets = loadGameDataFromSave(saveName).get('equipmentSets') as EquipmentSets;
    save = loadTestSave(saveName);
  });

  it('matches native required piece totals for every set', () => {
    const nativeKeys = Object.keys(results.extractions).filter(key => key.endsWith('_required_parts'));
    expect(equipmentSets.equipmentSets).toHaveLength(nativeKeys.length);
    for (const set of equipmentSets.equipmentSets) {
      expect(set.getRequiredParts()).toMatchLiveGameWithDetails(
        getExtractedValue(results, `${set.data.name.toLowerCase()}_required_parts`),
        { tolerance: 0, context: `${set.data.name} pieces required for set completion` },
      );
    }
  });

  it('locates required items in the saved chest, bags, equipment, and tools', () => {
    const playerNames = save.get('playerNames') as string[];
    const chest = save.get('ChestOrder') as string[];
    const chestCounts = save.get('ChestQuantity') as number[];

    for (const set of equipmentSets.equipmentSets) {
      for (const group of set.requirements) {
        for (const member of group.items) {
          const name = member.item.internalName;
          const expected: EquipmentSetItemLocation[] = [];
          let chestCount = 0;
          chest.forEach((item, slot) => {
            if (item === name) chestCount += Number(chestCounts[slot]);
          });
          if (chestCount > 0) expected.push({ kind: 'storage', count: chestCount });

          playerNames.forEach((playerName, playerId) => {
            const bags = save.get(`InventoryOrder_${playerId}`) as string[];
            const bagCounts = save.get(`ItemQTY_${playerId}`) as number[];
            let bagCount = 0;
            bags.forEach((item, slot) => {
              if (item === name) bagCount += Number(bagCounts[slot]);
            });
            if (bagCount > 0) expected.push({ kind: 'bag', playerId, playerName, count: bagCount });

            const gear = save.get(`EquipOrder_${playerId}`) as Record<number, string>[];
            for (const [row, kind] of [[0, 'equipped'], [1, 'tool']] as const) {
              const count = Object.values(gear[row] ?? {}).filter(item => item === name).length;
              if (count > 0) expected.push({ kind, playerId, playerName, count });
            }
          });

          expect(member.locations).toEqual(expected);
          expect(member.available).toBe(expected.length > 0);
        }
      }
    }
  });

  it('preserves permanent completion independently of available items', () => {
    const options = save.get('OptLacc') as (string | number)[];
    const savedUnlocks = String(options[379] ?? '').split(',');
    for (const set of equipmentSets.equipmentSets) {
      expect(set.unlocked).toBe(savedUnlocks.includes(set.data.name));
    }
  });
});
