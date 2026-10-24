import { initOrionUpgradeRepo } from '../../../data/domain/data/OrionUpgradeRepo';
import { Orion } from '../../../data/domain/world-1/orion';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
  type ExtractionResults,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'orion-upgrade-costs-data.json';
const upgradeCases = initOrionUpgradeRepo().map(({ index, data }) => ({ index, name: data.name }));

describe('Orion individual upgrade prices', () => {
  let extractionResults: ExtractionResults;
  let orion: Orion;
  let prices: number[];

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const extractedPrices = extractionResults.extractions.upgrade_prices.result;
    if (!Array.isArray(extractedPrices)) throw new Error('Orion upgrade price extraction is not a numeric array');
    prices = extractedPrices.map(normalizeExtractedValue);
    orion = loadGameDataFromSave(saveName).get('orion') as Orion;
  });

  it.each(upgradeCases)('matches the current price for $name', ({ index, name }) => {
    expect(orion.getUpgradeCost(index)).toMatchLiveGameWithDetails(prices[index], {
      tolerance: 0,
      context: `Orion ${name} individual purchase price`,
    });
  });
});