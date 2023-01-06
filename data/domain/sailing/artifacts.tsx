import { lavaLog, nFormatter } from "../../utility";
import { ArtifactBase } from "../data/ArtifactRepo";
import { ImageData } from "../imageData";
import { ArtifactModel } from "../model/artifactModel";

export enum ArtifactStatus {
    Unobtained,
    Obtained,
    Ancient
}

export class Artifact {
    status: ArtifactStatus = ArtifactStatus.Unobtained;

    constructor(public index: number, public data: ArtifactModel) { }

    static fromBase = (data: ArtifactBase[]): Artifact[] => {
        return data.map(artifact => {
            switch (artifact.index) {
                case 1:
                    return new ManekiKatArtifact(artifact.index, artifact.data);
                case 3:
                    return new FauxoryTuskArtifact(artifact.index, artifact.data);
                case 5: 
                    return new GenieLampArtifact(artifact.index, artifact.data);
                case 2:
                case 10:
                case 18:
                case 20: 
                    return new SlabInfluencedArtifact(artifact.index, artifact.data);
                case 11: 
                    return new AshenUrnArtifact(artifact.index, artifact.data);
                case 23:
                    return new WeatherbookArtifact(artifact.index, artifact.data);
                case 13:
                    return new TriagulonArtifact(artifact.index, artifact.data);
                case 27:
                    return new OperaMaskArtifact(artifact.index, artifact.data);
                case 29:
                    return new TheTrueLanternArtifact(artifact.index, artifact.data);
                case 25:
                    return new CrystalSteakArtifact(artifact.index, artifact.data);
                case 8:
                    return new FunHippoeteArtifact(artifact.index, artifact.data);
                default: return new Artifact(artifact.index, artifact.data)
            }
        });
    }

    updateStatus = (artifactStatus: number) => {
        switch (artifactStatus) {
            case 1:
                this.status = ArtifactStatus.Obtained;
                break;
            case 2:
                this.status = ArtifactStatus.Ancient;
                break;
        }
    }

    getImageData = (): ImageData => {
        return {
            location: `Arti${this.index}`,
            width: 22,
            height: 20,
        }
    }

    getBonus = () => {
        return 0;
    }

    hasCalculatedBonus = () => {
        return this.data.bonus.includes("Total Bonus: ");
    }

    getCalculatedBonusText = () => {
        if (!this.hasCalculatedBonus()) {
            return "";
        }
        console.log(this.data.bonus.split("Total Bonus: "));
        return this.data.bonus.split("Total Bonus: ")[1].trim().replace("}", nFormatter(this.getBonus()));
    }

    getBonusText = () => {
        if (this.hasCalculatedBonus()) {
            return this.data.bonus.split("Total Bonus: ")[0].replace("@", "").trim().replace("{", this.data.qtyBonus.toString())
        }
        return this.data.bonus.replace("{", this.data.qtyBonus.toString())
    }
}

export class GenieLampArtifact extends Artifact {
    sailingLevel: number = 0;
    override getBonus = () => {
        return this.sailingLevel * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }
}

export class SlabInfluencedArtifact extends Artifact {
    lootyCount: number = 0;
    override getBonus = () => {
        return Math.floor(Math.max(0, this.lootyCount - 500) / 10) * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }
}

export class ManekiKatArtifact extends Artifact {
    highestLevel: number = 0;
    override getBonus = () => {
        return this.highestLevel * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }
}

export class AshenUrnArtifact extends Artifact {
    highestLevel: number = 0;
    override getBonus = () => {
        // Hard coded numbers because .. that's what Lava also did :facepalm:.
        const bonusCap = this.status == ArtifactStatus.Ancient ? 400 : 200
        return Math.min(bonusCap, this.highestLevel) * this.data.qtyBonus;
    }

    override hasCalculatedBonus = () => {
        return true;
    }

    override getCalculatedBonusText = () => {
        return `+${this.getBonus().toString()}% Divinity Gain`;
    }
}

export class FauxoryTuskArtifact extends Artifact {
    sailingLevel: number = 0;
    override getBonus = () => {
        return this.sailingLevel * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }
}

export class WeatherbookArtifact extends Artifact {
    gamingLevel: number = 0;
    override getBonus = () => {
        return this.gamingLevel * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }
}

export class TriagulonArtifact extends Artifact {
    turkeyOwned: number = 0;
    override getBonus = () => {
        return lavaLog(this.turkeyOwned) * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }
}

export class OperaMaskArtifact extends Artifact {
    goldOwned: number = 0;
    override getBonus = () => {
        return lavaLog(this.goldOwned) * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }

    override getCalculatedBonusText = () => {
        return `Currently broken in-game`;
    }
}

export class TheTrueLanternArtifact extends Artifact {
    blessingsOwned: number = 0;
    override getBonus = () => {
        return lavaLog(this.blessingsOwned) * this.data.qtyBonus * (this.status == ArtifactStatus.Ancient ? 2 : 1);
    }

    override getCalculatedBonusText = () => {
        return `Currently broken in-game`;
    }
}

export class CrystalSteakArtifact extends Artifact {
    statsBonus: number = 0;
    override getBonus = () => {
        return 0;
    }

    override hasCalculatedBonus = () => {
        return true;
    }

    override getCalculatedBonusText = () => {
        return `N/A for now.`;
    }
}

export class FunHippoeteArtifact extends Artifact {
    constructionSpeed: number = 0;
    override getBonus = () => {
        return 0;
    }

    override hasCalculatedBonus = () => {
        return true;
    }

    override getCalculatedBonusText = () => {
        return `N/A for now.`;
    }
}