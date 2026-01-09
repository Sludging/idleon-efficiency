import { lavaLog, nFormatter } from "../../utility";
import { AtomCollider } from "../atomCollider";
import { Cooking } from "../cooking";
import { ArtifactBase } from "../data/ArtifactRepo";
import { ImageData } from "../imageData";
import { Lab, SlabSovereigntyBonus } from "../lab";
import { ArtifactModel } from "../model/artifactModel";
import { Player } from "../player";
import { Sailing } from "../sailing";
import { SkillsIndex } from "../SkillsIndex";
import { Slab } from "../slab";

export enum ArtifactStatus {
    Unobtained,
    Obtained,
    Ancient,
    Eldritch,
    Sovereign,
    Omnipotent
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
                case 12:
                    return new AmberiteArtifact(artifact.index, artifact.data);
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
                case 4:
                    const goldRelic = new GoldRelicArtifact(artifact.index, artifact.data);
                    // Lava didn't update the artifact values properly, so hardcoding values.
                    goldRelic.data.qtyBonus = 2;
                    return goldRelic;
                case 33:
                    return new DeathskullArtifact(artifact.index, artifact.data);
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
            case 3:
                this.status = ArtifactStatus.Eldritch;
                break;
            case 4:
                this.status = ArtifactStatus.Sovereign;
                break;
            case 5:
                this.status = ArtifactStatus.Omnipotent;
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

    getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }

    getAncientBonus = () => {
        if (this.data.ancientBonus == "The artifact's main bonus is doubled!") {
            return this.data.qtyBonus;
        }
        return this.data.ancientBonusQty;
    }

    getEldritchBonus = () => {
        if (this.data.eldritchBonus == "The artifact's main bonus is tripled!") {
            return this.data.qtyBonus;
        }
        return this.data.eldritchBonusQty;
    }

    getSovereignBonus = () => {
        if (this.data.sovereignBonus == "The artifact's main bonus is quadrupled!") {
            return this.data.qtyBonus;
        }
        return this.data.sovereignBonusQty;
    }

    getOmnipotentBonus = () => {
        if (this.data.omnipotentBonus == "The artifact's main bonus is quintupled!") {
            return this.data.qtyBonus;
        }
        return this.data.omnipotentBonusQty;
    }

    hasCalculatedBonus = () => {
        return this.data.bonus.includes("Total Bonus: ");
    }

    getCalculatedBonusText = () => {
        if (!this.hasCalculatedBonus()) {
            return "";
        }
        return this.data.bonus.split("Total Bonus: ")[1].trim().replace("}", nFormatter(this.getBonus(true)));
    }

    getBonusText = () => {
        if (this.hasCalculatedBonus()) {
            return this.data.bonus.split("Total Bonus: ")[0].replace("@", "").trim().replace("{", this.data.qtyBonus.toString())
        }
        return this.data.bonus.replace("{", this.data.qtyBonus.toString());
    }

    getBonusMultiplier = (): number => {
        if (this.status == ArtifactStatus.Ancient) {
            return 2;
        }
        if (this.status == ArtifactStatus.Eldritch) { 
            return 3;
        }
        if (this.status == ArtifactStatus.Sovereign) {
            return 4;
        }
        if (this.status == ArtifactStatus.Omnipotent) {
            return 5;
        }

        return 1;
    }
}

export class GenieLampArtifact extends Artifact {
    sailingLevel: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return this.sailingLevel * this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }
}

export class GoldRelicArtifact extends Artifact {
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            switch(this.status) {
                case ArtifactStatus.Unobtained: return this.data.qtyBonus; // For when showUnobtained is true.
                case ArtifactStatus.Obtained: return this.data.qtyBonus;
                case ArtifactStatus.Ancient: return this.data.qtyBonus + this.data.ancientBonusQty;
                case ArtifactStatus.Eldritch: return this.data.qtyBonus + (this.data.eldritchBonusQty ?? 0);
                case ArtifactStatus.Sovereign: return this.data.qtyBonus + (this.data.sovereignBonusQty ?? 0);
                case ArtifactStatus.Omnipotent: return this.data.qtyBonus + (this.data.omnipotentBonusQty ?? 0);
            }
        }

        return 0;
    }
}

export class SlabInfluencedArtifact extends Artifact {
    lootyCount: number = 0;
    slabSovereignBonus: number = 1;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return Math.floor(Math.max(0, this.lootyCount - 500) / 10) * this.data.qtyBonus * this.getBonusMultiplier() * this.slabSovereignBonus;
        }

        return 0;
    }
}

export class ManekiKatArtifact extends Artifact {
    highestLevel: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return this.highestLevel * this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }
}

