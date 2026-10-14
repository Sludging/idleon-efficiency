import type { Hole, StudyEffect } from '../../../data/domain/world-5/hole/hole';
import type { Player } from '../../../data/domain/player';
import { loadTestSave } from '../../utils/cloudsave-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { getExtractedValue } from '../../utils/live-game-data-loader';
import { getTargetPlayer, TARGET_PLAYER_INDEX } from '../../utils/target-player';

export interface CapturedHoleInputs {
 levels: number[];
 exp: number[];
 investments: number[];
 purchased: number[];
 studyLevels: number[];
 studyProgress: number[];
 target: number;
 cavernOpals: number[];
 lanternUses: number;
 wishes: number;
 layers: number[];
 covePurchases: number;
}

// Preserve booleans and structured mappings. The numeric loader must not coerce them.
export function captured<T>(results: ExtractionResults, key: string): T {
 const extraction = results.extractions[key];
 if (!extraction || results.errors[key]) {
  throw new Error(`Missing or failed Hole extraction: ${key}`);
 }
 return extraction.result as T;
}

export function decodedSave<T>(key: string): T {
 const value = loadTestSave('latest').get(key);
 return (typeof value === 'string' ? JSON.parse(value) : value) as T;
}

export function assertPairedContext(results: ExtractionResults, data: Map<string, any>): CapturedHoleInputs {
 const context = captured<{ playerId: number; playerName: string; playerNames: string[]; version: number }>(results, 'active_context');
 const players = data.get('players') as Player[];
 const player = getTargetPlayer(players);
 expect(context.playerId).toBe(TARGET_PLAYER_INDEX);
 expect(player.playerID).toBe(context.playerId);
 expect(player.playerName).toBe(context.playerName);
 expect(players.map(player => player.playerName)).toEqual(context.playerNames);
 expect(Number(decodedSave('DoOnceREAL'))).toBe(Number(context.version));
 const inputs = captured<CapturedHoleInputs>(results, 'paired_hole_inputs');
 const saved = decodedSave<number[][]>('Holes');
 expect(inputs.levels).toEqual(saved[1].slice(0, 5));
 expect(inputs.exp).toEqual(saved[2].slice(0, 5));
 expect(inputs.investments).toEqual(saved[3].slice(0, 8));
 expect(inputs.purchased).toEqual(saved[23].slice(0, 5));
 expect(inputs.studyLevels).toEqual(saved[26].slice(0, 18));
 expect(inputs.studyProgress).toEqual(saved[27].slice(0, 18));
 expect(inputs.target).toBe(saved[11][61]);
 expect(inputs.cavernOpals).toEqual(saved[7]);
 expect(inputs.lanternUses).toBe(saved[11][84]);
 expect(inputs.wishes).toBe(saved[11][25]);
 expect(inputs.layers).toEqual([saved[11][1], saved[11][3], saved[11][5], saved[11][7]]);
 expect(inputs.covePurchases).toBe(decodedSave<number[]>('OptLacc')[604]);
 return inputs;
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
  expect(effect.unavailableReason).toBeNull();
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
