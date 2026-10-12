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
 { index: 31, baseMultiplier: 1, extractionKey: 'hole_b_upg_31_1', description: 'Bee String remains unavailable until its schematic is unlocked' },
 { index: 0, baseMultiplier: 25, extractionKey: 'hole_b_upg_0_25', description: 'Unlocked basic cavern schematic returns its supplied bonus factor' },
 { index: 14, baseMultiplier: 0, extractionKey: 'hole_b_upg_14_0', description: 'Bolaia research multiplier applied to the sediment expansion bonus' },
 { index: 45, baseMultiplier: 0, extractionKey: 'hole_b_upg_45_0', description: 'Improvement Stackin multiplier from Bell improvement levels' },
 { index: 46, baseMultiplier: 0, extractionKey: 'hole_b_upg_46_0', description: 'Gloomie Lootie Drop Rate bonus from defeated Gloomie colonies' },
 { index: 47, baseMultiplier: 0, extractionKey: 'hole_b_upg_47_0', description: 'Gloomie Expie Class EXP bonus from defeated Gloomie colonies' },
 { index: 48, baseMultiplier: 0, extractionKey: 'hole_b_upg_48_0', description: 'Gloomie Opie Villager EXP bonus from romanced or defeated Gloomie colonies' },
 { index: 49, baseMultiplier: 15, extractionKey: 'hole_b_upg_49_15', description: 'Motherlode Trickledown All Skill Efficiency and EXP bonus for factor 15' },
 { index: 52, baseMultiplier: 0, extractionKey: 'hole_b_upg_52_0', description: 'DNA Rock Tumbler extra Grey Gene chance from Gravel' },
 { index: 53, baseMultiplier: 0, extractionKey: 'hole_b_upg_53_0', description: 'Final Ballad of the Snail success chance from Treble Notes' },
 { index: 54, baseMultiplier: 0, extractionKey: 'hole_b_upg_54_0', description: 'Noise Reduction Therapy Stealth bonus from Quaver Notes' },
 { index: 55, baseMultiplier: 0, extractionKey: 'hole_b_upg_55_0', description: 'Tune of Artifaction Artifact Find Chance from Natural Notes' },
 { index: 56, baseMultiplier: 0, extractionKey: 'hole_b_upg_56_0', description: 'Heavy Redstone Seasoning Cooking Speed bonus from Redstone' },
 { index: 57, baseMultiplier: 0, extractionKey: 'hole_b_upg_57_0', description: 'True Golden Edge player damage bonus from Goldust' },
 { index: 58, baseMultiplier: 0, extractionKey: 'hole_b_upg_58_0', description: "Loadin' some 'Lode Bucket Fill Rate bonus from Motherlode Ore" },
 { index: 59, baseMultiplier: 0, extractionKey: 'hole_b_upg_59_0', description: 'Hiring the Hounds from Beyond Bucket Fill Rate bonus from defeated hounds' },
 { index: 82, baseMultiplier: 2, extractionKey: 'hole_b_upg_82_2', description: 'Sanctum of LOOT Drop Rate bonus from cleared Ancient Golem Sanctums' },
 { index: 83, baseMultiplier: 3, extractionKey: 'hole_b_upg_83_3', description: 'Sanctum of EXP Class EXP bonus from cleared Ancient Golem Sanctums' },
 { index: 84, baseMultiplier: 5, extractionKey: 'hole_b_upg_84_5', description: 'Sanctum of DMG total damage bonus from cleared Ancient Golem Sanctums' },
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
