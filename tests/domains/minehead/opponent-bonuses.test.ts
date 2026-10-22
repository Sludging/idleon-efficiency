/** Compares Minehead opponent rewards and previews with native catalog outputs. */

import { initMineheadOpponentRepo } from '../../../data/domain/data/MineheadOpponentRepo';
import { Minehead, MineheadOpponent } from '../../../data/domain/world-7/minehead';
import {
  ExtractionResults,
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';

const saveName = 'latest';
const extractionResultsName = 'minehead-data.json';
const earnedRewardIndices = [0, 12, 13, 21, 31] as const;
const previewRewardIndices = [21, 31] as const;
const opponentNames = new Map(
  initMineheadOpponentRepo().map(({ index, data }) => [index, data.name]),
);

const getOpponent = (minehead: Minehead, index: number): MineheadOpponent => {
  const opponent = minehead.opponents.find(candidate => candidate.index === index);
  if (!opponent) {
    throw new Error(`Minehead opponent ${index} is not present in the initialized domain`);
  }
  return opponent;
};

const getOpponentName = (index: number): string => {
  const name = opponentNames.get(index);
  if (!name) {
    throw new Error(`Minehead opponent ${index} is not present in the native catalog`);
  }
  return name;
};

describe('Minehead opponent rewards', () => {
  let extractionResults: ExtractionResults;
  let minehead: Minehead;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    minehead = loadGameDataFromSave(saveName).get('minehead') as Minehead;
  });

  earnedRewardIndices.forEach(index => {
    it(`matches native earned reward for ${getOpponentName(index)}`, () => {
      const opponent = getOpponent(minehead, index);
      const nativeValue = normalizeExtractedValue(
        extractionResults.extractions.minehead_opponent_bonuses.result[index],
      );
      expect(minehead.getBonusFromIndex(index)).toMatchLiveGameWithDetails(nativeValue, {
        tolerance: 0,
        context: `Minehead earned reward for ${opponent.data.name} (progression index ${index})`,
      });
    });
  });

  previewRewardIndices.forEach(index => {
    it(`matches native preview reward for ${getOpponentName(index)}`, () => {
      const opponent = getOpponent(minehead, index);
      const nativeValue = normalizeExtractedValue(
        extractionResults.extractions.minehead_opponent_preview_bonuses.result[index],
      );
      expect(opponent.getBaseBonus()).toMatchLiveGameWithDetails(nativeValue, {
        tolerance: 0,
        context: `Minehead preview reward for ${opponent.data.name} (progression index ${index})`,
      });
    });
  });
});
