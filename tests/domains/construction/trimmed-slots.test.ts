import type { Construction } from '../../../data/domain/world-3/construction/construction';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

describe('Construction trimmed slots', () => {
  it('matches the native slot count, contributions, and occupied assignments', () => {
    const results = loadExtractionResults('construction-trimmed-slots-data.json');
    validateExtractionHealth(results);
    const construction = loadGameDataFromSave('latest').get('construction') as Construction;
    const count = getExtractedValue(results, 'trimmed_slot_count');
    const slots = results.extractions.building_slot_assignments.result as number[];
    const levels = results.extractions.building_levels.result as number[];

    expect(construction.trimmedSlotCount).toMatchLiveGameWithDetails(count, { tolerance: 0, context: 'Trimmed slot count' });
    const sources = construction.trimmedSlotContributions;
    expect(sources.minehead).toBe(Math.min(1, getExtractedValue(results, 'trimmed_slot_minehead')));
    expect(sources.lab).toBe(Math.ceil(getExtractedValue(results, 'trimmed_slot_lab') / 5));
    expect(sources.atom).toBe(Math.min(1, getExtractedValue(results, 'trimmed_slot_atom')));
    expect(sources.legendTalent).toBe(Math.min(1, getExtractedValue(results, 'trimmed_slot_legend')));
    expect(sources.gambit).toBe(getExtractedValue(results, 'trimmed_slot_gambit'));
    expect(sources.eventShop).toBe(getExtractedValue(results, 'trimmed_slot_event'));
    expect(construction.buildingSlots).toEqual(slots);
    construction.buildings.forEach(building => {
      expect(building.unlocked).toBe(building.index % 9 === 0 || levels[building.index - 1] > 0);
      expect(building.currentlyTrimmed).toBe(slots.slice(0, count).includes(building.index));
    });
  });
});
