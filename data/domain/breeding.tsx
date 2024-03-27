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
import { initPetStatRepo, PetStatBase } from "./data/PetStatRepo";
import { PetStatModel } from "./model/petStatModel";
import { initRandoListRepo } from "./data/RandoListRepo";
import { GroupByFunction, range } from "../utility";
import { InfiniteStarsBonus, Rift, SkillMastery } from "./rift";
import { Refinery } from "./refinery";
import { Sailing } from "./sailing";
import { GemStore } from "./gemPurchases";
import { TaskBoard } from "./tasks";
import { Domain, RawData } from "./base/domain";
import { Item } from "./items";

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
    "Molten Bay",
    "Smokey Lake",
    "Wurm Catacombs",
    "Spirit Fields",
    "Bamboo Forest",
    "Lullaby Airways",
    "Dharma Mesa",
]


export class PetGene {
    constructor(public index: number, public data: PetGeneModel) { }

    static fromBase(data: PetGeneBase[]): PetGene[] {
        return data.map(gene => new PetGene(gene.index, gene.data));
    }

    getImageData = (): ImageData => {
        return {
            location: `GeneReady${this.index}`,
            height: 44,
            width: 44
        }
    }
    // Image for the gene background -> Development\idleon-efficiency\data\icons\assets\graphics\1x\font-551.png
}

export class PetUpgrade {
    level: number = 0;
    gildedShellsAchiv: boolean = false;

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
                return (this.level * 0.25 + 1) * Math.min(2, Math.max(1, 1 + .1 * (this.gildedShellsAchiv ? 1 : 0)));
            case 6:
                return this.level * 6;
            case 7:
                return this.level * 0.15 + 1;
            case 8:
                return this.level * 2 + 1;
            case 9:
                return this.level * 0.02 + 1;
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
        return this.data.boostEffect.replace(/}/g, this.getBonus().toString());
    }

    static fromBase(data: PetUpgradeBase[]): PetUpgrade[] {
        return data.map(upgrade => new PetUpgrade(upgrade.index, upgrade.data));
    }
}

interface ShinyBonusData {
    index: number
    text: string
    bonusPerLevel: number
}

export class Pet {
    shinyProgress: number = 0;
    shinyLevel: number = 0;
    geneLevel: number = 0;
    breedingProgress: number = 0;
    breedingLevel: number =0;

    geneUpgradeCostReduction: number = 0;

    constructor(public index: number, public data: PetStatModel, public gene: PetGene, public shinyBonus: ShinyBonusData, public power: number = 0) { }

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

    getGeneNextLevelCost = (currentLevel: number = this.geneLevel) => {
        return (10 + (5 + this.data.unlockOrder + currentLevel) + Math.pow(Math.max(this.data.unlockOrder - 3, 1), 1.7)) * Math.pow(Math.max(this.data.unlockOrder + 1 - 6, 1), 1.12) * Math.pow(1.052 + .01 * Math.floor(currentLevel / 10), currentLevel) * Math.max(.01, 1 - this.geneUpgradeCostReduction / 100);
    }

