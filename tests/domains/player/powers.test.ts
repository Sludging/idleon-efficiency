import type { Player } from '../../../data/domain/player';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

// One retained normal loadout covers all seven outputs, not excluded contexts or unseen loadouts.
describe('Persistent player weapon and skill powers', () => {
  let player: Player;
  let replay: {
    powers: Record<string, number>;
    context: Record<string, unknown>;
    terms: Record<string, number>;
    bubbles: Record<string, number>;
    statues: Record<string, number>;
    gear: Record<string, number>;
    sourceInputs: Record<string, number>;
    cachedTotals: Record<string, number>;
  };
  beforeAll(() => {
    const results = loadExtractionResults('player-powers-data.json');
    validateExtractionHealth(results);
    replay = results.extractions.powers.result;
    player = getTargetPlayer(loadGameDataFromSave('latest').get('players') as Player[]);
  });

  const outputs = [
    { key: 'weaponPower', name: 'Weapon Power', skill: undefined },
    { key: 'mining', name: 'Mining Power', skill: SkillsIndex.Mining },
    { key: 'chopping', name: 'Chopping Power', skill: SkillsIndex.Chopping },
    { key: 'fishing', name: 'Fishing Power', skill: SkillsIndex.Fishing },
    { key: 'catching', name: 'Catching Power', skill: SkillsIndex.Catching },
    { key: 'trapping', name: 'Trapping Power', skill: SkillsIndex.Trapping },
    { key: 'worship', name: 'Worship Power', skill: SkillsIndex.Worship },
  ] as const;
  outputs.forEach(({ key, name, skill }) => {
    it(`matches ${name} from normal gear and persistent owner bonuses`, () => {
      const power = skill === undefined ? player.stats.weaponPower : player.stats.getSkillPower(skill);
      expect(power).toMatchLiveGameWithDetails(replay.powers[key], {
        tolerance: 0,
        context: `${name} for ${player.playerName}; native diagnostics: ${JSON.stringify({ context: replay.context, terms: replay.terms, bubbles: replay.bubbles, statues: replay.statues, gear: replay.gear, sourceInputs: replay.sourceInputs, cachedTotals: replay.cachedTotals })}`,
      });
    });
  });
});
