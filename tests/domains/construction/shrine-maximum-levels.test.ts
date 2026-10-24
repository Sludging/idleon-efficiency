import { initBuildingRepo } from '../../../data/domain/data/BuildingRepo';
import type { Construction } from '../../../data/domain/world-3/construction/construction';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { getExtractedValue, loadExtractionResults, validateExtractionHealth, type ExtractionResults } from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'construction-shrine-maximum-levels-data.json';
const shrines = initBuildingRepo()
  .filter(building => building.index >= 18 && building.index <= 26)
  .map(building => ({ buildingIndex: building.index, name: building.data.name }));

describe('Construction Shrine maximum levels', () => {
  let construction: Construction;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    construction = loadGameDataFromSave(saveName).get('construction') as Construction;
  });

  it.each(shrines)('applies the construction maximum-level increase for $name', ({ buildingIndex }) => {
    const building = construction.buildings[buildingIndex];
    const expected = getExtractedValue(extractionResults, `shrine_maximum_level_increase_${buildingIndex}`);

    // The native getter returns the increase, not an independent total maximum.
    expect(building.maxLvl - building.baseMaxLvl).toMatchLiveGameWithDetails(expected, {
      tolerance: 0,
      context: `${building.name} construction cap ${building.maxLvl}, generated base maximum ${building.baseMaxLvl}`,
    });
  });
});
