import type { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  type ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'jelly-operator-presentation-data.json';

// These comparisons use the unchanged real save. It has an obstruction beyond
// the twelve introductory targets, unlocked Cell Biology, four unlocked cell
// types, and five purchased plots. COLD with Feverizer 1 does not cover positive SEPSIS.
const coreComparisons: Array<{
  description: string;
  extractionKey: string;
  domainValue: (jellyOperator: JellyOperator) => number;
}> = [
  {
    description: 'daily attempt allowance from the Research square level',
    extractionKey: 'jelly_daily_allowance',
    domainValue: jellyOperator => jellyOperator.dailyAllowance,
  },
  {
    description: 'current obstruction HP beyond the introductory fixed-HP targets',
    extractionKey: 'jelly_current_target_hp',
    domainValue: jellyOperator => jellyOperator.getCurrentTargetHP(),
  },
  {
    description: 'current operation time allowance for the saved obstruction group',
    extractionKey: 'jelly_current_time_limit',
    domainValue: jellyOperator => jellyOperator.getCurrentTimeLimit(),
  },
  {
    description: 'permanent Bloodcell multiplier from the best recorded DPS',
    extractionKey: 'jelly_dps_bloodcell_multiplier',
    domainValue: jellyOperator => jellyOperator.getDPSBloodcellMultiplier(),
  },
  {
    description: 'automatic daily Bloodcell income from the best operation',
    extractionKey: 'jelly_daily_bloodcells',
    domainValue: jellyOperator => jellyOperator.getDailyBloodcells(),
  },
  {
    description: 'Daily Transfusion percentage of the best operation',
    extractionKey: 'jelly_upgrade_quantity_38',
    domainValue: jellyOperator => jellyOperator.getDailyTransfusionPercentage(),
  },
  {
    description: 'XP awarded per landed hit with Cell Biology unlocked',
    extractionKey: 'jelly_xp_per_hit',
    domainValue: jellyOperator => jellyOperator.xpPerHit,
  },
  {
    description: 'released cell type unlock count from cultivation upgrades',
    extractionKey: 'jelly_unlocked_cell_count',
    domainValue: jellyOperator => jellyOperator.getUnlockedCellCount(),
  },
  {
    description: 'combined cell levels used by Cell Dialysis',
    extractionKey: 'jelly_total_cell_levels',
    domainValue: jellyOperator => jellyOperator.getTotalCellLevels(),
  },
  {
    description: 'remaining plot purchases after accounting for purchased plots',
    extractionKey: 'jelly_plot_purchases_left',
    domainValue: jellyOperator => jellyOperator.plotPurchasesLeft,
  },
  {
    description: 'Bloodcells gained per damage with all direct calculated factors',
    extractionKey: 'jelly_bloodcells_per_damage',
    domainValue: jellyOperator => jellyOperator.bloodcellGainPerDamage,
  },
  {
    description: 'SEPSIS Bloodcell percentage while the saved COLD selection leaves SEPSIS inactive',
    extractionKey: 'jelly_fever_bloodcell_bonus',
    domainValue: jellyOperator => jellyOperator.getFeverBonus(2),
  },
];

describe('Jelly Operator overview and cell calculations', () => {
  let jellyOperator: JellyOperator;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    jellyOperator = loadGameDataFromSave(saveName).get('jellyOperator') as JellyOperator;
  });

  coreComparisons.forEach(({ description, extractionKey, domainValue }) => {
    it(`matches ${description}`, () => {
      expect(domainValue(jellyOperator)).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, extractionKey),
        {
          tolerance: 0,
          context: `${description}; successful operations ${jellyOperator.getSuccessfulOperations()}, combined cell levels ${jellyOperator.getTotalCellLevels()}`,
        },
      );
    });
  });

  // Distinct real levels: a levelled starter, a lower-level later cultivation,
  // and a locked level-zero cell. Avoid duplicating Amoeba's level-20 threshold
  // with Plasmid, which has the same saved level and formula path.
  it.each([
    { index: 0, name: 'levelled starter Amoeba' },
    { index: 2, name: 'lower-level unlocked Ribosome' },
    { index: 7, name: 'locked level-zero Gigacyst' },
  ])('matches next-level XP for the $name', ({ index, name }) => {
    const cell = jellyOperator.cells.find(candidate => candidate.index === index)!;
    expect(cell.getXPRequired()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, `jelly_cell_xp_required_${index}`),
      { tolerance: 0, context: `${name}; saved cell level ${cell.level}` },
    );
  });

  it('matches both unlocked and locked released cell types in the saved progression', () => {
    expect(jellyOperator.cells.filter(cell => cell.data.passiveDescription != null).map(cell => cell.unlocked)).toEqual(
      extractionResults.extractions.jelly_cell_unlocks.result,
    );
  });

  it('matches the unlocked tile count from purchased rectangles and cleared-obstruction gates', () => {
    expect(jellyOperator.unlockedTileCount).toEqual(
      extractionResults.extractions.jelly_unlocked_tiles.result.length,
    );
  });
});
