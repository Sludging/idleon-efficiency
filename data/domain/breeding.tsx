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
import { AbilityTypeEnum } from "./enum/abilityTypeEnum";

export const waveReqs = "2 5 8 12 15 20 25 35 50 65 80 100 125 150 175 200".split(" ").map(value => parseInt(value));

export const territoryNiceNames = [
    "Grasslands",
    "Jungle",
    "Encroaching Forest",
    "Tree Interior",
    "Stinky Sewers",
    "Desert Oasis",
    "Beach Docks",
    "Coarse Mountains",
    "Twilight Desert",
    "The Crypt",
    "Frosty Peaks",
    "Tundra Outback",
    "Crystal Caverns",
    "Pristalle Lake",
    "Arena",
    "Nebulon Mantle",
    "Starfield Skies",
    "Shores Of Eternity",
]


export class PetGene {
    constructor(public index: number, public data: PetGeneModel) { }

    static fromBase(data: PetGeneBase[]): PetGene[] {
        return data.map(gene => new PetGene(gene.index, gene.data));
    }

    // Image for the gene background -> Development\idleon-efficiency\data\icons\assets\graphics\1x\font-551.png
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

    getTrekSpeed = (territoryIndex: number, sameTerritory: Pet[], territoryBefore: Pet[]) => {
        if (this.gene.data.abilityType === AbilityTypeEnum.Green) {
            switch (this.gene.data.name) {
                case 'Forager':
                    return this.power * 2;
                case 'Targeter':
                    // If we have pets in the territory before and the pet above is a targeter, multiply power by 5.
                    if (territoryBefore.length > territoryIndex && territoryBefore[territoryIndex].gene.data.name == "Targeter") {
                        return this.power * 5;
                    }
                    break;
                case 'Opticular':
                    // If has more power then every other pet in the territory, multiply power by 3.
                    if (sameTerritory.every(comparePet => comparePet.power <= this.power)) {
                        return this.power * 3;
                    }
                    break;
                case 'Borger':
                    // If the territory before has at least one Forager, multiply power by 10.
                    if (territoryBefore.some(pet => pet.gene.data.name === 'Forager')) {
                        return this.power * 10;
                    }
                    break;
            }
            return this.power;
        }
        return 0;
    }

    getFightPower = () => {
        if (this.gene.data.abilityType === AbilityTypeEnum.Red) {
            switch (this.gene.data.name) {
                case "Mercenary":
                    return this.power * 2;
            }
            return this.power;
        }
        return 0;
    }

    getBackgroundImageData = (): ImageData => {
        let cardNumber: number = 4;
        switch(this.gene.data.abilityType) {
            case AbilityTypeEnum.Green:
                cardNumber = 1;
                break;
            case AbilityTypeEnum.Red:
                cardNumber = 0;
                break;
            case AbilityTypeEnum.Special:
                cardNumber = 3;
                break;
        }

        return {
            location: `PetBackcard${cardNumber}`,
            height: 67,
            width: 67
        }
    }
}

export interface Spice {
    type: string
    count: number
}

export class Territory {
    currentForagingRound: number = 0;
    currentProgress: number = 0;
    spiceRewards: Spice[] = [];
    pets: Pet[] = [];

    unlocked: boolean = false;

    // Trekking info
    trekkingFightPower = 0;
    trekkingSpeedHr = 0;

    constructor(public index: number, public data: TerritoryFightModel) { }

    getTrekReq = () => {
        const monolithicPets = this.pets.filter(pet => pet.gene.data.name === 'Monolithic').length;
        const baseMath = 1 + 0.02 / (monolithicPets / 5 + 1);
        return (this.data.trekReq + this.currentForagingRound) * Math.pow(baseMath, this.currentForagingRound);
    }

