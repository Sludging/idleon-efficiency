/**
 * Research Grid Domain - generic grid bonus calculations.
 *
 * `Grid_Bonus` mode 0 is the effective bonus, mode 1 is the saved level,
 * and mode 2 is the secondary value used by specialized grid upgrades.
 *
 * The approved root is Better Button (index 125); the domain API remains
 * generic so downstream consumers can use other Research Grid bonuses.
 *
 * @testCovers ResearchGrid.getBonusForId
 * @testCovers ResearchGrid.getGridBonusAllmulti
 * @testCovers ResearchGridBonus.getBonus
 * @testCovers ResearchGridBonus.getBonusMode2
 * @testCovers SmartEyeResearchGridBonus.getBonusMode2
 * @testCovers CrownCountResearchGridBonus.getBonusMode2
 * @testCovers ObservationLevelResearchGridBonus.getBonusMode2
 * @testCovers OccurrenceCountResearchGridBonus.getBonusMode2
 * @testCovers AccountOptionResearchGridBonus.getBonusMode2
 * @testCovers GlimboTradesResearchGridBonus.getBonusMode2
 * @testCovers DivineDesignResearchGridBonus.getGridBonusAllmultiContribution
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ResearchGrid } from '../../../data/domain/world-7/research';

const saveName = 'latest';
const extractionResultsName = 'research-grid-bonus-data.json';

const gridBonusCases = [
 { index: 125, mode: 0, extractionKey: 'grid_bonus_125', description: 'Better Button base bonus' },
 { index: 31, mode: 0, extractionKey: 'grid_bonus_31', description: 'Smart Eye base bonus with shape multiplier' },
 { index: 47, mode: 0, extractionKey: 'grid_bonus_47', description: 'Sticker-it To Em base bonus with shape multiplier' },
 { index: 125, mode: 1, extractionKey: 'grid_bonus_125_mode1', description: 'Better Button level' },
 { index: 125, mode: 2, extractionKey: 'grid_bonus_125_mode2', description: 'Better Button default secondary bonus' },
 { index: 31, mode: 2, extractionKey: 'grid_bonus_31_mode2', description: 'Smart Eye secondary bonus' },
 { index: 67, mode: 2, extractionKey: 'grid_bonus_67_mode2', description: 'index 67 crown-count secondary bonus' },
 { index: 68, mode: 2, extractionKey: 'grid_bonus_68_mode2', description: 'index 68 crown-count secondary bonus' },
 { index: 107, mode: 2, extractionKey: 'grid_bonus_107_mode2', description: 'index 107 crown-count secondary bonus' },
 { index: 94, mode: 2, extractionKey: 'grid_bonus_94_mode2', description: 'index 94 observation-level secondary bonus' },
 { index: 112, mode: 2, extractionKey: 'grid_bonus_112_mode2', description: 'index 112 occurrence-count secondary bonus' },
 { index: 151, mode: 2, extractionKey: 'grid_bonus_151_mode2', description: 'index 151 account-option secondary bonus' },
 { index: 168, mode: 2, extractionKey: 'grid_bonus_168_mode2', description: 'index 168 Glimbo-trade secondary bonus' },
];

describe('Research Grid bonus calculations', () => {
 let extractionResults: ExtractionResults;
 let researchGrid: ResearchGrid;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  researchGrid = loadGameDataFromSave(saveName).get('research') as ResearchGrid;
 });

 gridBonusCases.forEach(({ index, mode, extractionKey, description }) => {
  it(`validates ${description}`, () => {
   const liveValue = getExtractedValue(extractionResults, extractionKey);
   const domainValue = researchGrid.getBonusForId(index, mode);

   expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
    tolerance: 0,
    context: `Research Grid ${description}`,
   });
  });
 });

 it('validates the Research Grid all-bonus multiplier', () => {
  const liveValue = getExtractedValue(extractionResults, 'grid_bonus_allmulti');
  const domainValue = researchGrid.getGridBonusAllmulti();

  expect(domainValue).toMatchLiveGameWithDetails(liveValue, {
   tolerance: 0,
   context: 'Research Grid all-bonus multiplier',
  });
 });

 it('returns zero for unknown grid indexes', () => {
  expect(researchGrid.getBonusForId(-1)).toBe(0);
  expect(researchGrid.getBonusForId(999)).toBe(0);
 });
});
