/**
 * Hole Domain - Schematic bonuses (B_UPG)
 *
 * Validates each delivered B_UPG branch represented by the saved Hole state,
 * including the locked guard, factor-preserving default branch, and index 49
 * resource-layer calculation.
 *
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Hole } from '../../../data/domain/world-5/hole/hole';

const saveName = 'latest';
const extractionResultsName = 'hole-schematic-bonuses-data.json';

const schematicCases = [
 { index: 31, baseMultiplier: 1, extractionKey: 'hole_b_upg_31_1', description: 'locked schematic guard (index 31)' },
 { index: 0, baseMultiplier: 25, extractionKey: 'hole_b_upg_0_25', description: 'default schematic branch with factor 25 (index 0)' },
 { index: 14, baseMultiplier: 0, extractionKey: 'hole_b_upg_14_0', description: 'sediment expansion branch (index 14)' },
 { index: 45, baseMultiplier: 0, extractionKey: 'hole_b_upg_45_0', description: 'bell improvement branch (index 45)' },
 { index: 46, baseMultiplier: 0, extractionKey: 'hole_b_upg_46_0', description: 'extra calculation branch (index 46)' },
 { index: 47, baseMultiplier: 0, extractionKey: 'hole_b_upg_47_0', description: 'extra calculation branch (index 47)' },
 { index: 48, baseMultiplier: 0, extractionKey: 'hole_b_upg_48_0', description: 'extra calculation branch (index 48)' },
 { index: 49, baseMultiplier: 15, extractionKey: 'hole_b_upg_49_15', description: 'resource-layer branch with factor 15 (index 49)' },
 { index: 52, baseMultiplier: 0, extractionKey: 'hole_b_upg_52_0', description: 'well sediment logarithm branch (index 52)' },
 { index: 53, baseMultiplier: 0, extractionKey: 'hole_b_upg_53_0', description: 'well sediment logarithm branch (index 53)' },
 { index: 54, baseMultiplier: 0, extractionKey: 'hole_b_upg_54_0', description: 'well sediment power branch (index 54)' },
 { index: 55, baseMultiplier: 0, extractionKey: 'hole_b_upg_55_0', description: 'well sediment logarithm branch (index 55)' },
 { index: 56, baseMultiplier: 0, extractionKey: 'hole_b_upg_56_0', description: 'well sediment power branch (index 56)' },
 { index: 57, baseMultiplier: 0, extractionKey: 'hole_b_upg_57_0', description: 'well sediment logarithm branch (index 57)' },
 { index: 58, baseMultiplier: 0, extractionKey: 'hole_b_upg_58_0', description: 'extra calculation logarithm branch (index 58)' },
 { index: 59, baseMultiplier: 0, extractionKey: 'hole_b_upg_59_0', description: 'extra calculation sum branch (index 59)' },
 { index: 82, baseMultiplier: 2, extractionKey: 'hole_b_upg_82_2', description: 'sanctum branch with factor 2 (index 82)' },
 { index: 83, baseMultiplier: 3, extractionKey: 'hole_b_upg_83_3', description: 'sanctum branch with factor 3 (index 83)' },
 { index: 84, baseMultiplier: 5, extractionKey: 'hole_b_upg_84_5', description: 'sanctum branch with factor 5 (index 84)' },
];

describe('Hole Domain - Schematic bonuses', () => {
 let extractionResults: ExtractionResults;
 let hole: Hole;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  hole = loadGameDataFromSave(saveName).get('hole') as Hole;
 });

 schematicCases.forEach(({ index, baseMultiplier, extractionKey, description }) => {
  it(`validates ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = hole.getSchematicBonus(index, baseMultiplier);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: description,
   });
  });
 });
});
