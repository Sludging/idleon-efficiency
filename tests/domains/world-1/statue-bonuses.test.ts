/**
 * Compare selected saved-target-character statue contributions with the game's
 * StatueBonusGiven results. The indices cover distinct talent, vault, and
 * dragon self-exclusion paths without claiming every statue is unique.
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

 describe('Dragon Statue self-exclusion', () => {
  it('matches the target character’s Dragon Statue contribution without its own multiplier', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_29_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 29)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });

 describe('Statue contributions affected by Upgrade Vault', () => {
  it('matches target character statue index 0 with its Upgrade Vault contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_0_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 0)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches target character statue index 1 with its Upgrade Vault contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_1_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 1)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });

 describe('Statue contributions affected by class talents', () => {
  it('matches the target character’s Mining Statue contribution from talents 112 and 127', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_2_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 2)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Feasty Statue contribution from talent 37', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_3_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 3)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Lumberbob Statue contribution from talents 487 and 472', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_6_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 6)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Thicc Skin Statue contribution from talent 127', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_7_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 7)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Oceanman Statue contribution from talent 112', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_8_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 8)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Ol Reliable Statue contribution from talent 292', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_9_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 9)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Exp Statue contribution from talents 487 and 472', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_10_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 10)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Anvil Statue contribution from talents 292 and 307', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_11_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 11)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Cauldron Statue contribution from talent 487', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_12_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 12)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Beholder Statue contribution from talent 472', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_13_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 13)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Bullseye Statue contribution from talent 307', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_14_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 14)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches the target character’s Ehexpee Statue contribution from talent 37', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_17_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 17)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });

 describe('Statue contributions outside the Upgrade Vault index set', () => {
  it('matches target character statue index 5, which does not receive the Upgrade Vault contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_5_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 5)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });

  it('matches target character statue index 24, which does not receive the Upgrade Vault contribution', () => {
   const liveBonus = getExtractedValue(extractionResults, 'statue_24_bonus');
   const domainBonus = playerStatues.statues.find(s => s.index === 24)?.getBonus(player) ?? 0;

   expect(domainBonus).toMatchLiveGame(liveBonus, 0);
  });
 });
});
