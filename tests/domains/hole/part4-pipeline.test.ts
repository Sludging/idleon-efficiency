import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { freshPart2Account } from './part2-test-helpers';

function part4Snapshot(hole: Hole): string {
 return JSON.stringify({
  well: {
   spendableStock: hole.well.sediments.map(sediment => sediment.spendableStock),
   bucketRates: hole.well.buckets.map(bucket => bucket.rate),
  },
  bell: {
   mode: hole.bell.mode,
   improvementCosts: hole.bell.improvements.map(improvement => improvement.cost),
   cleanOdds: hole.bell.cleanOdds,
  },
  harp: {
   assignedEffects: hole.harp.assignedStringEffects,
   layoutAvailable: hole.harp.layoutAvailable,
   slotCount: hole.harp.slotCount,
   effectsUnavailableReason: hole.harp.stringEffectUnavailableReason,
   studyBonusGate: hole.harp.studyBonusGateActive,
   studyBonusGateUnavailableReason: hole.harp.studyBonusGateUnavailableReason,
   noteBalances: hole.harp.notes.map(note => note.current),
   passives: hole.harp.strings.map(string => string.passiveBonus),
   assignedSlots: hole.harp.strings.map(string => string.assignedSlots),
   tune: hole.harp.tune,
   selectedNote: hole.harp.selectedNote,
   powerPerHour: hole.harp.powerPerHour,
  },
  lamp: {
   wishesPerDay: hole.lamp.wishesPerDay,
   schematicCostDiscount: hole.lamp.schematicCostDiscount,
   resetConsequences: hole.lamp.resetConsequences,
  },
 });
}

