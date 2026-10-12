/**
 * Effects for Royal Guardian unit specializations. The saved game API exposes
 * separate effects for production, Outpost range, Barrel experience, and
 * extra kills toward Outpost clearing.
 */

import {
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-unit-spec-effect-data.json';
const effectCases = [
 { role: RoyalUnitRole.Worker, extractionKey: 'royal_armory_unit_spec_effect_0', description: 'Outpost resource production' },
 { role: RoyalUnitRole.Trader, extractionKey: 'royal_armory_unit_spec_effect_1', description: 'Trader Barrel experience bonus' },
 { role: RoyalUnitRole.Guard, extractionKey: 'royal_armory_unit_spec_effect_2', description: 'Outpost connection range' },
 { role: RoyalUnitRole.Surveyor, extractionKey: 'royal_armory_unit_spec_effect_3', description: 'Surveyor Barrel experience bonus' },
 { role: RoyalUnitRole.Militia, extractionKey: 'royal_armory_unit_spec_effect_4', description: 'extra kills toward Outpost clearing' },
 { role: RoyalUnitRole.Commander, extractionKey: 'royal_armory_unit_spec_effect_5', description: 'Commander Barrel experience bonus' },
 { role: RoyalUnitRole.Knight, extractionKey: 'royal_armory_unit_spec_effect_6', description: 'Knight Barrel experience bonus' },
 { role: RoyalUnitRole.Priest, extractionKey: 'royal_armory_unit_spec_effect_7', description: 'Priest Barrel experience bonus' },
] as const;

describe('Royal Armory unit specialization effects', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 effectCases.forEach(({ role, extractionKey, description }) => {
  it(`matches the ${description} effect`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory.units.getRole(role).effect;

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${description} specialization effect`,
   });
  });
 });
});
