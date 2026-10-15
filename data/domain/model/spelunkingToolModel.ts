import { SpelunkingToolUnlockModel } from './spelunkingToolUnlockModel';

export interface SpelunkingToolModel {
    index: number,
    name: string,
    baseStaminaCost: number,
    hitRadius: number,
    damageMultiplier: number,
    unlock: SpelunkingToolUnlockModel
}
