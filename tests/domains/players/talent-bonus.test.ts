/**
 * Compares Sludgadin's talent bonuses for talents 112, 8, and 91 with the
 * paired player-0 extraction, including talent 91's separate X and Y values.
 */
import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Player } from '../../../data/domain/player';
import { getTargetPlayer } from '../../utils/target-player';

const saveName = 'latest';
const extractionResultsName = 'talents-sludgeadin-data.json';

describe('Player Domain - Talent Bonus', () => {
 let extractionResults: ExtractionResults;
 let player: Player;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  const gameData = loadGameDataFromSave(saveName);
  const players = gameData.get('players') as Player[];

  // The extraction config requires active player 0.
  player = getTargetPlayer(players, 0);
 });

 it('matches Sludgadin Strongest Statues (talent 112) bonus', () => {
  const liveValue = getExtractedValue(extractionResults, 'talent_112_bonus');
  const domainValue = player.getTalentBonus(112);

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: `Player ${player.playerID} Strongest Statues bonus`,
  });
 });
 it('matches Sludgadin Star Player (talent 8) bonus', () => {
  const liveValue = getExtractedValue(extractionResults, 'talent_8_bonus');
  const domainValue = player.getTalentBonus(8);

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: `Player ${player.playerID} Star Player bonus`,
  });
 });
 it('matches Sludgadin Whirl (talent 91) X bonus', () => {
  const liveValue = getExtractedValue(extractionResults, 'talent_91_x_bonus');
  const domainValue = player.getTalentBonus(91);

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: `Player ${player.playerID} Whirl X bonus`,
  });
 });
 it('matches Sludgadin Whirl (talent 91) Y bonus', () => {
  const liveValue = getExtractedValue(extractionResults, 'talent_91_y_bonus');
  const domainValue = player.getTalent(91)?.getBonus(false, true) ?? 0;

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: `Player ${player.playerID} Whirl Y bonus`,
  });
 });
});
