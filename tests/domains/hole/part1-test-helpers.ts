import type { Hole, StudyEffect } from '../../../data/domain/world-5/hole/hole';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue } from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';

// Preserve booleans and structured mappings. The numeric loader must not coerce them.
export function captured<T>(results: ExtractionResults, key: string): T {
 const extraction = results.extractions[key];
 if (!extraction || results.errors[key]) {
  throw new Error(`Missing or failed Hole extraction: ${key}`);
 }
 return extraction.result as T;
}

export function coreNumber(actual: number | null, results: ExtractionResults, key: string, context: string): void {
 expect(actual).not.toBeNull();
 expect(actual).toMatchLiveGameWithDetails(getExtractedValue(results, key), { tolerance: 0, context });
}

export function rateForTarget(data: Map<string, any>, villagerIndex = 0) {
 const hole = data.get('hole') as Hole;
 return hole.villagers[villagerIndex].characterRates.find(rate => rate.playerId === TARGET_PLAYER_INDEX)!;
}

export function assertStudyEffects(studyIndex: number, effects: StudyEffect[], results: ExtractionResults): void {
 const expected = captured<Record<string, number | boolean>>(results, `study_effects_${studyIndex}`);
 expect(effects.map(effect => effect.key).sort()).toEqual(Object.keys(expected).sort());
 effects.forEach(effect => {
  expect(effect.owner).toBe(`cavern:${studyIndex}`);
  if (typeof expected[effect.key] === 'boolean') {
   expect(effect.scope).toBe('owned-study-rule');
   expect(effect.unit).toBe('rule');
   expect(effect.value).toBe(expected[effect.key]);
  } else {
   expect(effect.scope).toBe('owned-study-contribution');
   expect(effect.value).toMatchLiveGameWithDetails(expected[effect.key], {
    tolerance: 0, context: `Study ${studyIndex}: ${effect.key}`,
   });
  }
 });
}
