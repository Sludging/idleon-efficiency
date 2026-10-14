import type { Hole } from '../../../data/domain/world-5/hole/hole';
import { Study } from '../../../data/domain/world-5/hole/hole';
import type { Gaming } from '../../../data/domain/world-5/gaming';
import type { Stamp } from '../../../data/domain/world-1/stamps';
import { getStampBonusForKey } from '../../../data/domain/world-1/stamps';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import type { CapturedHoleInputs } from './part1-test-helpers';
import { assertPairedContext, assertStudyEffects, captured, coreNumber, decodedSave } from './part1-test-helpers';

describe('Hole Studies progression, owned effects and current participation', () => {
 let results: ExtractionResults;
 let data: Map<string, any>;
 let hole: Hole;
 let inputs: CapturedHoleInputs;
 let savedHoleData: number[][];
 let optionListAccount: number[];

 beforeAll(() => {
  results = loadExtractionResults('hole-studies-data.json');
  validateExtractionHealth(results);
  data = loadGameDataFromSave('latest');
  hole = data.get('hole') as Hole;
  inputs = captured<CapturedHoleInputs>(results, 'paired_hole_inputs');
  savedHoleData = decodedSave<number[][]>('Holes');
  optionListAccount = decodedSave<number[]>('OptLacc');
 });

 it('pairs the real captured character and Study save state', () => {
  assertPairedContext(results, data);
 });

 it('keeps all 18 identities and the actual saved target with eligible immediate neighbors', () => {
  const names = captured<string[]>(results, 'study_names').map(name => name.replace(/_/g, ' '));
  expect(hole.studies.map(study => study.data.name.replace(/_/g, ' '))).toEqual(names);
  expect(hole.studies).toHaveLength(18);
  expect(hole.savedStudyTarget).toBe(inputs.target);
  expect(hole.studyTargetAvailable).toBe(true);
  expect(hole.studyTargetUnavailableReason).toBeNull();
  const neighbors = getExtractedValue(results, 'superbit_43') === 1
   ? [inputs.target - 1, inputs.target + 1].filter(index => index >= 0 && index < Math.min(18, inputs.levels[0])) : [];
  expect(hole.eligibleStudyNeighbors).toEqual(neighbors);
  coreNumber(hole.studyRate, results, 'study_rate', 'Shared Study progress/hour');
 });

 Array.from({ length: 18 }, (_, index) => index).forEach(index => {
  it(`preserves Study ${index} level, progress, access, requirement and claim readiness`, () => {
   const study = hole.studies[index];
   expect(study.index).toBe(index);
   expect(study.levelAvailable).toBe(true);
   expect(study.progressAvailable).toBe(true);
   expect(study.access).toBe(index < Math.min(18, inputs.levels[0]));
   expect(study.unlocked).toBe(study.access);
   expect(study.level).toMatchLiveGameWithDetails(inputs.studyLevels[index], { tolerance: 0, context: `Study ${index} saved level` });
   expect(study.progress).toMatchLiveGameWithDetails(inputs.studyProgress[index], { tolerance: 0, context: `Study ${index} stored progress` });
   coreNumber(study.getRequirement(), results, `study_requirement_${index}`, `Study ${index} next requirement`);
   expect(study.claimReady).toBe(captured<boolean>(results, `study_ready_${index}`));
  });

  it(`matches every Study ${index} numeric contribution and discrete owned rule`, () => {
   assertStudyEffects(index, hole.studies[index].getEffects(), results);
  });

  it(`parses Study ${index} effects directly and clears real prepared state on repeated parsing`, () => {
   const prepared = hole.studies[index];
   const study = new Study(index, prepared.data);
   study.parse(savedHoleData, optionListAccount);
   expect(study.level).toBe(inputs.studyLevels[index]);
   expect(study.progress).toBe(inputs.studyProgress[index]);
   expect(study.levelAvailable).toBe(true);
   expect(study.progressAvailable).toBe(true);
   expect(study.saveAvailable).toBe(true);
   const resourceIndex = [1, 7, 11, 16].indexOf(index);
   expect(study.completedLayers).toBe(resourceIndex < 0 ? null : inputs.layers[resourceIndex]);
   expect(study.dailyCoveUpgradesPurchased).toBe(index === 17 ? inputs.covePurchases : null);
   if (index === 17) {
    expect(inputs.covePurchases).toBe(0);
   }
   assertStudyEffects(index, study.getEffects(), results);

   study.prepareAccess(Math.min(18, inputs.levels[0]));
   study.prepareRate(prepared.participation, prepared.progressPerHour, prepared.contributors, prepared.rateUnavailableReason);
   expect(study.access).toBe(prepared.access);
   expect(study.unlocked).toBe(prepared.unlocked);
   expect(study.participation).toBe(prepared.participation);
   expect(study.progressPerHour).toBe(prepared.progressPerHour);
   expect(study.contributors).toEqual(prepared.contributors);
   expect(study.rateUnavailableReason).toBe(prepared.rateUnavailableReason);

   study.parse(savedHoleData, optionListAccount);
   expect(study.access).toBeNull();
   expect(study.unlocked).toBe(false);
   expect(study.participation).toBe('unavailable');
   expect(study.progressPerHour).toBeNull();
   expect(study.contributors).toEqual([]);
   expect(study.rateUnavailableReason).toBeNull();
   expect(study.claimReady).toBeNull();
   expect(study.completedLayers).toBe(resourceIndex < 0 ? null : inputs.layers[resourceIndex]);
   expect(study.dailyCoveUpgradesPurchased).toBe(index === 17 ? inputs.covePurchases : null);
   assertStudyEffects(index, study.getEffects(), results);
  });

  it(`gives Study ${index} only its current target, eligible neighbor or inactive accrual`, () => {
   const study = hole.studies[index];
   const neighbor = getExtractedValue(results, 'superbit_43') === 1 && Math.abs(index - inputs.target) === 1;
   const participates = inputs.levels[4] >= 1 && study.access === true && (index === inputs.target || neighbor);
   expect(study.participation).toBe(participates ? index === inputs.target ? 'target' : 'neighbor' : 'inactive');
   expect(study.rateUnavailableReason).toBeNull();
   coreNumber(study.progressPerHour, results, `study_progress_rate_${index}`, `Study ${index} current progress/hour`);
   expect(study.contributors).toEqual(participates ? hole.studyContributors : []);
   expect(study.progress).toBe(inputs.studyProgress[index]);
  });
 });

 it('checks the named Superbit ownership contract: false is inactive, but unknown is unavailable', () => {
  // These preparation inputs test availability contracts, not observed game ownership states.
  const gaming = data.get('gaming') as Gaming;
  const stampBonus = getStampBonusForKey(data.get('stamps') as Stamp[][], 'VillageStudy');
  const savedOwnership = hole.superbitOwnershipSaveAvailable ? gaming.isSuperbitPurchased(43) : null;
  const target = hole.studies[inputs.target];
  const neighbors = hole.studies.filter(study => study.access === true && Math.abs(study.index - inputs.target) === 1);
  const inactiveStudies = hole.studies.filter(study => study.index !== inputs.target && !neighbors.includes(study));
  const savedRate = hole.studyRate;
  const savedContributors = hole.studyContributors;
  const progression = () => hole.studies.map(study => ({
   index: study.index, level: study.level, progress: study.progress, access: study.access,
   requirement: study.getRequirement(), claimReady: study.claimReady,
  }));
  const savedProgression = progression();
  expect(target.participation).toBe('target');
  expect(savedRate).not.toBeNull();
  expect(neighbors.length).toBeGreaterThan(0);
  expect(inactiveStudies.length).toBeGreaterThan(0);

  try {
   hole.prepareStudyProgress(false, stampBonus);
   expect(hole.eligibleStudyNeighbors).toEqual([]);
   expect(hole.studyNeighborEligibilityUnavailableReason).toBeNull();
   expect(hole.studyRate).toBe(savedRate);
   expect(hole.studyContributors).toEqual(savedContributors);
   expect(target.participation).toBe('target');
   expect(target.progressPerHour).toBe(savedRate);
   expect(target.rateUnavailableReason).toBeNull();
   expect(target.contributors).toEqual(savedContributors);
   neighbors.forEach(study => {
    expect(study.participation).toBe('inactive');
    expect(study.progressPerHour).toBe(0);
    expect(study.rateUnavailableReason).toBeNull();
    expect(study.contributors).toEqual([]);
   });
   expect(progression()).toEqual(savedProgression);

   hole.prepareStudyProgress(null, stampBonus);
   expect(hole.eligibleStudyNeighbors).toBeNull();
   expect(hole.studyNeighborEligibilityUnavailableReason).toBe('Saved Superbit ownership is missing.');
   expect(hole.studyRate).toBe(savedRate);
   expect(hole.studyContributors).toEqual(savedContributors);
   expect(hole.savedStudyTarget).toBe(inputs.target);
   expect(hole.studyTargetAvailable).toBe(true);
   expect(hole.studyTargetUnavailableReason).toBeNull();
   expect(target.participation).toBe('target');
   expect(target.progressPerHour).toBe(savedRate);
   expect(target.rateUnavailableReason).toBeNull();
   expect(target.contributors).toEqual(savedContributors);
   neighbors.forEach(study => {
    expect(study.participation).toBe('unavailable');
    expect(study.progressPerHour).toBeNull();
    expect(study.rateUnavailableReason).toBe('Saved Superbit ownership is missing.');
    expect(study.contributors).toEqual([]);
   });
   inactiveStudies.forEach(study => {
    expect(study.participation).toBe('inactive');
    expect(study.progressPerHour).toBe(0);
    expect(study.rateUnavailableReason).toBeNull();
    expect(study.contributors).toEqual([]);
   });
   expect(progression()).toEqual(savedProgression);
  } finally {
   hole.prepareStudyProgress(savedOwnership, stampBonus);
  }
 });

 // Save omissions cover input contracts, not additional game parity or gameplay branches.
 [
  { name: 'whole resource row', studyIndex: null, position: null },
  { name: 'Motherlode layer entry', studyIndex: 1, position: 1 },
  { name: 'Hive layer entry', studyIndex: 7, position: 3 },
  { name: 'Evertree layer entry', studyIndex: 11, position: 5 },
  { name: 'Trench layer entry', studyIndex: 16, position: 7 },
 ].forEach(({ name, studyIndex, position }) => {
  it(`keeps independent Study effects available when the ${name} is omitted from the input contract`, () => {
   const omittedHoleData = savedHoleData.map(row => row.slice());
   if (position === null) {
    delete omittedHoleData[11];
   } else {
    delete omittedHoleData[11][position];
   }

   hole.studies.forEach(prepared => {
    const study = new Study(prepared.index, prepared.data);
    study.parse(savedHoleData, optionListAccount);
    const retainedEffects = study.getEffects();
    assertStudyEffects(study.index, retainedEffects, results);
    study.parse(omittedHoleData, optionListAccount);
    expect(study.level).toBe(inputs.studyLevels[study.index]);
    expect(study.progress).toBe(inputs.studyProgress[study.index]);
    expect(study.saveAvailable).toBe(true);
    expect(study.dailyCoveUpgradesPurchased).toBe(study.index === 17 ? inputs.covePurchases : null);
    const resourceIndex = [1, 7, 11, 16].indexOf(study.index);
    const affected = resourceIndex >= 0 && (studyIndex === null || study.index === studyIndex);
    expect(study.completedLayers).toBe(affected || resourceIndex < 0 ? null : inputs.layers[resourceIndex]);
    if (affected) {
     const effects = study.getEffects();
     const total = effects.find(effect => effect.key === 'skilling-requirement-divisor-contribution')!;
     expect(total.value).toBeNull();
     expect(total.unavailableReason).not.toBeNull();
     expect(effects.filter(effect => effect !== total)).toEqual(
      retainedEffects.filter(effect => effect.key !== total.key),
     );
    } else {
     assertStudyEffects(study.index, study.getEffects(), results);
    }

    study.parse(savedHoleData, optionListAccount);
    expect(study.completedLayers).toBe(resourceIndex < 0 ? null : inputs.layers[resourceIndex]);
    assertStudyEffects(study.index, study.getEffects(), results);
   });
  });
 });

 ['Cove purchase entry', 'whole account options array'].forEach(name => {
  it(`keeps independent Study effects available when the ${name} is omitted from the input contract`, () => {
   const omittedOptions = optionListAccount.slice();
   if (name === 'Cove purchase entry') {
    delete omittedOptions[604];
   } else {
    omittedOptions.length = 0;
   }

   hole.studies.forEach(prepared => {
    const study = new Study(prepared.index, prepared.data);
    study.parse(savedHoleData, optionListAccount);
    const retainedEffects = study.getEffects();
    assertStudyEffects(study.index, retainedEffects, results);
    study.parse(savedHoleData, omittedOptions);
    expect(study.level).toBe(inputs.studyLevels[study.index]);
    expect(study.progress).toBe(inputs.studyProgress[study.index]);
    expect(study.saveAvailable).toBe(true);
    const resourceIndex = [1, 7, 11, 16].indexOf(study.index);
    expect(study.completedLayers).toBe(resourceIndex < 0 ? null : inputs.layers[resourceIndex]);
    expect(study.dailyCoveUpgradesPurchased).toBeNull();
    if (study.index === 17) {
     const effects = study.getEffects();
     const currentCost = effects.find(effect => effect.key === 'current-upgrade-cost')!;
     expect(currentCost.value).toBeNull();
     expect(currentCost.unavailableReason).not.toBeNull();
     expect(effects.filter(effect => effect !== currentCost)).toEqual(
      retainedEffects.filter(effect => effect.key !== currentCost.key),
     );
    } else {
     assertStudyEffects(study.index, study.getEffects(), results);
    }

    study.parse(savedHoleData, optionListAccount);
    expect(study.dailyCoveUpgradesPurchased).toBe(study.index === 17 ? inputs.covePurchases : null);
    assertStudyEffects(study.index, study.getEffects(), results);
   });
  });
 });

 // Skilling and Cove Studies retain their independent saved effect inputs when progression is incomplete.
 [1, 17].forEach(index => {
  [26, 27].forEach(row => {
   const field = row === 26 ? 'level' : 'progress';
   it(`keeps independent Study ${index} state when its ${field} entry is omitted from the input contract`, () => {
    const omittedHoleData = savedHoleData.map(savedRow => savedRow.slice());
    delete omittedHoleData[row][index];
    hole.studies.forEach(prepared => {
     const study = new Study(prepared.index, prepared.data);
     study.parse(savedHoleData, optionListAccount);
     assertStudyEffects(study.index, study.getEffects(), results);
     study.parse(omittedHoleData, optionListAccount);
     const missingLevel = study.index === index && row === 26;
     const missingProgress = study.index === index && row === 27;
     expect(study.levelAvailable).toBe(!missingLevel);
     expect(study.progressAvailable).toBe(!missingProgress);
     expect(study.saveAvailable).toBe(study.index !== index);
     expect(study.level).toBe(missingLevel ? 0 : inputs.studyLevels[study.index]);
     expect(study.progress).toBe(missingProgress ? 0 : inputs.studyProgress[study.index]);
     const resourceIndex = [1, 7, 11, 16].indexOf(study.index);
     expect(study.completedLayers).toBe(resourceIndex < 0 ? null : inputs.layers[resourceIndex]);
     expect(study.dailyCoveUpgradesPurchased).toBe(study.index === 17 ? inputs.covePurchases : null);
     study.prepareAccess(Math.min(18, inputs.levels[0]));
     if (missingLevel) {
      expect(study.getRequirement()).toBeNull();
      study.getEffects().forEach(effect => {
       expect(effect.value).toBeNull();
       expect(effect.unavailableReason).not.toBeNull();
      });
     } else {
      coreNumber(study.getRequirement(), results, `study_requirement_${study.index}`, `Study ${study.index} next requirement`);
      assertStudyEffects(study.index, study.getEffects(), results);
     }
     if (study.index === index) {
      expect(study.claimReady).toBeNull();
     } else {
      expect(study.claimReady).toBe(captured<boolean>(results, `study_ready_${study.index}`));
     }

     study.parse(savedHoleData, optionListAccount);
     expect(study.level).toBe(inputs.studyLevels[study.index]);
     expect(study.progress).toBe(inputs.studyProgress[study.index]);
     expect(study.saveAvailable).toBe(true);
     assertStudyEffects(study.index, study.getEffects(), results);
    });
   });
  });
 });

 [1, 7, 11, 16].forEach(index => {
  it(`identifies Study ${index} skilling effects as additive divisor contributions`, () => {
   const effects = hole.studies[index].getEffects();
   expect(effects.map(effect => effect.key)).toEqual([
    'skilling-requirement-divisor-contribution-per-layer',
    'skilling-requirement-divisor-contribution',
   ]);
  });
 });

 it('keeps the Fountain effect scoped to its owned Study rule', () => {
  const fountainRule = hole.studies[15].getEffects().find(effect => effect.key === 'owned-repeat-marbleization-rule')!;
  expect(fountainRule.scope).toBe('owned-study-rule');
 });
});
