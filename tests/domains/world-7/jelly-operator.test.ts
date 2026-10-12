/**
 * Jelly Operator final calculations against the paired real-game extraction.
 *
 * The shop positions below cover the zero-cost entry, early and late costs,
 * Lower Cholesterol, the final mapped entry, and account-wide eligibility.
 *
 */
import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
 JellyOperator,
 JellyOperatorUpgrade,
} from '../../../data/domain/world-7/jellyOperator';

const saveName = 'latest';
const extractionResultsName = 'jelly-operator-data.json';

const getUpgrade = (
 jellyOperator: JellyOperator,
 canonicalId: number,
): JellyOperatorUpgrade => jellyOperator.upgrades.find(upgrade => upgrade.index === canonicalId)!;

describe('Jelly Operator - Final Calculations', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;
 let jellyOperator: JellyOperator;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  jellyOperator = gameData.get('jellyOperator') as JellyOperator;

  if (!jellyOperator) {
   throw new Error('JellyOperator domain not found in save data');
  }
 });

 it('matches the account-wide successful Jelly Operator operations', () => {
  const liveValue = getExtractedValue(extractionResults, 'jelly_successful_operations');

  expect(jellyOperator.getSuccessfulOperations()).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly Operator successful operations from account Research',
  });
 });

 it('matches the zero-cost Jelly shop entry', () => {
  const liveValue = getExtractedValue(extractionResults, 'jelly_upgrade_cost_0');
  const domainValue = getUpgrade(jellyOperator, 0).getUpgradeCost();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop cost at position 0',
  });
 });

 it('matches the first nonzero Jelly shop cost', () => {
  const liveValue = getExtractedValue(extractionResults, 'jelly_upgrade_cost_1');
  const domainValue = getUpgrade(jellyOperator, 23).getUpgradeCost();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop cost at position 1 (canonical upgrade 23)',
  });
 });

 it('matches the early Jelly shop cost before the late-position factors', () => {
  const liveValue = getExtractedValue(extractionResults, 'jelly_upgrade_cost_3');
  const domainValue = getUpgrade(jellyOperator, 1).getUpgradeCost();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop cost at position 3 (canonical upgrade 1)',
  });
 });

 it('matches the late-position Jelly shop cost', () => {
  const liveValue = getExtractedValue(extractionResults, 'jelly_upgrade_cost_20');
  const domainValue = getUpgrade(jellyOperator, 4).getUpgradeCost();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop cost at position 20 (canonical upgrade 4)',
  });
 });

 it('matches the Lower Cholesterol Jelly shop cost', () => {
  const liveValue = getExtractedValue(extractionResults, 'jelly_upgrade_cost_33');
  const domainValue = getUpgrade(jellyOperator, 34).getUpgradeCost();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop cost at position 33 (Lower Cholesterol)',
  });
 });

 it('matches the final mapped Jelly shop cost', () => {
  const liveValue = getExtractedValue(extractionResults, 'jelly_upgrade_cost_39');
  const domainValue = getUpgrade(jellyOperator, 37).getUpgradeCost();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: "Jelly shop cost at position 39 (Rift Guy's Upgrade)",
  });
 });

 it('matches affordability at the zero-cost Jelly shop entry', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_affordable_0'));
  const domainValue = Number(jellyOperator.canAffordUpgrade(0));

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop affordability at position 0',
  });
 });

 it('matches affordability at the first nonzero Jelly shop entry', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_affordable_1'));
  const domainValue = Number(jellyOperator.canAffordUpgrade(23));

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop affordability at position 1 (canonical upgrade 23)',
  });
 });

 it('matches affordability at the Lower Cholesterol shop position', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_affordable_33'));
  const domainValue = Number(jellyOperator.canAffordUpgrade(34));

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop affordability at position 33 (Lower Cholesterol)',
  });
 });

 it('matches affordability at the final mapped shop position', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_affordable_39'));
  const domainValue = Number(jellyOperator.canAffordUpgrade(37));

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: "Jelly shop affordability at position 39 (Rift Guy's Upgrade)",
  });
 });

 it('matches the account-wide unlock state at the first Jelly shop position', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_unlocked_0'));
  const domainValue = Number(getUpgrade(jellyOperator, 0).isUnlocked());

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop unlock at position 0 from player-0 Research',
  });
 });

 it('matches the account-wide unlock state at Lower Cholesterol', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_unlocked_33'));
  const domainValue = Number(getUpgrade(jellyOperator, 34).isUnlocked());

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop unlock at position 33 from player-0 Research',
  });
 });

 it('matches the account-wide unlock state at the final mapped shop position', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_unlocked_39'));
  const domainValue = Number(getUpgrade(jellyOperator, 37).isUnlocked());

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop unlock at position 39 from player-0 Research',
  });
 });

 it('matches purchase eligibility at the zero-cost Jelly shop entry', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_buyable_0'));
  const domainValue = Number(jellyOperator.canBuyUpgrade(0));

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop purchase eligibility at position 0',
  });
 });

 it('matches purchase eligibility at the Lower Cholesterol shop position', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_buyable_33'));
  const domainValue = Number(jellyOperator.canBuyUpgrade(34));

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop purchase eligibility at position 33 (Lower Cholesterol)',
  });
 });

 it('matches purchase eligibility at the final mapped shop position', () => {
  const liveValue = Number(getExtractedValue(extractionResults, 'jelly_upgrade_buyable_39'));
  const domainValue = Number(jellyOperator.canBuyUpgrade(37));

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Jelly shop purchase eligibility at position 39',
  });
 });

});
