/**
 * Prepared account totals and representative character/item contributions from the paired save.
 * Native captures cover deposited hats, both unique channels, primary properties, and missing hats.
 * This account does not cover locked characters, empty collections, new deposits or dungeon transitions.
 */
import { Player } from '../../../data/domain/player';
import { HatRack } from '../../../data/domain/world-7/hatRack';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

const samples = [
 { key: 'hat_rack_skill_efficiency', effect: '% SKILL EFFICIENCY', description: 'deposited hats Skill Efficiency' },
 { key: 'hat_rack_drop_rate', effect: '% DROP RATE', description: 'deposited hats Drop Rate including the second unique-effect channel' },
 { key: 'hat_rack_weapon_power', effect: 'Weapon Power', description: 'deposited hats base Weapon Power' },
 { key: 'hat_rack_strength', effect: 'STR', description: 'deposited hats Strength with per-hat accumulation precision' },
 { key: 'hat_rack_build_speed', effect: '% BUILD SPD', description: 'absent Build Speed contribution' },
];

const getExtractedNames = (results: ExtractionResults, key: string): string[] => {
 const extraction = results.extractions[key];
 if (!extraction) {
  throw new Error(`Extraction '${key}' not found in results. Available: ${Object.keys(results.extractions).join(', ')}`);
 }
 if (results.errors[key]) {
  throw new Error(`Extraction '${key}' failed: ${results.errors[key].error}`);
 }
 if (!Array.isArray(extraction.result) || !extraction.result.every(name => typeof name === 'string')) {
  throw new Error(`Extraction '${key}' did not return a string[] of hat identities`);
 }
 return extraction.result;
};

const sortNames = (names: string[]): string[] => [...names].sort();
const toDomainEffect = (effect: string): string => effect.replace(/_/g, ' ');



describe('Hat Rack Domain - Premium Hat Bonuses', () => {
 let extractionResults: ExtractionResults;
 let equipmentResults: ExtractionResults;
 let gameData: Map<string, any>;
 let player: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults('hat-rack-premium-hat-bonuses-data.json');
  equipmentResults = loadExtractionResults('player-equipment-bonuses-data.json');
  validateExtractionHealth(extractionResults);
  validateExtractionHealth(equipmentResults);
  gameData = loadGameDataFromSave('latest');
  player = getTargetPlayer(gameData.get('players') as Player[]);
 });

 samples.forEach(({ key, effect, description }) => {
  it(`matches ${description}`, () => {
   const results = key === 'hat_rack_skill_efficiency' ? equipmentResults : extractionResults;
   const liveValue = getExtractedValue(results, key);
   const hatRack = gameData.get('hatRack') as HatRack;
   expect(hatRack.getBonus(effect, player)).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Target player Hat Rack ${description}`,
   });
  });
 });
 for (const property of ['AGI', 'WIS', 'LUK', 'Defence'] as const) {
  it(`matches deposited hats raw ${property}`, () => {
   const results = loadExtractionResults('player-equipment-properties-data.json');
   validateExtractionHealth(results);
   const rack = gameData.get('hatRack') as HatRack;
   expect(rack.getProperty(property, player)).toMatchLiveGameWithDetails(getExtractedValue(results, `hat_${property}`), {
    tolerance: 0, context: `Target player Hat Rack raw ${property}`,
   });
  });
 }
 it('matches the complete eligible premium-hat catalog', () => {
  const expectedNames = getExtractedNames(extractionResults, 'hat_rack_eligible_hats');
  const actualNames = (gameData.get('hatRack') as HatRack).hats.map(hat => hat.internalName);

  expect(sortNames(actualNames)).toEqual(sortNames(expectedNames));
 });

 it('matches deposited premium-hat names and the saved deposit count', () => {
  const expectedNames = getExtractedNames(extractionResults, 'hat_rack_deposited_hats');
  const rack = gameData.get('hatRack') as HatRack;
  const actualNames = rack.hats.filter(hat => hat.stored).map(hat => hat.internalName);

  expect(sortNames(actualNames)).toEqual(sortNames(expectedNames));
  expect(rack.getDepositedHatCount()).toMatchLiveGameWithDetails(expectedNames.length, {
   tolerance: 0,
   context: 'Saved Hat Rack deposited count, without deduplicating the saved sequence',
  });
 });

 it('matches the native premium-hat bonus multiplier', () => {
  const rack = gameData.get('hatRack') as HatRack;
  expect(rack.getBonusMultiplier()).toMatchLiveGameWithDetails(
   getExtractedValue(extractionResults, 'hat_rack_bonus_multiplier'),
   { tolerance: 0, context: 'Account Hat Rack bonus multiplier' },
  );
 });

 it('matches every native account bonus without selecting a character', () => {
  const expectedBonuses = extractionResults.extractions.hat_rack_account_bonuses.result as Record<string, number>;
  const rack = gameData.get('hatRack') as HatRack;
  const actualBonuses = rack.getAccountBonuses();
  const expectedEffects = Object.keys(expectedBonuses).map(toDomainEffect);

  expect(sortNames([...actualBonuses.keys()])).toEqual(sortNames(expectedEffects));
  for (const [nativeEffect, expectedValue] of Object.entries(expectedBonuses)) {
   const effect = toDomainEffect(nativeEffect);
   expect(actualBonuses.get(effect)).toMatchLiveGameWithDetails(expectedValue, {
    tolerance: 0,
    context: `Account Hat Rack ${effect}`,
   });
  }
 });


 it('matches missing premium-hat names and confirms they contribute no bonuses', () => {
  const expectedNames = getExtractedNames(extractionResults, 'hat_rack_missing_hats');
  const rack = gameData.get('hatRack') as HatRack;
  const actualNames = rack.hats.filter(hat => !hat.stored).map(hat => hat.internalName);

  expect(sortNames(actualNames)).toEqual(sortNames(expectedNames));
  for (const name of expectedNames) {
   const hat = rack.hats.find(hat => hat.internalName === name)!;
   expect(rack.getHatItemBonuses(hat)).toEqual([]);
  }
 });
});
