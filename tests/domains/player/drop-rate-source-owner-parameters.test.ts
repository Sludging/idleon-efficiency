import type { ResearchGrid } from '../../../data/domain/world-7/research';
import type { Player } from '../../../data/domain/player';
import { Talent } from '../../../data/domain/talents';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
// These inputs belong to Archlord and Minehead, not the final PlayerStats arithmetic.
describe('Persistent drop-rate source-owner direct inputs', () => {
  let data: Map<string, unknown>;
  let players: Player[];
  let player: Player;
  let replay: { terms: Record<string, number>; talentCandidates328: number[] };
  beforeAll(() => {
    const results = loadExtractionResults('player-drop-rate-data.json');
    validateExtractionHealth(results);
    replay = results.extractions.drop_rate.result;
    data = loadGameDataFromSave('latest');
    players = data.get('players') as Player[];
    player = getTargetPlayer(players);
  });
  it('matches the maximum account Archlord talent under recipient shared modifiers', () => {
    expect(Talent.getAccountTalentBonus(players, 328, player.finalTalentInputs)).toMatchLiveGame(replay.terms.accountTalent328, 0);
  });
  // These retained candidates cover a positive allocation, a later larger bonus and no allocation.
  it.each([2, 9, 3])('matches saved Archlord candidate %s with recipient modifiers', index => {
    if (!players[index] || replay.talentCandidates328[index] === undefined) throw new Error(`Missing paired real Archlord candidate ${index}`);
    expect(Talent.getAccountTalentBonus([players[index]], 328, player.finalTalentInputs))
      .toMatchLiveGame(replay.talentCandidates328[index], 0);
  });
  it.each([
    [0, 'grid168', 'Research trade-effect unlock'],
    [2, 'grid168Trades', 'Research completed trade-block bonus'],
  ] as const)('matches Research168 mode%s for %s', (mode, key) => {
    expect((data.get('research') as ResearchGrid).getBonusForId(168, mode)).toMatchLiveGame(replay.terms[key], 0);
  });
});
