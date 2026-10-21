/**
 * Minehead shop upgrade calculations against the paired live-game extraction.
 *
 * Quantity rows target positive levels, zero levels, distinct per-level
 * coefficients, and the max-zero record. Requirement rows target the floor
 * changes at indices 3 and 11. Cost rows target the pre-index-2 term, the
 * 2^max(0,n-4) transition, the A_MineCost exponent transition, and both
 * discount/cap records. Affordability, unlock, buyability, and maxed rows
 * retain the approved finite, unlimited, locked, and max-zero boundaries.
 * The paired extraction establishes which states this save exercises; a
 * single save cannot establish every level or cap transition, so expected
 * values remain source-extracted rather than inferred.
 *
 */

import { Minehead, MineheadUpgrade } from '../../../data/domain/world-7/minehead';
import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';


const extractionResultsName = 'minehead-data.json';
const saveName = 'latest';

const quantityCases = [
 { index: 0, description: "Base Damage I's current damage-upgrade quantity at a positive level" },
 { index: 3, description: "Bettah Numbahs' current per-level shop quantity" },
 { index: 16, description: "Legal Cheating Button's current shop quantity at zero level" },
 { index: 26, description: "El' Cheapo Upgrado's current discount quantity at zero level" },
 { index: 29, description: "Rift Guy's Upgrade quantity in its zero-max shop listing" },
] as const;

const requirementCases = [
 { index: 2, description: "Grid Expansion's Research level requirement before the next threshold" },
 { index: 3, description: "Bettah Numbahs' Research level requirement at a threshold" },
 { index: 10, description: "Boom Blocker's Research level requirement before the next threshold" },
 { index: 11, description: "Final Round Fury's Research level requirement at a threshold" },
] as const;

const costCases = [
 { index: 2, description: "Grid Expansion's next-level shop price" },
 { index: 3, description: "Bettah Numbahs' next-level shop price" },
 { index: 4, description: "Mega Damage I's next-level shop price" },
 { index: 5, description: "Miney Farmey I's next-level shop price" },
 { index: 9, description: "Big Hit Combos' next-level shop price" },
 { index: 10, description: "Boom Blocker's next-level shop price" },
 { index: 26, description: "El' Cheapo Upgrado's next-level shop price" },
 { index: 29, description: "Rift Guy's Upgrade shop price despite its zero maximum" },
] as const;

const affordabilityCases = [
 { index: 0, description: "Base Damage I, an unlimited-cap upgrade" },
 { index: 1, description: "Numbahs, a finite-cap upgrade" },
 { index: 29, description: "Rift Guy's Upgrade, whose maximum is zero" },
] as const;

const unlockCases = [
 { index: 20, description: "Classic Flags at the Research unlock boundary" },
 { index: 21, description: "Mega Damage II beyond the Research unlock boundary" },
] as const;

const buyabilityCases = [
 { index: 0, description: "Base Damage I, an unlocked unlimited-cap shop purchase" },
 { index: 1, description: "Numbahs, an unlocked finite-cap shop purchase" },
 { index: 20, description: "Classic Flags at its Research unlock boundary" },
 { index: 21, description: "Mega Damage II while Research-locked" },
 { index: 29, description: "Rift Guy's Upgrade, whose maximum is zero" },
] as const;

const maxedCases = [
 { index: 0, description: "Base Damage I below its listed maximum" },
 { index: 1, description: "Numbahs below its finite maximum" },
 { index: 29, description: "Rift Guy's Upgrade with a zero maximum" },
] as const;

const getMinehead = (gameData: Map<string, unknown>): Minehead => gameData.get('minehead') as Minehead;

const getUpgrade = (minehead: Minehead, index: number): MineheadUpgrade => {
 const upgrade = minehead.upgrades.find(candidate => candidate.index === index);
 if (!upgrade) {
  throw new Error(`Minehead upgrade ${index} not found in the paired save`);
 }
 return upgrade;
};

describe('Minehead Domain - Upgrade Shop', () => {
 let extractionResults: ExtractionResults;
 let minehead: Minehead;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  minehead = getMinehead(loadGameDataFromSave(saveName));
 });

 quantityCases.forEach(({ index, description }) => {
  it(`matches the owner upgrade quantity for ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, `minehead_upgrade_quantity_${index}`);
   const domainValue = minehead.getUpgradeBonus(index);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead upgrade quantity ${index} (${description})`,
   });
  });
 });


 requirementCases.forEach(({ index, description }) => {
  it(`matches ${description} for upgrade ${index}`, () => {
   const liveValue = getExtractedValue(extractionResults, `minehead_upgrade_requirement_${index}`);
   const domainValue = getUpgrade(minehead, index).getRequiredLevel();

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead upgrade requirement ${index} (${description})`,
   });
  });
 });

 costCases.forEach(({ index, description }) => {
  it(`matches ${description} for upgrade ${index}`, () => {
   const liveValue = getExtractedValue(extractionResults, `minehead_upgrade_cost_${index}`);
   const domainValue = getUpgrade(minehead, index).nextLevelCost();

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead next-level cost ${index} (${description})`,
   });
  });
 });

 affordabilityCases.forEach(({ index, description }) => {
  it(`matches affordability for ${description}`, () => {
   const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_affordable_${index}`));
   const domainValue = Number(minehead.canAffordUpgrade(index));

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead upgrade affordability ${index} (${description})`,
   });
  });
 });

 unlockCases.forEach(({ index, description }) => {
  it(`matches the account unlock state for ${description}`, () => {
   const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_unlocked_${index}`));
   const domainValue = Number(getUpgrade(minehead, index).isUnlocked());

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead upgrade unlock ${index} (${description})`,
   });
  });
 });

 buyabilityCases.forEach(({ index, description }) => {
  it(`matches purchase eligibility for ${description}`, () => {
   const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_buyable_${index}`));
   const domainValue = Number(minehead.canBuyUpgrade(index));

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead upgrade buyability ${index} (${description})`,
   });
  });
 });

 maxedCases.forEach(({ index, description }) => {
  it(`matches the cap state for ${description}`, () => {
   const liveValue = Number(getExtractedValue(extractionResults, `minehead_upgrade_maxed_${index}`));
   const domainValue = Number(getUpgrade(minehead, index).isMaxed());

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Minehead upgrade maxed ${index} (${description})`,
   });
  });
 });
 it('matches Numbahs cost across its next ten saved progression levels or cap', () => {
  const upgrade = getUpgrade(minehead, 1);
  const targetLevel = Math.min(upgrade.level + 10, upgrade.data.maxLevel);
  const nativeValue = getExtractedValue(extractionResults, 'minehead_upgrade_cost_to_max_1');

  expect(upgrade.getCostToLevel(targetLevel)).toMatchLiveGameWithDetails(nativeValue, {
   tolerance: 0,
   context: 'Numbahs cost across genuine saved progression to next ten levels or listed cap',
  });
 });

 it('matches Base Damage I cost across its next ten saved progression levels', () => {
  const upgrade = getUpgrade(minehead, 0);
  const nativeValue = getExtractedValue(extractionResults, 'minehead_upgrade_next10_cost_0');

  expect(upgrade.getCostToLevel(upgrade.level + 10)).toMatchLiveGameWithDetails(nativeValue, {
   tolerance: 0,
   context: 'Base Damage I cost across ten genuine saved progression levels',
  });
 });
});
