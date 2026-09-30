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
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-unit-spec-effect-data.json';
const effectCases = [
 { index: 0, extractionKey: 'royal_armory_unit_spec_effect_0', description: 'Outpost resource production' },
 { index: 1, extractionKey: 'royal_armory_unit_spec_effect_1', description: 'Barrel experience for unit type 1' },
 { index: 2, extractionKey: 'royal_armory_unit_spec_effect_2', description: 'Outpost connection range' },
 { index: 3, extractionKey: 'royal_armory_unit_spec_effect_3', description: 'Barrel experience for unit type 3' },
 { index: 4, extractionKey: 'royal_armory_unit_spec_effect_4', description: 'extra kills toward Outpost clearing' },
 { index: 5, extractionKey: 'royal_armory_unit_spec_effect_5', description: 'Barrel experience for unit type 5' },
 { index: 6, extractionKey: 'royal_armory_unit_spec_effect_6', description: 'Barrel experience for unit type 6' },
 { index: 7, extractionKey: 'royal_armory_unit_spec_effect_7', description: 'Barrel experience for unit type 7' },
] as const;

describe('Royal Armory unit specialization effects', () => {
 let royalArmory: RoyalArmory;

 beforeAll(() => {
  royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
 });

 effectCases.forEach(({ index, extractionKey, description }) => {
  it(`matches the ${description} effect`, () => {
   const extractionResults = loadExtractionResults(extractionResultsName);
   validateExtractionHealth(extractionResults);
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = royalArmory.getUnitSpecEffect(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Royal Armory ${description} specialization effect`,
   });
  });
 });
});
