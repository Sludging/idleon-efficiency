/**
 * Tome score calculation tests.
 *
 */

import {
 ExtractionResults,
 getExtractedValue,
 loadExtractionResults,
 validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Tome, TomeLine } from '../../../data/domain/world-4/tome';
import tomeScoreConfig from '../../configs/tome-score.json';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';

const { getSelectedAccountDataset } = require('../../helpers/account-dataset.cjs') as {
 getSelectedAccountDataset: () => { manifest: { preparationPlayerIndex: number } } | null;
};
const saveName = 'latest';
const extractionResultsName = 'tome-score-data.json';
const capturedPlayerIndex = getSelectedAccountDataset()?.manifest.preparationPlayerIndex ?? TARGET_PLAYER_INDEX;
const tomeLineIndices = tomeScoreConfig.extractions
 .filter((extraction) => /^tome_pts_\d+$/.test(extraction.label))
 .map((extraction) => Number(extraction.label.replace('tome_pts_', '')));
const tomeLineDescriptions: Record<string, string> = Object.fromEntries(
 tomeScoreConfig.extractions
  .filter((extraction) => extraction.label.startsWith('tome_pts_'))
  .map((extraction) => [extraction.label, extraction.description]),
);

const getTomeLineDescription = (index: number): string =>
 tomeLineDescriptions[`tome_pts_${index}`] ?? `Tome line ${index}`;
// The game caches Tome quantities for the preparation player, even after switching to the target player.
// Allow up to 1% relative drift; anything larger requires manual intervention.
const TOME_SCORE_DRIFT_TOLERANCE = 0.01;

const getTomeLine = (tome: Tome, index: number): TomeLine => {
 const line = tome.lines.find((candidate) => candidate.index === index);
 if (!line) {
  throw new Error(`Tome line ${index} not found`);
 }
 return line;
};

describe('Tome Domain - Score', () => {
 let extractionResults: ExtractionResults;
 let tome: Tome;
 let gameData: Map<string, any>;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  tome = gameData.get('tome') as Tome;

  if (!tome) {
   throw new Error('Tome domain not found in save data');
  }
 });


 tomeLineIndices.forEach((index) => {
  it(`${getTomeLineDescription(index)}`, () => {
   const line = getTomeLine(tome, index);
   const liveScore = getExtractedValue(extractionResults, `tome_pts_${index}`);
   const description = getTomeLineDescription(index);

   expect(line.getPlayerScore(capturedPlayerIndex)).toMatchLiveGameWithDetails(liveScore, {
    tolerance: TOME_SCORE_DRIFT_TOLERANCE,
    context: `Tome ${description} score (captured player ${capturedPlayerIndex})`,
   });
  });

 });
 it('returns zero multiplier and score for every locked line', () => {
  tome.lines
   .filter((line) => !line.unlocked)
   .forEach((line) => {
    expect(line.getLineMultiplyer(capturedPlayerIndex)).toBe(0);
    expect(line.getPlayerScore(capturedPlayerIndex)).toBe(0);
   });
 });
});
