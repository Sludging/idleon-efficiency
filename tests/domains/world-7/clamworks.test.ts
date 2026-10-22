import { Clamworks } from '../../../data/domain/world-7/clamworks';
import { Menagerie } from '../../../data/domain/menagerie';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const extractionResultsName = 'clamwork-account-outputs-data.json';

describe('Clam Work account outputs', () => {
  let accountData: Map<string, any>;
  let clamworks: Clamworks;
  let menagerie: Menagerie;
  let results: ExtractionResults;

  beforeEach(() => {
    accountData = loadGameDataFromSave('latest');
    clamworks = accountData.get('clamworks') as Clamworks;
    menagerie = accountData.get('menagerie') as Menagerie;
    results = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(results);
  });

  it('matches saved pearl balance and native promotion level', () => {
    const parameters = results.extractions.clamwork_parameters.result;
    expect(clamworks.pearlsOwned).toMatchLiveGameWithDetails(parameters[4], {
      tolerance: 0,
      context: 'Saved Clam Work pearl balance',
    });
    expect(clamworks.promoLevel).toMatchLiveGameWithDetails(parameters[5], {
      tolerance: 0,
      context: 'Saved Clam Work promotion level',
    });
  });

  it('matches promotion chance and cost for the saved Worker Class', () => {
    const parameters = results.extractions.clamwork_parameters.result;
    expect(clamworks.getPromoChance()).toMatchLiveGameWithDetails(parameters[2], {
      tolerance: 0,
      context: 'Promotion success chance shown for the saved Worker Class',
    });
    expect(clamworks.getPromoTryCost()).toMatchLiveGameWithDetails(parameters[3], {
      tolerance: 0,
      context: 'Pearl cost shown for promotion at the saved Worker Class',
    });
  });

  it('matches earned compensation states and first pending reward to native progress', () => {
    const [earnedStates, firstPendingIndex, firstPendingLevel] =
      results.extractions.compensation_progression.result;

    clamworks.compensationRewards.forEach(reward => {
      expect(reward.earned).toBe(earnedStates[reward.index]);
    });

    const firstPendingReward = clamworks.getFirstPendingCompensationReward();
    expect(firstPendingReward).toBeDefined();
    if (!firstPendingReward) {
      throw new Error('Expected native extraction to identify a pending compensation reward');
    }
    expect(firstPendingReward.index).toMatchLiveGameWithDetails(firstPendingIndex, {
      tolerance: 0,
      context: 'First pending Clam Work compensation index',
    });
    expect(firstPendingReward.data.requiredWorkerClassLevel).toMatchLiveGameWithDetails(firstPendingLevel, {
      tolerance: 0,
      context: 'Worker Class level required for the first pending compensation',
    });
  });


  it('matches native pearl, Black Pearl, and Clam outputs', () => {
    const [basePearlValue, blackPearlValue, clamCount, clamHP, clamRespawnSeconds] = results.extractions.account_outputs.result;
    expect(clamworks.basePearlValue).toMatchLiveGameWithDetails(basePearlValue, {
      tolerance: 0,
      context: 'Account-base ordinary pearl value per drop before current-player Multikill and separate 10× factor',
    });
    expect(clamworks.blackPearlValue).toMatchLiveGameWithDetails(blackPearlValue, {
      tolerance: 0,
      context: 'Black Pearl value multiplier',
    });
    expect(clamworks.clamCount).toMatchLiveGameWithDetails(clamCount, {
      tolerance: 0,
      context: 'Clam count used by Clam Work',
    });
    expect(clamworks.clamHP).toMatchLiveGameWithDetails(clamHP, {
      tolerance: 0,
      context: 'Clam health',
    });
    expect(clamworks.clamRespawnSeconds).toMatchLiveGameWithDetails(clamRespawnSeconds, {
      tolerance: 0,
      context: 'Clam respawn time',
    });
  });

  it('matches individual pearl upgrade costs for cost-bearing Clam Work upgrades', () => {
    const nativeCosts = results.extractions.clam_upgrade_costs.result;

    for (const bonus of clamworks.workBonuses) {
      if (bonus.data.cost === undefined) {
        continue;
      }

      expect(clamworks.getClamCost(bonus.index)).toMatchLiveGameWithDetails(nativeCosts[bonus.index], {
        tolerance: 0,
        context: `Pearl quote for Clam Work upgrade ${bonus.index}`,
      });
    }
  });

  it('matches saved Menagerie Scurge progress, level, requirement, and Clam outputs', () => {
    const [scurgeExp, scurgeLevel, scurgeUnlocked, nextRequirement, pointsRemaining, expPerKill, spentLevels] = results.extractions.scurge_state.result;
    expect(menagerie.scurgeExp).toMatchLiveGameWithDetails(scurgeExp, {
      tolerance: 0,
      context: 'Saved Scurge experience progress',
    });
    expect(menagerie.scurgeLevel).toMatchLiveGameWithDetails(scurgeLevel, {
      tolerance: 0,
      context: 'Current Menagerie Scurge level',
    });
    expect(Number(menagerie.scurgeUnlocked)).toMatchLiveGameWithDetails(scurgeUnlocked, {
      tolerance: 0,
      context: 'Menagerie Scurge unlock state',
    });
    expect(menagerie.getScurgeNextExpRequirement()).toMatchLiveGameWithDetails(nextRequirement, {
      tolerance: 0,
      context: 'Next Menagerie Scurge experience requirement',
    });
    expect(clamworks.scurgePointsRemaining).toMatchLiveGameWithDetails(pointsRemaining, {
      tolerance: 0,
      context: 'Remaining Menagerie Scurge points available to spend',
    });
    expect(clamworks.scurgeExpPerKill).toMatchLiveGameWithDetails(expPerKill, {
      tolerance: 0,
      context: 'Scurge EXP amount per eligible World 7A6 kill added to account progress',
    });
    for (let index = 0; index < menagerie.scurgeSpentLevels.length; index += 1) {
      expect(menagerie.scurgeSpentLevels[index]).toMatchLiveGameWithDetails(spentLevels[index], {
        tolerance: 0,
        context: `Saved Scurge upgrade level ${index}`,
      });
    }
  });

});

