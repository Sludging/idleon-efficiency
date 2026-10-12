/**
 * Compare Orion's six account-wide global bonus results with the saved game's
 * OwlBonuses values. Each selected index is a distinct player-facing effect.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Orion } from '../../../data/domain/world-1/orion';

const saveName = 'latest';
const extractionResultsName = 'orion-global-bonus-data.json';

describe('Orion account-wide global bonuses', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, unknown>;
 let orion: Orion;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  orion = gameData.get("orion") as Orion;
 });

 describe('Global bonus results', () => {
  it('matches Orion’s account-wide Class XP percentage-point bonus', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_0');
   expect(orion.getGlobalBonus(0)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches Orion’s account-wide flat base-damage bonus', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_1');
   expect(orion.getGlobalBonus(1)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches Orion’s account-wide Total Damage percentage-point bonus', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_2');
   expect(orion.getGlobalBonus(2)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches Orion’s account-wide Skill XP percentage-point bonus', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_3');
   expect(orion.getGlobalBonus(3)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches Orion’s account-wide Drop Rate percentage-point bonus', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_4');
   expect(orion.getGlobalBonus(4)).toMatchLiveGame(liveBonus, 0);
  });

  it('matches Orion’s account-wide flat all-stat bonus', () => {
   const liveBonus = getExtractedValue(extractionResults, 'global_bonus_5');
   expect(orion.getGlobalBonus(5)).toMatchLiveGame(liveBonus, 0);
  });
 });
});

