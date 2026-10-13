import { SpelunkingItemDropModel } from './spelunkingItemDropModel';
import { SpelunkingRewardLabelModel } from './spelunkingRewardLabelModel';

export interface SpelunkingMetadataModel {
    rewardLabels: SpelunkingRewardLabelModel[],
    itemDrops: SpelunkingItemDropModel[]
}
