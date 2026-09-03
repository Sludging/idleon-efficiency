/**
 * All Talent Level Calculation Validation
 *
 * Tests the player max-level pipeline against the player-0 live-game extraction.
 *
 * @testCovers updatePlayerTalentLevelExceptESBonus
 */
import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';

const saveName = 'latest';
const extractionResultsName = 'talents-sludgeadin-data.json';

const getPlayerTalentAllLevel = (players: Player[], talentIndex: number, playerID: number = 0): number => {
  const player = players.find(candidate => candidate.playerID === playerID);
  const talent = player?.talents.find(candidate => candidate.skillIndex === talentIndex);
  return talent ? talent.maxLevel - talent.bookMaxLevel : 0;
};

describe('Player Domain - All Talent Level', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, unknown>;
  let players: Player[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave(saveName);
    players = gameData.get('players') as Player[];
  });

  it('validates eligible AllTalentLV(146) for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'all_talent_level_146');
    const domainValue = getPlayerTalentAllLevel(players, 146);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 0 AllTalentLV(146)',
    });
  });
  it('isolates target-player Super Talent membership from the active game aggregate', () => {
    const liveValue = getExtractedValue(extractionResults, 'all_talent_level_z_membership_delta_player_3');
    const targetPlayer = players.find(player => player.playerID === 3);
    const memberTalent = targetPlayer?.talents.find(talent => talent.skillIndex === 125);
    const nonmemberTalent = targetPlayer?.talents.find(talent => talent.skillIndex === 170);
    const domainMemberLevel = getPlayerTalentAllLevel(players, 125, 3);
    const domainUnmemberLevel = getPlayerTalentAllLevel(players, 170, 3);
    const domainValue = domainMemberLevel - domainUnmemberLevel;

    expect(memberTalent?.isSupered).toBe(true);
    expect(nonmemberTalent?.isSupered).toBe(false);
    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 3 Super Talent membership delta (AllTalentLVz(125|3) - AllTalentLVz(170|3))',
    });
  });

  it('validates banned AllTalentLV(49) for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'all_talent_level_49');
    const domainValue = getPlayerTalentAllLevel(players, 49);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 0 AllTalentLV(49)',
    });
  });
  it('validates gate-passing banned AllTalentLV(149) for player 0', () => {
    const liveValue = getExtractedValue(extractionResults, 'all_talent_level_149');
    const domainValue = getPlayerTalentAllLevel(players, 149);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 0 AllTalentLV(149)',
    });
  });

  it('validates capped AllTalentLVz(225|3) for player 3', () => {
    const liveValue = getExtractedValue(extractionResults, 'all_talent_level_z_225_player_3');
    const domainValue = getPlayerTalentAllLevel(players, 225, 3);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Player 3 AllTalentLVz(225|3)',
    });
  });
});
