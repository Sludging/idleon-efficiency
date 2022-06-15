import { Achievement } from "./achievements";
import { Alchemy } from "./alchemy";
import { Cooking } from "./cooking";
import { initPetGeneRepo, PetGeneBase } from "./data/PetGeneRepo";
import { initPetUpgradeRepo, PetUpgradeBase } from "./data/PetUpgradeRepo";
import { initTerritoryFightRepo, TerritoryFightBase } from "./data/TerritoryFightRepo";
import { ImageData } from "./imageData";
import { Lab } from "./lab";
import { PetUpgradeModel } from "./model/petUpgradeModel";
import { TerritoryFightModel } from "./model/territoryFightModel";
import { PetGeneModel } from './model/petGeneModel';
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";

export const waveReqs = "2 5 8 12 15 20 25 35 50 65 80 100 125 150 175 200".split(" ").map(value => parseInt(value));


export class PetGene {
    constructor(public index: number, public data: PetGeneModel) { }

    static fromBase(data: PetGeneBase[]): PetGene[] {
        return data.map(gene => new PetGene(gene.index, gene.data));
    }
}

export class PetUpgrade {
    level: number = 0;

    constructor(public index: number, public data: PetUpgradeModel) { }

    getImageData = (): ImageData => {
        if (this.index == 0) {
            return {
                height: 96,
                location: "Blank",
                width: 133
            };
        }
        return {
            location: `PetUpg${this.index - 1}`,
            height: 96,
            width: 133
        }
    }

    getBonus = () => {
        switch (this.index) {
            case 0:
            case 2:
            case 4:
                return this.level;
            case 1:
                return this.level * 4;
            case 3:
                return this.level * 25;
            case 5:
                return this.level * 0.25 + 1;
            case 6:
                return this.level * 6;
            case 7:
                return this.level * 0.3 + 1;
            case 8:
                return this.level * 2 + 1;
            case 9:
                return this.level * 0.05 + 1;
            case 10:
                return this.level * 10;
            case 11:
                return Math.ceil(Math.pow(this.level, 0.698) * 12);
            default: return 0;
        }
    }

    getCost = (matIndex: number) => {
        const baseCost = matIndex == 0 ? this.data.baseMatCost : this.data.baseCost;
        const costScale = matIndex == 0 ? this.data.costMatScale : this.data.costScale;

        return baseCost * (1 + this.level) * Math.pow(costScale, this.level);
    }

    getBonusText = () => {
        return this.data.boostEffect.replace(/}/g, this.getBonus().toString())
    }

    static fromBase(data: PetUpgradeBase[]): PetUpgrade[] {
        return data.map(upgrade => new PetUpgrade(upgrade.index, upgrade.data));
    }
}

export class Pet {
    constructor(public name: string, public gene: PetGene, public power: number) { }
}

export class Territory {
    currentSpices: number = 0;
    currentProgress: number = 0;
    spiceReward: string = '';
    pets: Pet[] = [];

    unlocked: boolean = false;

    constructor(public index: number, public data: TerritoryFightModel) { }

    getTrekReq = () => {
        const monolithicPets = 0; // TODO: actually check
        const baseMath = 1 + 0.02 / (monolithicPets / 5 + 1);
        return (this.data.trekReq + this.currentSpices) * Math.pow(baseMath, this.currentSpices);
    }

