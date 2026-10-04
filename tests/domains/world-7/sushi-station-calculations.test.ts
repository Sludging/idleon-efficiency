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
  it('matches Pepper Perfecto chance for an actually occupied Sushi tier', () => {
    const tier = station.board.find(slot => slot.sushi !== undefined)?.sushi?.index;
    if (tier === undefined) throw new Error('Current save has no occupied Sushi slot for Pepper Perfecto chance comparison');
    const expected = getExtractedValue(extractionResults, 'sushi_perfecto_chance_occupied_tier');
    expect(station.getPerfectoChance(tier)).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `Pepper Perfecto chance for occupied tier ${tier}`,
    });
  });
  it('matches Salt tier-up chance for an actually occupied Sushi tier', () => {
    const tier = station.board.find(slot => slot.sushi !== undefined)?.sushi?.index;
    if (tier === undefined) throw new Error('Current save has no occupied Sushi slot for Salt tier-up chance comparison');
    const expected = getExtractedValue(extractionResults, 'sushi_salt_tier_up_chance_occupied_tier');
    expect(station.getSaltTierUpChance(tier)).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `Salt tier-up chance for occupied tier ${tier}`,
    });
  });
  compareStation('sushi_saffron_bucks_per_use', 'Bucks granted by one Saffron shaker use', () => station.getSaffronBucksPerUse());
  compareStation('sushi_shaker_fuel_per_use', "Fuel granted by a shaker use when Shake N' Bake is owned", () => station.getShakerFuelPerUse());
  compareStation('sushi_shaker_bonus_fuel_chance', "Chance for Shake N' Bake to grant bonus shaker fuel", () => station.getShakerBonusFuelChance());

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
