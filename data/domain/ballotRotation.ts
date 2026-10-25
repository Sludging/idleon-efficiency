import { BallotRotationBase, initBallotRotationRepo } from "./data/BallotRotationRepo";
import { BallotRotationModel } from "./model/ballotRotationModel";

export class BallotRotation {
    constructor(private data: BallotRotationModel) {}

    static fromBase(rotation: BallotRotationBase): BallotRotation {
        return new BallotRotation(rotation.data);
    }

    static forBonusBallot(): BallotRotation {
        return BallotRotation.fromBase(initBallotRotationRepo()[0]);
    }

    static forMeritocracy(): BallotRotation {
        return BallotRotation.fromBase(initBallotRotationRepo()[1]);
    }

    getPeriod(unixTimeSeconds: number): number {
        return Math.floor((unixTimeSeconds + this.data.offsetSeconds) / this.data.periodSeconds);
    }

    getNextRotationAt(unixTimeSeconds: number): number {
        return (this.getPeriod(unixTimeSeconds) + 1) * this.data.periodSeconds - this.data.offsetSeconds;
    }
}
