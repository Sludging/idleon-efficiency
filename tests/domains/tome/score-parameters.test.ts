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
import { Dungeons } from '../../../data/domain/dungeons';
import { Farming } from '../../../data/domain/world-6/farming';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const saveName = 'latest';
const extractionResultsName = 'tome-score-data.json';

const parameterSpecs: Record<string, ParameterTestSpec> = {
 dungeonRank: {
  description: 'Dungeon rank used in Tome score line 17',
  extractionKey: 'tome_producer_17_dungeon_rank',
  domainExtractor: (gameData) => (gameData.get('dungeons') as Dungeons).rank,
 },
 farmingTotalStickers: {
  description: 'Farming sticker collection total used for Tome score',
  extractionKey: 'tome_producer_112_total_stickers',
  domainExtractor: (gameData) => (gameData.get('farming') as Farming).getTotalStickers(),
 },
 royalStatueLevels: {
  description: 'Total Royal Guardian Statue levels used in Tome score',
  extractionKey: 'tome_producer_118_royalg_0_sum',
  domainExtractor: (gameData) => (gameData.get('royalArmory') as RoyalArmory).getTotalRoyalStatueLevels(),
 },
 royalOutpostsBuilt: {
  description: 'Royal Guardian outposts built used in Tome score',
  extractionKey: 'tome_producer_119_royalg_total_stats_4',
  domainExtractor: (gameData) => (gameData.get('royalArmory') as RoyalArmory).builtOutpostCount,
 },
 royalResourceGrade: {
  description: 'Royal Armory Resource Grade used in Tome score line 120',
  extractionKey: 'tome_producer_120_royalg_total_stats_0',
  domainExtractor: (gameData) => (gameData.get('royalArmory') as RoyalArmory).totalResourceGrade,
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