    getBackgroundImageData = (): ImageData => {
        let cardNumber: number = 4;
        switch (this.gene.data.abilityType) {
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

    calculateShinyLevel = () => {
        if (this.shinyProgress == 0) {
            return 0;
        }

        for (let shinyLevel = 0; shinyLevel < 19; shinyLevel++) {
            const levelReq = Math.floor((1 + Math.pow(shinyLevel + 1, 1.6)) * Math.pow(1.7, shinyLevel + 1));
            if (this.shinyProgress < levelReq) {
                return shinyLevel + 1;
            }
        }

        // Should never get there but, better safe then sorry. I believe 20 is max level for shiny pets.
        return 20;
    }

    calculateBreedingLevel = () => {
        if (this.breedingProgress == 0) {
            return 0;
        }

        // TODO : get the formula for this and calculate it
        return 100;
    }

    getShinyBonus = () => {
        return this.shinyBonus.bonusPerLevel * this.shinyLevel;
    }

    getShinyText = () => {
        return this.shinyBonus.text.replace(/{/g, this.getShinyBonus().toString());
    }

    getNextShinyGoal = () => {
        if (this.shinyLevel == 0) return 0;
        return Math.floor((1 + Math.pow(this.shinyLevel, 1.6)) * Math.pow(1.7, this.shinyLevel));
    }

    static fromBase(data: PetStatBase[], genes: PetGene[]): Pet[] {
        const randoList = initRandoListRepo();
        return data.map(pet => {
            const petGeneIndex = parseInt(randoList[55].data.elements[pet.data.unlockOrder - 1]);
            const shinyIndex = parseInt(randoList[90].data.elements[pet.data.unlockOrder]);
            return new Pet(pet.index, pet.data, genes[petGeneIndex], {
                bonusPerLevel: parseInt(randoList[92].data.elements[shinyIndex]),
                index: shinyIndex,
                text: randoList[91].data.elements[shinyIndex].replace(/_/g, " ")
            }, 0);
        });
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
        return data.filter(territory => territory.data.battleName != "Filler Filler").map(territory => {
            const toReturn = new Territory(territory.index, { ...territory.data });
            // If index is over 14 (after arena territory index), the territory req is the one from the index before.
            if (toReturn.index > 14) {
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

export class ShinyBonus {
    constructor(public data: ShinyBonusData, public totalLevels: number, public pets: Pet[]) { }

    getBonus = () => {
        // Potentially add a switch case based on index.
        return this.data.bonusPerLevel * this.totalLevels;
    }
}

export class Breeding extends Domain {
    arenaWave: number = 0;
    territory: Territory[] = [];
    upgrade: PetUpgrade[] = [];
    genes: PetGene[] = [];
    eggs: Egg[] = [];
    eggCapacity: number = 0;
    eggsUnclaimed: number = 0;
    timeTillEgg: number = 0;
    totalEggTime: number = 0;

    basePets: Pet[] = [];
    fenceyardPets: Pet[] = [];
    shinyBonuses: ShinyBonus[] = [];

    speciesUnlocks: number[] = [];
    skillLevel: number = 0;
    deadCells: number = 0;
    worldGenes: number[] = [];

    hasBonus = (bonusNumber: number) => {
        if (bonusNumber > waveReqs.length) {
            return false;
        }
        return this.arenaWave >= waveReqs[bonusNumber];
    }

    setTimeForEgg = (labBonus: number, mealBonus: number, alchemyBonus: number, achivementBonus: number, skillMasteryBonus: number) => {
        this.totalEggTime = 7200 / (1 + (labBonus + (mealBonus + alchemyBonus + achivementBonus + skillMasteryBonus)) / 100);
    }

    getStatRange = () => {
        if (this.skillLevel == 0) {
            return [0, 0];
        }

        let baseMath = Math.pow(4 * this.skillLevel + Math.pow(this.skillLevel / 2, 3), 0.85);
        const eggRarity = Math.min(1, Math.max(...this.eggs.map(egg => egg.rarity)));
        const maxRange = Math.max(0.1, 1 - ((eggRarity + 4) / 12) * 0.9);
        baseMath *= (1 + eggRarity / 8);
        const maxStat = baseMath * (Math.min(1.2 + this.skillLevel / 12, 4) * Math.pow(2.71828, -10 * 0) + 1);
        const minStat = baseMath * (Math.min(1.2 + this.skillLevel / 12, 4) * Math.pow(2.71828, -10 * maxRange) + 1);
        return [minStat, maxStat];
    }

    getRawKeys(): RawData[] {
        return [
            {key: "Territory", perPlayer: false, default: []},
            {key: "Breeding", perPlayer: false, default: []},
            {key: "Pets", perPlayer: false, default: []},
            {key: "PetsStored", perPlayer: false, default: []},
        ]
    }

    init(allItems: Item[], charCount: number) {
        this.territory = Territory.fromBase(initTerritoryFightRepo());
        this.upgrade = PetUpgrade.fromBase(initPetUpgradeRepo());
        this.genes = PetGene.fromBase(initPetGeneRepo());
        this.basePets = Pet.fromBase(initPetStatRepo(), this.genes);

        return this;
    }

    parse(data: Map<string, any>): void {
        const breeding = data.get(this.getDataKey()) as Breeding;
        const optionList = data.get("OptLacc") as number[];

        const petsStored = data.get("PetsStored") as any[][];
        const pets = data.get("Pets") as any[][];
        const territory = data.get("Territory") as any[][];
        const breedingData = data.get("Breeding") as number[][];

        if (petsStored.length == 0 || pets.length == 0 || territory.length == 0 || breedingData.length == 0) {
            return;
        }

        // Some breeding data has no "persistence", so we reset the previous data.
        breeding.eggs = [];
        breeding.territory.forEach(territory => territory.pets = []);
        breeding.fenceyardPets = [];
        breeding.shinyBonuses = [];

        breeding.timeTillEgg = optionList[87];
        breeding.arenaWave = optionList[89];

        breedingData[0].forEach(egg => {
            breeding.eggs.push(new Egg(egg));
        });

        breeding.speciesUnlocks = breedingData[1];

        breedingData[2].forEach((upgrade, index) => {
            breeding.upgrade[index].level = upgrade;
        })

        const fencePets = pets.slice(0, 27);

        fencePets.forEach(pet => {
            if (pet[0] == "none") {
                return;
            }
            // If getting unknown gene, just default to the first gene as a fallback.
            const petGene = breeding.genes[pet[1] as number] ?? breeding.genes[0];
            const basePet = breeding.basePets.find(basePet => basePet.data.petId == pet[0] as string);
            if (basePet) {
                breeding.fenceyardPets.push(new Pet(basePet.index, basePet.data, petGene, basePet.shinyBonus, pet[2] as number));
            } else {
                console.log("Failed to find base pet", pet[0] as string)
            }
        })

        const territoryFightsWon = optionList[85];

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
                    if (pet[0] == "none") {
                        return;
                    }
                    // If getting unknown gene, just default to the first gene as a fallback.
                    const petGene = breeding.genes[pet[1] as number] ?? breeding.genes[0];
                    const basePet = breeding.basePets.find(basePet => basePet.data.petId == pet[0] as string);
                    if (basePet) {
                        breeding.territory[tIndex].pets.push(new Pet(basePet.index, basePet.data, petGene, basePet.shinyBonus, pet[2] as number));
                    } else {
                        console.log("Failed to find base pet", pet[0] as string)
                    }
                })
            }
        })

        breeding.worldGenes = breedingData[3];
        breeding.deadCells = breeding.worldGenes[breeding.worldGenes.length-1];

        // Calculate pet shiny levels, breeding level, and gene level
        GroupByFunction(breeding.basePets, (pet: Pet) => pet.data.world).forEach((worldPets, _) => {
            worldPets.forEach((pet, pIndex) => {
                pet.shinyProgress = breedingData[22 + pet.data.world][pIndex];
                pet.shinyLevel = pet.calculateShinyLevel();
                pet.breedingProgress = breedingData[4 + pet.data.world][pIndex];
                pet.breedingLevel = 0;
                pet.geneLevel = breedingData[4 + pet.data.world][pIndex];
            })
        });

        // Calculate shiny total bonuses.
        GroupByFunction(breeding.basePets, (pet: Pet) => pet.shinyBonus.index).forEach((shinyPets, _) => {
            const totalLevels = shinyPets.reduce((sum, pet) => sum += pet.shinyLevel, 0);
            breeding.shinyBonuses.push(new ShinyBonus(shinyPets[0].shinyBonus, totalLevels, shinyPets));
        })
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

export const updateBreeding = (data: Map<string, any>) => {
    const breeding = data.get("breeding") as Breeding;
    const alchemy = data.get("alchemy") as Alchemy;
    const lab = data.get("lab") as Lab;
    const cooking = data.get("cooking") as Cooking;
    const players = data.get("players") as Player[];
    const achievements = data.get("achievements") as Achievement[];
    const rift = data.get("rift") as Rift;
    const gemStore = data.get("gems") as GemStore;
    const taskBoard = data.get("taskboard") as TaskBoard;

    const skillMastery = rift.bonuses.find(bonus => bonus.name == "Skill Mastery") as SkillMastery;

    const alchemyEggTimeBonus = alchemy.cauldrons.flatMap(cauldron => cauldron.bubbles).find(bubble => bubble.name == "Egg Ink")?.getBonus() ?? 0;
    const mealEggTimeBonus = cooking.meals.filter(meal => meal.bonusKey == "TimeEgg").reduce((sum, meal) => sum += meal.getBonus(), 0);
    const mainframeBonus = lab.jewels.find(jewel => jewel.active && jewel.data.description == "Reduces egg incubation time")?.getBonus() ?? 0;
    const achivementEggBonus = achievements[220].completed ? 10 : 0;
    const skillMasteryEggBonus = skillMastery.getSkillBonus(SkillsIndex.Breeding, 1);
    breeding.setTimeForEgg(mainframeBonus, mealEggTimeBonus, alchemyEggTimeBonus, achivementEggBonus, skillMasteryEggBonus);

    // Breeding level is universal, so just get it from the first player.
    breeding.skillLevel = players[0].skills.get(SkillsIndex.Breeding)?.level ?? 0;

    // Update Rarity of the Egg to know about Gilded Shells achievement.
    breeding.upgrade[5].gildedShellsAchiv = achievements[221].completed;

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

    const eggCapacityUpgrade = gemStore.purchases.find(purchase => purchase.no == 119)?.pucrhased ?? 0;
    const breedingUpgradeLevel = breeding?.upgrade.find(upgrade => upgrade.data.upgradeName == "Egg Capacity")?.level ?? 0;
    const eggMerit = taskBoard.merits.find(merit => merit.descLine1.includes("egg capacity in the Nest"));
    breeding.eggCapacity = 3 + eggCapacityUpgrade + breedingUpgradeLevel + (eggMerit ? eggMerit.level * eggMerit.bonusPerLevel : 0);
    breeding.eggsUnclaimed = breeding.eggs.filter(egg => egg.rarity > 0).length;

    return breeding;
}

export const updateAllShinyEffects = (data: Map<string, any>) => {
    const breeding = data.get("breeding") as Breeding;

    // Infinite Star Signs.
    const rift = data.get("rift") as Rift;
    const infiniteBonus = rift.bonuses.find(bonus => bonus.name == "Infinite Stars") as InfiniteStarsBonus;
    infiniteBonus.shinyBonus = breeding.shinyBonuses.find(bonus => bonus.data.index == 3)?.getBonus() ?? 0;

    // Faster Refinery
    const refinery = data.get("refinery") as Refinery;
    refinery.shinyBonusSpeed = breeding.shinyBonuses.find(bonus => bonus.data.index == 15)?.getBonus() ?? 0;

    // Minimum Travel time
    const sailing = data.get("sailing") as Sailing;
    sailing.shinyMinSpeedBonus = breeding.shinyBonuses.find(bonus => bonus.data.index == 18)?.getBonus() ?? 0;

    // Line width is handled inside lab since it already had breeding there, might refactor at some point.

    // All Meal bonuses
    const cooking = data.get("cooking") as Cooking;
    cooking.meals.forEach(meal => {
        meal.shinyBonus = breeding.shinyBonuses.find(bonus => bonus.data.index == 20)?.getBonus() ?? 0;;
    });
}