import { RiftChallengeModel } from './riftChallengeModel';
import { RiftMilestoneModel } from './riftMilestoneModel';
import { RiftTargetModel } from './riftTargetModel';
import { RiftTaskModel } from './riftTaskModel';

export interface RiftModel {
    challenges: RiftChallengeModel[],
    milestones: RiftMilestoneModel[],
    targets: RiftTargetModel[],
    taskOrder: RiftTaskModel[]
}
