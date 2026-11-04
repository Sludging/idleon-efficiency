import { Arcade, type ArcadeGoldBallGainSources } from '../../../data/domain/world-2/arcade';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  ExtractionResults,
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'arcade-gold-ball-sources-data.json';

// These public contributions supply the source tooltip, not just the combined reward multiplier.
const sources: { field: keyof ArcadeGoldBallGainSources; label: string; description: string }[] = [
  { field: 'goldenYellowPercent', label: 'golden_yellow_percent', description: 'Golden Yellow contribution in percentage points' },
  { field: 'arcadeShopPercent', label: 'arcade_shop_percent', description: 'Arcade shop contribution in percentage points' },
  { field: 'spheresOfGoldPercent', label: 'spheres_of_gold_percent', description: 'Spheres of Gold contribution in percentage points' },
  { field: 'goldFigleafPercent', label: 'gold_figleaf_percent', description: 'Gold Figleaf contribution in percentage points' },
  { field: 'hedgehogPercent', label: 'hedgehog_percent', description: 'Hedgehog contribution in percentage points' },
];

describe('Arcade - named gold-ball reward sources', () => {
  let arcade: Arcade;
  let extractionResults: ExtractionResults;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    arcade = loadGameDataFromSave(saveName).get('arcade') as Arcade;
  });

  for (const { field, label, description } of sources) {
    it(`matches the ${description}`, () => {
      expect(arcade.getGoldBallGainSources()[field]).toMatchLiveGameWithDetails(
        getExtractedValue(extractionResults, label),
        { tolerance: 0, context: `Arcade gold-ball rewards: ${description}` },
      );
    });
  }
});
