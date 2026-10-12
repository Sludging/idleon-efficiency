/**
 * Dancing Coral Domain Calculation Tests
 *
 * Tests our Dancing Coral bonus and cost calculations against live game data.
 *
 * Dancing Coral provides 9 upgrades purchased with various coral types:
 * - Bonus formula: baseBonus * max(0, shrineLevel - 200) (0 if not purchased)
 * - Cost formula: baseCost / (1 + (10 * unlockValue + 1.05^unlockValue) / 100)
 *
 * Each upgrade has a shrine level (Tower[18-26]) that must exceed 200 to provide benefits.
 * 
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { DancingCoral } from '../../../data/domain/world-7/dancingCoral';

const saveName = 'latest';
const extractionResultsName = 'dancing-coral-data.json';

describe('Dancing Coral Domain - Calculations', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let dancingCoral: DancingCoral;

 beforeAll(() => {
  // Load live game extraction results
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  // Load matching save data
  try {
   gameData = loadGameDataFromSave(saveName);

   // Get fully configured dancingCoral domain
   dancingCoral = gameData.get('dancingCoral') as DancingCoral;
   if (!dancingCoral) {
    throw new Error('DancingCoral domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Bonus Calculations', () => {
  it('validates bonus 0 calculation (Daily Reef Coral)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_0');
   const calculatedBonus = dancingCoral.getBonusFromIndex(0);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Dancing Coral bonus 0: Daily Reef Coral',
   });
  });

  it('validates bonus 1 calculation (Spelunking POW)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_1');
   const calculatedBonus = dancingCoral.getBonusFromIndex(1);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Dancing Coral bonus 1: Spelunking POW',
   });
  });

  it('validates bonus 2 calculation (Spelunking Amber gain)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_2');
   const calculatedBonus = dancingCoral.getBonusFromIndex(2);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Dancing Coral bonus 2: Spelunking Amber gain',
   });
  });

  it('validates bonus 3 calculation (Class EXP gain)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_3');
   const calculatedBonus = dancingCoral.getBonusFromIndex(3);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Dancing Coral bonus 3: Class EXP gain',
   });
  });

  it('matches the Research EXP bonus from Neon Coral', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_4');
   const calculatedBonus = dancingCoral.getBonusFromIndex(4);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Neon Coral bonus: Research EXP',
   });
  });

  it('matches the Minehead damage and money bonus from Aegean Coral', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_5');
   const calculatedBonus = dancingCoral.getBonusFromIndex(5);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Aegean Coral bonus: Minehead damage and money',
   });
  });

  it('matches the Gilded Coral bonus output; its effect is undocumented in current static metadata', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_6');
   const calculatedBonus = dancingCoral.getBonusFromIndex(6);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Gilded Coral bonus output; effect not documented in current static metadata',
   });
  });

  it('matches the Twisted Coral bonus output; its effect is undocumented in current static metadata', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_7');
   const calculatedBonus = dancingCoral.getBonusFromIndex(7);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Twisted Coral bonus output; effect not documented in current static metadata',
   });
  });

  it('matches the Eternal Coral bonus output; its effect is undocumented in current static metadata', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'dancing_coral_bonus_8');
   const calculatedBonus = dancingCoral.getBonusFromIndex(8);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Eternal Coral bonus output; effect not documented in current static metadata',
   });
  });
 });

 describe('Cost Calculations', () => {
  it('matches the next purchase cost of Reef Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_0');
   const calculatedCost = dancingCoral.bonuses[0].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Reef Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Vibrant Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_1');
   const calculatedCost = dancingCoral.bonuses[1].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Vibrant Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Glowing Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_2');
   const calculatedCost = dancingCoral.bonuses[2].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Glowing Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Char Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_3');
   const calculatedCost = dancingCoral.bonuses[3].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Char Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Neon Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_4');
   const calculatedCost = dancingCoral.bonuses[4].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Neon Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Aegean Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_5');
   const calculatedCost = dancingCoral.bonuses[5].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Aegean Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Gilded Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_6');
   const calculatedCost = dancingCoral.bonuses[6].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Gilded Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Twisted Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_7');
   const calculatedCost = dancingCoral.bonuses[7].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Twisted Coral next purchase cost',
   });
  });

  it('matches the next purchase cost of Eternal Coral', () => {
   const extractedCost = getExtractedValue(extractionResults, 'dancing_coral_cost_8');
   const calculatedCost = dancingCoral.bonuses[8].getCost();

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Eternal Coral next purchase cost',
   });
  });
 });
});