    setTrekInfo = (territoryBefore: Pet[], territoryAfter: Pet[], bloomingAxeBonus: number) => {
        // Nothing to set for a lock territory, skip.
        if (!this.unlocked) {
            return;
        }

        const baseForagingPower = this.pets.reduce((sum, pet, petIndex) => sum += pet.getTrekSpeed(petIndex, this.pets, territoryBefore), 0);
        const baseFightPower = this.pets.reduce((sum, pet) => sum += pet.getFightPower(), 0);

        const hasCombatPets = this.pets.some(pet => pet.gene.data.abilityType === AbilityTypeEnum.Red);
        const fleetersCount = this.pets.filter(pet => pet.gene.data.name === 'Fleeter').length;
        const flashyCount = hasCombatPets ? 0 : this.pets.filter(pet => pet.gene.data.name === 'Flashy').length;
        const fastidiousCount = !hasCombatPets ? 0 : this.pets.filter(pet => pet.gene.data.name === 'Fastidious').length;

        const miasmaBonus = (
          this.pets.some(pet => pet.gene.data.name === 'Miasma') // has Miasma pet
          // check that pet genes do not repeat
          && this.pets.map(pet => pet.gene.data.name).every((item, index, genes) => genes.indexOf(item) === index)
        ) ? 4 : 1;

        const territoryWithNeighbours = [...this.pets, ...territoryBefore, ...territoryAfter];

        const whalesCount = territoryWithNeighbours.filter(pet => pet.gene.data.name === 'Badumdum').length;
        const poopsCount = territoryWithNeighbours.filter(pet => pet.gene.data.name === 'Tsar').length;

        const totalForagingSpeed = baseForagingPower
            * Math.pow(1.3, fleetersCount)
            * Math.pow(1.2, whalesCount)
            * Math.pow(1.5, flashyCount)
            * Math.pow(1.5, fastidiousCount)
            * miasmaBonus; // x4 or x1 if conditions not met

        this.trekkingFightPower = (baseFightPower + baseForagingPower * bloomingAxeBonus)
            * Math.pow(1.5, poopsCount);

        this.trekkingSpeedHr = this.trekkingFightPower < this.data.fightPower ? 0 : totalForagingSpeed;
    }

    static fromBase = (data: TerritoryFightBase[]) => {
        return data.map(territory => {
            const toReturn = new Territory(territory.index, {...territory.data});
            // If index is over 14 (after arena territory index), the territory req is the one from the index before.
            if (toReturn.index > 14) {
                console.log(toReturn.index, toReturn.data.trekReq, data[territory.index - 1].data.trekReq, data[toReturn.index - 1]);
                toReturn.data.trekReq = data[toReturn.index - 1].data.trekReq;
            }
            return toReturn;
        });
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
        // Lava does some weird math to skip territory 14 in some scenarios.
        const tIndex = Math.round(index + Math.floor((index + 86.1) / 100))
        if (tIndex < breeding.territory.length) {
            breeding.territory[tIndex].unlocked = index < territoryFightsWon;
            breeding.territory[tIndex].currentProgress = territory[0];
            breeding.territory[tIndex].currentForagingRound = territory[1]; // number of foraging rounds passed

            // Check index 3, 5, and 7. If not blank,
            // then get the name from that index and the current spice count from the next index.
            breeding.territory[tIndex].spiceRewards = [3, 5, 7]
                .filter(i => territory[i] && territory[i] != 'Blank')
                .map(i => ({ type: territory[i], count: territory[i + 1] }));

            const territoryPets = pets.slice(27 + (4 * index), 27 + (4 * index) + 4);

            territoryPets.forEach(pet => {
                breeding.territory[tIndex].pets.push(new Pet(pet[0] as string, breeding.genes[pet[1] as number], pet[2] as number));
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

    // We don't actually need to do this inside the "update" function, but feels more right.
    breeding.territory.filter(territory => territory.index != 14).forEach((territory, index) => {
        // Lava does some weird math to skip territory 14 in some scenarios.
        const tIndex = Math.round(index + Math.floor((index + 86.1) / 100))
        const beforeIndex = index == 14 ? 13 : tIndex - 1;
        const afterIndex = index == 13 ? 15 : tIndex + 1;
        territory.setTrekInfo(
            breeding.territory[beforeIndex] ? breeding.territory[beforeIndex].pets : [],
            breeding.territory[afterIndex] ? breeding.territory[afterIndex].pets : [],
            breeding.upgrade[6].getBonus() / 100
        )
    })

    return breeding;
}

