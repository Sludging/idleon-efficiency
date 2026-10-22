/**
 * Compares Minehead upgrade bonuses and costs across the paired saved upgrades.
 * Saved selections and levels limit which upgrade states this save covers.
 */

import { initMineheadUpgradeRepo } from '../../../data/domain/data/MineheadUpgradeRepo';
import { Minehead, MineheadUpgrade } from '../../../data/domain/world-7/minehead';
import {
 ExtractionResults,
 loadExtractionResults,
 normalizeExtractedValue,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';


const extractionResultsName = 'minehead-data.json';
const saveName = 'latest';

const upgrades = initMineheadUpgradeRepo().map(record => ({
 index: record.index,
 name: record.data.name,
}));
const upgradeIndices = upgrades.map(upgrade => upgrade.index);

const requirementCases = [
 { index: 2, description: 'Grid Expansion' },
 { index: 3, description: 'Bettah Numbahs' },
 { index: 10, description: 'Boom Blocker' },
 { index: 11, description: 'Final Round Fury' },
] as const;

const costCases = upgradeIndices;


const getMinehead = (gameData: Map<string, unknown>): Minehead => gameData.get('minehead') as Minehead;

const getUpgrade = (minehead: Minehead, index: number): MineheadUpgrade => {
 const upgrade = minehead.upgrades.find(candidate => candidate.index === index);
 if (!upgrade) {
  throw new Error(`Minehead upgrade ${index} not found in the paired save`);
 }
 return upgrade;
};

describe('Minehead upgrade bonuses and costs', () => {
 let extractionResults: ExtractionResults;
 let minehead: Minehead;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  minehead = getMinehead(loadGameDataFromSave(saveName));
 });

 upgradeIndices.forEach(index => {
  it(`matches ${upgrades[index].name} upgrade bonus`, () => {
   const upgrade = getUpgrade(minehead, index);
   const liveValue = normalizeExtractedValue(
    extractionResults.extractions.minehead_upgrade_quantities.result[index],
   );

   expect(upgrade.getBonus()).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `${upgrades[index].name} upgrade bonus (index ${index})`,
   });
  });
 });


 requirementCases.forEach(({ index, description }) => {
  it(`matches ${description} Research level requirement`, () => {
   const liveValue = normalizeExtractedValue(
    extractionResults.extractions.minehead_upgrade_requirements.result[index],
   );
   const domainValue = getUpgrade(minehead, index).getRequiredLevel();

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `${description} Research level requirement (index ${index})`,
   });
  });
 });

 costCases.forEach(index => {
  it(`matches ${upgrades[index].name} next-level cost`, () => {
   const upgrade = getUpgrade(minehead, index);
   const liveValue = normalizeExtractedValue(
    extractionResults.extractions.minehead_upgrade_current_prices.result[index],
   );

   expect(upgrade.nextLevelCost()).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `${upgrades[index].name} next-level cost (index ${index})`,
   });
  });
 });

});
