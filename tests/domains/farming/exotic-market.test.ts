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
  const upgradeIndices = Array.from({ length: 60 }, (_, index) => index);
  const fifthColumnIndices = [4, 9, 14, 19];

  beforeAll(() => {
    results = loadExtractionResults('farming-exotic-market-data.json');
    validateExtractionHealth(results);
    farming = loadGameDataFromSave('latest').get('farming') as Farming;
    nativeUpgrades = results.extractions.exotic_upgrade_state.result;
    expect(nativeUpgrades.map(upgrade => upgrade.index)).toEqual(upgradeIndices);
    expect(farming.exoticMarketUpgrades.map(upgrade => upgrade.index)).toEqual(upgradeIndices);
    expect(farming.landrankDatabase.upgrades
      .filter(upgrade => upgrade.fifthColumnBonus)
      .map(upgrade => upgrade.index)).toEqual(fifthColumnIndices);
  });

  it.each(upgradeIndices)('matches the native effect for Exotic Market upgrade %i', (index) => {
    const native = nativeUpgrades.find(upgrade => upgrade.index === index);
    if (!native) {
      throw new Error(`Missing native Exotic Market effect for upgrade ${index}`);
    }
    expect(farming.getExoticMarketBonusValue(index)).toMatchLiveGameWithDetails(native.bonus, {
      tolerance: 0,
      context: `Exotic Market upgrade ${index} effect`,
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

  it('matches native owned Organic Labels', () => {
    expect(farming.organicLabelsOwned).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'organic_labels_owned'), {
        tolerance: 0,
        context: 'Owned Organic Labels',
      }
    );
  });

  it('matches native available Organic Labels', () => {
    expect(farming.organicLabelsAvailable).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'organic_labels_available'), {
        tolerance: 0,
        context: 'Available Organic Labels',
      }
    );
  });

  it.each(fifthColumnIndices)('matches the native maximum level for Land Rank upgrade %i', (index) => {
    const upgrade = farming.landrankDatabase.upgrades.find(candidate => candidate.index === index)!;
    expect(upgrade.maxLevel).toMatchLiveGameWithDetails(
      getExtractedValue(results, 'land_rank_fifth_column_max'), {
        tolerance: 0,
        context: `Land Rank Database upgrade ${index} maximum level`,
      }
    );
  });

  it('matches native current weekly IDs in rolled order using saved account time', () => {
    const current = farming.getCurrentExoticMarketRotation();
    expect(current.upgradeIds).toEqual(results.extractions.exotic_native_current_ids.result);
  });
});
