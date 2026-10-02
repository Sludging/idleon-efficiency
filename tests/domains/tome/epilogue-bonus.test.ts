/**
 * Tome epilogue bonus calculation tests.
 *
 */

import { loadExtractionResults, validateExtractionHealth, getExtractedValue, ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Tome } from '../../../data/domain/world-4/tome';

const saveName = 'latest';
const extractionResultsName = 'tome-epilogue-bonus-data.json';
const epilogueBonusEffects = [
 'Bones multiplier',
 'Villager EXP multiplier',
 'Dust multiplier',
 'Artifact Find multiplier',
 'Amber multiplier',
 'Palette Luck',
 'Tachyon multiplier',
 'Research XP',
 'Equinox multiplier',
 'World 7 Skill 3 bonus',
 'filler bonus',
] as const;
const epilogueBonusIndices = epilogueBonusEffects.map((_, index) => index);
// Game extraction reads cached total score while the domain recomputes current Tome lines; keep this bound narrow to retain failure detection.
const SCORE_DERIVED_EPILOGUE_TOLERANCE = 0.001;

describe('Tome Domain - Epilogue Bonus', () => {
 let extractionResults: ExtractionResults;
 let gameData: Map<string, any>;
 let tome: Tome;

 beforeAll(() => {
  extractionResults = loadExtractionResults(extractionResultsName);
  validateExtractionHealth(extractionResults);
  gameData = loadGameDataFromSave(saveName);
  tome = gameData.get('tome') as Tome;

  if (!tome) {
   throw new Error('Tome domain not found in save data');
  }
 });

 epilogueBonusIndices.forEach(index => {
  const effect = epilogueBonusEffects[index];
  it(`matches the Tome epilogue ${effect}`, () => {
   const liveBonus = getExtractedValue(extractionResults, `lore_epic_bonus_${index}`);

   expect(tome.getEpilogueBonus(index)).toMatchLiveGameWithDetails(liveBonus, {
    tolerance: SCORE_DERIVED_EPILOGUE_TOLERANCE,
    context: `Tome epilogue ${effect}`,
   });
  });
 });
});