describe('Hole part 4 behavior', () => {
 it('keeps missing aspect rows unknown through normal account import', () => {
  let importedHole: Hole;
  jest.isolateModules(() => {
   const loader = require('../../utils/cloudsave-loader');
   const pipeline = require('../../../data/domain/idleonData');
   const items = require('../../../data/domain/items');
   const { Cloudsave } = require('../../../data/domain/cloudsave');
   const sourceSave = loader.loadTestSave('latest');
   const importedSave = Cloudsave.fromJSON(JSON.parse(JSON.stringify(sourceSave.toJSON())));
   const savedValue = importedSave.get('Holes');
   const savedHoleData = (typeof savedValue === 'string' ? JSON.parse(savedValue) : savedValue) as number[][];
   delete savedHoleData[3];
   delete savedHoleData[4];
   delete savedHoleData[20];
   importedSave.addField('Holes', typeof savedValue === 'string' ? JSON.stringify(savedHoleData) : savedHoleData);

   const account = pipeline.initAccountDataKeys(items.initAllItems());
   const data = pipeline.updateIdleonData(account, importedSave, importedSave.get('playerNames'),
    normalizeCompanionStates(importedSave.get('companions')), importedSave.get('servervars'), true).getData();
   importedHole = data.get('hole') as Hole;
  });

  expect(importedHole!.harp.layoutAvailable).toBe(false);
  expect(importedHole!.harp.stringEffectUnavailableReason).toContain('assignment layout is missing');
  expect(importedHole!.lamp.resetConsequences[0].before).toBeNull();
  expect(importedHole!.lamp.resetConsequences[1].before).toBeNull();
 });

 it('includes first, intermediate and maximum unlocked Harp note indices', () => {
  const run = freshPart2Account();
  const hole = run.data.get('hole') as Hole;
  const harpData = Array.from({ length: 35 }, () => [] as number[]);
  harpData[11] = [];
  [0, 4, 9].forEach(highestUnlockedNoteIndex => {
   harpData[11][20] = highestUnlockedNoteIndex;
   hole.harp.parse(harpData);
   expect(hole.harp.highestUnlockedNoteIndex).toBe(highestUnlockedNoteIndex);
   expect(hole.harp.notes.map(note => note.accessible)).toEqual(
    hole.harp.notes.map(note => note.index <= highestUnlockedNoteIndex),
   );
   if (highestUnlockedNoteIndex === 4) {
    expect(hole.harp.notes[5].accessible).toBe(false);
   }
   if (highestUnlockedNoteIndex === 9) {
    expect(hole.harp.notes[9].accessible).toBe(true);
    expect(hole.harp.noteCost).toBeNull();
   }
  });
 });

 it('keeps missing Well stock and saved Wish levels unknown', () => {
  const run = freshPart2Account();
  const hole = run.data.get('hole') as Hole;
  const holeData = Array.from({ length: 35 }, () => [] as number[]);
  holeData[9] = [12, -1, 0];
  delete holeData[20];
  hole.well.parse(hole, holeData);
  expect(hole.well.sediments.slice(0, 3).map(sediment => ({
   current: sediment.current, unavailable: sediment.unavailable, spendableStock: sediment.spendableStock,
  }))).toEqual([
   { current: 12, unavailable: false, spendableStock: 12 },
   { current: -1, unavailable: true, spendableStock: null },
   { current: 0, unavailable: false, spendableStock: 0 },
  ]);
  holeData[9] = [];
  hole.well.parse(hole, holeData);
  expect(hole.well.sediments[0].current).toBeNull();
  expect(hole.well.sediments[0].unavailable).toBeNull();
  expect(hole.well.sediments[0].spendableStock).toBeNull();

  holeData[9] = [12, -1, 0];

  hole.lamp.parse(holeData);
  expect(hole.lamp.wishes[5].wishCount).toBeNull();
  expect(hole.lamp.schematicCostDiscount).toBeNull();
  expect(hole.lamp.getWishCost(5)).toBeNull();
  expect(hole.lamp.getBonus(false, 0, 0)).toBeNull();
  hole.harp.parse(holeData);
  hole.harp.prepare(hole);
  expect(hole.harp.layoutAvailable).toBe(false);
  expect(hole.harp.assignedStringEffects).toEqual([]);
  expect(hole.harp.stringEffectUnavailableReason).toContain("assignment layout is missing");
 });

 it('keeps owned string passives independent of assigned slots', () => {
  const run = freshPart2Account();
  const hole = run.data.get('hole') as Hole;
  const savedValue = run.save.get('Holes');
  const savedInput = JSON.stringify(savedValue);
  const savedHole = (typeof savedValue === 'string' ? JSON.parse(savedValue) : savedValue) as number[][];
  const harpData = Array.from({ length: 35 }, (_, index) => savedHole[index] ?? []);
  hole.harp.parse(harpData);
  const passiveBonuses = hole.harp.strings.map(string => string.passiveBonus);

  harpData[20] = [];
  hole.harp.parse(harpData);

  expect(hole.harp.strings.map(string => string.assignedSlots)).toEqual(hole.harp.strings.map(() => []));
  expect(hole.harp.strings.map(string => string.passiveBonus)).toEqual(passiveBonuses);
  expect(JSON.stringify(run.save.get('Holes'))).toBe(savedInput);
 });
 it('exposes assigned-string trigger order and source branches without simulating rewards', () => {
  const run = freshPart2Account();
  const hole = run.data.get('hole') as Hole;
  const savedInput = JSON.stringify(run.save.get('Holes'));
  const harp = hole.harp;
  const activeLayout = harp.layoutAvailable && harp.slotCount !== null && harp.layout.length >= harp.slotCount
   ? harp.layout.slice(0, harp.slotCount) : [];
  const expectedSlots = activeLayout.flatMap((stringIndex, slot) =>
   stringIndex !== null && harp.strings[stringIndex] !== undefined ? [{ slot, stringIndex }] : []);
  expect(harp.assignedStringEffects.map(({ slot, stringIndex }) => ({ slot, stringIndex }))).toEqual(expectedSlots);
  expect(harp.assignedStringEffects.map(effect => effect.sequenceOrder))
   .toEqual(expectedSlots.map((_, index) => index));

  const expectedTriggerStatus = harp.power === null ? "power-unavailable"
   : harp.power < 100 ? "power-below-threshold" : "runtime-cycle-state-unavailable";
  expect(harp.assignedStringEffects.every(effect => effect.triggerStatus === expectedTriggerStatus)).toBe(true);
  expect(harp.stringEffectUnavailableReason).toContain(harp.layoutAvailable
   ? "transient runtime state" : "assignment layout is missing");
  const study = hole.studies[5];
  const studyBonusGate = study.levelAvailable ? study.ownedRule : null;
  expect(harp.studyBonusGateActive).toBe(studyBonusGate);
  expect(harp.studyBonusGateUnavailableReason).toBe(study.levelAvailable ? null : "Saved Study 5 level is missing.");
  harp.assignedStringEffects.forEach(({ stringIndex, effect, experience, passiveBonus }) => {
   expect(passiveBonus).toBe(harp.strings[stringIndex].passiveBonus);
   expect(experience.randomBranchChance).toBe(0.01);
   expect(experience.regularGain).toBeNull();
   expect(experience.studyBonusGain).toBeNull();
   expect(experience.studyBonusGateActive).toBe(studyBonusGate);
   expect(experience.effectiveStudyBonusChance).toBe(studyBonusGate === null ? null : studyBonusGate ? 0.01 : 0);
   if (stringIndex === 0 || stringIndex === 3 || stringIndex === 5) {
    expect(effect.type).toBe("notes");
    if (effect.type === "notes") {
     const noteCount = stringIndex === 0 ? 1 : stringIndex === 3 ? 3
      : harp.highestUnlockedNoteIndex === null ? null : Math.round(1 + harp.highestUnlockedNoteIndex);
     expect(effect.noteCount).toBe(noteCount);
     expect(effect.produced).toBeNull();
     const first = stringIndex === 5 ? 0 : harp.selectedNote === null ? null
      : Math.round(harp.selectedNote - (stringIndex === 3 ? 1 : 0));
     const limit = harp.highestUnlockedNoteIndex === null ? null : Math.round(harp.highestUnlockedNoteIndex);
     const firstNoteIndex = first === null || limit === null ? null : Math.max(0, Math.min(limit, first));
     const lastNoteIndex = first === null || noteCount === null || noteCount < 1 || limit === null ? null
      : Math.max(0, Math.min(limit, first + noteCount - 1));
     expect(effect.firstNoteIndex).toBe(firstNoteIndex);
     expect(effect.lastNoteIndex).toBe(lastNoteIndex);
    }
   } else if (stringIndex === 1) {
    expect(effect).toEqual({ type: "opal", chance: null });
   } else if (stringIndex === 4) {
    expect(effect.type).toBe("experience");
    if (effect.type === "experience") {
     expect(effect.additionalRecipients === null || !effect.additionalRecipients.includes(4)).toBe(true);
    }
   }
  });
  expect(JSON.stringify(run.save.get('Holes'))).toBe(savedInput);
 });


 it('keeps prepared part 4 state stable across repeated real-save imports without changing saved inputs', () => {
  const run = freshPart2Account();
  const savedInputs = JSON.stringify({
   holes: run.save.get('Holes'),
   options: run.save.get('OptLacc'),
   divinity: run.save.get('Divinity'),
  });
  const hole = run.data.get('hole') as Hole;
  expect(hole.well.sediments[0].spendableStock).toBe(7883181261094234);
  expect(hole.well.goldBucketCount).toBe(1);
  expect(hole.well.goldBucketMultiplier).toBe(36.63);
  expect(hole.well.buckets.slice(0, 2).map(bucket => bucket.goldBucket)).toEqual([true, false]);
  expect(hole.well.buckets[0].rate).toMatchLiveGameWithDetails(100350592397289070, {
   tolerance: 0, context: 'Gold bucket fill rate on v1.23 with the imported real-save input',
  });
  const fountainBonus = hole.getFountainBonus(0, 15);
  const goldBucketUpgrade = hole.schematics.find(schematic => schematic.index === 104)!;
  expect(hole.well.goldBucketCount).toBe(Math.round(Math.max(0, Math.min(1, fountainBonus)) +
   Math.min(goldBucketUpgrade.getBonus(1), 1)));
  expect(hole.well.goldBucketMultiplier).toBe(1 + fountainBonus / 100);
  expect(hole.well.opalCost).toBe(34490179896758400);
  expect(hole.bell.bonuses.map(bonus => bonus.getBonus())).toEqual([9800, 1117.5, 9620, 41.4, 694.5, 8684, 192]);
  expect(hole.lamp.wishesPerDay).toMatchLiveGameWithDetails(29.953020408163265, {
   tolerance: 0, context: 'Daily Wish gain using the Wishy Washy upgrade on v1.23 assets with the imported real-save input',
  });
  expect(hole.harp.strings.map(string => string.passiveBonus)).toEqual([1570, 1128, 895, 2028, 2980, 2736, 0]);
  expect(hole.lamp.wishes.map((_, index) => hole.lamp.getWishCost(index))).toEqual([999999, 6, 60, 2, 16, 2, 14, 5, 12, 999, 20979, 999]);
  expect([0, 1, 2, 3, 4].map(index => hole.lamp.getBonus(false, index, 0)))
   .toEqual([2793.75, 1475.1, 1668.8, 149, 0]);
  expect(hole.lamp.resetConsequences.map(({ category }) => category)).toEqual([
   'All Opals Invested', 'Conjuror PTS Invested', 'Jar Collectible Enchantment LVs', 'All Summoning Doublers',
  ]);
  expect(hole.lamp.resetConsequences.map(({ before, after }) => [before?.[0], after?.[0]])).toEqual([
   [114, 0], [4, 0], [7, 1], [5, -1],
  ]);
  expect(hole.harp.powerPerHour).toMatchLiveGameWithDetails(1989.9999999999998, {
   tolerance: 0, context: 'Harp power generation rate on v1.23 assets with the imported real-save input',
  });
  expect(hole.harp.slotCount).toMatchLiveGameWithDetails(11, {
   tolerance: 0, context: 'Active Harp slot count on v1.23 assets with the imported real-save input',
  });
  expect(hole.lamp.getWishCost(5)).toMatchLiveGameWithDetails(2, {
   tolerance: 0, context: 'Wish 5 current cost on v1.23 assets with the imported real-save input',
  });
  expect(hole.lamp.getBonus(true)).toMatchLiveGameWithDetails(3203.5, {
   tolerance: 0, context: 'Wish 7 effect on v1.23 assets with the imported real-save input',
  });
  expect(hole.lamp.schematicCostDiscount).toMatchLiveGameWithDetails(1, {
   tolerance: 0, context: 'Wish 5 schematic discount on v1.23 assets with the imported real-save input',
  });
  const originalSnapshot = part4Snapshot(hole);

  for (let pass = 0; pass < 2; pass++) {
   run.data = run.process(run.data, run.save, run.save.get('playerNames'),
    normalizeCompanionStates(run.save.get('companions')), run.save.get('servervars'), true).getData();
   expect(part4Snapshot(run.data.get('hole') as Hole)).toBe(originalSnapshot);
   expect(JSON.stringify({
    holes: run.save.get('Holes'),
    options: run.save.get('OptLacc'),
    divinity: run.save.get('Divinity'),
   })).toBe(savedInputs);
  }
 });
});
