import { SummonEssenceColor, Summoning } from '../../../data/domain/world-6/summoning';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

type NativeStoneWins = {
  colour: number;
  wins: number;
};

type NativeUpgradeBonus = {
  index: number;
  bonus: number;
};

const currentBonusCases = [
  { colour: SummonEssenceColor.White, name: 'White', state: 'after four stone boss wins' },
  { colour: SummonEssenceColor.Red, name: 'Red', state: 'before the first stone boss win' },
];

const affectedUpgradeCases = [
  { index: 0, name: 'White Essence Champ', state: 'after four stone boss wins' },
  { index: 46, name: "Red Essence Ragin'", state: 'before the first stone boss win' },
];

describe('Summoning current stone results', () => {
  let summoning: Summoning;
  let nativeWins: Map<number, number>;
  let nativeUpgradeBonuses: Map<number, number>;

  beforeAll(() => {
    const results = loadExtractionResults('summoning-stones-data.json');
    validateExtractionHealth(results);
    const wins = results.extractions.stone_wins.result as NativeStoneWins[];
    const bonuses = results.extractions.marked_upgrade_consumers.result as NativeUpgradeBonus[];
    nativeWins = new Map(wins.map(({ colour, wins }) => [colour, normalizeExtractedValue(wins)]));
    nativeUpgradeBonuses = new Map(bonuses.map(({ index, bonus }) => [index, normalizeExtractedValue(bonus)]));
    summoning = loadGameDataFromSave('latest').get('summoning') as Summoning;
  });

  it.each(currentBonusCases)('matches the current $name upgrade multiplier $state', ({ colour, name }) => {
    const essence = summoning.summonEssences.find(candidate => candidate.color === colour)!;
    // The native upgrade consumer applies the full current factor, not the pre-fight reward preview.
    const expectedMultiplier = 1 + nativeWins.get(colour)!;
    expect(essence.stoneBonusMultiplier).toMatchLiveGameWithDetails(expectedMultiplier, {
      tolerance: 0,
      context: `Current ${name} stone upgrade multiplier`,
      debugInfo: { nativeWins: nativeWins.get(colour), stoneBossVictories: essence.stoneBossVictories },
    });
  });

  it.each(affectedUpgradeCases)('matches $name with the current stone bonus $state', ({ index, name }) => {
    const upgrade = summoning.summonUpgrades.find(candidate => candidate.index === index)!;
    expect(upgrade.getBaseBonus()).toMatchLiveGameWithDetails(nativeUpgradeBonuses.get(index)!, {
      tolerance: 0,
      context: `${name} current upgrade amount`,
      debugInfo: { level: upgrade.level, stoneBonus: upgrade.stoneBossBonus, doublerBonus: upgrade.doublerBonus },
    });
  });

  it('does not assign a future placeholder stone boss HP to Teal Essence', () => {
    const teal = summoning.summonEssences.find(essence => essence.color === SummonEssenceColor.Teal)!;
    expect(teal.nextStoneBossHp).toBeUndefined();
  });
});
