import type { Lab } from '../../../data/domain/world-4/lab';
import type { Breeding } from '../../../data/domain/world-4/breeding';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';

describe('Lab native MainframeBonus owner calculations', () => {
  let lab: Lab;
  let breeding: Breeding;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults('player-damage-lab-parameters-data.json');
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave('latest');
    breeding = gameData.get('breeding') as Breeding;
    lab = gameData.get('lab') as Lab;
  });

  it('matches the native Breeding pet-world boundary from the account option', () => {
    expect(breeding.petWorldCount).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'player_damage_breeding_world_bound'),
      { tolerance: 0, context: 'Breeding pet-world boundary' },
    );
  });

  it('matches native Breeding("TotPetsFound") through the typed owner', () => {
    expect(breeding.getTotalPetsFound()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'player_damage_breeding_tot_pets_found'),
      { tolerance: 0, context: 'Breeding TotPetsFound owner formula' },
    );
  });

  it('matches native MainframeBonus(0) through the typed owner', () => {
    expect(lab.bonuses.find(bonus => bonus.index === 0)!.getBonus()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'player_damage_lab_mainframe_0'),
      { tolerance: 0, context: 'Lab MainframeBonus(0) owner formula' },
    );
  });

  it('matches native MainframeBonus(11) through the typed owner', () => {
    expect(lab.bonuses.find(bonus => bonus.index === 11)!.getBonus()).toMatchLiveGameWithDetails(
      getExtractedValue(extractionResults, 'player_damage_lab_mainframe_11'),
      { tolerance: 0, context: 'Lab MainframeBonus(11) owner formula' },
    );
  });
});
