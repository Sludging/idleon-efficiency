import type { Player } from '../../../data/domain/player';
import { Farming, LandRankBonusType } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NativePlotRank = {
  index: number;
  rank: number;
  exp: number;
  requirement: number;
};

type NativeRankExpUpgrade = { index: number; bonus: number };

const plotIndices = Array.from({ length: 36 }, (_, index) => index);
const rankExpUpgrades = [
  [2, 'Soil EXP Boost from the previous plot rank'],
  [6, 'Soil EXP Megaboost for all plots'],
  [13, 'Soil EXP Superboost for all plots'],
] as const;

describe('Farming Land Rank EXP account results', () => {
  let farming: Farming;
  let players: Player[];
  let results: ExtractionResults;
  let nativePlots: NativePlotRank[];
  let nativeUpgrades: NativeRankExpUpgrade[];

  beforeAll(() => {
    results = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(results);
    const data = loadGameDataFromSave('latest');
    farming = data.get('farming') as Farming;
    players = data.get('players') as Player[];
    nativePlots = results.extractions.land_rank_plot_state.result;
    nativeUpgrades = results.extractions.land_rank_exp_database.result;
    // Reject missing records before comparing the public values for every retained plot.
    expect(nativePlots.map(plot => plot.index)).toEqual(plotIndices);
    expect(farming.farmPlots.map((_, index) => index)).toEqual(plotIndices);
    expect(nativeUpgrades.map(upgrade => upgrade.index)).toEqual(rankExpUpgrades.map(([index]) => index));
  });

  it.each(plotIndices)('plot %i: matches saved rank, earned EXP, and next-rank requirement', index => {
    const plot = farming.farmPlots[index];
    const native = nativePlots.find(plot => plot.index === index)!;
    expect(plot.landRank).toMatchLiveGameWithDetails(native.rank, {
      tolerance: 0,
      context: `Plot ${index}: Land Rank`,
    });
    expect(plot.landExp).toMatchLiveGameWithDetails(native.exp, {
      tolerance: 0,
      context: `Plot ${index}: saved Rank EXP`,
    });
    expect(plot.getExpToNextRank()).toMatchLiveGameWithDetails(native.requirement, {
      tolerance: 0,
      context: `Plot ${index}: EXP required for the next Land Rank`,
      debugInfo: { rank: plot.landRank },
    });
  });

  it.each(rankExpUpgrades)('%i: matches %s', (index, description) => {
    const native = nativeUpgrades.find(upgrade => upgrade.index === index)!;
    expect(farming.landrankDatabase.getUpgradeBonusByIndex(index)).toMatchLiveGameWithDetails(native.bonus, {
      tolerance: 0,
      context: `Account Land Rank Database: ${description}`,
      debugInfo: {
        recipientBonuses: players.map(player => ({
          playerID: player.playerID,
          bonus: farming.landrankDatabase.getUpgradeBonusForPlayer(index, player),
        })),
      },
    });
  });

  it('matches the total global Soil EXP bonus from the Land Rank Database', () => {
    expect(farming.landrankDatabase.getTotalUpgradeBonusForBonus(LandRankBonusType.LandRankEXP)).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'land_rank_exp_database_total'), {
        tolerance: 0,
        context: 'Account Land Rank Database: total global Soil EXP bonus',
      }
    );
  });

  it('matches the global Rank EXP gain multiplier without performing a harvest', () => {
    const native = getExtractedValue(results, 'land_rank_exp_multiplier');
    expect(farming.getLandRankExpMultiplier()).toMatchLiveGameWithDetails(native, {
      tolerance: 0,
      context: 'Global Land Rank EXP gain multiplier',
    });
  });
});
