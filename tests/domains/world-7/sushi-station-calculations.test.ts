import { ExtractionResults, loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'sushi-station-calculations-data.json';
// Formula evidence: docs/game-snippets/alchemy/SushiStuff.1.22.js:10-42,53-85,90-145,174-177.
// The Salt click-handler's inline tier chance is recorded in .omp/research/sushi-page-phase1.md.
describe('Sushi Station - current setup calculations', () => {
  let extractionResults: ExtractionResults;
  let station: SushiStation;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    station = loadGameDataFromSave(saveName).get('sushi') as SushiStation;
    if (!station) throw new Error('SushiStation domain not found in save data');
  });

  const compareStation = (label: string, description: string, calculate: () => number) => {
    it(`matches ${description}`, () => {
      const expected = getExtractedValue(extractionResults, label);
      expect(calculate()).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: description,
      });
    });
  };

  compareStation('sushi_fuel_per_hour', 'Fuel generated per hour by the current Sushi Station setup', () => station.getFuelPerHour());
  compareStation('sushi_fuel_capacity', 'Current Sushi Station fuel capacity', () => station.getFuelCapacity());
  compareStation('sushi_bucks_per_hour', 'Bucks generated per hour by the current Sushi Station setup', () => station.getBucksPerHour());
  compareStation('sushi_free_shaker_chance', 'Shared chance that a shaker action does not consume a use', () => station.getFreeShakerChance());

  const knowledgeCategories = [
    { category: 0, effect: 'Bucks generation' },
    { category: 1, effect: 'Knowledge XP' },
    { category: 2, effect: 'extra cooked tier chance' },
    { category: 3, effect: 'fuel capacity' },
    { category: 4, effect: 'additive fuel generation' },
    { category: 5, effect: 'free shaker chance' },
    { category: 6, effect: 'upgrade cost divisor' },
    { category: 7, effect: 'separate faster fuel generation contributions' },
    { category: 8, effect: 'slot effects' },
    { category: 9, effect: 'fireplace effects' },
    { category: 10, effect: 'Perfecto chance' },
  ];

  for (const { category, effect } of knowledgeCategories) {
    compareStation(
      `sushi_knowledge_total_${category}`,
      `raw Knowledge bonus total for ${effect}`,
      () => station.getKnowledgeBonusTotal(category),
    );
  }

  compareStation('sushi_combo_multiplier', 'effective Bucks factor from the best Combo', () => station.getComboMultiplier());

  it('matches the effective Spark factor applied to fireplace effects', () => {
    // The native branch returns percent. FireplaceEffect consumes 1 + percent / 100.
    const expected = 1 + getExtractedValue(extractionResults, 'sushi_fireplace_spark_percent') / 100;
    expect(station.getFireplaceSparkFactor()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'effective Spark factor for all fireplace effects',
    });
  });

  it('matches the effective Overtuned fuel factor applied to Bucks', () => {
    // The native branch returns percent. CurrencyperHR consumes 1 + percent / 100.
    const expected = 1 + getExtractedValue(extractionResults, 'sushi_overtuned_percent') / 100;
    expect(station.getOvertunedBucksFactor()).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: 'effective Bucks factor from banked Overtuned fuel',
    });
  });

  // The paired save has no Potassium fireplaces. Positive Spark generation remains unobserved.
  compareStation(
    'sushi_sparks_per_hour',
    'potential Sparks per hour from the actual fireplace kinds',
    () => station.getSparksPerHour(),
  );

  it('matches the next three Spark goals and their total resource requirements', () => {
    const thresholds = station.getNextSparkThresholds();
    expect(thresholds).toHaveLength(3);

    for (let index = 0; index < 3; index++) {
      const threshold = thresholds[index];
      const expected: {
        targetFactor: number;
        totalSparksRequired: number;
        nativeFactorAtThreshold: number;
      } = extractionResults.extractions.sushi_next_spark_thresholds.result[index];

      expect(threshold.targetFactor).toMatchLiveGameWithDetails(expected.targetFactor, {
        tolerance: 0,
        context: `Spark goal ${index + 1}: next effective factor`,
      });
      expect(threshold.totalSparksRequired).toMatchLiveGameWithDetails(expected.totalSparksRequired, {
        tolerance: 0,
        context: `Spark goal ${index + 1}: total Sparks required, not remaining Sparks`,
      });
      // Extraction finds this root with native log helpers, not the domain's inverse calculation.
      expect(threshold.targetFactor).toMatchLiveGameWithDetails(expected.nativeFactorAtThreshold, {
        tolerance: 0,
        context: `Spark goal ${index + 1}: native effective factor at the resource threshold`,
      });
    }
  });

  it('matches Pepper Perfecto chance for an actually occupied Sushi tier', () => {
    const tier = station.board.find(slot => slot.sushi !== undefined)?.sushi?.index;
    if (tier === undefined) throw new Error('Current save has no occupied Sushi slot for Pepper Perfecto chance comparison');
    const expected = getExtractedValue(extractionResults, 'sushi_perfecto_chance_occupied_tier');
    expect(station.getPerfectoChance(tier)).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `Pepper Perfecto chance for occupied tier ${tier}`,
    });
  });

  const upgradeCases = [
    { index: 0, displayOrder: 6, role: 'finite-cap Sushi Slot' },
    { index: 1, displayOrder: 3, role: 'effectively uncapped Fuel Capacity I' },
    { index: 20, displayOrder: 20, role: "Shake N' Bake shaker-fuel effect" },
    { index: 21, displayOrder: 29, role: 'Bottomless Shakers free-use effect' },
    { index: 22, displayOrder: 36, role: 'Sasaphrax Saffron effect' },
  ];

  for (const { index, displayOrder, role } of upgradeCases) {
    it(`matches ${role} quantity using record identity`, () => {
      const expected = getExtractedValue(extractionResults, `sushi_upgrade_qty_${index}`);
      const upgrade = station.upgrades.find(candidate => candidate.index === index);
      if (!upgrade) throw new Error(`Sushi Station upgrade record ${index} not found`);
      expect(upgrade.getBonus()).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `${role} quantity (record ${index})`,
      });
    });

    it(`matches ${role} next cost using display position`, () => {
      const expected = getExtractedValue(extractionResults, `sushi_upgrade_cost_display_${displayOrder}`);
      const upgrade = station.upgrades.find(candidate => candidate.index === index);
      if (!upgrade) throw new Error(`Sushi Station upgrade record ${index} not found`);
      expect(upgrade.getCost()).toMatchLiveGameWithDetails(expected, {
        tolerance: 0,
        context: `${role} next cost (display position ${displayOrder}, record ${index})`,
      });
    });
  }
});
