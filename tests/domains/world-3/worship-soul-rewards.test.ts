/**
 * Worship Soul Rewards Calculation Validation
 *
 * Tests our Worship soul rewards calculations against live game data.
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Worship } from '../../../data/domain/world-3/worship';

const saveName = 'latest';
const extractionResultsName = 'worship-soul-rewards-data.json';

describe('Worship Domain - Soul Rewards Calculations', () => {
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
    it('validates totem 0 (Goblin Gorefest) soul rewards', () => {
      const liveSoulRewards = getExtractedValue(extractionResults, 'totem_0_soul_rewards');
      const domainSoulRewards = worship.totemInfo[0].getSoulRewards(worshipEfficiency, foodBonus, talent57);

      expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
    });

    it('validates totem 2 (Acorn Assault) soul rewards', () => {
      const liveSoulRewards = getExtractedValue(extractionResults, 'totem_2_soul_rewards');
      const domainSoulRewards = worship.totemInfo[2].getSoulRewards(worshipEfficiency, foodBonus, talent57);

      expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
    });

    it('validates totem 5 (Citric Conflict) soul rewards', () => {
      const liveSoulRewards = getExtractedValue(extractionResults, 'totem_5_soul_rewards');
      const domainSoulRewards = worship.totemInfo[5].getSoulRewards(worshipEfficiency, foodBonus, talent57);

      expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
    });

    it('validates totem 7 (Pufferblob Brawl) soul rewards', () => {
      const liveSoulRewards = getExtractedValue(extractionResults, 'totem_7_soul_rewards');
      const domainSoulRewards = worship.totemInfo[7].getSoulRewards(worshipEfficiency, foodBonus, talent57);

      expect(domainSoulRewards).toMatchLiveGame(liveSoulRewards, 0);
    });
  });
});
