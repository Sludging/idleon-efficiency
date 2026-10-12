/**
 * Compare Bubba's seven account-wide global bonus results with the saved
 * game's BubbaRoG_Bonuses values; each index represents a distinct effect.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Bubba } from '../../../data/domain/world-3/bubba';

const saveName = 'latest';
const extractionResultsName = 'bubba-global-bonus-data.json';

describe('Bubba account-wide global bonuses', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, unknown>;
 let bubba: Bubba;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  bubba = gameData.get("bubba") as Bubba;
 });

 describe('Global bonus results', () => {
  it('matches the account-wide Build Rate contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_1');
   expect(bubba.getGlobalBonus(1)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Critter Gain contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_2');
   expect(bubba.getGlobalBonus(2)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Soul Gain contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_3');
   expect(bubba.getGlobalBonus(3)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Total Damage contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_4');
   expect(bubba.getGlobalBonus(4)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide All Kills contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_5');
   expect(bubba.getGlobalBonus(5)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide XP Multi contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_6');
   expect(bubba.getGlobalBonus(6)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Atom Cost reduction', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_7');
   expect(bubba.getGlobalBonus(7)).toMatchLiveGame(liveBonus, 0);
  });
 });
});

