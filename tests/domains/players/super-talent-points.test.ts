import type { Player } from '../../../data/domain/player';
import type { LegendTalents } from '../../../data/domain/world-7/legendTalents';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';

describe('Super Talent points from the prepared save', () => {
  const results = loadExtractionResults('player-super-talent-points-data.json');
  let player: Player;
  let spelunking: Spelunking;
  let legendTalents: LegendTalents;

  beforeAll(() => {
    validateExtractionHealth(results);
    const data = loadGameDataFromSave('latest');
    player = getTargetPlayer(data.get('players') as Player[]);
    spelunking = data.get('spelunking') as Spelunking;
    legendTalents = data.get('legendTalents') as LegendTalents;
  });

  it('matches native total and displayed remaining points', () => {
    expect(player.superTalentPoints.total).toMatchLiveGameWithDetails(getExtractedValue(results, 'super_points_total'), {
      tolerance: 0, context: 'Active character Super Talent points earned',
    });
    expect(player.superTalentPoints.remaining).toMatchLiveGameWithDetails(Math.max(0, getExtractedValue(results, 'super_points_remaining')), {
      tolerance: 0, context: 'Active character Super Talent points remaining',
    });
  });

  it('counts each occupied active preset slot', () => {
    const slots = results.extractions.active_super_slots.result as number[];
    expect(slots).toHaveLength(20);
    expect(player.superTalentPoints.spent).toMatchLiveGameWithDetails(slots.filter(slot => slot !== -1).length, {
      tolerance: 0, context: 'Occupied Super Talent slots in the active preset',
    });
  });

  it('matches the Lunarheim Lore reward input', () => {
    expect(Number(spelunking.tunnels[5].loreCompleted)).toMatchLiveGame(getExtractedValue(results, 'lunarheim_lore'), 0);
  });

  it('matches the separate Super Talent bonus levels', () => {
    expect(legendTalents.superTalentBonusLevels).toMatchLiveGame(getExtractedValue(results, 'super_bonus_levels'), 0);
  });
});
