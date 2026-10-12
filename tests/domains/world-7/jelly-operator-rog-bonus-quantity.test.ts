/**
 * Jelly Operator RoG bonus quantity comparisons against paired game extraction.
 * The successful-operation count is raw account state, not another domain calculation dependency.
 */
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import {
  getExtractedValue,
  loadExtractionResults,
  validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';

const saveName = 'latest';
const extractionResultsName = 'jelly-operator-rog-bonus-quantity-data.json';

describe('Jelly Operator - RoG bonus quantity', () => {
  let extractionResults: ExtractionResults;
  let jellyOperator: JellyOperator;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    jellyOperator = gameData.get('jellyOperator') as JellyOperator;

    if (!jellyOperator) {
      throw new Error('JellyOperator domain not found in save data');
    }
  });

  const getRoGBonusQuantity = (index: number, preview = false): number => {
    const calculation = (jellyOperator as JellyOperator & {
      getRoGBonusQuantity?: (index: number, preview?: boolean) => number;
    }).getRoGBonusQuantity;

    if (typeof calculation !== 'function') {
      throw new Error(
        'Missing selected calculation JellyOperator.getRoGBonusQuantity(index: number, preview = false): number for game call JellyOperation("RoG_BonusQTY", index, preview ? 99 : 0).',
      );
    }

    return calculation.call(jellyOperator, index, preview);
  };

  const expectGameMatch = (
    label: string,
    index: number,
    preview: boolean,
    context: string,
  ) => {
    const gameValue = getExtractedValue(extractionResults, label);

    expect(getRoGBonusQuantity(index, preview)).toMatchLiveGameWithDetails(gameValue, {
      tolerance: 0,
      context,
    });
  };

  it('uses the enabled normal result when successful operations exceed index 8', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_8_normal',
      8,
      false,
      'Normal Jelly RoG bonus quantity at index 8 after the account progression gate opens',
    );
  });

  it('keeps the normal result locked when successful operations equal index 9', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_9_normal',
      9,
      false,
      'Normal Jelly RoG bonus quantity at the strict account-gate equality boundary, index 9',
    );
  });

  it('bypasses the account progression gate for the index 9 preview', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_9_preview',
      9,
      true,
      'Preview Jelly RoG bonus quantity at index 9 bypasses the account progression gate',
    );
  });

  it('matches the normal index 41 quantity consumed by Royal Armory', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_41_normal',
      41,
      false,
      'Normal Jelly RoG bonus quantity at Royal Armory consumer index 41',
    );
  });

  it('bypasses the account progression gate for the index 41 preview', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_41_preview',
      41,
      true,
      'Preview Jelly RoG bonus quantity at Royal Armory consumer index 41',
    );
  });

  it('supports the upper boundary at preview index 71', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_71_preview',
      71,
      true,
      'Preview Jelly RoG bonus quantity at the highest supported index 71',
    );
  });
});
