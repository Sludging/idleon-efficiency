/**
 * The Shim Lantern's Sailing bonus is the only calculated Shimmer dependency.
 * Compare it independently: the four-times Shimmer cap can hide a wrong bonus.
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Sailing } from '../../../data/domain/world-5/sailing/sailing';

const saveName = 'latest';
const extractionResultsName = 'island-expeditions-shimmer-bonuses-data.json';

describe('Island Expeditions Domain - Shimmer Bonuses - Parameters', () => {
 let extractionResults: ExtractionResults;
 let sailing: Sailing;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  const gameData = loadGameDataFromSave(saveName);
  sailing = gameData.get('sailing') as Sailing;
 });

 it('matches The Shim Lantern artifact bonus before the Shimmer cap', () => {
  const liveValue = getExtractedValue(extractionResults, 'shimmer_artifact_31');
  const domainValue = sailing.artifacts[31].getBonus();
  expect(domainValue).toMatchLiveGame(liveValue, 0);
 });
});
