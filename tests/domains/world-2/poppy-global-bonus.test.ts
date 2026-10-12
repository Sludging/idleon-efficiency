/**
 * Compare Poppy's seven account-wide global bonus results with the saved
 * game's RooBonuses values; each index represents a distinct gameplay effect.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Poppy } from '../../../data/domain/world-2/poppy';

const saveName = 'latest';
const extractionResultsName = 'poppy-global-bonus-data.json';

describe('Poppy account-wide global bonuses', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, unknown>;
 let poppy: Poppy;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  poppy = gameData.get("poppy") as Poppy;
 });

 describe('Global bonus results', () => {
  it('matches the account-wide Fishing Efficiency contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_0');
   expect(poppy.getGlobalBonus(0)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Defence contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_1');
   expect(poppy.getGlobalBonus(1)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Fishing XP contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_2');
   expect(poppy.getGlobalBonus(2)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Accuracy contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_3');
   expect(poppy.getGlobalBonus(3)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Total Damage contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_4');
   expect(poppy.getGlobalBonus(4)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide AFK Gains contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_5');
   expect(poppy.getGlobalBonus(5)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the account-wide Cash contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_6');
   expect(poppy.getGlobalBonus(6)).toMatchLiveGame(liveBonus, 0);
  });
 });
});

