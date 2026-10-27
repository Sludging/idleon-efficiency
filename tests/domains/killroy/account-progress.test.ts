import { KillRoy } from '../../../data/domain/world-2/killroy';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

type NativeAccountState = {
  skulls: number;
  completedRuns: number;
  thirdBattleUnlocked: boolean;
  consumedFightSlots: number[];
  airhornUsed: boolean;
  priorTalentPointDrops: number;
  laterShopProgression: number;
  runLevels: number[];
  permanentLevels: number[];
};

type NativeRunState = {
  runDurationSeconds: number;
  shadesOfKLevel: number;
  availableChoiceCount: number;
  requirements: number[];
  unlocked: boolean[];
  remaining: number[];
};

type NativeMonsterRecord = {
  enemyId: string;
  bestKills: number;
};

type NativeNextDamageRequirement = {
  nextDamageTotalBestKills: number;
  killsUntilNextDamageBonus: number;
};

const runUpgrades = [
  { id: 0, name: 'room timer' },
  { id: 1, name: 'Talent Point drops' },
  { id: 2, name: 'Bonus Skulls' },
  { id: 3, name: 'Faster Respawn' },
  { id: 4, name: 'Dungeon Credit drops' },
  { id: 5, name: 'Pearl drops' },
] as const;

const permanentBonuses = [
  { id: 0, name: 'Artifact Find Chance', consumer: 'artifactFindChanceBonus' },
  { id: 1, name: 'Crop Evolution Chance', consumer: 'farmingNextEvoChanceBonus' },
  { id: 2, name: 'Jade Gain', consumer: 'sneakingJadeGainBonus' },
  { id: 3, name: 'Gallery progression', consumer: 'podiumsOwnedLv2' },
  { id: 4, name: 'Masterclass drop shop value', consumer: 'masterClassBonusDrop' },
  { id: 5, name: 'World 7 skill EXP', consumer: 'spelunkingExpMulti' },
  { id: 6, name: 'daily coral gain', consumer: 'dailyCoralReefGains' },
  { id: 7, name: 'future bonus shop value', consumer: 'nextUpdateBonus' },
] as const;

