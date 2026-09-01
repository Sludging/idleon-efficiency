/**
 * These tests validate the direct inputs that compose Grid_Bonus_Allmulti.
 * The aggregate multiplier itself belongs to the core calculation test.
 */
import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Companion, getCompanionBonus } from '../../../data/domain/companions';
import { Equinox, getCloudBonus } from '../../../data/domain/world-3/equinox';
import { SushiStation } from '../../../data/domain/world-7/sushi';

const saveName = 'latest';
const extractionResultsName = 'research-grid-bonus-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 companion_bonus_55: {
  description: 'Companion bonus that increases all Research Grid bonuses',
  extractionKey: 'companion_bonus_55',
  domainExtractor: (gameData) => {
   return getCompanionBonus(gameData.get('companions') as Companion[], 55);
  }
 },
 companion_bonus_0: {
  description: 'King Doot Research dependency bonus',
  extractionKey: 'companion_bonus_0',
  domainExtractor: (gameData) => {
   return getCompanionBonus(gameData.get('companions') as Companion[], 0);
  }
 },
 cloud_bonus_71: {
  description: 'Equinox cloud bonus 71',
  extractionKey: 'cloud_bonus_71',
  domainExtractor: (gameData) => {
   return getCloudBonus(gameData.get('equinox') as Equinox, 71);
  }
 },
 cloud_bonus_72: {
  description: 'Equinox cloud bonus 72',
  extractionKey: 'cloud_bonus_72',
  domainExtractor: (gameData) => {
   return getCloudBonus(gameData.get('equinox') as Equinox, 72);
  }
 },
 cloud_bonus_76: {
  description: 'Equinox cloud bonus 76',
  extractionKey: 'cloud_bonus_76',
  domainExtractor: (gameData) => {
   return getCloudBonus(gameData.get('equinox') as Equinox, 76);
  }
 },
 sushi_bonus_53: {
  description: 'Sushi bonus that increases all Research Grid bonuses',
  extractionKey: 'sushi_bonus_53',
  domainExtractor: (gameData) => {
   return (gameData.get('sushi') as SushiStation).getBonusFromIndex(53);
  }
 }
};

describe('Research Grid - Parameters', () => {
 let extractionResults: any;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(parameterSpecs).forEach(([_, spec]) => {
  it(`validates ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);
   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
