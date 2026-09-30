/**
 * Tome score parameter validation.
 *
 * Tests the producer calculations consumed by Tome score lines against live game data.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Farming } from '../../../data/domain/world-6/farming';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';
import { Minehead } from '../../../data/domain/world-7/minehead';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'tome-score-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 farmingTotalStickers: {
  description: 'Farming stickers producer',
  extractionKey: 'tome_producer_112_total_stickers',
  domainExtractor: (gameData) => (gameData.get('farming') as Farming).getTotalStickers(),
 },
 mineheadOpponentsDefeated: {
  description: 'Minehead opponents defeated producer',
  extractionKey: 'tome_producer_110_research_7_4',
  domainExtractor: (gameData) => (gameData.get('minehead') as Minehead).getOpponentsDefeated(),
 },
 royalStatueLevels: {
  description: 'RoyalG statue-level producer',
  extractionKey: 'tome_producer_118_royalg_0_sum',
  domainExtractor: (gameData) => (gameData.get('royalArmory') as RoyalArmory).getTotalRoyalStatueLevels(),
 },
 royalOutpostsBuilt: {
  description: 'RoyalG outpost producer',
  extractionKey: 'tome_producer_119_royalg_total_stats_4',
  domainExtractor: (gameData) => (gameData.get('royalArmory') as RoyalArmory).getTotalStat(4),
 },
 royalResourceGrade: {
  description: 'RoyalG resource-grade producer',
  extractionKey: 'tome_producer_120_royalg_total_stats_0',
  domainExtractor: (gameData) => (gameData.get('royalArmory') as RoyalArmory).getTotalStat(0),
 },
};

describe('Tome Domain - Score - Parameters', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
 });

 Object.entries(parameterSpecs).forEach(([_, spec]) => {
  it(`matches the ${spec.description}`, () => {
   const liveValue = getExtractedValue(extractionResults, spec.extractionKey);
   const domainValue = spec.domainExtractor(gameData);

   expect(domainValue).toMatchLiveGame(liveValue, 0);
  });
 });
});
