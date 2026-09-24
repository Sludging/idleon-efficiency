/**
 * Statue Bonus Calculation Validation
 * 
 * Tests our statue bonus calculations against live game data.
 * 
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue, type ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { PlayerStatues } from '../../../data/domain/world-1/statues';
import { Player } from '../../../data/domain/player';
import { getTargetPlayer, TARGET_PLAYER_INDEX } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'statue-bonuses-data.json';

describe('Statue Bonus Calculations', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, unknown>;
 let playerStatues: PlayerStatues;
 let player: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  const statues = gameData.get("statues") as PlayerStatues[];
  const players = gameData.get("players") as Player[];

  playerStatues = statues.find(ps => ps.playerID === TARGET_PLAYER_INDEX)!;
  player = getTargetPlayer(players);
 });

 describe('Dragon Statue (index 29) - self-exclusion of dragonStatueBonus', () => {
  it('validates dragon statue bonus does not apply dragonStatueBonus to itself', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_29_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 29)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });

 describe('Statues with UpgradeVault bonus (indices [0, 1, 2, 6])', () => {
  it('validates statue index 0 bonus (upgrade vault bonus applies)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_0_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 0)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 1 bonus (upgrade vault bonus applies)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_1_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 1)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });

 describe('Talent-influenced statues (all indices)', () => {
  it('validates statue index 2 bonus (talents 112 and 127)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_2_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 2)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 3 bonus (talent 37)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_3_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 3)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 6 bonus (talents 487 and 472)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_6_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 6)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 7 bonus (talent 127)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_7_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 7)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 8 bonus (talent 112)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_8_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 8)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 9 bonus (talent 292)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_9_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 9)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 10 bonus (talents 487 and 472)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_10_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 10)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 11 bonus (talents 292 and 307)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_11_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 11)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 12 bonus (talent 487)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_12_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 12)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 13 bonus (talent 472)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_13_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 13)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 14 bonus (talent 307)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_14_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 14)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 17 bonus (talent 37)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_17_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 17)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });

 describe('Statues without UpgradeVault bonus', () => {
  it('validates statue index 5 bonus (upgrade vault bonus does not apply)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_5_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 5)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('validates statue index 24 bonus (upgrade vault bonus does not apply)', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_24_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 24)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });
});