    getTrekHr = () => {
        // if ("TotalTrekkingHR" == t) {
        //     var us = b.engine.getGameAttribute("DNSM");
        //     null != d.PetszzDN2 ? us.setReserved("PetszzDN2", 0) : (us.h.PetszzDN2 = 0);
        //     for (var gs = 0; 4 > gs; ) {
        //         var ms = gs++;
        //         if ("none" != b.engine.getGameAttribute("Pets")[(ms + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0]) {
        //             var ds = b.engine.getGameAttribute("DNSM"),
        //                 cs = b.engine.getGameAttribute("DNSM"),
        //                 ps = null != d.PetszzDN2 ? cs.getReserved("PetszzDN2") : cs.h.PetszzDN2,
        //                 hs = ds,
        //                 bs = parsenum(ps) + w._customBlock_PetStuff("Trekking", "0", ms, w._customBlock_Breeding("TerritoryID", "0", a, 42));
        //             null != d.PetszzDN2 ? hs.setReserved("PetszzDN2", bs) : (hs.h.PetszzDN2 = bs);
        //         }
        //     }
        //     for (var fs = 0; 4 > fs; ) {
        //         var ys = fs++,
        //             Rs = b.engine.getGameAttribute("Pets")[(ys + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][1];
        //         if (parsenum(Rs) == e.__cast(3, k)) {
        //             var vs = b.engine.getGameAttribute("DNSM"),
        //                 Fs = b.engine.getGameAttribute("DNSM"),
        //                 Ns = null != d.PetszzDN2 ? Fs.getReserved("PetszzDN2") : Fs.h.PetszzDN2,
        //                 Is = vs,
        //                 Ds = 1.3 * parsenum(Ns);
        //             null != d.PetszzDN2 ? Is.setReserved("PetszzDN2", Ds) : (Is.h.PetszzDN2 = Ds);
        //         }
        //     }
        //     for (var Es = 0; 12 > Es; ) {
        //         var Ss = Es++;
        //         if (0 <= Ss + 4 * (w._customBlock_Breeding("TerritoryID", "0", a, 42) - 1) && -1 != b.engine.getGameAttribute("Pets")[(27 + (Ss + 4 * (w._customBlock_Breeding("TerritoryID", "0", a, 42) - 1))) | 0]) {
        //             var Gs = b.engine.getGameAttribute("Pets")[(Ss + (27 + 4 * (w._customBlock_Breeding("TerritoryID", "0", a, 42) - 1))) | 0][1];
        //             if (parsenum(Gs) == e.__cast(18, k)) {
        //                 var Ts = b.engine.getGameAttribute("DNSM"),
        //                     Us = b.engine.getGameAttribute("DNSM"),
        //                     _s = null != d.PetszzDN2 ? Us.getReserved("PetszzDN2") : Us.h.PetszzDN2,
        //                     Ms = Ts,
        //                     Vs = 1.2 * parsenum(_s);
        //                 null != d.PetszzDN2 ? Ms.setReserved("PetszzDN2", Vs) : (Ms.h.PetszzDN2 = Vs);
        //             }
        //         }
        //     }
        //     for (var Ps = 0; 4 > Ps; ) {
        //         var Cs = Ps++,
        //             Bs = b.engine.getGameAttribute("Pets")[(Cs + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][1];
        //         if (parsenum(Bs) == e.__cast(14, k)) {
        //             var Os = b.engine.getGameAttribute("DNSM");
        //             null != d.PetszzDN3 ? Os.setReserved("PetszzDN3", 1) : (Os.h.PetszzDN3 = 1);
        //             for (var xs = 0; 4 > xs; ) {
        //                 var ks = xs++;
        //                 if ("none" != b.engine.getGameAttribute("Pets")[(ks + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][0]) {
        //                     var ws = b.engine.getGameAttribute("CustomLists"),
        //                         Xs = null != d.PetGenes ? ws.getReserved("PetGenes") : ws.h.PetGenes,
        //                         zs = b.engine.getGameAttribute("Pets")[(ks + (27 + 4 * w._customBlock_Breeding("TerritoryID", "0", a, 42))) | 0][1],
        //                         Ls = Xs[0 | parsenum(zs)][1];
        //                     if (0 == parsenum(Ls)) {
        //                         var Qs = b.engine.getGameAttribute("DNSM");
        //                         null != d.PetszzDN3 ? Qs.setReserved("PetszzDN3", 0) : (Qs.h.PetszzDN3 = 0);
        //                         break;
        //                     }
        //                 }
        //             }
        //             var Ws = b.engine.getGameAttribute("DNSM");
        //             if (1 == (null != d.PetszzDN3 ? Ws.getReserved("PetszzDN3") : Ws.h.PetszzDN3)) {
        //                 var Ys = b.engine.getGameAttribute("DNSM"),
        //                     Zs = b.engine.getGameAttribute("DNSM"),
        //                     Hs = null != d.PetszzDN2 ? Zs.getReserved("PetszzDN2") : Zs.h.PetszzDN2,
        //                     Js = Ys,
        //                     js = 1.5 * parsenum(Hs);
        //                 null != d.PetszzDN2 ? Js.setReserved("PetszzDN2", js) : (Js.h.PetszzDN2 = js);
        //             }
        //         }
        //     }
        //     var qs = b.engine.getGameAttribute("DNSM");
        //     return null != d.PetszzDN2 ? qs.getReserved("PetszzDN2") : qs.h.PetszzDN2;
        // }
    }

    static fromBase = (data: TerritoryFightBase[]) => {
        return data.map(territory => new Territory(territory.index, territory.data));
    }
}

export class Egg {
    constructor(public rarity: number) { }

    getImageData = (): ImageData => {
        return {
            location: `PetEgg${this.rarity}`,
            height: 43,
            width: 38
        }
    }
}

export class Breeding {
    arenaWave: number = 0;
    territory: Territory[];
    upgrade: PetUpgrade[];
    genes: PetGene[];
    eggs: Egg[] = [];
    timeTillEgg: number = 0;
    totalEggTime: number = 0;

    speciesUnlocks: number[] = [];
    skillLevel: number = 0;
    deadCells: number = 0;

    constructor() {
        this.territory = Territory.fromBase(initTerritoryFightRepo());
        this.upgrade = PetUpgrade.fromBase(initPetUpgradeRepo());
        this.genes = PetGene.fromBase(initPetGeneRepo());
    }

    hasBonus = (bonusNumber: number) => {
        if (bonusNumber > waveReqs.length) {
            return false;
        }
        return this.arenaWave >= waveReqs[bonusNumber];
    }

