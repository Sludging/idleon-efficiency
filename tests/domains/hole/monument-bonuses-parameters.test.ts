/**
 * Hole Domain - Monument bonus parameters
 *
 * Validates the calculated inputs shared by the Bravery, Justice, and Wisdom
 * monument bonuses.
 */

import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';
import { Hole } from '../../../data/domain/world-5/hole/hole';

const saveName = 'latest';
const extractionResultsName = 'hole-monument-bonuses-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 fountainBraveryBonus: {
  description: 'Fountain total bonus for Bravery monument',
  extractionKey: 'fountain_total_bonus_0_13',
  domainExtractor: (gameData) => {
   const hole = gameData.get('hole') as Hole;
   return hole.getFountainBonus(0, 13);
  }
 },

 fountainJusticeBonus: {
  description: 'Fountain total bonus for Justice monument',
  extractionKey: 'fountain_total_bonus_1_13',
  domainExtractor: (gameData) => {
   const hole = gameData.get('hole') as Hole;
   return hole.getFountainBonus(1, 13);
  }
 },

 fountainWisdomBonus: {
  description: 'Fountain total bonus for Wisdom monument',
  extractionKey: 'fountain_total_bonus_2_13',
  domainExtractor: (gameData) => {
   const hole = gameData.get('hole') as Hole;
   return hole.getFountainBonus(2, 13);
  }
 },

 monumentalVibesBonus: {
  description: 'Monumental Vibes Cosmo bonus',
  extractionKey: 'cosmo_bonus_qty_0_0',
  domainExtractor: (gameData) => {
   const hole = gameData.get('hole') as Hole;
   return hole.majiks.HoleUpgrades.find(upgrade => upgrade.index == 0)?.getBonus() ?? 0;
  }
 }
};

describe('Hole Domain - Monument bonuses - Parameters', () => {
 let extractionResults: ExtractionResults;
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
