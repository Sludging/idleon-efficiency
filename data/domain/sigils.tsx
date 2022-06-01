import { initSigilRepo, SigilBase } from "./data/SigilRepo";
import { ImageData } from "./imageData";
import { SigilModel } from "./model/sigilModel";

export class Sigil {
    progress: number = 0

    constructor(public index: number, public data: SigilModel) {}

    getImageData = (): ImageData => {

        return {
            location: `aSiga${this.index}`,
            width: 36,
            height: 36
        }
    }

    static fromBase = (data: SigilBase[]) => {
        return data.map(sigil => new Sigil(sigil.index, sigil.data));
    }
}


export class Sigils {
    sigils: Sigil[];

    constructor() {
        this.sigils = Sigil.fromBase(initSigilRepo());
    }
}

export default function parseSigils(cauldronP2w: number[][]) {
    const sigils = new Sigils();

    sigils.sigils.forEach(sigil => {
        sigil.progress = cauldronP2w[4][2 * sigil.index]
    })

    return sigils;
}