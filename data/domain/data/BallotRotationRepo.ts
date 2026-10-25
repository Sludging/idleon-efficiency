import { BallotRotationModel } from '../model/ballotRotationModel';

export class BallotRotationBase { constructor(public index: number, public data: BallotRotationModel) { } }



export const initBallotRotationRepo = () => {
    return [    
        new BallotRotationBase(0, <BallotRotationModel>{"periodSeconds": 604800, "offsetSeconds": 197860}),
        new BallotRotationBase(1, <BallotRotationModel>{"periodSeconds": 604800, "offsetSeconds": 543460})    
]
}
