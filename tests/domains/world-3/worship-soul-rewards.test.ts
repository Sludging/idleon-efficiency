/**
 * Compare the website's saved-player Worship soul reward amounts for selected
 * totems with the matching live game calculations.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Worship } from '../../../data/domain/world-3/worship';

const saveName = 'latest';
const extractionResultsName = 'worship-soul-rewards-data.json';

describe('Worship soul reward results', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;
 let worship: Worship;
 let worshipEfficiency: number;
 let foodBonus: number;
 let talent57: number;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  worship = gameData.get("worship") as Worship;

  worshipEfficiency = getExtractedValue(extractionResults, 'worship_efficiency');
  foodBonus = getExtractedValue(extractionResults, 'food_bonus_worship_soul_boosts');
  talent57 = getExtractedValue(extractionResults, 'talent_57');
 });

 describe('Soul Rewards by Totem', () => {
  it('matches Goblin Gorefest soul rewards for the saved Worship state', () => {
   const liveSoulRewards = getExtractedValue(extractionResults, 'totem_0_soul_rewards');
   const domainSoulRewards = worship.totemInfo[0].getSoulRewards(worshipEfficiency, foodBonus, talent57);

   expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
  });

  it('matches Acorn Assault soul rewards for the saved Worship state', () => {
   const liveSoulRewards = getExtractedValue(extractionResults, 'totem_2_soul_rewards');
   const domainSoulRewards = worship.totemInfo[2].getSoulRewards(worshipEfficiency, foodBonus, talent57);

   expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
  });

  it('matches Citric Conflict soul rewards for the saved Worship state', () => {
   const liveSoulRewards = getExtractedValue(extractionResults, 'totem_5_soul_rewards');
   const domainSoulRewards = worship.totemInfo[5].getSoulRewards(worshipEfficiency, foodBonus, talent57);

   expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
  });

  it('matches Pufferblob Brawl soul rewards for the saved Worship state', () => {
   const liveSoulRewards = getExtractedValue(extractionResults, 'totem_7_soul_rewards');
   const domainSoulRewards = worship.totemInfo[7].getSoulRewards(worshipEfficiency, foodBonus, talent57);

   expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
  });
 });
});
