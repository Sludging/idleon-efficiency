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
                "combatDescription": "When in combat, all pets on team deal 1.20x Damage"
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
                "x2": 17,
                "lowerLetter": "e",
                "upperLetter": "E",
                "description": "Every 1 sec, heal whatever pet you are holding down on for 10% HP. On PC, you just need you mouse over the pet. On Phones, your finger must be on the pet. This lasts 15 seconds.",
                "combatDescription": "When in Fence Yard, increases Breedability Multiplier of this pet species"
            }),
        new PetGeneBase(5, <PetGeneModel>{
                "name": "Shiny",
                "abilityType": AbilityTypeEnum.Unsure,
                "x2": 15,
                "lowerLetter": "f",
                "upperLetter": "F",
                "description": "Thinks very happy thoughts. You can't see this of course, but trust me that lil' guy out there is happy!",
                "combatDescription": "When in Fence Yard, levels up the Shiny Passive Bonus of this pet species over time"
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
                "description": "Permanently gives all pets +1% Crit Chance, +5% Crit DMG, and +2% ability regen speed. After 20 stacks, additional stacks give less bonus.",
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
                "description": "Turns all friendly attacks into Cursed Skulls",
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
                "description": "Shoots multiple rocks based on the total number of blocks by your team. Rocks deal 250% Damage. Resets total number of blocks when activated",
                "combatDescription": "When in combat, all pets start 2x max HP. Multiplies with other defstone pets."
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
                "x2": 6,
                "lowerLetter": "v",
                "upperLetter": "V",
                "description": "Activates a random ability, selected from all the abilites across all pets you've ever unlocked",
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
                "combatDescription": "When in Fence Yard, randomly lays eggs which can be picked up and will appear in your incubator. Egg laying time takes MANY hours, but will stay until you revisit the pet yard personally, you don't need to stand around personally and wait."
            }),
        new PetGeneBase(24, <PetGeneModel>{
                "name": "Lazarus",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 5,
                "lowerLetter": "y",
                "upperLetter": "Y",
                "description": "Fires a laser, dealing 100% Damage to all enemies every 1 sec. Strangely enough, the laser will continue zapping as long as you dont click anything.",
                "combatDescription": "When in combat, all pets have their abilities fill up +10% faster"
            }),
        new PetGeneBase(25, <PetGeneModel>{
                "name": "Trasher",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 20,
                "lowerLetter": "z",
                "upperLetter": "Z",
                "description": "The next 6 taps delete any enemy attack you tap on. This ability will not refill while you have taps remaining",
                "combatDescription": "When in Fence Yard, +25 daily spice claims. Only works if pet is in Fence Yard before the start of the day."
            }),
        new PetGeneBase(26, <PetGeneModel>{
                "name": "Miasma",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 60,
                "lowerLetter": "1",
                "upperLetter": "0",
                "description": "Fully heal all pets. Also, for 60 sec all enemies have -100% crit chance and all pets have +20% block chance. Always starts 100% filled",
                "combatDescription": "When foraging, all pets on the team contribute 4.00x more Foraging Speed if there aren't two pets of the same type."
            }),
        new PetGeneBase(27, <PetGeneModel>{
                "name": "Converter",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 25,
                "lowerLetter": "3",
                "upperLetter": "2",
                "description": "For 15 seconds, all basic fist attacks have a 30% chance to turn into the weapon of that pet's ability, but only if their ability is a weapon.",
                "combatDescription": "When foraging, there is a 50% chance to not reset trekking progress when claiming, essentially giving you FREE SPICE! Multiple converter pets won't stack. @ WARNING: Placing this pet in a territory will reset that territory's trekking progress."
            }),
        new PetGeneBase(28, <PetGeneModel>{
                "name": "Heavyweight",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 10,
                "lowerLetter": "5",
                "upperLetter": "4",
                "description": "Shoots a giant fist that deals 300% Damage. The giant fist itself shoots a basic fist attack every 1 sec.",
                "combatDescription": "When in combat, all pets shoot their basic fist attacks +10% faster"
            }),
        new PetGeneBase(29, <PetGeneModel>{
                "name": "Fastihoop",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 13,
                "lowerLetter": "7",
                "upperLetter": "6",
                "description": "Shoots a gold hoop, which deals 50% Damage. Each bullet that passes through the hoop has a 30% chance to give a permanent +1 Fastidious buff.",
                "combatDescription": "When in combat, all pets have a +20% crit chance"
            }),
        new PetGeneBase(30, <PetGeneModel>{
                "name": "Ninja",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 5,
                "lowerLetter": "9",
                "upperLetter": "8",
                "description": "Shoots 4 ninja stars, which deal 175% Damage each",
                "combatDescription": "When in combat, adjacent pets and this one throw ninja stars instead of basic attacks"
            }),
        new PetGeneBase(31, <PetGeneModel>{
                "name": "Superboomer",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 9,
                "lowerLetter": "!",
                "upperLetter": "@",
                "description": "Throws 2 super boomerangs, which deal 100% Damage and has an 80% chance to bounce",
                "combatDescription": "When in combat, all pets deal 1.40x Damage"
            }),
        new PetGeneBase(32, <PetGeneModel>{
                "name": "Peapeapod",
                "abilityType": AbilityTypeEnum.Red,
                "x2": 6,
                "lowerLetter": "#",
                "upperLetter": "$",
                "description": "Shoot 10 tiny peas which deal 75% damage. Pow pow pow pow pow pow pow pow pow pow!!!",
                "combatDescription": "When in combat, all pets have a 25% chance to shoot another basic attack. This can happen multiple times in a row."
            }),
        new PetGeneBase(33, <PetGeneModel>{
                "name": "Borger",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 7,
                "lowerLetter": "%",
                "upperLetter": "^",
                "description": "Shoots 2 basic attacks, but would much rather have shot 2 burgers into its mouth",
                "combatDescription": "When in combat, this pet has +2000% hp. Big borger, big health. @ When foraging, this pet contributes 10x more foraging speed if the territory above has at least one Forager type (the Green Leaf type) pet."
            }),
        new PetGeneBase(34, <PetGeneModel>{
                "name": "GeneName",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 20,
                "lowerLetter": "&",
                "upperLetter": "*",
                "description": "Filler Description",
                "combatDescription": "Filler Description"
            }),
        new PetGeneBase(35, <PetGeneModel>{
                "name": "GeneName",
                "abilityType": AbilityTypeEnum.Green,
                "x2": 20,
                "lowerLetter": "(",
                "upperLetter": ")",
                "description": "Filler Description",
                "combatDescription": "Filler Description"
            })    
]
}
