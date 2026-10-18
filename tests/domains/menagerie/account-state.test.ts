import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Account } from '../../../data/domain/account';
import { Cooking, updateCooking } from '../../../data/domain/world-4/cooking';
import { Forge, updateForge } from '../../../data/domain/world-1/forge';
import type { Player } from '../../../data/domain/player';
import { updatePlayerDropRates } from '../../../data/domain/player-stats';
import { Sailing, updateSailing } from '../../../data/domain/world-5/sailing/sailing';
import { Gaming } from '../../../data/domain/world-5/gaming';
import { Farming } from '../../../data/domain/world-6/farming';
import { ResearchGrid, updateResearchDisplay } from '../../../data/domain/world-7/research';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { getPersistentSpelunkingPower } from '../../../data/domain/world-7/spelunkingPower';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { updateGaming } from '../../../data/domain/world-5/gaming';
import { updateFarmingLevel } from '../../../data/domain/world-6/farming';
import { updateMinehead } from '../../../data/domain/world-7/minehead';
import { updateSushiStation } from '../../../data/domain/world-7/sushi';
import { updateJellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { Menagerie } from '../../../data/domain/menagerie';
import { updateConstruction, Construction } from '../../../data/domain/world-3/construction/construction';
import { Building } from '../../../data/domain/world-3/construction/buildings';

const extractionResultsName = 'menagerie-account-state-data.json';

let extractionResults: ExtractionResults;
let menagerie: Menagerie;
let account: Account;
let missionAvailabilityInputs: number[];
let accountProgression: number[];
let missionStates: number[][];
let unlockStates: number[][];
let bonusStates: number[][];
let usableResources: number[];
let bonusLevelFactors: number[][];
let extraBundleFlags: number[];
let accountData: Map<string, any>;
let sideJellyfishState: {
  unlocks: number[];
  purple: number[];
  blue: [number];
  red: [number, number, number[]];
  silver: number[];
  yellow: [number[], number, number, number[]];
  green: [number];
} | undefined;
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
  extraBundleFlags = extractionResults.extractions.extra_bundle_flags.result as number[];
  sideJellyfishState = extractionResults.extractions.side_jellyfish?.result as typeof sideJellyfishState;
  accountData = loadGameDataFromSave('latest');
  menagerie = accountData.get('menagerie') as Menagerie;
  account = accountData.get('account') as Account;
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
  it('maps and calculates all six side jellyfish when matching native outputs are available', () => {
    const expected = sideJellyfishState;
    const actualUnlocks = [
      menagerie.purpleJellyfish.unlocked,
      menagerie.blueJellyfish.unlocked,
      menagerie.redJellyfish.unlocked,
      menagerie.silverJellyfish.unlocked,
      menagerie.yellowJellyfish.unlocked,
      menagerie.greenJellyfish.unlocked,
    ];
    if (!expected) {
      // The retained default result predates side-jelly extraction; opt-in account datasets include paired native outputs.
      expect(actualUnlocks).toHaveLength(6);
      expect(menagerie.redJellyfish.chapterInputs.map(chapter => chapter.index)).toEqual([0, 1, 2, 3, 4, 5]);
      expect(menagerie.silverJellyfish.conversionEvents.reduce((sum, event) => sum + event.probability, 0)).toBeCloseTo(1);
      expect(menagerie.greenJellyfish).toHaveProperty('requiredNametag');
      expect(menagerie.greenJellyfish).toHaveProperty('rewardNametag');
      return;
    }
    expect(actualUnlocks).toEqual(expected.unlocks.map(Boolean));

    expect(menagerie.purpleJellyfish.shellBalance).toMatchLiveGameWithDetails(
      expected.purple[0], { tolerance: 0, context: 'Purple saved Shell balance' },
    );
    expect(menagerie.purpleJellyfish.shellPurchaseCount).toMatchLiveGameWithDetails(
      expected.purple[1], { tolerance: 0, context: 'Purple saved Shell purchase count' },
    );
    expect(menagerie.purpleJellyfish.lumiLevel).toMatchLiveGameWithDetails(
      expected.purple[2], { tolerance: 0, context: 'Purple saved Lumi upgrade level' },
    );
    expect(menagerie.purpleJellyfish.nextShellCost).toMatchLiveGameWithDetails(
      expected.purple[3], { tolerance: 0, context: 'Purple next Shell cost' },
    );
    expect(menagerie.purpleJellyfish.nextLumiCost).toMatchLiveGameWithDetails(
      expected.purple[4], { tolerance: 0, context: 'Purple next Lumi cost' },
    );
    expect(menagerie.purpleJellyfish.lumiContribution).toMatchLiveGameWithDetails(
      expected.purple[5], { tolerance: 0, context: 'Purple contribution to existing Lumi/hour calculation' },
    );

    expect(menagerie.blueJellyfish.donatedLadles).toMatchLiveGameWithDetails(
      expected.blue[0], { tolerance: 0, context: 'Blue saved donated Ladles' },
    );

    expect(menagerie.redJellyfish.readingOpportunities).toMatchLiveGameWithDetails(
      expected.red[0], { tolerance: 0, context: 'Red saved reading opportunities' },
    );
    expect(menagerie.redJellyfish.ready).toBe(expected.red[0] > 0);
    expect(menagerie.redJellyfish.readingMultiplier).toMatchLiveGameWithDetails(
      expected.red[1], { tolerance: 0, context: 'Red saved reading multiplier' },
    );
    expect(menagerie.redJellyfish.chapterInputs).toHaveLength(6);
    expect(menagerie.redJellyfish.chapterInputs.map(chapter => chapter.index)).toEqual([0, 1, 2, 3, 4, 5]);
    expect(menagerie.redJellyfish.chapterInputs.every(chapter => chapter.name !== 'FILLER')).toBe(true);
    menagerie.redJellyfish.chapterInputs.forEach(chapter => {
      expect(chapter.input).toMatchLiveGameWithDetails(
        expected.red[2][chapter.index], { tolerance: 0, context: `Red chapter ${chapter.index} saved input` },
      );
    });

    expect(menagerie.silverJellyfish.miscLevel).toMatchLiveGameWithDetails(
      expected.silver[0], { tolerance: 0, context: 'Silver saved MISC level' },
    );
    expect(menagerie.silverJellyfish.conversionLevel).toMatchLiveGameWithDetails(
      expected.silver[1], { tolerance: 0, context: 'Silver saved conversion level' },
    );
    expect(menagerie.silverJellyfish.nextMiscCost).toMatchLiveGameWithDetails(
      expected.silver[2], { tolerance: 0, context: 'Silver next MISC cost' },
    );
    expect(menagerie.silverJellyfish.nextConversionCost).toMatchLiveGameWithDetails(
      expected.silver[3], { tolerance: 0, context: 'Silver next conversion cost' },
    );
    expect(menagerie.silverJellyfish.miscMultiplier).toMatchLiveGameWithDetails(
      expected.silver[4], { tolerance: 0, context: 'Silver MISC multiplier' },
    );
    expect(menagerie.silverJellyfish.conversionRate).toMatchLiveGameWithDetails(
      expected.silver[5], { tolerance: 0, context: 'Silver conversion probability per eligible event' },
    );
    const storage = accountData.get('storage') as { amountInStorage(itemName: string): number };
    const remainingFragments = Math.max(0, 2_000_000_000 - storage.amountInStorage('ObolFrag'));
    const rate = expected.silver[5];
    const expectedCredit = rate < 1
      ? (1 - rate) * Math.min(0, remainingFragments) + rate * Math.min(1, remainingFragments)
      : rate === 1
        ? Math.min(1, remainingFragments)
        : (2 - rate) * Math.min(1, remainingFragments) + (rate - 1) * Math.min(2, remainingFragments);
    expect(menagerie.silverJellyfish.conversionEvents.reduce((sum, event) => sum + event.probability, 0))
      .toMatchLiveGameWithDetails(1, { tolerance: 0, context: 'Silver credited event probabilities total one' });
    expect(menagerie.silverJellyfish.expectedCreditedFragments).toMatchLiveGameWithDetails(
      expectedCredit, { tolerance: 0, context: 'Silver expected credited fragments per eligible event' },
    );

    expect(menagerie.yellowJellyfish.upgrades.map(upgrade => upgrade.level)).toEqual(expected.yellow[0]);
    expect(menagerie.yellowJellyfish.progress).toMatchLiveGameWithDetails(
      expected.yellow[1], { tolerance: 0, context: 'Yellow saved construction progress' },
    );
    expect(menagerie.yellowJellyfish.requirement).toMatchLiveGameWithDetails(
      expected.yellow[2], { tolerance: 0, context: 'Yellow progress requirement' },
    );
    expect(menagerie.yellowJellyfish.upgrades.map(upgrade => upgrade.effect)).toEqual(expected.yellow[3]);
    expect(menagerie.yellowJellyfish.lumiContribution).toMatchLiveGameWithDetails(
      expected.yellow[3][3], { tolerance: 0, context: 'Yellow Lumi contribution' },
    );

    expect(menagerie.greenJellyfish.depositedNametags).toMatchLiveGameWithDetails(
      expected.green[0], { tolerance: 0, context: 'Green saved Gallery deposits' },
    );
  });

  it('converts source description placeholders using their native meanings', () => {
    const bonuses = menagerie.getBonuses();
    const researchExperienceBonus = bonuses[3];
    const blackStarBonus = bonuses[2];

    expect(researchExperienceBonus.data.description).toContain('}');
    expect(researchExperienceBonus.getDescriptionEffect(researchExperienceBonus.effect, '}'))
      .toBe(1 + researchExperienceBonus.effect / 100);
    expect(researchExperienceBonus.getDescriptionEffect(researchExperienceBonus.nextEffect, '}'))
      .toBe(1 + researchExperienceBonus.nextEffect / 100);
    expect(blackStarBonus.data.description).toContain('{');
    expect(blackStarBonus.getDescriptionEffect(blackStarBonus.effect, '{')).toBe(blackStarBonus.effect);
  });
  it('keeps Menagerie state unchanged across repeated preparation and account updates', () => {
    const snapshot = () => ({
      missions: menagerie.getMissions().map(({ claimCount, currentRequirement, progress, available, ready }) => [
        claimCount, currentRequirement, progress, available, ready,
      ]),
      unlocks: menagerie.getUnlocks().map(({ owned, available, nextCost, affordable }) => [
        owned, available, nextCost, affordable,
      ]),
      bonuses: menagerie.getBonuses().map(({ level, effect, nextEffect, nextCost, available, affordable }) => [
        level, effect, nextEffect, nextCost, available, affordable,
      ]),
      resources: menagerie.getResourceBalances(),
      lumiPerHour: menagerie.getProgression().lumiPerHour,
      missionAvailability: menagerie.getMissionAvailability(),
      availability: [
        menagerie.availableMissionCount,
        menagerie.availableUnlockCount,
        menagerie.availableBonusCount,
      ],
      sideJellies: JSON.parse(JSON.stringify([
        menagerie.purpleJellyfish,
        menagerie.blueJellyfish,
        menagerie.redJellyfish,
        menagerie.silverJellyfish,
        menagerie.yellowJellyfish,
        menagerie.greenJellyfish,
      ])),
    });

    menagerie.prepare(accountData);
    menagerie.update(accountData);
    const first = snapshot();

    menagerie.prepare(accountData);
    menagerie.update(accountData);
    expect(snapshot()).toEqual(first);
    const firstAccountRun = [
      menagerie.purpleJellyfish,
      menagerie.blueJellyfish,
      menagerie.redJellyfish,
      menagerie.silverJellyfish,
      menagerie.yellowJellyfish,
      menagerie.greenJellyfish,
      menagerie.getProgression().lumiPerHour,
    ];
    const repeatedAccountData = loadGameDataFromSave('latest');
    const repeatedMenagerie = repeatedAccountData.get('menagerie') as Menagerie;
    expect([
      repeatedMenagerie.purpleJellyfish,
      repeatedMenagerie.blueJellyfish,
      repeatedMenagerie.redJellyfish,
      repeatedMenagerie.silverJellyfish,
      repeatedMenagerie.yellowJellyfish,
      repeatedMenagerie.greenJellyfish,
      repeatedMenagerie.getProgression().lumiPerHour,
    ]).toEqual(firstAccountRun);
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
  it('reports available Black Stars by use count and Organic Labels by selected upgrade count', () => {
    const resourceMenagerie = new Menagerie();
    resourceMenagerie.init([], 0);
    const savedMenagerie: number[][] = [[], [], [], []];
    savedMenagerie[3][2] = 1;
    savedMenagerie[3][6] = 1;
    // Native v1.23 sums 37 palette states (state 2 uses two Stars); each selected Exotic Market ID uses one Label.
    const spelunk = Array.from({ length: 54 }, () => [] as number[]);
    spelunk[49] = Array.from({ length: 37 }, (_, index) => index === 0 ? 1 : index === 1 ? 2 : 0);
    spelunk[50] = [0];
    const optionList = Array.from({ length: 629 }, () => 0);
    const holes = Array.from({ length: 12 }, () => Array.from({ length: 8 }, () => 0));
    const ninja = Array.from({ length: 106 }, () => [] as number[]);
    const research = Array.from({ length: 8 }, () => [] as number[]);
    const parseData = new Map<string, unknown>([
      [resourceMenagerie.getDataKey(), resourceMenagerie],
      ['Menagerie', savedMenagerie],
      ['OptLacc', optionList],
      ['Research', research],
      ['Divinity', []],
      ['Cards1', []],
      ['GreenStacks', []],
      ['Spelunk', spelunk],
      ['Holes', holes],
      ['FarmCrop', {}],
      ['KRbest', {}],
      ['Ninja', ninja],
    ]);
    resourceMenagerie.parse(parseData);
    resourceMenagerie.prepare(new Map([['account', { hasBundleL: false, hasBundleM: true }]]));

    const resources = resourceMenagerie.getResourceBalances();
    expect(resources.blackStarsOwned).toBe(5);
    expect(resources.blackStarsAvailable).toBe(2);
    expect(resources.organicLabels).toBe(1);
    expect(resources.organicLabelsAvailable).toBe(0);
  });
  it('wires paired grants and remaining resources into their existing owners', () => {
    const gaming = accountData.get('gaming') as Gaming;
    const farming = accountData.get('farming') as Farming;
    const minehead = accountData.get('minehead') as Minehead;
    const sushi = accountData.get('sushi') as SushiStation;
    const jellyOperator = accountData.get('jellyOperator') as JellyOperator;
    const resources = menagerie.getResourceBalances();

    expect(gaming.palette.blackStarsAvailable).toMatchLiveGameWithDetails(usableResources[0], {
      tolerance: 0,
      context: 'Gaming Palette usable Black Stars',
    });
    expect(farming.organicLabelsAvailable).toMatchLiveGameWithDetails(usableResources[1], {
      tolerance: 0,
      context: 'Farming Exotic Market usable Organic Labels',
    });
    expect(minehead.mineheadDoublersRemaining).toMatchLiveGameWithDetails(usableResources[2], {
      tolerance: 0,
      context: 'Minehead remaining doublers',
    });
    expect(sushi.sushiDoublersRemaining).toMatchLiveGameWithDetails(usableResources[3], {
      tolerance: 0,
      context: 'Sushi Station remaining doublers',
    });
    expect(jellyOperator.jellyOperatorDoublersRemaining).toMatchLiveGameWithDetails(usableResources[4], {
      tolerance: 0,
      context: 'Jelly Operator remaining doublers',
    });
    expect(minehead.mineheadDoublersOwned).toMatchLiveGameWithDetails(usableResources[2], {
      tolerance: 0,
      context: 'Minehead granted doublers',
    });
    expect(sushi.sushiDoublersOwned).toMatchLiveGameWithDetails(usableResources[3], {
      tolerance: 0,
      context: 'Sushi Station granted doublers',
    });
    expect(jellyOperator.jellyOperatorDoublersOwned).toMatchLiveGameWithDetails(usableResources[4], {
      tolerance: 0,
      context: 'Jelly Operator granted doublers',
    });
    const ownerResources = () => [
      gaming.palette.blackStarsAvailable,
      farming.organicLabelsAvailable,
      minehead.mineheadDoublersOwned,
      minehead.mineheadDoublersRemaining,
      sushi.sushiDoublersOwned,
      sushi.sushiDoublersRemaining,
      jellyOperator.jellyOperatorDoublersOwned,
      jellyOperator.jellyOperatorDoublersRemaining,
    ];
    const first = ownerResources();

    updateMinehead(accountData);
    updateJellyOperator(accountData);
    updateGaming(accountData);
    updateFarmingLevel(accountData);
    updateSushiStation(accountData);
    updateMinehead(accountData);
    updateJellyOperator(accountData);
    updateGaming(accountData);
    updateFarmingLevel(accountData);
    updateSushiStation(accountData);

    expect(ownerResources()).toEqual(first);
  });

  it('parses native bundle flags used by Menagerie resource and availability formulas', () => {
    expect(account.hasBundleL).toBe(Boolean(extraBundleFlags[0]));
    expect(account.hasBundleM).toBe(Boolean(extraBundleFlags[1]));
  });
  it('keeps existing rate and stat outputs stable across repeated owner processing', () => {
    const updateReceivers = () => {
      const forge = accountData.get('forge') as Forge;
      updateForge(forge, accountData.get('gems'), menagerie);
      updateCooking(accountData);
      updateSailing(accountData);
      updateResearchDisplay(accountData);
      updatePlayerDropRates(accountData);
    };
    const snapshot = () => ({
      researchExp: (accountData.get('research') as ResearchGrid).production.expPerHour,
      cookingSpeed: (accountData.get('cooking') as Cooking).kitchens.map(kitchen => kitchen.mealSpeed),
      sailingTreasure: (accountData.get('sailing') as Sailing).boats.map(boat => boat.getLootValue()),
      forgeSpeed: (accountData.get('forge') as Forge).slots.map(slot =>
        slot.getSpeed((accountData.get('forge') as Forge).upgrades[2].getStat())),
      spelunkingPower: getPersistentSpelunkingPower(accountData),
      dropRate: (accountData.get('players') as Player[]).map(player => player.stats.dropRateMultiplier),
    });

    updateReceivers();
    const first = snapshot();
    updateReceivers();

    expect(snapshot()).toEqual(first);
  });
  it('processes Shrine caps and maximum-level costs through the normal account pipeline', () => {
    const log = jest.spyOn(console, 'log');
    let constructionData: Map<string, any>;
    try {
      constructionData = loadGameDataFromSave('latest');
    } finally {
      expect(log.mock.calls).not.toContainEqual(expect.arrayContaining(['Failed post-processing construction']));
      log.mockRestore();
    }

    const construction = constructionData!.get('construction') as Construction;
    const shrines = construction.buildings.filter(building => building.index >= 18 && building.index <= 26);
    const costCruncher = construction.buildings.find(building => building.index === 5) as Building;
    const snapshot = () => shrines.map(shrine => ({
      maxLevel: shrine.maxLvl,
      maxLevelCosts: shrine.getMaxLevelCosts(costCruncher),
    }));

    expect(shrines).toHaveLength(9);
    const first = snapshot();
    shrines.forEach((shrine, index) => {
      expect(first[index].maxLevel).toBe(shrine.level);
      expect(first[index].maxLevelCosts).toEqual([]);
    });

    updateConstruction(constructionData!);
    expect(snapshot()).toEqual(first);
  });
});