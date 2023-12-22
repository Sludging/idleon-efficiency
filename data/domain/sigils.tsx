import { Achievement } from "./achievements";
import { Domain, RawData } from "./base/domain";
import { initSigilRepo, SigilBase } from "./data/SigilRepo";
import { GemStore } from "./gemPurchases";
import { ImageData } from "./imageData";
import { Item } from "./items";
import { SigilModel } from "./model/sigilModel";
import { Sailing } from "./sailing";

export class Sigil {
    progress: number = 0
    boostLevel: number = -1;

    activePlayers: number = 0;

    artifactBoost: number = 0;

    constructor(public index: number, public data: SigilModel) { }

    getImageData = (): ImageData => {

        return {
            location: `aSiga${this.index}`,
            width: 36,
            height: 36
        }
    }

    getBonus = () => {
        const baseBoost = this.boostLevel == 1 ? this.data.boostBonus : this.boostLevel == 0 ? this.data.unlockBonus : 0;
        return baseBoost * (1 + this.artifactBoost);
    }

    getBonusText = () => {
        return this.data.desc.replace(/{/, this.getBonus().toString());
    }

    static fromBase = (data: SigilBase[]) => {
        return data.map(sigil => new Sigil(sigil.index, sigil.data));
    }
}


export class Sigils extends Domain {
    sigils: Sigil[] = [];

    chargeSpeed: number = 0;

    setSigilSpeed = (achievBonus112: number, gemStoreBonus110: number,) => {
        this.chargeSpeed = 1 + (achievBonus112 + (this.sigils[12].getBonus() + gemStoreBonus110)) / 100;
    }

    getRawKeys(): RawData[] {
        return [
            {key: "CauldronP2W", perPlayer: false, default: []},
            {key: "CauldronJobs1", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.sigils = Sigil.fromBase(initSigilRepo());

        return this;
    }

    parse(data: Map<string, any>): void {
        const sigils = data.get(this.getDataKey()) as Sigils;
        const cauldronP2w = data.get("CauldronP2W") as number[][];
        const cauldronJobs1 = data.get("CauldronJobs1") as number[];

        sigils.sigils.forEach(sigil => {
            sigil.boostLevel = cauldronP2w[4][1 + 2 * sigil.index]
            sigil.progress = cauldronP2w[4][2 * sigil.index]
        })

        const jobsThatMatter = cauldronJobs1.slice(0, 10); // TODO: Change this to 11 when Lava fixes the bug that player 10 isn't helpful.
        jobsThatMatter.forEach((job, playerIndex) => {
            const sigilIndex = Math.round(job) - 100;
            if (sigilIndex > 0) {
                sigils.sigils[sigilIndex].activePlayers += 1;
            }
        })
    }
}

// Currently only requires artifact to be post processed, can be below it.
export const updateSigils = (data: Map<string, any>) => {
    const sigils = data.get("sigils") as Sigils;
    const gemStore = data.get("gems") as GemStore;
    const achievements = data.get("achievements") as Achievement[];
    const sailing = data.get("sailing") as Sailing;

    const sigilAchiev = achievements[112].completed ? 20 : 0;
    const sigilGemBonus = (gemStore.purchases.find(purchase => purchase.no == 110)?.pucrhased ?? 0) * 20;

    const artifactBonus = sailing.artifacts[16].getBonus();
    sigils.sigils.forEach(sigil => {
        sigil.artifactBoost = artifactBonus;
    })

    sigils.setSigilSpeed(sigilAchiev, sigilGemBonus);
    return sigils;
}