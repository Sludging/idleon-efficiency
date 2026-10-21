/**
 * Jelly Operator obstruction bonus comparisons against paired game extraction.
 * Completed obstructions are raw account state, not another domain calculation dependency.
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
const extractionResultsName = 'jelly-operator-obstruction-bonuses-data.json';

describe('Jelly Operator - obstruction bonuses', () => {
  let extractionResults: ExtractionResults;
  let jellyOperator: JellyOperator;

  beforeAll(() => {
    extractionResults = loadExtractionResults(extractionResultsName);
    validateExtractionHealth(extractionResults);
    const gameData = loadGameDataFromSave(saveName);
    jellyOperator = gameData.get('jellyOperator') as JellyOperator;
  });

  const expectGameMatch = (
    label: string,
    index: number,
    preview: boolean,
    context: string,
  ) => {
    const gameValue = getExtractedValue(extractionResults, label);

    expect(jellyOperator.getObstructionBonus(index, preview)).toMatchLiveGameWithDetails(gameValue, {
      tolerance: 0,
      context,
    });
  };

  it('matches the earned bonus for completed obstruction 8', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_8_normal',
      8,
      false,
      'Earned obstruction 8 bonus after completion',
    );
  });

  it('matches the earned obstruction 9 bonus', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_9_normal',
      9,
      false,
      'Earned obstruction 9 bonus after completion',
    );
  });

  it('previews the catalog bonus for obstruction 9', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_9_preview',
      9,
      true,
      'Catalog preview bonus for obstruction 9',
    );
  });

  it('matches the locked obstruction 41 bonus used by Royal Armory', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_41_normal',
      41,
      false,
      'Locked obstruction 41 bonus used by Royal Armory',
    );
  });

  it('previews the catalog bonus for locked obstruction 41', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_41_preview',
      41,
      true,
      'Catalog preview bonus for locked obstruction 41',
    );
  });

  it('previews the final catalog bonus for obstruction 71', () => {
    expectGameMatch(
      'jelly_rog_bonus_qty_71_preview',
      71,
      true,
      'Catalog preview bonus for final obstruction 71',
    );
  });
});
