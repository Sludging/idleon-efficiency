import { loadExtractionResults, validateExtractionHealth, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { Menagerie } from '../../../data/domain/menagerie';

const extractionResultsName = 'menagerie-account-state-data.json';

let extractionResults: ExtractionResults;
let menagerie: Menagerie;
let missionAvailabilityInputs: number[];
let accountProgression: number[];
let missionStates: number[][];
let unlockStates: number[][];
let bonusStates: number[][];
let usableResources: number[];
let bonusLevelFactors: number[][];
let accountData: Map<string, any>;
beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  missionAvailabilityInputs = extractionResults.extractions.mission_availability_inputs.result as number[];
  accountProgression = extractionResults.extractions.account_progression.result as number[];
  missionStates = extractionResults.extractions.mission_states.result as number[][];
  unlockStates = extractionResults.extractions.unlock_states.result as number[][];
  bonusStates = extractionResults.extractions.bonus_states.result as number[][];
  usableResources = extractionResults.extractions.usable_resources.result as number[];
  bonusLevelFactors = extractionResults.extractions.bonus_level_factors.result as number[][];
  accountData = loadGameDataFromSave('latest');
  menagerie = accountData.get('menagerie') as Menagerie;
});

describe('Menagerie account progression', () => {
  it('reports saved Shells, Lumi, rank, threshold, and account-dependent availability', () => {
    const expected = accountProgression;
    const progression = menagerie.getProgression();

    expect(progression.shellRankReady).toBe(expected[1] >= expected[3]);
    expect(menagerie.isAvailable).toBe(true);
    expect(progression.shells).toMatchLiveGameWithDetails(expected[1], { tolerance: 0, context: 'Saved Shell balance' });
    expect(progression.rank).toMatchLiveGameWithDetails(expected[2], { tolerance: 0, context: 'Saved Lumi rank' });
    expect(progression.shellThreshold).toMatchLiveGameWithDetails(expected[3], { tolerance: 0, context: 'Current Shell rank threshold' });
    expect(progression.lumiPerHour).toMatchLiveGameWithDetails(
      expected[4],
      { tolerance: 0, context: 'Calculated hourly Lumi rate' },
    );
    const availability = menagerie.getMissionAvailability();
    expect(availability.baseline).toMatchLiveGameWithDetails(
      missionAvailabilityInputs[0],
      { tolerance: 0, context: 'Baseline mission availability' },
    );
    expect(availability.menagerieBonus).toMatchLiveGameWithDetails(
      missionAvailabilityInputs[1],
      { tolerance: 0, context: 'Menagerie mission availability bonus' },
    );
    expect(availability.researchBonus).toMatchLiveGameWithDetails(
      missionAvailabilityInputs[2],
      { tolerance: 0, context: 'Research mission availability bonus' },
    );
    expect(availability.jadeEmporium).toMatchLiveGameWithDetails(
      missionAvailabilityInputs[3],
      { tolerance: 0, context: 'Jade Emporium mission availability' },
    );
    expect(availability.bankBundle).toMatchLiveGameWithDetails(
      3 * missionAvailabilityInputs[4],
      { tolerance: 0, context: 'Bank bundle mission availability' },
    );
    expect(availability.missionLimit).toMatchLiveGameWithDetails(
      missionAvailabilityInputs[5],
      { tolerance: 0, context: 'Available mission catalog length' },
    );
    expect(menagerie.availableMissionCount).toMatchLiveGameWithDetails(expected[5], { tolerance: 0, context: 'Available mission count' });
    expect(menagerie.availableUnlockCount).toMatchLiveGameWithDetails(expected[6], { tolerance: 0, context: 'Available unlock count' });
    expect(menagerie.availableBonusCount).toMatchLiveGameWithDetails(expected[7], { tolerance: 0, context: 'Available bonus count' });
  });

  it('reports claims, current task thresholds, and ready state for all missions', () => {
    const missions = menagerie.getMissions();
    const expected = missionStates;

    expect(missions).toHaveLength(33);
    expected.forEach(([index, claims, requirement, ready]) => {
      const mission = missions[index];
      expect(mission.claimCount).toMatchLiveGameWithDetails(claims, { tolerance: 0, context: `Mission ${index} saved claims` });
      expect(mission.currentRequirement).toMatchLiveGameWithDetails(requirement, { tolerance: 0, context: `Mission ${index} current task threshold` });
      expect(mission.ready).toBe(index < menagerie.availableMissionCount && Boolean(ready));
      expect(mission.available).toBe(index < menagerie.availableMissionCount);
    });
  });

  it('reports ownership, rank availability, costs, and affordability for every unlock', () => {
    const unlocks = menagerie.getUnlocks();
    const expected = unlockStates;

    expect(unlocks).toHaveLength(25);
    expected.forEach(([index, owned, cost, affordable]) => {
      const unlock = unlocks[index];
      expect(unlock.owned).toBe(Boolean(owned));
      expect(unlock.available).toBe(index < menagerie.availableUnlockCount);
      expect(unlock.nextCost).toMatchLiveGameWithDetails(cost, { tolerance: 0, context: `Unlock ${index} next Lumi cost` });
      expect(unlock.available).toBe(menagerie.getProgression().rank >= unlock.requiredRank);
      expect(unlock.affordable).toBe(Boolean(affordable));
    });
  });

  it('reports current and next bonus levels, effects, costs, rank availability, and affordability', () => {
    const bonuses = menagerie.getBonuses();
    const expected = bonusStates;

    expect(bonuses).toHaveLength(25);
    expected.forEach(([index, level, effect, cost, affordable]) => {
      const bonus = bonuses[index];
      expect(bonus.level).toMatchLiveGameWithDetails(level, { tolerance: 0, context: `Bonus ${index} current level` });
      expect(bonus.effect).toMatchLiveGameWithDetails(effect, { tolerance: 0, context: `Bonus ${index} current effect` });
      expect(bonus.available).toBe(index < menagerie.availableBonusCount);
      expect(bonus.nextCost).toMatchLiveGameWithDetails(cost, { tolerance: 0, context: `Bonus ${index} next Lumi cost` });
      expect(bonus.affordable).toBe(Boolean(affordable));
      expect(bonus.nextEffect).toMatchLiveGameWithDetails(
        bonusLevelFactors[index][1] * (level + 1),
        { tolerance: 0, context: `Bonus ${index} next-level effect` },
      );
      expect(bonus.available).toBe(menagerie.getProgression().rank >= bonus.requiredRank);
    });
  });

  it('uses the parsed account Obol Fragment currency and exposes real Red page items', () => {
    const account = accountData.get('account') as { obolFragments: number };
    const storage = accountData.get('storage') as { amountInStorage(itemName: string): number };
    const rawSave = loadTestSave('latest');

    expect(rawSave.get('CYObolFragments')).toBe(3253);
    expect(account.obolFragments).toBe(rawSave.get('CYObolFragments'));
    expect(menagerie.silverJellyfish.obolFragments).toBe(account.obolFragments);
    expect(menagerie.silverJellyfish.obolFragments).not.toBe(storage.amountInStorage('ObolFrag'));

    expect(menagerie.redJellyfish.trackedPageItemSlots).toBe(14);
    expect(menagerie.redJellyfish.pageItems).toHaveLength(7);
    expect(menagerie.redJellyfish.pageItems[6].index).toBe(6);
    expect(menagerie.redJellyfish.pageItems[6].item.displayName).toBe("Chapter Seven 'Burning Crusade'");
    expect(menagerie.redJellyfish.pageItems[6].item.getImageData().location).toBe('Spelunking6');
  });

  it('reports paired Menagerie resource balances', () => {
    const resources = menagerie.getResourceBalances();
    const expected = usableResources;

    expect(resources.blackStarsOwned).toMatchLiveGameWithDetails(expected[0], { tolerance: 0, context: 'Owned Black Stars' });
    expect(resources.organicLabels).toMatchLiveGameWithDetails(expected[1], { tolerance: 0, context: 'Usable Organic Labels' });
    expect(resources.mineheadDoublers).toMatchLiveGameWithDetails(expected[2], { tolerance: 0, context: 'Remaining Minehead doublers' });
    expect(resources.sushiDoublers).toMatchLiveGameWithDetails(expected[3], { tolerance: 0, context: 'Remaining Sushi doublers' });
    expect(resources.jellyOperatorDoublers).toMatchLiveGameWithDetails(expected[4], { tolerance: 0, context: 'Remaining Jelly Operator doublers' });
  });

});