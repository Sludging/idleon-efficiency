import type { Player } from '../../../data/domain/player';
import { Farming, LandRankBonusType } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NativeRankExpUpgrade = { index: number; bonus: number };

const rankExpUpgrades = [
  [2, 'Soil EXP Boost from the previous plot rank'],
  [6, 'Soil EXP Megaboost for all plots'],
  [13, 'Soil EXP Superboost for all plots'],
] as const;

describe('Farming Land Rank EXP account results', () => {
  let farming: Farming;
  let players: Player[];
  let results: ExtractionResults;
  let nativeUpgrades: NativeRankExpUpgrade[];

  beforeAll(() => {
    results = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(results);
    const data = loadGameDataFromSave('latest');
    farming = data.get('farming') as Farming;
    players = data.get('players') as Player[];
    nativeUpgrades = results.extractions.land_rank_exp_database.result;
    expect(nativeUpgrades.map(upgrade => upgrade.index)).toEqual(rankExpUpgrades.map(([index]) => index));
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
