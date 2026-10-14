import type { Hole } from '../../../data/domain/world-5/hole/hole';
import type { Player } from '../../../data/domain/player';
import type { PlayerStatues } from '../../../data/domain/world-1/statues';
import { VillagerIndex } from '../../../data/domain/world-5/hole/villager';
import type {
 VillagerAccountGrowthInputs, VillagerCharacterInput, VillagerSharedGrowthInputs,
} from '../../../data/domain/world-5/hole/villager';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import type { CapturedHoleInputs } from './part1-test-helpers';
import { assertPairedContext, captured, coreNumber, rateForTarget } from './part1-test-helpers';

const names = ['Polonai', 'Kaipu', 'Cosmo', 'Minau', 'Bolaia'];

describe('Hole villager progression and named character growth', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let inputs: CapturedHoleInputs;

 beforeAll(() => {
  results = loadExtractionResults('hole-villager-growth-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
 });

 it('pairs the real active character and saved inputs before comparing growth', () => {
  assertPairedContext(results, data);
 });

 beforeAll(() => {
  inputs = captured<CapturedHoleInputs>(results, 'paired_hole_inputs');
 });

 names.forEach((name, index) => {
  it(`preserves ${name}'s rescue, saved progression, investments and purchased multiplier`, () => {
   const villager = hole.villagers[index];
   expect(villager.name).toBe(name);
   expect(villager.index).toBe(index);
   expect(villager.rescued).toBe(inputs.levels[index] >= 1);
   expect(villager.progressionAvailable).toBe(true);
   expect(villager.progressionUnavailableReason).toBeNull();
   for (const [actual, expected, context] of [
    [villager.level, inputs.levels[index], 'saved level'],
    [villager.currentExp, inputs.exp[index], 'stored EXP'],
    [villager.opals, inputs.investments[index], 'invested Opals'],
    [villager.purchasedExpUpgrade, inputs.purchased[index], 'purchased EXP multiplier'],
   ] as const) {
    expect(actual).toMatchLiveGameWithDetails(expected, { tolerance: 0, context: `${name}: ${context}` });
   }
   coreNumber(villager.getExpRequirement(), results, `requirement_${index}`, `${name} next EXP requirement`);
   expect(villager.requirementUnavailableReason).toBeNull();
   expect(villager.claimReady).toBe(captured<boolean>(results, `ready_${index}`));
  });

  it(`matches ${name}'s five-role growth calculation for the captured character`, () => {
   const rate = rateForTarget(data, index);
   expect(rate.playerName).toBe((data.get('players') as Player[]).find(player => player.playerID === rate.playerId)!.playerName);
   expect(rate.unavailableReason).toBeNull();
   expect(rate.inputs).not.toBeNull();
   coreNumber(rate.expPerHour, results, `growth_${index}`, `${name} captured character EXP/hour`);
   expect(rate.contributors.find(contributor => contributor.owner === `statues:${rate.playerId}:28`)!.value).toBe(rate.statueBonus);
   expect(rate.contributors.find(contributor => contributor.owner === `villager:${index}` && contributor.combination === 'allocation' && contributor.unit === 'count')!.value).toBe(inputs.investments[index]);
   const collectible = rate.contributors.find(contributor => contributor.owner === 'cavern:10' && contributor.combination === 'multiplicative' && contributor.unit === 'percent')!;
   expect(collectible.sourceIds).toEqual(expect.arrayContaining([4, 10, 12, 22, 29, 35].map(id => `jar-collectible:${id}`)));
   expect(collectible.sourceIds).toHaveLength(6);
   expect(hole.villagers[index]).not.toHaveProperty('expPerHour');
   expect(hole.villagers[index]).not.toHaveProperty('contributors');
   expect(hole.villagers[index]).not.toHaveProperty('rateUnavailableReason');
  });
 });

 it('reports next intrinsic unlocks without granting availability, purchases or levels', () => {
  const explorer = hole.villagers[VillagerIndex.Polonai];
  const engineer = hole.villagers[VillagerIndex.Kaipu];
  const measurement = hole.villagers[VillagerIndex.Minau];
  const cavernCount = getExtractedValue(results, 'caverns_owned');
  const schematicCount = getExtractedValue(results, 'schematics_available');
  const measurementCount = getExtractedValue(results, 'measurements_owned');
  const order = captured<Array<number | string>>(results, 'schematic_order').map(Number);
  hole.villagers.forEach(villager => {
   expect(villager.nextUnlock).not.toBeNull();
   expect(villager.nextUnlock).not.toHaveProperty('description');
  });
  expect(explorer.nextUnlock).toMatchObject({ kind: 'cavern', releasedMaximum: true, requiredLevel: null, identities: [] });
  expect(explorer.level).toBeGreaterThanOrEqual(cavernCount);
  expect(engineer.nextUnlock).toMatchObject({ kind: 'schematic', releasedMaximum: true, requiredLevel: null, identities: [] });
  expect(hole.schematics.slice(0, schematicCount).map(schematic => schematic.data.order)).toEqual(order.slice(0, schematicCount));
  expect(measurement.nextUnlock).toMatchObject({ kind: 'measurement', releasedMaximum: true, requiredLevel: null, identities: [] });
  expect(measurement.level).toBeGreaterThanOrEqual(measurementCount);
  expect(hole.villagers[VillagerIndex.Cosmo].nextUnlock).toMatchObject({
   kind: 'majik-point', requiredLevel: inputs.levels[2] + 1, identities: [], releasedMaximum: false,
  });
  expect(hole.villagers[VillagerIndex.Bolaia].nextUnlock).toMatchObject({
   kind: 'study-rate', requiredLevel: inputs.levels[4] + 1, identities: [], releasedMaximum: false,
  });
  expect(hole.villagers.map(villager => villager.level)).toEqual(inputs.levels);
 });

 describe('named-input availability contracts, not additional game captures', () => {
  function prepareGrowth(accountInputs: VillagerAccountGrowthInputs): void {
   hole.prepareVillagerGrowth(data.get('players') as Player[], data.get('statues') as PlayerStatues[], accountInputs);
  }

  function preparedInputs(): { contexts: VillagerCharacterInput[]; shared: VillagerSharedGrowthInputs } {
   const prepare = jest.spyOn(hole.villagers[0], 'prepareCharacterRates');
   try {
    prepareGrowth(hole.growthInputs!);
    const [contexts, shared] = prepare.mock.calls[0];
    return { contexts, shared };
   } finally {
    prepare.mockRestore();
   }
  }

  it('identifies the Slab items Measurement in every villager and imported character context', () => {
   const { contexts, shared } = preparedInputs();
   expect(shared.slabItemsMeasurement).toBe(hole.measurements[7].getBonus());
   expect(contexts.map(context => [context.playerId, context.playerName]))
    .toEqual((data.get('players') as Player[]).map(player => [player.playerID, player.playerName]));
   expect(hole.villagers).toHaveLength(names.length);
   hole.villagers.forEach(villager => {
    expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
     .toEqual(contexts.map(context => [context.playerId, context.playerName]));
    villager.characterRates.forEach(rate => {
     const contributors = rate.contributors.filter(contributor => contributor.owner === 'measurement:7');
     expect(contributors).toHaveLength(1);
     expect(contributors[0]).toMatchObject({
      owner: 'measurement:7', value: shared.slabItemsMeasurement,
      unit: 'percent', combination: 'additive', unavailableReason: null,
     });
    });
   });
  });

  it('preserves investment counts but marks missing Village Majik allocation effects unavailable', () => {
   const accountInputs = hole.growthInputs!;
   const available = hole.sourceSaveAvailable.villageMajik;
   const allocation = {
    ...hole.allocationEffects,
    opalEnthusiasm: hole.allocationEffects.opalEnthusiasm.map(effect => ({ ...effect })),
   };
   const characterRates = hole.villagers.map(villager => villager.characterRates.map(rate => ({
    ...rate,
    contributors: rate.contributors.map(contributor => ({
     ...contributor,
     ...(contributor.sourceIds === undefined ? {} : { sourceIds: [...contributor.sourceIds] }),
    })),
    inputs: rate.inputs === null ? null : { ...rate.inputs },
   })));
   const progression = hole.villagers.map(villager => [villager.level, villager.currentExp, villager.opals]);
   try {
    hole.sourceSaveAvailable.villageMajik = false;
    prepareGrowth(accountInputs);
    expect(hole.allocationEffects.leastUnlockedInvestment).toBe(allocation.leastUnlockedInvestment);
    expect(hole.allocationEffects.equalSpreadPercent).toBeNull();
    expect(hole.allocationEffects.equalSpreadUnavailableReason).toBe('Saved Village Majik inputs are missing.');
    expect(hole.allocationEffects.unavailableReason).toBe(hole.allocationEffects.equalSpreadUnavailableReason);
    hole.allocationEffects.opalEnthusiasm.forEach((effect, index) => {
     expect(effect.investedTens).toBe(allocation.opalEnthusiasm[index].investedTens);
     expect(effect.percent).toBeNull();
     expect(effect.unavailableReason).toBe('Saved Village Majik inputs are missing.');
    });
    hole.villagers.forEach(villager => villager.characterRates.forEach(rate => {
     expect(rate.expPerHour).toBeNull();
     expect(rate.inputs).toBeNull();
     expect(rate.unavailableReason).toBe('Saved Village Majik inputs are missing.');
     for (const owner of ['majik:14', 'majik:9']) {
      expect(rate.contributors.find(contributor => contributor.owner === owner && contributor.combination === 'allocation' && contributor.unit === 'percent')).toMatchObject({
       value: null, unavailableReason: 'Saved Village Majik inputs are missing.',
      });
     }
     for (const owner of ['majik:10', 'majik:11']) {
      expect(rate.contributors.find(contributor => contributor.owner === owner && contributor.combination === 'additive' && contributor.unit === 'percent')).toMatchObject({
       value: null, unavailableReason: 'Saved Village Majik inputs are missing.',
      });
     }
    }));
    expect(hole.villagers.map(villager => [villager.level, villager.currentExp, villager.opals])).toEqual(progression);
   } finally {
    hole.sourceSaveAvailable.villageMajik = available;
    prepareGrowth(accountInputs);
    expect(hole.villagers.map(villager => villager.characterRates)).toEqual(characterRates);
    expect(hole.allocationEffects).toEqual(allocation);
   }
  });

  it('accepts present zero allocation modifiers in the prepared named-input contract', () => {
   const accountInputs = hole.growthInputs!;
   const { contexts, shared } = preparedInputs();
   const allocation = {
    ...hole.allocationEffects,
    opalEnthusiasm: hole.allocationEffects.opalEnthusiasm.map(effect => ({ ...effect })),
   };
   const characterRates = hole.villagers.map(villager => villager.characterRates.map(rate => ({
    ...rate,
    contributors: rate.contributors.map(contributor => ({
     ...contributor,
     ...(contributor.sourceIds === undefined ? {} : { sourceIds: [...contributor.sourceIds] }),
    })),
    inputs: rate.inputs === null ? null : { ...rate.inputs },
   })));
   try {
    const zeroModifiers: VillagerSharedGrowthInputs = {
     ...shared, equalSpreadPercent: 0, enthusiasmPerTen: 0,
     equalSpreadUnavailableReason: null, villageMajikUnavailableReason: null,
    };
    hole.villagers.forEach(villager => {
     villager.prepareCharacterRates(contexts, zeroModifiers);
     villager.characterRates.forEach(rate => {
      expect(rate.expPerHour).not.toBeNull();
      expect(rate.unavailableReason).toBeNull();
      expect(rate.inputs!.equalSpreadBonus).toBe(0);
      for (const owner of ['majik:14', 'majik:9']) {
       expect(rate.contributors.find(contributor => contributor.owner === owner && contributor.combination === 'allocation' && contributor.unit === 'percent')).toMatchObject({
        value: 0, unavailableReason: null,
       });
      }
     });
    });
   } finally {
    prepareGrowth(accountInputs);
    expect(hole.villagers.map(villager => villager.characterRates)).toEqual(characterRates);
    expect(hole.allocationEffects).toEqual(allocation);
   }
  });

  it('keeps missing card availability distinct from a present named zero Gloomie card input', () => {
   const accountInputs = hole.growthInputs!;
   const available = hole.sourceSaveAvailable.cards;
   const sharedReason = hole.sharedGrowthUnavailableReason;
   const progression = hole.villagers.map(villager => [villager.level, villager.currentExp, villager.opals]);
   const baseline = JSON.stringify(hole.villagers.map(villager => villager.characterRates));
   try {
    hole.sourceSaveAvailable.cards = false;
    // These named fields represent the parser's missing Cards0 contract.
    hole.sharedGrowthUnavailableReason = 'Saved inputs are missing: Cards.';
    prepareGrowth(accountInputs);
    expect(hole.growthInputs).toBeNull();
    hole.villagers.forEach(villager => villager.characterRates.forEach(rate => {
     expect(rate.expPerHour).toBeNull();
     expect(rate.inputs).toBeNull();
     expect(rate.unavailableReason).toBe('Saved inputs are missing: Cards.');
     expect(rate.contributors.find(contributor => contributor.owner === 'cards:caveB')).toMatchObject({
      value: null, unavailableReason: 'Saved card inputs are missing.',
     });
    }));
    hole.sourceSaveAvailable.cards = true;
    hole.sharedGrowthUnavailableReason = sharedReason;
    prepareGrowth({ ...accountInputs, gloomieCardLevel: 0 });
    hole.villagers.forEach(villager => villager.characterRates.forEach(rate => {
     expect(rate.expPerHour).not.toBeNull();
     expect(rate.unavailableReason).toBeNull();
     expect(rate.contributors.find(contributor => contributor.owner === 'cards:caveB')).toMatchObject({
      value: 0, unavailableReason: null,
     });
    }));
    expect(hole.villagers.map(villager => [villager.level, villager.currentExp, villager.opals])).toEqual(progression);
   } finally {
    hole.sourceSaveAvailable.cards = available;
    hole.sharedGrowthUnavailableReason = sharedReason;
    prepareGrowth(accountInputs);
    expect(JSON.stringify(hole.villagers.map(villager => villager.characterRates))).toBe(baseline);
    expect(hole.growthInputs).toEqual(accountInputs);
   }
  });

  it.each([VillagerIndex.Polonai, VillagerIndex.Cosmo])(
   'keeps villager %s owner availability separate from shared and character inputs',
   index => {
    const accountInputs = hole.growthInputs!;
    const { contexts, shared } = preparedInputs();
    const villager = hole.villagers[index];
    const available = villager.saveAvailable;
    const rates = villager.characterRates.map(rate => [rate.playerId, rate.playerName, rate.statueBonus]);
    const others = hole.villagers.filter(owner => owner.index !== index).map(owner =>
     owner.characterRates.map(rate => ({
      ...rate,
      contributors: rate.contributors.map(contributor => ({
       ...contributor,
       ...(contributor.sourceIds === undefined ? {} : { sourceIds: [...contributor.sourceIds] }),
      })),
      inputs: rate.inputs === null ? null : { ...rate.inputs },
     })));
    const baseline = JSON.stringify(hole.villagers.map(owner => owner.characterRates));
    try {
     villager.saveAvailable = false;
     villager.prepareCharacterRates(contexts, shared);
     expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName, rate.statueBonus]))
      .toEqual(rates);
     villager.characterRates.forEach(rate => {
      expect(rate.expPerHour).toBeNull();
      expect(rate.inputs).toBeNull();
      expect(rate.unavailableReason).toBe('Saved villager growth inputs are missing.');
     });
     hole.villagers.filter(owner => owner.index !== index).forEach((owner, otherIndex) => {
      expect(owner.characterRates).toEqual(others[otherIndex]);
     });
    } finally {
     villager.saveAvailable = available;
     prepareGrowth(accountInputs);
     expect(JSON.stringify(hole.villagers.map(owner => owner.characterRates))).toBe(baseline);
     expect(hole.growthInputs).toEqual(accountInputs);
    }
   },
  );

  it('limits a missing named Statue input to its own character across all five villagers', () => {
   const accountInputs = hole.growthInputs!;
   const { contexts, shared } = preparedInputs();
   const missingPlayerId = contexts[0].playerId;
   const rates = hole.villagers.map(villager => villager.characterRates);
   const baseline = JSON.stringify(rates);
   try {
    const missingContext = contexts.map(context => context.playerId === missingPlayerId
     ? { ...context, statueBonus: null } : context);
    hole.villagers.forEach((villager, villagerIndex) => {
     villager.prepareCharacterRates(missingContext, shared);
     expect(villager.characterRates.map(rate => [rate.playerId, rate.playerName]))
      .toEqual(contexts.map(context => [context.playerId, context.playerName]));
     villager.characterRates.forEach((rate, characterIndex) => {
      if (rate.playerId === missingPlayerId) {
       expect(rate.expPerHour).toBeNull();
       expect(rate.inputs).toBeNull();
       expect(rate.statueFactor).toBeNull();
       expect(rate.unavailableReason).toBe('Saved Villager Statue state is missing for this character.');
       expect(rate.contributors.find(contributor => contributor.owner === `statues:${missingPlayerId}:28`)!.value)
        .toBeNull();
       expect(rate.contributors.find(contributor => contributor.owner === `statues:${missingPlayerId}:28`)!.unavailableReason)
        .toBe('Saved Villager Statue state is missing for this character.');
      } else {
       expect(rate.unavailableReason).toBeNull();
       expect(rate.expPerHour).toBe(rates[villagerIndex][characterIndex].expPerHour);
      }
     });
    });
   } finally {
    prepareGrowth(accountInputs);
    expect(JSON.stringify(hole.villagers.map(villager => villager.characterRates))).toBe(baseline);
    expect(hole.growthInputs).toEqual(accountInputs);
   }
  });

  it('does not require an early Explorer upgrade after the real saved cavern branch stops using it', () => {
   const accountInputs = hole.growthInputs!;
   const { contexts, shared } = preparedInputs();
   const explorer = hole.villagers[VillagerIndex.Polonai];
   expect(Math.min(18, explorer.level)).toBeGreaterThanOrEqual(13);
   const rates = explorer.characterRates;
   const baseline = JSON.stringify(hole.villagers.map(villager => villager.characterRates));
   try {
    explorer.prepareCharacterRates(contexts, { ...shared, earlyExplorerExpUpgrade: null });
    explorer.characterRates.forEach((rate, index) => {
     expect(rate.unavailableReason).toBeNull();
     expect(rate.inputs!.roleMultiplier).toBe(rates[index].inputs!.roleMultiplier);
     expect(rate.expPerHour).toBe(rates[index].expPerHour);
    });
   } finally {
    prepareGrowth(accountInputs);
    expect(JSON.stringify(hole.villagers.map(villager => villager.characterRates))).toBe(baseline);
    expect(hole.growthInputs).toEqual(accountInputs);
   }
  });
 });
});
