import { loadExtractionResults, getExtractedValue, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Equinox } from '../../../data/domain/equinox';

// TODO: Make it possible to test multiple save / extraction results.
const saveName = 'latest';
const extractionResultsName = 'equinox-rate-data.json';

describe('Equinox Domain - Rate', () => {
  let extractionResults: any;
  let gameData: Map<string, any>;
  let equinox: Equinox;
  
  beforeAll(() => {
    // Load live game extraction results
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    
    // Load matching save data - MUST correspond to the same game state as extraction
    try {
      gameData = loadGameDataFromSave(saveName);
      
      // Get fully configured equinox domain
      equinox = gameData.get('equinox') as Equinox;
      if (!equinox) {
        throw new Error('Equinox domain not found in save data');
      }
      
    } catch (error: any) {
      throw new Error(`❌ Failed to load save data: ${error.message}`);
    }
  });

  describe('Bar Fill Rate Test', () => {
    it('validates bar fill rate calculation against live game', () => {
      // Get live game final result
      const liveBarFillRate = getExtractedValue(extractionResults, 'equinox_bar_rate');
      
      
      // Get our calculated bar fill rate
      const domainResult = equinox.bar.rate;
      
      // Use custom matcher with detailed logging
      const ratio = domainResult / liveBarFillRate;
      expect(domainResult).toMatchLiveGameWithDetails(liveBarFillRate, {
        tolerance: 0.01,
        context: 'Equinox bar fill rate calculation',
      });
    });
  });
});
