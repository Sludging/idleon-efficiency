import { initPoppyUpgradeRepo } from '../../../data/domain/data/PoppyUpgradeRepo';
import { Poppy } from '../../../data/domain/world-2/poppy';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
  type ExtractionResults,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'poppy-upgrade-costs-data.json';
const upgrades = initPoppyUpgradeRepo();
const bluefinCases = upgrades.filter(({ index }) => index < 12).map(({ index, data }) => ({ index, name: data.name }));
const tarpitCases = upgrades.filter(({ index }) => index >= 12).map(({ index, data }) => ({ index: index - 12, name: data.name }));

describe('Poppy individual upgrade prices', () => {
  let extractionResults: ExtractionResults;
  let poppy: Poppy;
  let bluefinPrices: number[];
  let tarpitPrices: number[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const extractedBluefinPrices = extractionResults.extractions.bluefin_upgrade_prices.result;
    const extractedTarpitPrices = extractionResults.extractions.tarpit_upgrade_prices.result;
    if (!Array.isArray(extractedBluefinPrices) || !Array.isArray(extractedTarpitPrices)) {
      throw new Error('Poppy upgrade price extractions are not numeric arrays');
    }
    bluefinPrices = extractedBluefinPrices.map(normalizeExtractedValue);
    tarpitPrices = extractedTarpitPrices.map(normalizeExtractedValue);
    poppy = loadGameDataFromSave(saveName).get('poppy') as Poppy;
  });

  it.each(bluefinCases)('matches the Bluefin price for $name', ({ index, name }) => {
    expect(poppy.getUpgradeCost(index)).toMatchLiveGameWithDetails(bluefinPrices[index], {
      tolerance: 0,
      context: `Poppy Bluefin ${name} individual purchase price`,
    });
  });

  it.each(tarpitCases)('matches the Tarpit price for $name', ({ index, name }) => {
    expect(poppy.getTarpitUpgradeCost(index)).toMatchLiveGameWithDetails(tarpitPrices[index], {
      tolerance: 0,
      context: `Poppy Tarpit ${name} individual purchase price`,
    });
  });
});