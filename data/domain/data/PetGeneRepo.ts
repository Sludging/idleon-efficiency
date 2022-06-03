import { AbilityTypeEnum } from '../enum/abilityTypeEnum';
import { PetGeneModel } from '../model/petGeneModel';

export class PetGeneBase { constructor(public index: number, public data: PetGeneModel) { } }



export const initPetGeneRepo = () => {
    return [    
        new PetGeneBase(0, <PetGeneModel>{
                "name": "Fighter",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 5,
                "lowerLetter": "a",
                "upperLetter": "A",
                "description": "Throws a Rusty Sword, which deals 200% Damage",
                "combatDescription": "When in combat, all pets on team deal 1.10x Damage"
            }),
        new PetGeneBase(1, <PetGeneModel>{
                "name": "Defender",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 10,
                "lowerLetter": "b",
                "upperLetter": "B",
                "description": "Throws an Armored Shield, which gives 85% block chance to pets it passes over, and deals 50% Damage",
                "combatDescription": "When in combat, all pets have +12% Block Chance"
            }),
        new PetGeneBase(2, <PetGeneModel>{
                "name": "Forager",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 12,
                "lowerLetter": "c",
                "upperLetter": "C",
                "description": "Heals all pets by 25% HP",
                "combatDescription": "When foraging, this pet contributes 2x Foraging Speed"
            }),
        new PetGeneBase(3, <PetGeneModel>{
                "name": "Fleeter",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 13,
                "lowerLetter": "d",
                "upperLetter": "D",
                "description": "Boosts ability recharge rate for all pets by +30% for 8 sec. Doesn't boost other Fleeter pets though.",
                "combatDescription": "When foraging, all pets contribute 1.30x more Foraging Speed"
            }),
        new PetGeneBase(4, <PetGeneModel>{
                "name": "Breeder",
                "abilityType": AbilityTypeEnum.Special,
                "x2": 15,
                "lowerLetter": "e",
                "upperLetter": "E",
                "description": "Every 1 sec, heal whatever pet you are holding down on for 5% HP. On PC, you just need you mouse over the pet. On Phones, your finger must be on the pet. This Lasts 10 seconds.",
                "combatDescription": "When in Fence Yard, increases Breedability Multiplier of this pet species"
            }),
        new PetGeneBase(5, <PetGeneModel>{
                "name": "Special",
                "abilityType": AbilityTypeEnum.Unsure,
                "x2": 15,
                "lowerLetter": "f",
                "upperLetter": "F",
                "description": "Summons shootings stars which double the damage of all attacks they touch.",
                "combatDescription": "When in Fence Yard, increases Special Passive of this pet species over time"
            }),
        new PetGeneBase(6, <PetGeneModel>{
                "name": "Mercenary",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 4,
                "lowerLetter": "g",
                "upperLetter": "G",
                "description": "Throws 2-3 small daggers which deal 150% Damage",
                "combatDescription": "When foraging, this pet contributes 2x Fight Power"
            }),
        new PetGeneBase(7, <PetGeneModel>{
                "name": "Boomer",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 7,
                "lowerLetter": "h",
                "upperLetter": "H",
                "description": "Throws a boomerang, which deals 60% Damage and has an 80% chance to bounce",
                "combatDescription": "When in combat, the pet in front of this one has ability reset to 30%"
            }),
        new PetGeneBase(8, <PetGeneModel>{
                "name": "Sniper",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 9,
                "lowerLetter": "i",
                "upperLetter": "I",
                "description": "Fires a bullet at farthest enemy. 200% Damage, +30% Crit chance, 4x Crit DMG",
                "combatDescription": "When in combat, all pets have +25% Crit DMG"
            }),
        new PetGeneBase(9, <PetGeneModel>{
                "name": "Amplifier",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 10,
                "lowerLetter": "j",
                "upperLetter": "J",
                "description": "Summons a spiral, which deals 100% Damage, and +50% more Damage for each attack that moves through it",
                "combatDescription": "When in combat, all pets have +10% Crit Chance"
            }),
        new PetGeneBase(10, <PetGeneModel>{
                "name": "Tsar",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 40,
                "lowerLetter": "k",
                "upperLetter": "K",
                "description": "Drop da bomba...",
                "combatDescription": "When foraging, the pets in the territory above and below contribute 1.50x Fight Power"
            }),
        new PetGeneBase(11, <PetGeneModel>{
                "name": "Rattler",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 4,
                "lowerLetter": "l",
                "upperLetter": "L",
                "description": "Throws 5 bones. Bones deal 5% Damage, +1% more damage for each bone ever thrown",
                "combatDescription": "When in combat, this pet's Basic Attack is now a Bone instead of a Fist"
            }),
        new PetGeneBase(12, <PetGeneModel>{
                "name": "Cursory",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 3,
                "lowerLetter": "m",
                "upperLetter": "M",
                "description": "Shoots a Cursed Skull, which deals 50% Damage, and makes all future attacks deal +5% more dmg",
                "combatDescription": "When in combat, pets in front and behind this one deal 1.50x Damage"
            }),
        new PetGeneBase(13, <PetGeneModel>{
                "name": "Fastidious",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 10,
                "lowerLetter": "n",
                "upperLetter": "N",
                "description": "Pemanently gives all pets +1% Crit Chance, +5% Crit DMG, and +2% ability regen speed. After 20 stacks, additional stacks give less bonus.",
                "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there is at least 1 Combat Pet in team"
            }),
        new PetGeneBase(14, <PetGeneModel>{
                "name": "Flashy",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 18,
                "lowerLetter": "o",
                "upperLetter": "O",
                "description": "Duplicates all friendly attacks instantly, almost like magic!",
                "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there are no Combat Pets in team"
            }),
        new PetGeneBase(15, <PetGeneModel>{
                "name": "Opticular",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 7,
                "lowerLetter": "p",
                "upperLetter": "P",
                "description": "Permanently boosts the Crit Chance of all pets. Only recharges when an attack Critical Hits",
                "combatDescription": "When foraging, this pet contributes 3x Foraging Speed if it has the largest Number on the team"
            }),
        new PetGeneBase(16, <PetGeneModel>{
                "name": "Monolithic",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 20,
                "lowerLetter": "q",
                "upperLetter": "Q",
                "description": "Freezes time for 6 seconds. During this, pet continue to shoot Basic Attacks and regenerate abilities",
                "combatDescription": "When foraging, the requirement to fill the reward bar goes up less every time it is filled"
            }),
        new PetGeneBase(17, <PetGeneModel>{
                "name": "Alchemic",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 9,
                "lowerLetter": "r",
                "upperLetter": "R",
                "description": "Turns all friend attacks into Cursed Skulls",
                "combatDescription": "When foraging, there is a 50% chance for 2 spices when filling the reward bar"
            }),
        new PetGeneBase(18, <PetGeneModel>{
                "name": "Badumdum",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 7,
                "lowerLetter": "s",
                "upperLetter": "S",
                "description": "Permanently boost the Basic Attack speed of all pets. Only recharges when a Basic Attack hits",
                "combatDescription": "When foraging, the pets in the territory above and below contribute 1.20x Foraging Speed"
            }),
        new PetGeneBase(19, <PetGeneModel>{
                "name": "Defstone",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 5,
                "lowerLetter": "t",
                "upperLetter": "T",
                "description": "Shoots rocks bases on the total number of blocks by your team. Resets block amount when activated",
                "combatDescription": "When in combat, all pets have +50% HP"
            }),
        new PetGeneBase(20, <PetGeneModel>{
                "name": "Targeter",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 8,
                "lowerLetter": "u",
                "upperLetter": "U",
                "description": "The next non Basic Attack fired will deal x2.50 Damage.",
                "combatDescription": "When foraging, this pet contributes 5x Foraging Speed if the pet above this one is also a Targeter"
            }),
        new PetGeneBase(21, <PetGeneModel>{
                "name": "Looter",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 4,
                "lowerLetter": "v",
                "upperLetter": "V",
                "description": "Activates a random ability, selected from all the abilites across all pets you've ever had",
                "combatDescription": "When foraging, there is a small chance to find extra spices when filling the reward bar many times before claiming"
            }),
        new PetGeneBase(22, <PetGeneModel>{
                "name": "Refiller",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 30,
                "lowerLetter": "w",
                "upperLetter": "W",
                "description": "For 5 seconds, every non Basic Attack that hits a monster refills a random ability on the team by 5%",
                "combatDescription": "When in combat, all abilites start at +25% filled"
            }),
        new PetGeneBase(23, <PetGeneModel>{
                "name": "Eggshell",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 12,
                "lowerLetter": "x",
                "upperLetter": "X",
                "description": "For 10 seconds, every critical hit boosts the block chance of all pets by 1%",
                "combatDescription": "When in Fence Yard, randomly lays eggs which can be picked up and will appear in your incubator"
            })    
]
}
