import { Alchemy, Bubble, DailyBubbleProgression } from '../../../data/domain/world-2/alchemy/alchemy';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';
import type { Player } from '../../../data/domain/player';

const bubbleIds = (bubbles: readonly Bubble[]): number[] =>
  bubbles.map(bubble => 1000 * bubble.cauldronIndex + bubble.bubbleIndex).sort((a, b) => a - b);

describe('Alchemy daily bubble progression', () => {
  const results = loadExtractionResults('alchemy-daily-bubble-progression-data.json');
  let progression: DailyBubbleProgression;
  let alchemy: Alchemy;
  let players: Player[];

  beforeAll(() => {
    validateExtractionHealth(results);
    const data = loadGameDataFromSave('latest');
    alchemy = data.get('alchemy') as Alchemy;
    players = data.get('players') as Player[];
    progression = alchemy.getDailyBubbleProgression(getTargetPlayer(players));
  });

  it('reports whether automatic bubble upgrades are active', () => {
    expect(Number(progression.enabled)).toMatchLiveGameWithDetails(getExtractedValue(results, 'nblb_enabled'), {
      tolerance: 0, context: 'Automatic bubble upgrades active',
    });
  });

  it('reports the displayed number of daily bubble upgrades', () => {
    expect(progression.upgradeCount).toMatchLiveGameWithDetails(getExtractedValue(results, 'nblb_upgrade_count'), {
      tolerance: 0, context: 'Daily bubble upgrade count',
    });
  });

  it('reports the displayed minimum and maximum level gains', () => {
    expect(progression.minLevelGain).toMatchLiveGameWithDetails(getExtractedValue(results, 'nblb_min_levels'), {
      tolerance: 0, context: 'Minimum daily bubble level gain',
    });
    expect(progression.maxLevelGain).toMatchLiveGameWithDetails(getExtractedValue(results, 'nblb_max_levels'), {
      tolerance: 0, context: 'Maximum daily bubble level gain',
    });
  });

  it('reports the native daily upgrade source inputs', () => {
    const sources = progression.sources;
    const comparisons: Array<[number, string]> = [
      [sources.mainframe, 'nblb_mainframe'],
      [sources.pyrite, 'nblb_pyrite'],
      [sources.amberiteBase, 'nblb_amberite_base'],
      [sources.amberiteTier, 'nblb_amberite_tier'],
      [sources.merit, 'nblb_merit'],
      [sources.superbit4, 'nblb_superbit_4'],
      [sources.superbit22, 'nblb_superbit_22'],
    ];
    comparisons.forEach(([value, key]) => {
      expect(value).toMatchLiveGameWithDetails(getExtractedValue(results, key), {
        tolerance: 0, context: key,
      });
    });
    const mainframe = getExtractedValue(results, 'nblb_mainframe');
    const pyrite = getExtractedValue(results, 'nblb_pyrite');
    const baseMainframe = Math.min(2, Math.max(0, mainframe - (mainframe > 0.5 ? pyrite : 0)));
    expect(sources.mainframeCount).toMatchLiveGameWithDetails(baseMainframe, {
      tolerance: 0, context: 'Mainframe contribution within the count cap',
    });
    expect(sources.pyriteCount).toMatchLiveGameWithDetails(Math.max(0, Math.min(2, mainframe) - baseMainframe), {
      tolerance: 0, context: 'Pyrite contribution within the count cap',
    });
    expect(sources.superbit4Chance).toMatchLiveGameWithDetails(0.2 * getExtractedValue(results, 'nblb_superbit_4'), {
      tolerance: 0, context: 'First Superbit fraction',
    });
    expect(sources.superbit22Chance).toMatchLiveGameWithDetails(0.3 * getExtractedValue(results, 'nblb_superbit_22'), {
      tolerance: 0, context: 'Second Superbit fraction',
    });
    expect(sources.superbitCount).toMatchLiveGameWithDetails(Math.floor(
      0.2 * getExtractedValue(results, 'nblb_superbit_4') + 0.3 * getExtractedValue(results, 'nblb_superbit_22'),
    ), { tolerance: 0, context: 'Displayed Superbit contribution' });
  });

  it('reports potential rewards for daily bubble contributors', () => {
    const sources = progression.sources;
    const mainframe = getExtractedValue(results, 'nblb_mainframe_connected_base');
    const pyrite = getExtractedValue(results, 'nblb_pyrite_potential');
    const mainframeCount = Math.min(2, Math.max(0, mainframe));
    const mainframeLevel = Math.round(Math.max(1, mainframe - 1));

    expect(sources.potentialMainframeCount).toMatchLiveGameWithDetails(mainframeCount, {
      tolerance: 0, context: 'Connected mainframe count contribution',
    });
    expect(sources.potentialMainframeLevelGain).toMatchLiveGameWithDetails(mainframeLevel - 1, {
      tolerance: 0, context: 'Connected mainframe level contribution',
    });
    expect(sources.potentialPyrite).toMatchLiveGameWithDetails(pyrite, {
      tolerance: 0, context: 'Connected Pyrite Lab bonus',
    });
    expect(sources.potentialPyriteCount).toMatchLiveGameWithDetails(
      Math.max(0, Math.min(2, mainframe + pyrite) - mainframeCount),
      { tolerance: 0, context: 'Connected Pyrite count contribution' },
    );
    expect(sources.potentialPyriteLevelGain).toMatchLiveGameWithDetails(
      Math.round(Math.max(1, mainframe + pyrite - 1)) - mainframeLevel,
      { tolerance: 0, context: 'Connected Pyrite level contribution' },
    );
    expect(sources.potentialAmberiteBase * Number(sources.amberiteOwned)).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'nblb_amberite_base'), { tolerance: 0, context: 'Amberite base reward' },
    );
    expect(sources.potentialAmberiteBase).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'nblb_amberite_potential_base'), { tolerance: 0, context: 'Amberite base potential' },
    );
    expect(sources.potentialAmberiteTier).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'nblb_amberite_potential_ancient'), { tolerance: 0, context: 'Ancient Amberite potential' },
    );
    expect(sources.potentialMerit * sources.merit).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'nblb_merit'), { tolerance: 0, context: 'World 4 merit reward per level' },
    );
    expect(sources.potentialSuperbit4Chance * sources.superbit4).toMatchLiveGameWithDetails(
      0.2 * getExtractedValue(results, 'nblb_superbit_4'), { tolerance: 0, context: 'First Superbit potential' },
    );
    expect(sources.potentialSuperbit22Chance * sources.superbit22).toMatchLiveGameWithDetails(
      0.3 * getExtractedValue(results, 'nblb_superbit_22'), { tolerance: 0, context: 'Second Superbit potential' },
    );
  });

  it('attributes the displayed level range to the mainframe and Pyrite', () => {
    const sources = progression.sources;
    const nativeMainframe = getExtractedValue(results, 'nblb_mainframe');
    const nativePyrite = getExtractedValue(results, 'nblb_pyrite');
    const withoutPyrite = nativeMainframe - (nativeMainframe > 0.5 ? nativePyrite : 0);
    const mainframeMinimum = Math.round(Math.max(1, withoutPyrite - 1));
    const nativeMinimum = getExtractedValue(results, 'nblb_min_levels');

    expect(sources.mainframeLevelGain).toMatchLiveGameWithDetails(mainframeMinimum - 1, {
      tolerance: 0, context: 'Mainframe contribution after minimum and rounding',
    });
    expect(sources.pyriteLevelGain).toMatchLiveGameWithDetails(nativeMinimum - mainframeMinimum, {
      tolerance: 0, context: 'Pyrite marginal contribution after minimum and rounding',
    });
    expect(1 + sources.mainframeLevelGain + sources.pyriteLevelGain).toMatchLiveGameWithDetails(nativeMinimum, {
      tolerance: 0, context: 'Displayed minimum reconciled from sources',
    });
    const maximum = 2 + sources.mainframeLevelGain + sources.pyriteLevelGain
      + (sources.bundle ? 3 : 0) + (sources.bundle && nativeMainframe > 0.5 ? 1 : 0)
      + (sources.event ? 2 : 0) + (sources.tachyon ? 3 : 0);
    expect(maximum).toMatchLiveGameWithDetails(getExtractedValue(results, 'nblb_max_levels'), {
      tolerance: 0, context: 'Displayed maximum reconciled from sources',
    });
  });

  it('selects baseline daily bubble targets from the current saved levels', () => {
    const nativeTargets: number[] | null = results.extractions.nblb_normal_targets.result;
    const expected = nativeTargets === null ? [] : nativeTargets;
    expect(bubbleIds(progression.normalTargets)).toEqual(expected.slice().sort((a, b) => a - b));
    const flagged = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).filter(bubble => bubble.labUpgrade);
    expect(bubbleIds(flagged)).toEqual(expected.slice().sort((a, b) => a - b));
  });

  it('reports Kattlekruk activation and eligible bubbles', () => {
    expect(Number(progression.krukActive)).toMatchLiveGameWithDetails(getExtractedValue(results, 'kruk_active'), {
      tolerance: 0, context: 'Kattlekruk major blessing active',
    });
    const nativeTargets: number[] | null = results.extractions.kruk_targets.result;
    const expected = nativeTargets === null ? [] : nativeTargets;
    expect(bubbleIds(progression.krukTargets)).toEqual(expected.slice().sort((a, b) => a - b));
  });

  it('prepares the best displayed account range and recipient-dependent Kruk eligibility', () => {
    const account = alchemy.dailyBubbleProgression;
    expect(account).not.toBeNull();
    const recipients = players.map(player => alchemy.getDailyBubbleProgression(player));
    expect(account!.maxLevelGain).toBe(Math.max(...recipients.map(recipient => recipient.maxLevelGain)));
    expect(account!.maxLevelGainVaries).toBe(recipients.some(recipient => recipient.maxLevelGain !== recipients[0].maxLevelGain));
    expect(account!.krukActive).toBe(recipients.some(recipient => recipient.krukActive));
    expect(account!.krukActiveVaries).toBe(recipients.some(recipient => recipient.krukActive !== recipients[0].krukActive));
    expect(account!.enabled).toBe(progression.enabled);
    expect(account!.upgradeCount).toBe(progression.upgradeCount);
    expect(account!.minLevelGain).toBe(progression.minLevelGain);
    expect(bubbleIds(account!.normalTargets)).toEqual(bubbleIds(progression.normalTargets));
    const krukRecipient = recipients.find(recipient => recipient.krukActive);
    expect(bubbleIds(account!.krukTargets)).toEqual(bubbleIds(krukRecipient?.krukTargets ?? []));
  });
});
