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

  describe('source-backed saved-week fight projection', () => {
    // These expectations are independent source projections, not initialized native NPC output.
    // Version 1.24 source: RNG 1318–1361, multiply 524427–524431; assignments 101408–101463;
    // ordered pools 308064–308068 and 308109; world progression 125873–125884.
    // Retained operands: clock 1792913071.9430003, restock 76679.73224663734,
    // reset counter 5, server offset 139, consumed slots 0, third fight flag 1.
    // Week 2965 produces seeds 3104/3154/3204. Native first values are 1707/10007,
    // 7847/10007, and 4007/10007, giving rolls 170/784/400 and classes 1/3/1.
    // Pools 68/70/99 use indices 5/4/8. Class and map selection each restart the seeded RNG.
    // Summoning progress 6 enables pool 99. Both characters have cleared portals through 250
    // and no special-mode buff. This save does not cover consumed slots, other pools,
    // or special-mode branches. The isolated oracle preserves native hash assignment order.
    const expectedFights = [
      { slot: 1, classCategory: 1, mapId: 15, sceneKey: 'SewerB', enemyId: 'ratB', bestKills: 0 },
      { slot: 2, classCategory: 3, mapId: 106, sceneKey: 'ySnowB2', enemyId: 'mamoth', bestKills: 0 },
      { slot: 3, classCategory: 1, mapId: 259, sceneKey: 'vSpiritB4', enemyId: 'w6b4', bestKills: 0 },
    ];

    it.each([
      { playerIndex: 0, playerName: 'Sludgadin' },
      { playerIndex: 3, playerName: 'Sludgev4' },
    ])('matches $playerName saved fight projection, not a native NPC capture', ({ playerIndex, playerName }) => {
      const projection = killroy.characterFights.find(character => character.playerIndex === playerIndex);
      expect(projection).toMatchObject({
        playerIndex,
        playerName,
        worldProgression: 7,
        accessibleFightCount: 3,
        fights: expectedFights,
      });
    });

    it('uses the first saved character for the account projection', () => {
      expect(killroy.accountFightProjection).toMatchObject({
        playerIndex: 0,
        playerName: 'Sludgadin',
        worldProgression: 7,
        accessibleFightCount: 3,
        fights: expectedFights,
      });
    });

    it('keeps the projected reset window tied to the retained saved clock', () => {
      expect(killroy.savedWeekEndTimestamp).toBe(1793421751.9430003);
      expect(killroy.savedWeekStartTimestamp).toBe(1792816951.9430003);
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

    // Fixed projections use the retained save, not a native combat capture.
    // Version 1.24 source: timer 198458; Talent Points 83388–83391;
    // skull factor 83376–83382; respawn credits 198467–198472;
    // Dungeon Credits 83413–83415; Pearls 83416–83422.
    // Levels are 52, 3, 1, 10, 1, 0. Prior Talent Point drops are 53.
    // Skull and respawn factors do not represent full combat yields.
    it.each([
      ['runDurationSeconds', 152, 'room duration in seconds'],
      ['talentPointDropProbability', 0.0003433860853986264, 'Talent Point probability per eligible kill'],
      ['bonusSkullMultiplier', 1.01, 'skull chance factor before the native cap'],
      ['expectedRespawnCreditsMultiplier', 1.1, 'expected credits per scheduled respawn event'],
      ['dungeonCreditDropProbability', 0.0101, 'Dungeon Credit probability per eligible kill'],
      ['pearlDropProbability', 0, 'Pearl probability with its upgrade at level zero'],
    ] as const)('matches the source-backed saved projection for %s', (field, expected, description) => {
      expect(killroy[field]).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `Killroy source-backed saved projection: ${description}; not a native combat capture`,
      });
    });

    // Fixed literals come from independently reviewed native 1.24 branches and retained save operands.
    // See docs/plans/killroy-research-brief.md, "Run-effect oracle correction", for the arithmetic.
    // Next-level values are source projections, not native future-state captures.
    it.each([
      { id: 0, method: 'getRunDurationSeconds', level: 52, current: 152, next: 153 },
      { id: 1, method: 'getTalentPointDropProbability', level: 3, current: 0.0003433860853986264, next: 0.0003583159151985667 },
      { id: 2, method: 'getBonusSkullMultiplier', level: 1, current: 1.01, next: 1.02 },
      { id: 3, method: 'getExpectedRespawnCreditsMultiplier', level: 10, current: 1.1, next: 1.11 },
      { id: 4, method: 'getDungeonCreditDropProbability', level: 1, current: 0.0101, next: 0.0102 },
      { id: 5, method: 'getPearlDropProbability', level: 0, current: 0, next: 0.00202 },
    ] as const)('matches fixed current and next-level source projections for $method without changing saved progress', ({ id, method, level, current, next }) => {
      // Bind these fixed projections to the genuine account state that supplied their operands.
      expect(nativeAccount.runLevels[id]).toBe(level);
      expect(nativeAccount.priorTalentPointDrops).toBe(53);

      const upgrade = killroy.runUpgrades[id];
      expect(upgrade[method]()).toMatchLiveGameWithDetails(current, {
        tolerance: 0,
        context: `Killroy upgrade ${id} fixed current source projection; not a native combat capture`,
      });
      expect(upgrade[method](upgrade.level + 1)).toMatchLiveGameWithDetails(next, {
        tolerance: 0,
        context: `Killroy upgrade ${id} fixed next-level source projection with historical Talent Point drops unchanged`,
      });
      expect(upgrade.level).toBe(nativeAccount.runLevels[id]);
      expect(upgrade.priorTalentPointDrops).toBe(nativeAccount.priorTalentPointDrops);
      expect(killroy.priorTalentPointDrops).toBe(nativeAccount.priorTalentPointDrops);
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

    // Independent version 1.24 source projections: dispatcher 236720–236737;
    // Gallery actual effect 243371–243380; Masterclass conversion 238578–238580.
    // Caps, progress, and next-success effects are not native future-state captures.
    // Caps are asymptotic, with no finite maximum level. Progress excludes the zero-level baseline, including Masterclass 1.01.
    // Progress fractions: L/(300+L) for 0–2; L/(200+L) for 3,4,7; L/(150+L) for 5; L/(250+L) for 6.
    it.each([
      { id: 0, level: 17, current: 1.053627760252366, next: 1.0566037735849056, cap: 2, progressPercent: 5.3627760252365935 },
      { id: 1, level: 1, current: 1.0299003322259137, next: 1.0596026490066226, cap: 10, progressPercent: 0.33222591362126247 },
      { id: 2, level: 2, current: 1.0132450331125828, next: 1.0198019801980198, cap: 3, progressPercent: 0.6622516556291391 },
      { id: 3, level: 0, current: 0, next: 0.0004975124378109452, cap: 0.1, progressPercent: 0 },
      { id: 4, level: 2, current: 1.010128712871287, next: 1.010192118226601, cap: 1.023, progressPercent: 0.9900990099009901 },
      { id: 5, level: 4, current: 1.0207792207792208, next: 1.0258064516129033, cap: 1.8, progressPercent: 2.5974025974025974 },
      { id: 6, level: 0, current: 0, next: 0.099601593625498, cap: 25, progressPercent: 0 },
      { id: 7, level: 0, current: 1, next: 1.0099502487562189, cap: 3, progressPercent: 0 },
    ])('matches bonus $id actual effects, asymptotic cap, and earned progress without changing saved level', ({ id, level, current, next, cap, progressPercent }) => {
      const bonus = killroy.permanentBonuses[id];
      expect(nativeAccount.permanentLevels[id]).toBe(level);
      expect(bonus.level).toBe(level);
      expect(bonus.getEffectValue()).toMatchLiveGameWithDetails(current, {
        tolerance: 0,
        context: `Killroy bonus ${id} fixed current actual effect at retained level ${level}`,
      });
      expect(bonus.getEffectValue(level + 1)).toMatchLiveGameWithDetails(next, {
        tolerance: 0,
        context: `Killroy bonus ${id} fixed next-success actual effect; source projection, not a native future capture`,
      });
      expect(bonus.getEffectCap()).toMatchLiveGameWithDetails(cap, {
        tolerance: 0,
        context: `Killroy bonus ${id} source-projected asymptotic effect cap, not a finite maximum level`,
      });
      expect(bonus.getCapProgress()).toMatchLiveGameWithDetails(progressPercent, {
        tolerance: 0,
        context: `Killroy bonus ${id} source-projected earned progress percentage above its zero-level baseline`,
      });
      expect(bonus.level).toBe(level);
      expect(nativeAccount.permanentLevels[id]).toBe(level);
    });

    // Independent saved-level projections, not native future-state captures.
    // Version 1.24 formulas: 236720–236736. Successful purchases add one level:
    // 100905–100936. Retained levels are 17, 1, 2, 0, 2, 4, 0, 0.
    // Gallery succeeds on native integer rolls 1–5 out of 100 below level two.
    it.each([
      { id: 0, expected: 1.0566037735849056, successProbability: 1 },
      { id: 1, expected: 1.0596026490066226, successProbability: 1 },
      { id: 2, expected: 1.0198019801980198, successProbability: 1 },
      { id: 3, expected: 0.04975124378109452, successProbability: 0.05 },
      { id: 4, expected: 1.0192118226600986, successProbability: 1 },
      { id: 5, expected: 1.0258064516129033, successProbability: 1 },
      { id: 6, expected: 0.099601593625498, successProbability: 1 },
      { id: 7, expected: 1.0099502487562189, successProbability: 1 },
    ])('matches bonus $id next-success projection and current success probability', ({ id, expected, successProbability }) => {
      const bonus = killroy.permanentBonuses[id];
      expect(bonus.nextSuccessfulUpgradeValue).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `Killroy bonus ${id} source-backed saved-level next-success projection; not a native capture`,
      });
      expect(bonus.upgradeSuccessProbability).toMatchLiveGameWithDetails(successProbability, {
        tolerance: 0,
        context: `Killroy bonus ${id} source-backed current purchase success probability`,
      });
    });

    it('matches Gallery actual extra multiplier current, next-success, and asymptotic cap', () => {
      // Version 1.24 gameplay 243371–243380 uses native output / 100; 101177–101180 floors only the shop display.
      const gallery = killroy.permanentBonuses[3];
      expect(gallery.level).toBe(0);
      expect(gallery.galleryMultiplierBonus).toMatchLiveGameWithDetails(0, {
        tolerance: 0,
        context: 'Killroy Gallery actual extra multiplier at retained level zero',
      });
      expect(gallery.getGalleryMultiplierBonus(gallery.level + 1)).toMatchLiveGameWithDetails(0.0004975124378109452, {
        tolerance: 0,
        context: 'Killroy Gallery next-success extra multiplier; source projection, not a native future capture',
      });
      expect(gallery.getEffectCap()).toMatchLiveGameWithDetails(0.1, {
        tolerance: 0,
        context: 'Killroy Gallery source-projected asymptotic extra multiplier cap, not a finite maximum level',
      });
      expect(gallery.level).toBe(0);
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
