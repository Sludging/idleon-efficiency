import { loadExtractionResults, validateExtractionHealth, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { Menagerie } from '../../../data/domain/menagerie';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { SushiStation } from '../../../data/domain/world-7/sushi';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';

const extractionResultsName = 'menagerie-account-state-data.json';

let extractionResults: ExtractionResults;
let menagerie: Menagerie;
let accountProgression: number[];
let missionStates: number[][];
let unlockStates: number[][];
let bonusStates: number[][];
let usableResources: number[];
let accountData: Map<string, any>;
let doublerBalances: Record<'minehead' | 'sushi' | 'jellyOperator', [number, number]>;
beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  accountProgression = extractionResults.extractions.account_progression.result as number[];
  missionStates = extractionResults.extractions.mission_states.result as number[][];
  unlockStates = extractionResults.extractions.unlock_states.result as number[][];
  bonusStates = extractionResults.extractions.bonus_states.result as number[][];
  usableResources = extractionResults.extractions.usable_resources.result as number[];
  doublerBalances = extractionResults.extractions.doubler_balances.result as typeof doublerBalances;
  accountData = loadGameDataFromSave('latest');
  menagerie = accountData.get('menagerie') as Menagerie;
});

describe('Menagerie account progression', () => {
  it('reports saved Shells, Lumi, rank, threshold, and availability totals', () => {
    const expected = accountProgression;
    const progression = menagerie.getProgression();
    const savedMenagerie = JSON.parse(loadTestSave('latest').get('Menagerie')) as number[][];
    const savedLumi = Number(savedMenagerie?.[0]?.[0] ?? 0);
    expect(progression.lumi).toBe(savedLumi);
    if (process.env.TEST_ACCOUNT_DATASET) {
      expect(progression.lumi).toMatchLiveGameWithDetails(
        expected[0],
        { tolerance: 0, context: 'Saved Lumi balance' },
      );
    }

    expect(progression.shells).toMatchLiveGameWithDetails(expected[1], { tolerance: 0, context: 'Saved Shell balance' });
    expect(progression.rank).toMatchLiveGameWithDetails(expected[2], { tolerance: 0, context: 'Saved Lumi rank' });
    expect(progression.shellThreshold).toMatchLiveGameWithDetails(expected[3], { tolerance: 0, context: 'Current Shell rank threshold' });
    expect(progression.lumiPerHour).toMatchLiveGameWithDetails(
      expected[4],
      { tolerance: 0, context: 'Calculated hourly Lumi rate' },
    );
    expect(menagerie.availableMissionCount).toMatchLiveGameWithDetails(expected[5], { tolerance: 0, context: 'Available mission count' });
    expect(menagerie.availableUnlockCount).toMatchLiveGameWithDetails(expected[6], { tolerance: 0, context: 'Available unlock count' });
    expect(menagerie.availableBonusCount).toMatchLiveGameWithDetails(expected[7], { tolerance: 0, context: 'Available bonus count' });
  });


  it('reports claims and current task thresholds for all missions', () => {
    const missions = menagerie.getMissions();
    const expected = missionStates;

    expected.forEach(([index, claims, requirement]) => {
      const mission = missions[index];
      expect(mission.claimCount).toMatchLiveGameWithDetails(claims, { tolerance: 0, context: `Mission ${index} saved claims` });
      expect(mission.currentRequirement).toMatchLiveGameWithDetails(requirement, { tolerance: 0, context: `Mission ${index} current task threshold` });
    });
  });

  it('reports ownership, costs, and affordability for every unlock', () => {
    const unlocks = menagerie.getUnlocks();
    const expected = unlockStates;

    expected.forEach(([index, owned, cost, affordable]) => {
      const unlock = unlocks[index];
      expect(unlock.owned).toBe(Boolean(owned));
      expect(unlock.nextCost).toMatchLiveGameWithDetails(cost, { tolerance: 0, context: `Unlock ${index} next Lumi cost` });
      expect(unlock.affordable).toBe(Boolean(affordable));
    });
  });

  it('reports current bonus levels, effects, costs, and affordability', () => {
    const bonuses = menagerie.getBonuses();
    const expected = bonusStates;

    expected.forEach(([index, level, effect, cost, affordable]) => {
      const bonus = bonuses[index];
      expect(bonus.level).toMatchLiveGameWithDetails(level, { tolerance: 0, context: `Bonus ${index} current level` });
      expect(bonus.effect).toMatchLiveGameWithDetails(effect, { tolerance: 0, context: `Bonus ${index} current effect` });
      expect(bonus.nextCost).toMatchLiveGameWithDetails(cost, { tolerance: 0, context: `Bonus ${index} next Lumi cost` });
      expect(bonus.affordable).toBe(Boolean(affordable));
    });
  });

  it('matches account Obol Fragment currency to the paired raw save', () => {
    const account = accountData.get('account') as { obolFragments: number };
    const rawSave = loadTestSave('latest');

    const rawObolFragments = Number(rawSave.get('CYObolFragments') ?? 0);
    expect(account.obolFragments).toBe(rawObolFragments);
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

  const doublerSystems = [
    {
      name: 'Minehead',
      key: 'minehead',
      resourceFields: ['mineheadDoublersOwned', 'mineheadDoublers'],
      receiverBalances: () => {
        const minehead = accountData.get('minehead') as Minehead;
        return [minehead.mineheadDoublersOwned, minehead.mineheadDoublersRemaining];
      },
    },
    {
      name: 'Sushi Station',
      key: 'sushi',
      resourceFields: ['sushiDoublersOwned', 'sushiDoublers'],
      receiverBalances: () => {
        const sushi = accountData.get('sushi') as SushiStation;
        return [sushi.sushiDoublersOwned, sushi.sushiDoublersRemaining];
      },
    },
    {
      name: 'Jelly Operator',
      key: 'jellyOperator',
      resourceFields: ['jellyOperatorDoublersOwned', 'jellyOperatorDoublers'],
      receiverBalances: () => {
        const jellyOperator = accountData.get('jellyOperator') as JellyOperator;
        return [jellyOperator.jellyOperatorDoublersOwned, jellyOperator.jellyOperatorDoublersRemaining];
      },
    },
  ] as const;

  doublerSystems.forEach(({ name, key, resourceFields, receiverBalances }) => {
    (['earned', 'remaining'] as const).forEach((balance, index) => {
      it(`reports native ${name} ${balance} doublers in Menagerie`, () => {
        const resources = menagerie.getResourceBalances();
        expect(resources[resourceFields[index]]).toMatchLiveGameWithDetails(doublerBalances[key][index], {
          tolerance: 0,
          context: `${name} ${balance} doublers in Menagerie`,
        });
      });

      it(`reports native ${name} ${balance} doublers in the receiver`, () => {
        expect(receiverBalances()[index]).toMatchLiveGameWithDetails(doublerBalances[key][index], {
          tolerance: 0,
          context: `${name} ${balance} doublers in the receiver`,
        });
      });
    });
  });

});