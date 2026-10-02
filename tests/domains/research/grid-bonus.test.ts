/**
 * Research Grid Domain - generic grid bonus calculations.
 *
 * `Grid_Bonus` mode 0 is the effective bonus, mode 1 is the saved level,
 * and mode 2 is the secondary value used by specialized grid upgrades.
 *
 * The approved root is Better Button (index 125); the domain API remains
 * generic so downstream consumers can use other Research Grid bonuses.
 *
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
 { index: 31, mode: 2, extractionKey: 'grid_bonus_31_mode2', description: 'Smart Eye secondary bonus' },
 { index: 67, mode: 2, extractionKey: 'grid_bonus_67_mode2', description: 'Sticky Crown secondary bonus scaled by crown count' },
 { index: 68, mode: 2, extractionKey: 'grid_bonus_68_mode2', description: 'Boony Crown secondary bonus scaled by crown count' },
 { index: 107, mode: 2, extractionKey: 'grid_bonus_107_mode2', description: 'Palettable Crown secondary bonus scaled by crown count' },
 { index: 94, mode: 2, extractionKey: 'grid_bonus_94_mode2', description: 'Observation insight experience scaled by total observation levels' },
 { index: 112, mode: 2, extractionKey: 'grid_bonus_112_mode2', description: "See 'Em All Research EXP per unlocked observation" },
 { index: 151, mode: 2, extractionKey: 'grid_bonus_151_mode2', description: 'Spelunking Research mode-2 POW bonus' },
 { index: 168, mode: 2, extractionKey: 'grid_bonus_168_mode2', description: 'Glimbo Insider Trading Secrets bonus per 100 trades' },
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

});
