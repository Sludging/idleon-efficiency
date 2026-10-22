import { Forge } from '../../../data/domain/world-1/forge';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
  loadExtractionResults,
  normalizeExtractedValue,
  validateExtractionHealth,
  type ExtractionResults,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'forge-smelting-speed-data.json';
const extractionLabel = 'forge_smelting_speed';

const forge = loadGameDataFromSave(saveName).get('forge') as Forge;
const upgradeBonus = forge.upgrades[2].getStat();
const slotCases = forge.slots.map((slot, slotIndex) => ({ slot, slotIndex }));

let nativeSpeeds: number[];

beforeAll(() => {
  const extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);

  const speedExtraction = extractionResults.extractions[extractionLabel];
  if (!speedExtraction) {
    throw new Error(`Missing native Forge smelting-speed extraction: ${extractionLabel}`);
  }
  if (!Array.isArray(speedExtraction.result)) {
    throw new Error('Native Forge smelting-speed extraction is not an array');
  }
  nativeSpeeds = speedExtraction.result.map(normalizeExtractedValue);
});

describe('Forge Domain - Smelting Speed', () => {
  it.each(slotCases)(
    'matches the native progress multiplier for Forge slot $slotIndex',
    ({ slot, slotIndex }) => {
      const nativeSpeed = nativeSpeeds[slotIndex];
      if (nativeSpeed === undefined) {
        throw new Error(`Missing native Forge speed for parsed slot ${slotIndex}`);
      }

      expect(slot.getSpeed(upgradeBonus)).toMatchLiveGameWithDetails(nativeSpeed, {
        tolerance: 0,
        context: `Forge slot ${slotIndex} smelting-speed progress multiplier used by refill timing`,
      });
    },
  );
});