export class AshenUrnArtifact extends Artifact {
    highestLevel: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            const bonusCap = this.getBonusMultiplier();
            return Math.min(bonusCap, this.highestLevel) * this.data.qtyBonus;
        }

        return 0;
    }

    override getBonusMultiplier = (): number => {
        // Hard coded numbers because .. that's what Lava also did :facepalm:.
        if (this.status == ArtifactStatus.Ancient) {
            return 400;
        }
        if (this.status == ArtifactStatus.Eldritch) { 
            return 600;
        }
        if (this.status == ArtifactStatus.Sovereign) { 
            return 800;
        }
        if (this.status == ArtifactStatus.Omnipotent) {
            return 1000;
        }

        return 200;
    }

    override hasCalculatedBonus = () => {
        return true;
    }

    override getCalculatedBonusText = () => {
        return `+${this.getBonus(true).toString()}% Divinity Gain`;
    }
}

export class AmberiteArtifact extends Artifact {
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return this.data.qtyBonus * this.getBonusMultiplier();
        }
        return 0
    }
}

export class FauxoryTuskArtifact extends Artifact {
    sailingLevel: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return this.sailingLevel * this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }
}

export class WeatherbookArtifact extends Artifact {
    gamingLevel: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return this.gamingLevel * this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }
}

export class TriagulonArtifact extends Artifact {
    turkeyOwned: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return lavaLog(this.turkeyOwned) * this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }
}

export class OperaMaskArtifact extends Artifact {
    goldOwned: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return lavaLog(this.goldOwned) * this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }
}

export class TheTrueLanternArtifact extends Artifact {
    particlesOwned: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return lavaLog(this.particlesOwned) * this.data.qtyBonus * this.getBonusMultiplier();
        }

        return 0;
    }
}

export class CrystalSteakArtifact extends Artifact {
    statsBonus: number = 0;
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return 0;
        }

        return 0 
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
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return 0;
        }

        return 0;
    }

    override hasCalculatedBonus = () => {
        return true;
    }

    override getCalculatedBonusText = () => {
        return `N/A for now.`;
    }
}

export class DeathskullArtifact extends Artifact {
    override getBonus = (showUnobtained: boolean = false) => {
        if (showUnobtained || this.status != ArtifactStatus.Unobtained) {
            return 0;
        }

        return 0;
    }

    override getBonusText = () => {
        return "+1 Gallery Slot";
    }
}

// Currently all data only requires parsing, can be very high on post processing list.
export const updateArtifacts = (data: Map<string, any>) => {
    const sailing = data.get("sailing") as Sailing;
    const players = data.get("players") as Player[];
    const cooking = data.get("cooking") as Cooking;
    const collider = data.get("collider") as AtomCollider;
    const slab = data.get("slab") as Slab;

    // Sailing Related (parse data)
    (sailing.artifacts[27] as OperaMaskArtifact).goldOwned = sailing.loot[0];

    // Skills related (parse data)
    (sailing.artifacts[5] as GenieLampArtifact).sailingLevel = players[0].skills.get(SkillsIndex.Sailing)?.level ?? 0;
    (sailing.artifacts[3] as FauxoryTuskArtifact).sailingLevel = players[0].skills.get(SkillsIndex.Sailing)?.level ?? 0;
    (sailing.artifacts[23] as WeatherbookArtifact).gamingLevel = players[0].skills.get(SkillsIndex.Gaming)?.level ?? 0;

    // Slab related (parse data)
    (sailing.artifacts[2] as SlabInfluencedArtifact).lootyCount = slab.rawObtainedCount;
    (sailing.artifacts[10] as SlabInfluencedArtifact).lootyCount = slab.rawObtainedCount;
    (sailing.artifacts[18] as SlabInfluencedArtifact).lootyCount = slab.rawObtainedCount;
    (sailing.artifacts[20] as SlabInfluencedArtifact).lootyCount = slab.rawObtainedCount;

    // Highest level (parse data)
    const highestLevel = players.reduce((maxLevel, player) => maxLevel = player.level > maxLevel ? player.level : maxLevel, 0);
    (sailing.artifacts[1] as ManekiKatArtifact).highestLevel = highestLevel;
    (sailing.artifacts[11] as AshenUrnArtifact).highestLevel = highestLevel;

    // Cooking related (parse data)
    (sailing.artifacts[13] as TriagulonArtifact).turkeyOwned = cooking.meals[0].count;
    
    // Collider related (parse data)
    (sailing.artifacts[29] as TheTrueLanternArtifact).particlesOwned = collider.particles;

    return sailing.artifacts;
}

export const updateSailingArtifactSlabBoost = (data: Map<string, any>) => {
    const sailing = data.get("sailing") as Sailing;
    const lab = data.get("lab") as Lab;

    const sovereignBonus = lab.bonuses[15].active ? (1 + (lab.bonuses[15] as SlabSovereigntyBonus).getBonus() / 100) : 1;

    (sailing.artifacts[2] as SlabInfluencedArtifact).slabSovereignBonus = sovereignBonus;
    (sailing.artifacts[10] as SlabInfluencedArtifact).slabSovereignBonus = sovereignBonus;
    (sailing.artifacts[18] as SlabInfluencedArtifact).slabSovereignBonus = sovereignBonus;
    (sailing.artifacts[20] as SlabInfluencedArtifact).slabSovereignBonus = sovereignBonus;
}
