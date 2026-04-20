/**
 * Statue Bonus Calculation Validation
 * 
 * Tests our statue bonus calculations against live game data.
 * 
 * @testCovers Statue.getBonus
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { PlayerStatues } from '../../../data/domain/world-1/statues';
import { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'statue-bonuses-data.json';

describe('Statue Bonus Calculations', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let player0Statues: PlayerStatues;
  let player0: Player;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    const statues = gameData.get("statues") as PlayerStatues[];
    const players = gameData.get("players") as Player[];
    // Extractions are captured while logged in as player 0
    player0Statues = statues.find(ps => ps.playerID === 0)!;
    player0 = players.find(p => p.playerID === 0)!;
  });

  describe('Dragon Statue (index 29) - self-exclusion of dragonStatueBonus', () => {
    it('validates dragon statue bonus does not apply dragonStatueBonus to itself', () => {
      const liveBonus = getExtractedValue(extractionResults, 'statue_29_bonus');
      const domainBonus = player0Statues.statues.find(s => s.index === 29)?.getBonus(player0) ?? 0;

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });

  describe('Statues with UpgradeVault bonus (indices [0, 1, 2, 6])', () => {
    it('validates statue index 0 bonus (upgrade vault bonus applies)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'statue_0_bonus');
      const domainBonus = player0Statues.statues.find(s => s.index === 0)?.getBonus(player0) ?? 0;

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates statue index 1 bonus (upgrade vault bonus applies)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'statue_1_bonus');
      const domainBonus = player0Statues.statues.find(s => s.index === 1)?.getBonus(player0) ?? 0;

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });

  describe('Statues without UpgradeVault bonus', () => {
    it('validates statue index 5 bonus (upgrade vault bonus does not apply)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'statue_5_bonus');
      const domainBonus = player0Statues.statues.find(s => s.index === 5)?.getBonus(player0) ?? 0;

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });

    it('validates statue index 24 bonus (upgrade vault bonus does not apply)', () => {
      const liveBonus = getExtractedValue(extractionResults, 'statue_24_bonus');
      const domainBonus = player0Statues.statues.find(s => s.index === 24)?.getBonus(player0) ?? 0;

      expect(domainBonus).toMatchLiveGame(liveBonus, 0);
    });
  });
});