    setTimeForEgg = (labBonus: number, mealBonus: number, alchemyBonus: number, achivementBonus: number) => {
        this.totalEggTime = 7200 / (1 + (labBonus + (mealBonus + alchemyBonus + achivementBonus)) / 100);
    }

    getStatRange = () => {
        let baseMath = Math.pow(4 * this.skillLevel + Math.pow(this.skillLevel / 2, 3), 0.85);
        const eggRarity = Math.min(1, Math.max(...this.eggs.map(egg => egg.rarity)));
        const maxRange = Math.max(0.1, 1 - ((eggRarity + 4) / 12) * 0.9);
        baseMath *= (1 + eggRarity / 8);
        const maxStat = baseMath * (Math.min(1.2 + this.skillLevel / 12, 4) * Math.pow(2.71828, -10 * 0) + 1);
        const minStat = baseMath * (Math.min(1.2 + this.skillLevel / 12, 4) * Math.pow(2.71828, -10 * maxRange) + 1);
        return [minStat, maxStat];
    }
}

export const petArenaBonuses = [
    { "desc": "Unlocks 3Rd Pet Battle Slot" },
    { "desc": "+25% Library Vip Membership" },
    { "desc": "1.20X Total Damage" },
    { "desc": "New Post Office Upgrade Crate" },
    { "desc": "Unlocks 4Th Pet Battle Slot" },
    { "desc": "1.5X Monster Cash" },
    { "desc": "New Post Office Upgrade Crate" },
    { "desc": "-50% Kitchen Upgrade Costs" },
    { "desc": "Unlocks 5Th Pet Battle Slot" },
    { "desc": "New Post Office Upgrade Crate" },
    { "desc": "+60% Library Vip Membership" },
    { "desc": "Can Equip 3Rd Large Bubble" },
    { "desc": "Unlocks 6Th Pet Battle Slot" },
    { "desc": "+20% Line Width For All Players" },
    { "desc": "2X Monster Cash" },
    { "desc": "1.40X Total Damage" }
]

// "Breeding":
// [
//     [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0], // EGGS
//     [10,3,0,0,0,0,0,0],
//     [5,4,1,0,0,0,0,0,0,0,0,0,0], // UPGRADES
//     [129.02025711903048,139.839716262204,0,0,0,0,0,0,223.07304319999994],
//     [0,0,0,0,0,20,20,10,20,13,0,0,0,0,0,0,0],
//     [0,0,24,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
//     [0],
//     [0],
//     [0],
//     [0],
//     [0]
// ]

export const parseBreeding = (petsStored: any[][], pets: any[][], optionsList: any[], territory: any[][], breedingData: number[][]) => {
    const breeding = new Breeding();
    if (petsStored.length == 0 || pets.length == 0 || territory.length == 0 || breedingData.length == 0) {
        return breeding;
    }
    breeding.timeTillEgg = parseFloat(optionsList[87] as string);
    breeding.arenaWave = parseInt(optionsList[89] as string);

    breedingData[0].forEach(egg => {
        breeding.eggs.push(new Egg(egg));
    });

    breeding.speciesUnlocks = breedingData[1];

    breedingData[2].forEach((upgrade, index) => {
        breeding.upgrade[index].level = upgrade;
    })

    const territoryFightsWon = parseInt(optionsList[85] as string);

    territory.forEach((territory, index) => {
        if (index < breeding.territory.length) {
            breeding.territory[index].unlocked = index < territoryFightsWon;
            breeding.territory[index].currentProgress = territory[0];
            breeding.territory[index].currentSpices = territory[1];
            breeding.territory[index].spiceReward = territory[3];

            const territoryPets = pets.slice(27 + (4 * index), 27 + (4 * index) + 4);
            territoryPets.forEach(pet => {
                breeding.territory[index].pets.push(new Pet(pet[0] as string, breeding.genes[pet[1] as number], pet[2] as number));
            })
        }
    })

    breeding.deadCells = breedingData[3][8];

    return breeding;
}

export const updateBreeding = (data: Map<string, any>) => {
    const breeding = data.get("breeding") as Breeding;
    const alchemy = data.get("alchemy") as Alchemy;
    const lab = data.get("lab") as Lab;
    const cooking = data.get("cooking") as Cooking;
    const players = data.get("players") as Player[];
    const achievements = data.get("achievements") as Achievement[];

    const alchemyEggTimeBonus = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Egg Ink")?.getBonus() ?? 0;
    const mealEggTimeBonus = cooking.meals.filter(meal => meal.bonusKey == "TimeEgg").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const mainframeBonus = lab.jewels.find(jewel => jewel.active && jewel.data.description == "Reduces egg incubation time")?.getBonus() ?? 0;
    const achivementEggBonus = achievements[220].completed ? 10 : 0;
    breeding.setTimeForEgg(mainframeBonus, mealEggTimeBonus, alchemyEggTimeBonus, achivementEggBonus);

    // Breeding level is universal, so just get it from the first player.
    breeding.skillLevel = players[0].skills.get(SkillsIndex.Breeding)?.level ?? 0;

    return breeding;
}