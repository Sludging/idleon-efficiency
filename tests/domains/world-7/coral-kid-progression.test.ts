import { CoralKid } from '../../../data/domain/world-7/coralKid';
import { initCoralKidUpgradeRepo } from '../../../data/domain/data/CoralKidUpgradeRepo';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

/** Core coverage for both Coral Kid upgrade modes and the Singularity conversion. */
describe('Coral Kid upgrade and Singularity account outputs', () => {
  let coralKid: CoralKid;
  let results: ExtractionResults;

  beforeAll(() => {
    coralKid = loadGameDataFromSave('latest').get('coralKid') as CoralKid;
    results = loadExtractionResults('divinity-and-coral-kid-data.json');
    validateExtractionHealth(results);
  });

  it('pairs the native calculation captures with the retained genuine save operands', () => {
    const save = loadTestSave('latest');
    const options = save.get('OptLacc') as number[];
    const savedDivinity = save.get('Divinity') as number[];
    const spelunk = JSON.parse(save.get('Spelunk') as string) as number[][];
    const names = save.get('playerNames') as string[];
    expect(results.extractions.comparison_operands.result).toEqual({
      levels: [...options.slice(427, 433), ...options.slice(616, 622)].map(Number),
      rank: Number(savedDivinity[25]),
      points: Number(savedDivinity[24]),
      kills: Number(options[623]),
      hours: Number(options[624]),
      reefLevels: spelunk[13].slice(0, 6).map(Number),
      divinityLevels: names.map((_name, index) => Number((save.get(`Lv0_${index}`) as number[])[14])),
    });
  });

  it('exposes every upgrade with a unique catalog index, saved level, and cost currency', () => {
    const options = loadTestSave('latest').get('OptLacc') as number[];
    const gameUpgrades = initCoralKidUpgradeRepo();
    expect(coralKid.coralKidBonuses).toHaveLength(gameUpgrades.length);
    expect(new Set(coralKid.coralKidBonuses.map(upgrade => upgrade.index)).size).toBe(gameUpgrades.length);

    for (const gameUpgrade of gameUpgrades) {
      const upgrade = coralKid.coralKidBonuses.find(candidate => candidate.index === gameUpgrade.index);
      if (!upgrade) {
        throw new Error(`Missing Coral Kid upgrade ${gameUpgrade.index}`);
      }
      const saveIndex = gameUpgrade.index < 6 ? 427 + gameUpgrade.index : 616 + gameUpgrade.index - 6;
      expect(upgrade.level).toMatchLiveGameWithDetails(Number(options[saveIndex] ?? 0), {
        tolerance: 0,
        context: `Saved level for Coral Kid upgrade ${upgrade.index}`,
      });
      expect(upgrade.costCurrency).toBe(gameUpgrade.index < 6 ? 'divinityPoints' : 'CKsing');
    }
  });

  it('matches current bonuses and next costs for every upgrade in both modes', () => {
    const bonuses = results.extractions.upgrade_bonuses.result as unknown[];
    const costs = results.extractions.upgrade_costs.result as unknown[];
    // Twelve records form a small set. The second page has different cost and effect rules.
    for (let index = 0; index < 12; index += 1) {
      expect(coralKid.getBonusFromIndex(index)).toMatchLiveGameWithDetails(normalizeExtractedValue(bonuses[index]), {
        tolerance: 0,
        context: `Current effect coefficient for Coral Kid upgrade ${index}`,
      });
      expect(coralKid.getBonusNextlevelCost(index)).toMatchLiveGameWithDetails(normalizeExtractedValue(costs[index]), {
        tolerance: 0,
        context: `Next purchase cost for Coral Kid upgrade ${index}`,
      });
    }
  });

  it('exposes native percentage bonuses as numeric multipliers where the game shows a multiplier', () => {
    const bonuses = results.extractions.upgrade_bonuses.result as unknown[];
    // Native tooltip conversion: idleon1.25.txt:280884-280972 uses 1 + bonus / 100 for these records.
    for (const index of [0, 2, 6, 7, 8, 10, 11]) {
      const upgrade = coralKid.coralKidBonuses.find(candidate => candidate.index === index);
      if (!upgrade) {
        throw new Error(`Missing multiplier-bearing Coral Kid upgrade ${index}`);
      }
      expect(upgrade.getPercentageMultiplier()).toMatchLiveGameWithDetails(
        1 + normalizeExtractedValue(bonuses[index]) / 100,
        { tolerance: 0, context: `Current numeric multiplier for Coral Kid upgrade ${index}` },
      );
    }
  });

  it('exposes the account total Divinity level across every character', () => {
    const levels: number[] = results.extractions.comparison_operands.result.divinityLevels;
    expect(coralKid.totalDivinityLevel).toMatchLiveGameWithDetails(
      levels.reduce((total, level) => total + level, 0),
      { tolerance: 0, context: 'Total Divinity level used by Coral Kid upgrade requirements' },
    );
  });

  it('exposes combined upgrade effects from the same numeric API used by next-level previews', () => {
    const nativeEffects = results.extractions.current_effects.result as number[];
    for (const [position, index] of [2, 4, 11, 9].entries()) {
      const upgrade = coralKid.coralKidBonuses[index];
      expect(upgrade.getTotalBonus(upgrade.level)).toMatchLiveGameWithDetails(nativeEffects[position], {
        tolerance: 0,
        context: `Combined current effect for Coral Kid upgrade ${index}`,
      });
    }
  });

  it('previews next-level coefficients and combined effects without changing saved upgrades', () => {
    const operands = results.extractions.comparison_operands.result;
    const levels: number[] = operands.levels;
    const next = levels.map(level => level + 1);
    // Replay the native v1.25 coefficient branches at each saved level plus one.
    // Source: idleon1.25.txt:240045-240070. No game or website state is changed.
    const nativeNextBonuses = [
      10 * next[0],
      Math.round(2 * next[1]),
      next[2] / (25 + next[2]) * 20,
      Math.round(next[3]),
      Math.round(2 * next[4]),
      next[5] / (40 + next[5]) * 100,
      Math.round(100 * next[6]),
      Math.round(10 * next[7]),
      Math.round(50 * next[8]),
      Math.round(125 * next[9] / (next[9] + 100)),
      Math.round(5 * next[10]),
      Math.round(next[11]),
    ];
    for (const [index, expected] of nativeNextBonuses.entries()) {
      const upgrade = coralKid.coralKidBonuses[index];
      expect(upgrade.getBonus(upgrade.level + 1)).toMatchLiveGameWithDetails(expected, {
        tolerance: 0, context: `Next-level coefficient for Coral Kid upgrade ${index}`,
      });
      if (index !== 1) {
        expect(upgrade.getPercentageMultiplier(upgrade.level + 1)).toMatchLiveGameWithDetails(1 + expected / 100, {
          tolerance: 0, context: `Next-level multiplier for Coral Kid upgrade ${index}`,
        });
      }
      expect(upgrade.level).toBe(levels[index]);
    }

    // Native tooltip composition: idleon1.25.txt:280884-280972.
    const reefLevels: number[] = operands.reefLevels;
    const nextTotals = [
      Math.pow(1 + nativeNextBonuses[2] / 100, Math.max(0, Number(operands.rank) - 10)),
      reefLevels.reduce((total, level) => total + level, 0) * nativeNextBonuses[4],
      Math.pow(1 + nativeNextBonuses[11] / 100, Math.max(0, Number(operands.rank) - 35)),
      100 * Math.max(0, Math.min(1, nativeNextBonuses[9] / 100)),
    ];
    for (const [position, index] of [2, 4, 11, 9].entries()) {
      const upgrade = coralKid.coralKidBonuses[index];
      expect(upgrade.getTotalBonus(upgrade.level + 1)).toMatchLiveGameWithDetails(nextTotals[position], {
        tolerance: 0, context: `Combined next-level effect for Coral Kid upgrade ${index}`,
      });
    }
    const divinityLevels: number[] = operands.divinityLevels;
    const minorLink = coralKid.coralKidBonuses[3];
    for (const divinityLevel of divinityLevels) {
      const nativeMultiplier = 1 + ((1 + nativeNextBonuses[3] / 100) * divinityLevel) / (60 + divinityLevel);
      expect(minorLink.getMinorLinkSkillMultiplier(divinityLevel, minorLink.level + 1)).toMatchLiveGameWithDetails(nativeMultiplier, {
        tolerance: 0, context: `Next-level minor-link multiplier at Divinity level ${divinityLevel}`,
      });
    }
  });

  it('matches current combined class EXP, Divinity points, damage, and non-Divinity AFK effects', () => {
    const nativeEffects = results.extractions.current_effects.result as number[];
    expect(coralKid.classExpMultiplier).toMatchLiveGameWithDetails(nativeEffects[0], {
      tolerance: 0,
      context: 'Class EXP multiplier from Coral Kid and current God Rank',
    });
    expect(coralKid.divinityPointsBonusPercent).toMatchLiveGameWithDetails(nativeEffects[1], {
      tolerance: 0,
      context: 'Divinity points percentage from Coral Kid and all Coral Reef upgrade levels',
    });
    expect(coralKid.damageMultiplier).toMatchLiveGameWithDetails(nativeEffects[2], {
      tolerance: 0,
      context: 'Damage multiplier from Coral Kid and God Ranks above 25',
    });
    expect(coralKid.nonDivinityAfkTimePercent).toMatchLiveGameWithDetails(nativeEffects[3], {
      tolerance: 0,
      context: 'Percent of non-Divinity AFK hours added to Singularity time',
    });
  });

  it('matches the minor-link skill multiplier for each saved character', () => {
    const nativeMultipliers = results.extractions.minor_link_skill_multipliers.result as number[];
    expect(coralKid.minorLinkSkillMultipliersByPlayerIndex).toHaveLength(nativeMultipliers.length);
    for (const [playerIndex, nativeMultiplier] of nativeMultipliers.entries()) {
      expect(coralKid.minorLinkSkillMultipliersByPlayerIndex[playerIndex]).toMatchLiveGameWithDetails(nativeMultiplier, {
        tolerance: 0,
        context: `Coral Kid minor-link skill multiplier for character ${playerIndex}`,
      });
      const levels: number[] = results.extractions.comparison_operands.result.divinityLevels;
      expect(coralKid.coralKidBonuses[3].getMinorLinkSkillMultiplier(levels[playerIndex])).toMatchLiveGameWithDetails(nativeMultiplier, {
        tolerance: 0,
        context: `Minor-link preview API for character ${playerIndex}`,
      });
    }
  });

  it('matches saved Singularity kills, elapsed hours, and owned Spirals across chest and all bags', () => {
    const save = loadTestSave('latest');
    const options = save.get('OptLacc') as number[];
    const names = save.get('playerNames') as string[];
    const inventories = [
      { order: save.get('ChestOrder') as string[], quantities: save.get('ChestQuantity') as number[] },
      ...names.map((_name, index) => ({
        order: save.get(`InventoryOrder_${index}`) as string[],
        quantities: save.get(`ItemQTY_${index}`) as number[],
      })),
    ];
    const spiralsOwned = inventories.reduce((total, inventory) => total + inventory.order.reduce(
      (sum, item, index) => sum + (item === 'CKsing' ? Number(inventory.quantities[index]) : 0), 0,
    ), 0);
    expect(coralKid.singularity.kills).toMatchLiveGameWithDetails(Number(options[623] ?? 0), {
      tolerance: 0, context: 'Saved kills counted by Singularity',
    });
    expect(coralKid.singularity.elapsedHours).toMatchLiveGameWithDetails(Number(options[624] ?? 0), {
      tolerance: 0, context: 'Saved elapsed AFK hours counted by Singularity',
    });
    expect(coralKid.singularity.spiralsOwned).toMatchLiveGameWithDetails(spiralsOwned, {
      tolerance: 0, context: 'Owned Singularity Spirals in chest and all character inventories',
    });
  });

  it('matches Singularity unlock, conversion base, kill multiplier, time multiplier, and claim amount', () => {
    const nativeSingularity = results.extractions.singularity.result as number[];
    expect(coralKid.singularity.unlocked).toBe(nativeSingularity[0] > 0);
    expect(coralKid.singularity.baseValue).toMatchLiveGameWithDetails(nativeSingularity[1], {
      tolerance: 0, context: 'Singularity base value from current Divinity points',
    });
    expect(coralKid.singularity.killMultiplier).toMatchLiveGameWithDetails(nativeSingularity[2], {
      tolerance: 0, context: 'Singularity kill multiplier',
    });
    expect(coralKid.singularity.timeMultiplier).toMatchLiveGameWithDetails(nativeSingularity[3], {
      tolerance: 0, context: 'Singularity elapsed-time multiplier',
    });
    expect(coralKid.singularity.spiralsOnClaim).toMatchLiveGameWithDetails(Math.floor(nativeSingularity[4]), {
      tolerance: 0, context: 'Whole Singularity Spirals available on claim',
    });
  });
});
