import type { Lab } from '../../../data/domain/world-4/lab';
import type { Breeding } from '../../../data/domain/world-4/breeding';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';

const extractionResultsName = 'player-damage-lab-parameters-data.json';
const jewelExtractionResultsName = 'lab-jewel-bonus-data.json';

describe('Lab Mainframe direct parameters', () => {
  let lab: Lab;
  let breeding: Breeding;
  let mainframeResults: ExtractionResults;
  let jewelResults: ExtractionResults;

  beforeAll(() => {
    mainframeResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(mainframeResults);
    jewelResults = loadExtractionResults(jewelExtractionResultsName);
    validateExtractionHealth(jewelResults);

    const gameData = loadGameDataFromSave('latest');
    lab = gameData.get('lab') as Lab;
    breeding = gameData.get('breeding') as Breeding;
  });

  it('matches the calculated Breeding total pets found used by Mainframe 0', () => {
    expect(breeding.getTotalPetsFound()).toMatchLiveGame(
      getExtractedValue(mainframeResults, 'player_damage_breeding_tot_pets_found'),
      0,
    );
  });

  it('matches Jewel 1 used by Mainframe 0', () => {
    expect(lab.jewels[1].getBonus()).toMatchLiveGame(
      getExtractedValue(jewelResults, 'jewel_1_bonus'),
      0,
    );
  });

  it('matches Jewel 17 used by Mainframe 11', () => {
    expect(lab.jewels[17].getBonus()).toMatchLiveGame(
      getExtractedValue(jewelResults, 'jewel_17_bonus'),
      0,
    );
  });
});
