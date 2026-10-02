/**
 * Summoning Winner Bonus Calculation Validation
 *
 * Tests our Summoning winner bonus calculations against live game data.
 * 
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { Summoning } from '../../../data/domain/world-6/summoning';

const saveName = 'latest';
const extractionResultsName = 'summoning-win-bonus-data.json';

describe('Summoning Domain - Winner Bonus Calculations', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let summoning: Summoning;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  summoning = gameData.get("summoning") as Summoning;
 });

 it('validates Library Max bonus (index 19)', () => {
  const liveValue = getExtractedValue(extractionResults, 'win_bonus_19');
  const domainValue = summoning.summonBonuses.find(bonus => bonus.index === 19)?.getBonus() ?? 0;

  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });

 it('validates Stamp Levels per Day bonus (index 20)', () => {
  const liveValue = getExtractedValue(extractionResults, 'win_bonus_20');
  const domainValue = summoning.summonBonuses.find(bonus => bonus.index === 20)?.getBonus() ?? 0;

  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });

 it('validates Ballot bonus (index 22)', () => {
  const liveValue = getExtractedValue(extractionResults, 'win_bonus_22');
  const domainValue = summoning.summonBonuses.find(bonus => bonus.index === 22)?.getBonus() ?? 0;

  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });

 it('validates Equinox Max Level bonus (index 24)', () => {
  const liveValue = getExtractedValue(extractionResults, 'win_bonus_24');
  const domainValue = summoning.summonBonuses.find(bonus => bonus.index === 24)?.getBonus() ?? 0;

  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });

 it('validates Meal Bonuses (index 26)', () => {
  const liveValue = getExtractedValue(extractionResults, 'win_bonus_26');
  const domainValue = summoning.summonBonuses.find(bonus => bonus.index === 26)?.getBonus() ?? 0;

  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });

 it('validates Winner Bonuses bonus (index 31)', () => {
  const liveValue = getExtractedValue(extractionResults, 'win_bonus_31');
  const domainValue = summoning.summonBonuses.find(bonus => bonus.index === 31)?.getBonus() ?? 0;

  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });

 it('validates All Essence bonus (index 5)', () => {
  const liveValue = getExtractedValue(extractionResults, 'win_bonus_5');
  const domainValue = summoning.summonBonuses.find(bonus => bonus.index === 5)?.getBonus() ?? 0;

  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });
});