describe('Killroy account progress CORE', () => {
  let extractionResults: ExtractionResults;
  let killroy: KillRoy;
  let nativeAccount: NativeAccountState;
  let nativeRun: NativeRunState;
  let nativeRecords: NativeMonsterRecord[];
  let nativeNextDamage: NativeNextDamageRequirement;

  beforeAll(() => {
    extractionResults = loadExtractionResults('killroy-data.json');
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave('latest');
    killroy = gameData.get('killroy') as KillRoy;

    if (!killroy) {
      throw new Error('Killroy domain not found in save data');
    }

    nativeAccount = extractionResults.extractions.killroy_account_state.result as NativeAccountState;
    nativeRun = extractionResults.extractions.killroy_run_state.result as NativeRunState;
    nativeRecords = extractionResults.extractions.killroy_monster_records.result as NativeMonsterRecord[];
    nativeNextDamage = extractionResults.extractions.killroy_next_damage_requirement.result as NativeNextDamageRequirement;
  });

  describe('summary and weekly room state', () => {
    it.each([
      ['skulls', 'current skull balance'],
      ['completedRuns', 'completed room runs'],
      ['priorTalentPointDrops', 'previously obtained Talent Points'],
      ['laterShopProgression', 'later Skull Shop progression'],
    ] as const)('matches %s from native saved state', (field, description) => {
      expect(killroy[field]).toMatchLiveGameWithDetails(nativeAccount[field], {
        tolerance: 0,
        context: `Killroy ${description}`,
      });
    });

    // The regular save observes an unlocked third fight. It does not cover every unlock transition.
    it('matches the separate third weekly fight unlock', () => {
      expect(killroy.thirdBattleUnlocked).toBe(nativeAccount.thirdBattleUnlocked);
    });

    it('matches consumed weekly fight slots from the retained native room-usage capture', () => {
      expect(killroy.consumedFightSlots).toEqual(nativeAccount.consumedFightSlots);
    });

    it('matches whether this week has used the Airhorn reset', () => {
      expect(killroy.airhornUsed).toBe(nativeAccount.airhornUsed);
    });
  });

  describe('six current run upgrades', () => {
    it('includes every native run upgrade in native order', () => {
      expect(killroy.runUpgrades).toHaveLength(nativeAccount.runLevels.length);
      expect(killroy.runUpgrades.map(upgrade => upgrade.id)).toEqual(runUpgrades.map(upgrade => upgrade.id));
    });

    it('matches the current room duration in seconds', () => {
      expect(killroy.runDurationSeconds).toMatchLiveGameWithDetails(nativeRun.runDurationSeconds, {
        tolerance: 0,
        context: 'Killroy current room timer, including its saved upgrade level',
      });
    });

    // All six choices are offered in this save. Pearl drops fail only the completed-run gate.
    // This account cannot cover a choice locked by Shades of K progression.
    it.each(runUpgrades)('matches $name level, unlock gate, and remaining runs', ({ id, name }) => {
      const upgrade = killroy.runUpgrades[id];
      expect(upgrade.id).toBe(id);
      expect(upgrade.level).toMatchLiveGameWithDetails(nativeAccount.runLevels[id], {
        tolerance: 0,
        context: `Killroy ${name} current level`,
      });
      expect(upgrade.availableChoiceCount).toMatchLiveGameWithDetails(nativeRun.availableChoiceCount, {
        tolerance: 0,
        context: `Killroy ${name} available choice count from Shades of K level ${nativeRun.shadesOfKLevel}`,
      });
      expect(upgrade.completedRunsRequired).toMatchLiveGameWithDetails(nativeRun.requirements[id], {
        tolerance: 0,
        context: `Killroy ${name} completed-run unlock requirement`,
      });
      expect(upgrade.unlocked).toBe(nativeRun.unlocked[id]);
      expect(upgrade.runsUntilUnlock).toMatchLiveGameWithDetails(nativeRun.remaining[id], {
        tolerance: 0,
        context: `Killroy ${name} completed-run deficit, independent of choice availability`,
      });
    });
  });

  describe('eight current permanent bonuses and consumer values', () => {
    it('includes every native permanent bonus in native order', () => {
      expect(killroy.permanentBonuses).toHaveLength(nativeAccount.permanentLevels.length);
      expect(killroy.permanentBonuses.map(bonus => bonus.id)).toEqual(permanentBonuses.map(bonus => bonus.id));
    });

    it.each(permanentBonuses)('matches $name level, native value, and public consumer getter', ({ id, name, consumer }) => {
      const bonus = killroy.permanentBonuses[id];
      const nativeValue = getExtractedValue(extractionResults, `killroy_bonus_${id}`);
      expect(bonus.id).toBe(id);
      expect(bonus.level).toMatchLiveGameWithDetails(nativeAccount.permanentLevels[id], {
        tolerance: 0,
        context: `Killroy ${name} current permanent level`,
      });
      expect(bonus.value).toMatchLiveGameWithDetails(nativeValue, {
        tolerance: 0,
        context: `Killroy ${name} native permanent effect`,
      });
      expect(killroy[consumer]).toMatchLiveGameWithDetails(nativeValue, {
        tolerance: 0,
        context: `Killroy ${name} public consumer value`,
      });
    });

    it('matches the applied Masterclass multiplier rather than its shop value', () => {
      expect(killroy.masterClassDropMultiplier).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, 'killroy_masterclass_multiplier'),
        {
          tolerance: 0,
          context: 'Killroy Masterclass drop multiplier after the native percentage conversion',
        },
      );
    });

    it('supplies Research and Spelunking with the native direct World 7 EXP multiplier', () => {
      // Research and Spelunking use this bonus as a multiplier, not a percentage.
      expect(killroy.spelunkingExpMulti).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, 'killroy_bonus_5'),
        {
          tolerance: 0,
          context: 'Killroy direct World 7 skill EXP multiplier used by Research and Spelunking',
        },
      );
    });
  });

  describe('canonical monster bests and Rift damage', () => {
    it('matches all 104 native canonical monster records, including zero bests', () => {
      expect(nativeRecords).toHaveLength(104);
      expect(killroy.monsterRecords).toHaveLength(nativeRecords.length);

      nativeRecords.forEach((nativeRecord, index) => {
        const record = killroy.monsterRecords[index];
        expect(record.enemyId).toBe(nativeRecord.enemyId);
        expect(record.bestKills).toMatchLiveGameWithDetails(nativeRecord.bestKills, {
          tolerance: 0,
          context: `Killroy best kills for canonical monster ${nativeRecord.enemyId}`,
        });
      });
    });

    it('matches the canonical total without counting unrelated saved records', () => {
      expect(killroy.totalBestKills).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, 'killroy_total_best_kills'),
        {
          tolerance: 0,
          context: 'Killroy sum of native canonical monster bests',
        },
      );
    });

    it('matches the native Rift damage percentage', () => {
      expect(killroy.damageBonusPercent).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, 'killroy_damage_bonus'),
        {
          tolerance: 0,
          context: 'Killroy Rift damage bonus in percentage points',
        },
      );
    });

    it('matches the applied capped damage multiplier', () => {
      expect(killroy.damageMultiplier).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, 'killroy_damage_multiplier'),
        {
          tolerance: 0,
          context: 'Killroy applied damage multiplier after the native contribution cap',
        },
      );
    });

    it('matches the next raw damage percentage requirement and remaining best kills', () => {
      expect(killroy.nextDamageTotalBestKills).toMatchLiveGameWithDetails(nativeNextDamage.nextDamageTotalBestKills, {
        tolerance: 0,
        context: 'Killroy canonical total required for the next damage percentage point',
      });
      expect(killroy.killsUntilNextDamageBonus).toMatchLiveGameWithDetails(nativeNextDamage.killsUntilNextDamageBonus, {
        tolerance: 0,
        context: 'Killroy additional canonical best kills required for the next damage percentage point',
      });
    });
  });

  describe('Skull Shop row gates', () => {
    it('matches the extra row gate independently from the third fight unlock', () => {
      const nativeGate = getExtractedValue(extractionResults, 'killroy_extra_shop_row');
      expect(killroy.extraShopRowUnlocked).toBe(nativeGate === 1);
    });

    it('matches the later row gate from Rift and saved shop progression', () => {
      const nativeGate = getExtractedValue(extractionResults, 'killroy_later_shop_row');
      expect(killroy.laterShopRowUnlocked).toBe(nativeGate === 1);
    });
  });
});
