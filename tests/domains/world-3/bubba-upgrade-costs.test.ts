import { initBubbaUpgradeRepo } from '../../../data/domain/data/BubbaUpgradeRepo';
import { Bubba } from '../../../data/domain/world-3/bubba';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
  type ExtractionResults,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'bubba-upgrade-costs-data.json';
const upgradeCases = initBubbaUpgradeRepo().map(({ index, data }) => ({ index, name: data.name }));

describe('Bubba individual upgrade prices', () => {
  let extractionResults: ExtractionResults;
  let bubba: Bubba;
  let prices: number[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const extractedPrices = extractionResults.extractions.upgrade_prices.result;
    if (!Array.isArray(extractedPrices)) throw new Error('Bubba upgrade price extraction is not a numeric array');
    prices = extractedPrices.map(normalizeExtractedValue);
    bubba = loadGameDataFromSave(saveName).get('bubba') as Bubba;
  });

  it.each(upgradeCases)('matches the current price for $name', ({ index, name }) => {
    expect(bubba.getUpgradeCost(index)).toMatchLiveGameWithDetails(prices[index], {
      tolerance: 0,
      context: `Bubba ${name} individual purchase price`,
    });
  });
});