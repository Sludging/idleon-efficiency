import { Farming } from '../../../data/domain/world-6/farming';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Farming Domain - Exotic Market Plump Database', () => {
  let extractionResults: ExtractionResults;
  let gameData: Map<string, any>;

  beforeAll(() => {
    extractionResults = loadExtractionResults('farming-land-rank-data.json');
    validateExtractionHealth(extractionResults);
    gameData = loadGameDataFromSave('latest');
  });

  it('validates the Plump Database percentage boost to Land Rank bonuses', () => {
    const farming = gameData.get('farming') as Farming;
    const liveValue = getExtractedValue(extractionResults, 'plump_database_bonus');
    // Plump Database uses only its parsed upgrade level and generated diminishing-curve metadata.
    const domainValue = farming.getExoticMarketBonusValue(14);

    expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
      tolerance: 0,
      context: 'Plump Database percentage boost to Land Rank Database bonuses',
    });
  });
});

type NativeUpgradeState = {
  index: number;
  level: number;
  isOrganic: boolean;
  bonus: number;
};

describe('Farming Exotic Market account results', () => {
  let farming: Farming;
  let results: ExtractionResults;
  let nativeUpgrades: NativeUpgradeState[];

  beforeAll(() => {
    results = loadExtractionResults('farming-exotic-market-data.json');
    validateExtractionHealth(results);
    farming = loadGameDataFromSave('latest').get('farming') as Farming;
    nativeUpgrades = results.extractions.exotic_upgrade_state.result;
  });

  // These retained rows cover purchased and unpurchased diminishing effects,
  // a positive linear effect, and Freexotic without Organic Labels.
  it.each([
    [0, 'purchased diminishing effect'],
    [6, 'zero-level diminishing effect'],
    [41, 'positive linear effect'],
    [39, 'Freexotic effect'],
  ] as const)('%i: matches the native %s', (index, description) => {
    const native = nativeUpgrades.find(upgrade => upgrade.index === index)!;
    expect(farming.getExoticMarketBonusValue(index)).toMatchLiveGameWithDetails(native.bonus, {
      tolerance: 0,
      context: `Exotic Market upgrade ${index}: ${description}`,
      debugInfo: { level: native.level, isOrganic: native.isOrganic },
    });
  });

  it('matches every displayed upgrade level from the retained account', () => {
    expect(farming.exoticMarketUpgrades.map(upgrade => ({ index: upgrade.index, level: upgrade.level }))).toEqual(
      nativeUpgrades.map(upgrade => ({ index: upgrade.index, level: upgrade.level }))
    );
  });

  it('matches Organic Label membership for every displayed upgrade', () => {
    expect(farming.exoticMarketUpgrades.map(upgrade => ({ index: upgrade.index, isOrganic: upgrade.isOrganic }))).toEqual(
      nativeUpgrades.map(upgrade => ({ index: upgrade.index, isOrganic: upgrade.isOrganic }))
    );
  });

  it('matches native current weekly IDs in rolled order using saved account time', () => {
    const current = farming.getCurrentExoticMarketRotation();
    expect(current.upgradeIds).toEqual(results.extractions.exotic_native_current_ids.result);
  });

  it('matches the next saved-week change timestamp in Unix milliseconds', () => {
    expect(farming.getNextExoticMarketRotationTime()).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'exotic_next_rotation_time_ms'), {
        tolerance: 0,
        context: 'Next Exotic Market rotation timestamp from saved GlobalTime',
      }
    );
  });
});
