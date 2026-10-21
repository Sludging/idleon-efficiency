/**
 * Big Fish Domain Calculation Tests
 *
 * Tests our Big Fish bonus, cost, and unlock requirement calculations against live game data.
 *
 * Big Fish provides 7 advice upgrades that affect various game mechanics:
 * - Bonus formula: level / (100 + level) * x0 (0 if not unlocked)
 * - Cost formula: 1.15^level * 10.01^x1
 * - Unlock requirement: 4000 + (300 + 50 * max(0, index - 2)) * index
 *
 * Bonuses are unlocked when total player levels exceed the unlock requirement.
 * 
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { BigFish, updateBigFishUnlocked } from '../../../data/domain/world-7/bigFish';

const saveName = 'latest';
const extractionResultsName = 'big-fish-data.json';

describe('Big Fish Domain - Calculations', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let bigFish: BigFish;

 beforeAll(() => {
  // Load live game extraction results
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  // Load matching save data
  try {
   gameData = loadGameDataFromSave(saveName);

   // Get fully configured bigFish domain
   bigFish = gameData.get('bigFish') as BigFish;
   if (!bigFish) {
    throw new Error('BigFish domain not found in save data');
   }

  } catch (error: any) {
   throw new Error(`❌ Failed to load save data: ${error.message}`);
  }
 });

 describe('Bonus Calculations', () => {
  it('validates bonus 0 calculation (W7 mob respawn rate)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_0');
   const calculatedBonus = bigFish.getBonusFromIndex(0);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Big Fish bonus 0: W7 mob respawn rate',
   });
  });

  it('validates bonus 1 calculation (Max Stamina in Spelunking)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_1');
   const calculatedBonus = bigFish.getBonusFromIndex(1);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Big Fish bonus 1: Max Stamina in Spelunking',
   });
  });

  it('validates bonus 2 calculation (Spelunking AFK Gains)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_2');
   const calculatedBonus = bigFish.getBonusFromIndex(2);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Big Fish bonus 2: Spelunking AFK Gains',
   });
  });

  it('validates bonus 3 calculation (Kill per Kill in W7)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_3');
   const calculatedBonus = bigFish.getBonusFromIndex(3);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Big Fish bonus 3: Kill per Kill in W7',
   });
  });

  it('validates bonus 4 calculation (Class EXP Gain)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_4');
   const calculatedBonus = bigFish.getBonusFromIndex(4);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Big Fish bonus 4: Class EXP Gain',
   });
  });

  it('validates bonus 5 calculation (Double Gold Food drop chance)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_5');
   const calculatedBonus = bigFish.getBonusFromIndex(5);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Big Fish bonus 5: Double Gold Food drop chance',
   });
  });
  it('validates Advice on Settlement bonus (extra mob clear for Royal Guardian)', () => {
   const extractedBonus = getExtractedValue(extractionResults, 'big_fish_bonus_6');
   const calculatedBonus = bigFish.getBonusFromIndex(6);

   expect(calculatedBonus).toMatchLiveGameWithDetails(extractedBonus, {
    tolerance: 0,
    context: 'Big Fish bonus 6: extra mob clear for Royal Guardian',
   });
  });
 });
 describe('Displayed Levels', () => {
  it('matches the family level shown above Advice Fish bonuses', () => {
   const extractedFamilyLevel = getExtractedValue(extractionResults, 'big_fish_family_level');

   expect(bigFish.familyLevel).toMatchLiveGameWithDetails(extractedFamilyLevel, {
    tolerance: 0,
    context: 'Advice Fish family level shown on the website',
   });
  });

  it('matches the displayed level for the W7 mob respawn-rate bonus', () => {
   const extractedLevel = getExtractedValue(extractionResults, 'big_fish_bonus_level_0');

   expect(bigFish.bonuses[0].level).toMatchLiveGameWithDetails(extractedLevel, {
    tolerance: 0,
    context: 'Advice Fish level for the W7 mob respawn-rate bonus',
   });
  });

  it('matches the displayed level for increased Spelunking Stamina', () => {
   const extractedLevel = getExtractedValue(extractionResults, 'big_fish_bonus_level_1');

   expect(bigFish.bonuses[1].level).toMatchLiveGameWithDetails(extractedLevel, {
    tolerance: 0,
    context: 'Advice Fish level for increased Spelunking Stamina',
   });
  });

  it('matches the displayed level for Spelunking AFK Gains', () => {
   const extractedLevel = getExtractedValue(extractionResults, 'big_fish_bonus_level_2');

   expect(bigFish.bonuses[2].level).toMatchLiveGameWithDetails(extractedLevel, {
    tolerance: 0,
    context: 'Advice Fish level for Spelunking AFK Gains',
   });
  });

  it('matches the displayed level for the W7 Kill per Kill bonus', () => {
   const extractedLevel = getExtractedValue(extractionResults, 'big_fish_bonus_level_3');

   expect(bigFish.bonuses[3].level).toMatchLiveGameWithDetails(extractedLevel, {
    tolerance: 0,
    context: 'Advice Fish level for the W7 Kill per Kill bonus',
   });
  });

  it('matches the displayed level for the Class EXP bonus', () => {
   const extractedLevel = getExtractedValue(extractionResults, 'big_fish_bonus_level_4');

   expect(bigFish.bonuses[4].level).toMatchLiveGameWithDetails(extractedLevel, {
    tolerance: 0,
    context: 'Advice Fish level for the Class EXP bonus',
   });
  });

  it('matches the displayed level for Double Gold Food drop chance', () => {
   const extractedLevel = getExtractedValue(extractionResults, 'big_fish_bonus_level_5');

   expect(bigFish.bonuses[5].level).toMatchLiveGameWithDetails(extractedLevel, {
    tolerance: 0,
    context: 'Advice Fish level for Double Gold Food drop chance',
   });
  });

  it('matches the displayed level for Advice on Settlement', () => {
   const extractedLevel = getExtractedValue(extractionResults, 'big_fish_bonus_level_6');

   expect(bigFish.bonuses[6].level).toMatchLiveGameWithDetails(extractedLevel, {
    tolerance: 0,
    context: 'Advice Fish level for Advice on Settlement',
   });
  });
 });


 describe('Cost Calculations', () => {
  it('matches next cost for the W7 mob respawn-rate increase', () => {
   const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_0');
   const calculatedCost = bigFish.getBonusNextlevelCost(0);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Big Fish next cost for the W7 mob respawn-rate increase',
   });
  });

  it('matches next cost for increased Spelunking Stamina', () => {
   const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_1');
   const calculatedCost = bigFish.getBonusNextlevelCost(1);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Big Fish next cost for increased Spelunking Stamina',
   });
  });

  it('matches next cost for increased Spelunking AFK Gains', () => {
   const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_2');
   const calculatedCost = bigFish.getBonusNextlevelCost(2);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Big Fish next cost for increased Spelunking AFK Gains',
   });
  });

  it('matches next cost for the W7 Kill per Kill bonus', () => {
   const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_3');
   const calculatedCost = bigFish.getBonusNextlevelCost(3);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Big Fish next cost for the W7 Kill per Kill bonus',
   });
  });

  it('matches next cost for the Class EXP bonus', () => {
   const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_4');
   const calculatedCost = bigFish.getBonusNextlevelCost(4);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Big Fish next cost for the Class EXP bonus',
   });
  });

  it('matches next cost for increased Double Gold Food drop chance', () => {
   const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_5');
   const calculatedCost = bigFish.getBonusNextlevelCost(5);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Big Fish next cost for increased Double Gold Food drop chance',
   });
  });
  it('matches next cost for the Advice on Settlement bonus', () => {
   const extractedCost = getExtractedValue(extractionResults, 'big_fish_cost_6');
   const calculatedCost = bigFish.getBonusNextlevelCost(6);

   expect(calculatedCost).toMatchLiveGameWithDetails(extractedCost, {
    tolerance: 0,
    context: 'Big Fish next cost for the Advice on Settlement bonus',
   });
  });
 });

 describe('Unlock Level Requirement Calculations', () => {
  it('matches total-player-level unlock requirement for the W7 mob respawn-rate increase', () => {
   const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_0');
   const calculatedReq = bigFish.bonuses[0].getUnlockLevelRequired();

   expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
    tolerance: 0,
    context: 'Big Fish player-level requirement for the W7 mob respawn-rate increase',
   });
  });

  it('matches total-player-level unlock requirement for increased Spelunking Stamina', () => {
   const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_1');
   const calculatedReq = bigFish.bonuses[1].getUnlockLevelRequired();

   expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
    tolerance: 0,
    context: 'Big Fish player-level requirement for increased Spelunking Stamina',
   });
  });

  it('matches total-player-level unlock requirement for increased Spelunking AFK Gains', () => {
   const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_2');
   const calculatedReq = bigFish.bonuses[2].getUnlockLevelRequired();

   expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
    tolerance: 0,
    context: 'Big Fish player-level requirement for increased Spelunking AFK Gains',
   });
  });

  it('matches total-player-level unlock requirement for the W7 Kill per Kill bonus', () => {
   const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_3');
   const calculatedReq = bigFish.bonuses[3].getUnlockLevelRequired();

   expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
    tolerance: 0,
    context: 'Big Fish player-level requirement for the W7 Kill per Kill bonus',
   });
  });

  it('matches total-player-level unlock requirement for the Class EXP bonus', () => {
   const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_4');
   const calculatedReq = bigFish.bonuses[4].getUnlockLevelRequired();

   expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
    tolerance: 0,
    context: 'Big Fish player-level requirement for the Class EXP bonus',
   });
  });

  it('matches total-player-level unlock requirement for increased Double Gold Food drop chance', () => {
   const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_5');
   const calculatedReq = bigFish.bonuses[5].getUnlockLevelRequired();

   expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
    tolerance: 0,
    context: 'Big Fish player-level requirement for increased Double Gold Food drop chance',
   });
  });
  it('matches total-player-level unlock requirement for Advice on Settlement', () => {
   const extractedReq = getExtractedValue(extractionResults, 'big_fish_unlock_req_6');
   const calculatedReq = bigFish.bonuses[6].getUnlockLevelRequired();

   expect(calculatedReq).toMatchLiveGameWithDetails(extractedReq, {
    tolerance: 0,
    context: 'Big Fish player-level requirement for Advice on Settlement',
   });
  });

  it('marks all Advice Fish entries unlocked for the retained account', () => {
   updateBigFishUnlocked(gameData);

   expect(bigFish.bonuses.map((bonus) => bonus.unlocked)).toEqual([
    true, true, true, true, true, true, true,
   ]);
  });
 });
});
