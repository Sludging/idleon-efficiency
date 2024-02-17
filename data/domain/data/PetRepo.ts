import { AbilityTypeEnum } from '../enum/abilityTypeEnum';
import { PetGeneModel } from '../model/petGeneModel';
import { PetModel } from '../model/petModel';
import { PetStatModel } from '../model/petStatModel';
import { ShinyBonusModel } from '../model/shinyBonusModel';

export class PetBase { constructor(public index: number, public data: PetModel) { } }



export const initPetRepo = () => {
    return [    
        new PetBase(0, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "mushG",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 1,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Fighter",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "a",
                    "upperLetter": "A",
                    "description": "Throws a Rusty Sword, which deals 200% Damage",
                    "combatDescription": "When in combat, all pets on team deal 1.20x Damage"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 16,
                    "shinyBonusDesc": "+{% Faster Shiny Pet Lv Up Rate",
                    "bonusPerLvl": 3
                }
            }),
        new PetBase(1, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet0",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 2,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Forager",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 12,
                    "lowerLetter": "c",
                    "upperLetter": "C",
                    "description": "Heals all pets by 25% HP",
                    "combatDescription": "When foraging, this pet contributes 2x Foraging Speed"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 3, "shinyBonusDesc": "+{ Infinite Star Signs", "bonusPerLvl": 2}
            }),
        new PetBase(2, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "frogG",
                    "x1": 1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 3,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Boomer",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 7,
                    "lowerLetter": "h",
                    "upperLetter": "H",
                    "description": "Throws a boomerang, which deals 60% Damage and has an 80% chance to bounce",
                    "combatDescription": "When in combat, the pet in front of this one has ability reset to 30%"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 5, "shinyBonusDesc": "+{% Total Damage", "bonusPerLvl": 1}
            }),
        new PetBase(3, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "beanG",
                    "x1": 2,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 4,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Fleeter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 13,
                    "lowerLetter": "d",
                    "upperLetter": "D",
                    "description": "Boosts ability recharge rate for all pets by +30% for 8 sec. Doesn't boost other Fleeter pets though.",
                    "combatDescription": "When foraging, all pets contribute 1.30x more Foraging Speed"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 15, "shinyBonusDesc": "+{% Faster Refinery Speed", "bonusPerLvl": 2}
            }),
        new PetBase(4, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "mushR",
                    "x1": 3,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 5,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Fighter",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "a",
                    "upperLetter": "A",
                    "description": "Throws a Rusty Sword, which deals 200% Damage",
                    "combatDescription": "When in combat, all pets on team deal 1.20x Damage"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 20, "shinyBonusDesc": "+{% Bonuses from All Meals", "bonusPerLvl": 1}
            }),
        new PetBase(5, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "slimeG",
                    "x1": 4,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 6,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Cursory",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 3,
                    "lowerLetter": "m",
                    "upperLetter": "M",
                    "description": "Shoots a Cursed Skull, which deals 50% Damage, and makes all future attacks deal +5% more dmg",
                    "combatDescription": "When in combat, pets in front and behind this one deal 1.50x Damage"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 0, "shinyBonusDesc": "+{% Drop Rate", "bonusPerLvl": 1}
            }),
        new PetBase(6, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet1",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 8,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Amplifier",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 10,
                    "lowerLetter": "j",
                    "upperLetter": "J",
                    "description": "Summons a spiral, which deals 100% Damage, and +50% more Damage for each attack that moves through it",
                    "combatDescription": "When in combat, all pets have +10% Crit Chance"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 3, "shinyBonusDesc": "+{ Infinite Star Signs", "bonusPerLvl": 2}
            }),
        new PetBase(7, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "snakeG",
                    "x1": 12,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 9,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Targeter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 8,
                    "lowerLetter": "u",
                    "upperLetter": "U",
                    "description": "The next non Basic Attack fired will deal x2.50 Damage.",
                    "combatDescription": "When foraging, this pet contributes 5x Foraging Speed if the pet above this one is also a Targeter"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 4, "shinyBonusDesc": "+{% Multikill Per Tier", "bonusPerLvl": 1}
            }),
        new PetBase(8, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "carrotO",
                    "x1": 12,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 11,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Mercenary",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 4,
                    "lowerLetter": "g",
                    "upperLetter": "G",
                    "description": "Throws 2-3 small daggers which deal 150% Damage",
                    "combatDescription": "When foraging, this pet contributes 2x Fight Power"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 22,
                    "shinyBonusDesc": "+{ Base Efficiency for All Skills",
                    "bonusPerLvl": 20
                }
            }),
        new PetBase(9, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "goblinG",
                    "x1": 12,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 13,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Refiller",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 30,
                    "lowerLetter": "w",
                    "upperLetter": "W",
                    "description": "For 5 seconds, every non Basic Attack that hits a monster refills a random ability on the team by 5%",
                    "combatDescription": "When in combat, all abilites start at +25% filled"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 3, "shinyBonusDesc": "+{ Infinite Star Signs", "bonusPerLvl": 2}
            }),
        new PetBase(10, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "plank",
                    "x1": 13,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 16,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Miasma",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 60,
                    "lowerLetter": "1",
                    "upperLetter": "0",
                    "description": "Fully heal all pets. Also, for 60 sec all enemies have -100% crit chance and all pets have +20% block chance. Always starts 100% filled",
                    "combatDescription": "When foraging, all pets on the team contribute 4.00x more Foraging Speed if there aren't two pets of the same type."
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 16,
                    "shinyBonusDesc": "+{% Faster Shiny Pet Lv Up Rate",
                    "bonusPerLvl": 3
                }
            }),
        new PetBase(11, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "frogBIG",
                    "x1": 13,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 19,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Amplifier",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 10,
                    "lowerLetter": "j",
                    "upperLetter": "J",
                    "description": "Summons a spiral, which deals 100% Damage, and +50% more Damage for each attack that moves through it",
                    "combatDescription": "When in combat, all pets have +10% Crit Chance"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 22,
                    "shinyBonusDesc": "+{ Base Efficiency for All Skills",
                    "bonusPerLvl": 20
                }
            }),
        new PetBase(12, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet2",
                    "x1": 14,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 22,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Heavyweight",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 10,
                    "lowerLetter": "5",
                    "upperLetter": "4",
                    "description": "Shoots a giant fist that deals 300% Damage. The giant fist itself shoots a basic fist attack every 1 sec.",
                    "combatDescription": "When in combat, all pets shoot their basic fist attacks +10% faster"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 7, "shinyBonusDesc": "+{ Base AGI", "bonusPerLvl": 2}
            }),
        new PetBase(13, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "branch",
                    "x1": 14,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 28,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Refiller",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 30,
                    "lowerLetter": "w",
                    "upperLetter": "W",
                    "description": "For 5 seconds, every non Basic Attack that hits a monster refills a random ability on the team by 5%",
                    "combatDescription": "When in combat, all abilites start at +25% filled"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 23, "shinyBonusDesc": "+{ Base Critters per Trap", "bonusPerLvl": 1}
            }),
        new PetBase(14, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "acorn",
                    "x1": 15,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 33,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Borger",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 7,
                    "lowerLetter": "%",
                    "upperLetter": "^",
                    "description": "Shoots 2 basic attacks, but would much rather have shot 2 burgers into its mouth",
                    "combatDescription": "When in combat, this pet has +2000% hp. Big borger, big health. @ When foraging, this pet contributes 10x more foraging speed if the territory above has at least one Forager type (the Green Leaf type) pet."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 5, "shinyBonusDesc": "+{% Total Damage", "bonusPerLvl": 1}
            }),
        new PetBase(15, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "poopSmall",
                    "x1": 15,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 38,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Tsar",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 40,
                    "lowerLetter": "k",
                    "upperLetter": "K",
                    "description": "Drop da bomba...",
                    "combatDescription": "When foraging, the pets in the territory above and below contribute 1.50x Fight Power"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 24, "shinyBonusDesc": "+{% Farming EXP gain", "bonusPerLvl": 1}
            }),
        new PetBase(16, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "ratB",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 44,
                    "world": 0
                },
                "gene": <PetGeneModel>{
                    "name": "Monolithic",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 20,
                    "lowerLetter": "q",
                    "upperLetter": "Q",
                    "description": "Freezes time for 6 seconds. During this, pet continue to shoot Basic Attacks and regenerate abilities",
                    "combatDescription": "When foraging, the requirement to fill the reward bar goes up less every time it is filled"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 4, "shinyBonusDesc": "+{% Multikill Per Tier", "bonusPerLvl": 1}
            }),
        new PetBase(17, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "jarSand",
                    "x1": 16,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 7,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Looter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 6,
                    "lowerLetter": "v",
                    "upperLetter": "V",
                    "description": "Activates a random ability, selected from all the abilites across all pets you've ever unlocked",
                    "combatDescription": "When foraging, there is a small chance to find extra spices when filling the reward bar many times before claiming"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 1, "shinyBonusDesc": "+{% Class EXP", "bonusPerLvl": 1}
            }),
        new PetBase(18, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "mimicA",
                    "x1": 16,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 10,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Defender",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 10,
                    "lowerLetter": "b",
                    "upperLetter": "B",
                    "description": "Throws an Armored Shield, which gives 85% block chance to pets it passes over, and deals 50% Damage",
                    "combatDescription": "When in combat, all pets have +12% Block Chance"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 10, "shinyBonusDesc": "+{ Tab 1 Talent Pts", "bonusPerLvl": 2}
            }),
        new PetBase(19, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "crabcake",
                    "x1": 17,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 12,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Fleeter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 13,
                    "lowerLetter": "d",
                    "upperLetter": "D",
                    "description": "Boosts ability recharge rate for all pets by +30% for 8 sec. Doesn't boost other Fleeter pets though.",
                    "combatDescription": "When foraging, all pets contribute 1.30x more Foraging Speed"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 2, "shinyBonusDesc": "+{% Skill EXP", "bonusPerLvl": 2}
            }),
        new PetBase(20, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "coconut",
                    "x1": 18,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 14,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Forager",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 12,
                    "lowerLetter": "c",
                    "upperLetter": "C",
                    "description": "Heals all pets by 25% HP",
                    "combatDescription": "When foraging, this pet contributes 2x Foraging Speed"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 11, "shinyBonusDesc": "+{ Tab 2 Talent Pts", "bonusPerLvl": 2}
            }),
        new PetBase(21, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet3",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 15,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Opticular",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 7,
                    "lowerLetter": "p",
                    "upperLetter": "P",
                    "description": "Permanently boosts the Crit Chance of all pets. Only recharges when an attack Critical Hits",
                    "combatDescription": "When foraging, this pet contributes 3x Foraging Speed if it has the largest Number on the team"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 19, "shinyBonusDesc": "+{% Line Width in Lab", "bonusPerLvl": 1}
            }),
        new PetBase(22, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "sandcastle",
                    "x1": 19,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 17,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Defstone",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "t",
                    "upperLetter": "T",
                    "description": "Shoots multiple rocks based on the total number of blocks by your team. Rocks deal 250% Damage. Resets total number of blocks when activated",
                    "combatDescription": "When in combat, all pets start 2x max HP. Multiplies with other defstone pets."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 6, "shinyBonusDesc": "+{ Base STR", "bonusPerLvl": 2}
            }),
        new PetBase(23, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "pincermin",
                    "x1": 19,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 18,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Fighter",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "a",
                    "upperLetter": "A",
                    "description": "Throws a Rusty Sword, which deals 200% Damage",
                    "combatDescription": "When in combat, all pets on team deal 1.20x Damage"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 5, "shinyBonusDesc": "+{% Total Damage", "bonusPerLvl": 1}
            }),
        new PetBase(24, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "potato",
                    "x1": 20,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 19,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Amplifier",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 10,
                    "lowerLetter": "j",
                    "upperLetter": "J",
                    "description": "Summons a spiral, which deals 100% Damage, and +50% more Damage for each attack that moves through it",
                    "combatDescription": "When in combat, all pets have +10% Crit Chance"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 22,
                    "shinyBonusDesc": "+{ Base Efficiency for All Skills",
                    "bonusPerLvl": 20
                }
            }),
        new PetBase(25, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "steak",
                    "x1": 18,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 20,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Fastidious",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 10,
                    "lowerLetter": "n",
                    "upperLetter": "N",
                    "description": "Permanently gives all pets +1% Crit Chance, +5% Crit DMG, and +2% ability regen speed. After 20 stacks, additional stacks give less bonus.",
                    "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there is at least 1 Combat Pet in team"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 21,
                    "shinyBonusDesc": "+{% Higher Artifact Find Chance",
                    "bonusPerLvl": 2
                }
            }),
        new PetBase(26, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet4",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 24,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Badumdum",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 7,
                    "lowerLetter": "s",
                    "upperLetter": "S",
                    "description": "Permanently boost the Basic Attack speed of all pets. Only recharges when a Basic Attack hits",
                    "combatDescription": "When foraging, the pets in the territory above and below contribute 1.20x Foraging Speed"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 15, "shinyBonusDesc": "+{% Faster Refinery Speed", "bonusPerLvl": 2}
            }),
        new PetBase(27, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "moonman",
                    "x1": 20,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 26,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Mercenary",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 4,
                    "lowerLetter": "g",
                    "upperLetter": "G",
                    "description": "Throws 2-3 small daggers which deal 150% Damage",
                    "combatDescription": "When foraging, this pet contributes 2x Fight Power"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 8, "shinyBonusDesc": "+{ Base WIS", "bonusPerLvl": 2}
            }),
        new PetBase(28, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "sandgiant",
                    "x1": 7,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 30,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Rattler",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 4,
                    "lowerLetter": "l",
                    "upperLetter": "L",
                    "description": "Throws 5 bones. Bones deal 5% Damage, +1% more damage for each bone ever thrown",
                    "combatDescription": "When in combat, this pet's Basic Attack is now a Bone instead of a Fist"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 22,
                    "shinyBonusDesc": "+{ Base Efficiency for All Skills",
                    "bonusPerLvl": 20
                }
            }),
        new PetBase(29, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "snailZ",
                    "x1": 7,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 35,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Monolithic",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 20,
                    "lowerLetter": "q",
                    "upperLetter": "Q",
                    "description": "Freezes time for 6 seconds. During this, pet continue to shoot Basic Attacks and regenerate abilities",
                    "combatDescription": "When foraging, the requirement to fill the reward bar goes up less every time it is filled"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 13, "shinyBonusDesc": "+{ Tab 4 Talent Pts", "bonusPerLvl": 2}
            }),
        new PetBase(30, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "shovelR",
                    "x1": 7,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 46,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Lazarus",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "y",
                    "upperLetter": "Y",
                    "description": "Fires a laser, dealing 100% Damage to all enemies every 1 sec. Strangely enough, the laser will continue zapping as long as you dont click anything.",
                    "combatDescription": "When in combat, all pets have their abilities fill up +10% faster"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 24, "shinyBonusDesc": "+{% Farming EXP gain", "bonusPerLvl": 1}
            }),
        new PetBase(31, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "steakR",
                    "x1": 7,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 53,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Trasher",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 20,
                    "lowerLetter": "z",
                    "upperLetter": "Z",
                    "description": "The next 6 taps delete any enemy attack you tap on. This ability will not refill while you have taps remaining",
                    "combatDescription": "When in Fence Yard, +25 daily spice claims. Only works if pet is in Fence Yard before the start of the day."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 9, "shinyBonusDesc": "+{ Base LUK", "bonusPerLvl": 2}
            }),
        new PetBase(32, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "potatoB",
                    "x1": 7,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 60,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Monolithic",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 20,
                    "lowerLetter": "q",
                    "upperLetter": "Q",
                    "description": "Freezes time for 6 seconds. During this, pet continue to shoot Basic Attacks and regenerate abilities",
                    "combatDescription": "When foraging, the requirement to fill the reward bar goes up less every time it is filled"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 16,
                    "shinyBonusDesc": "+{% Faster Shiny Pet Lv Up Rate",
                    "bonusPerLvl": 3
                }
            }),
        new PetBase(33, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet5",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 62,
                    "world": 1
                },
                "gene": <PetGeneModel>{
                    "name": "Eggshell",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 12,
                    "lowerLetter": "x",
                    "upperLetter": "X",
                    "description": "For 10 seconds, every critical hit boosts the block chance of all pets by 1%",
                    "combatDescription": "When in Fence Yard, randomly lays eggs which can be picked up and will appear in your incubator. Egg laying time takes MANY hours, but will stay until you revisit the pet yard personally, you don't need to stand around personally and wait."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 25, "shinyBonusDesc": "+{% Summoning EXP gain", "bonusPerLvl": 1}
            }),
        new PetBase(34, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "sheep",
                    "x1": 7,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 21,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Sniper",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 9,
                    "lowerLetter": "i",
                    "upperLetter": "I",
                    "description": "Fires a bullet at farthest enemy. 200% Damage, +30% Crit chance, 4x Crit DMG",
                    "combatDescription": "When in combat, all pets have +25% Crit DMG"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 20, "shinyBonusDesc": "+{% Bonuses from All Meals", "bonusPerLvl": 1}
            }),
        new PetBase(35, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "flake",
                    "x1": 8,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 23,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Ninja",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "9",
                    "upperLetter": "8",
                    "description": "Shoots 4 ninja stars, which deal 175% Damage each",
                    "combatDescription": "When in combat, adjacent pets and this one throw ninja stars instead of basic attacks"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 12, "shinyBonusDesc": "+{ Tab 3 Talent Pts", "bonusPerLvl": 2}
            }),
        new PetBase(36, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "stache",
                    "x1": 8,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 25,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Eggshell",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 12,
                    "lowerLetter": "x",
                    "upperLetter": "X",
                    "description": "For 10 seconds, every critical hit boosts the block chance of all pets by 1%",
                    "combatDescription": "When in Fence Yard, randomly lays eggs which can be picked up and will appear in your incubator. Egg laying time takes MANY hours, but will stay until you revisit the pet yard personally, you don't need to stand around personally and wait."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 3, "shinyBonusDesc": "+{ Infinite Star Signs", "bonusPerLvl": 2}
            }),
        new PetBase(37, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "skele",
                    "x1": 9,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 27,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Opticular",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 7,
                    "lowerLetter": "p",
                    "upperLetter": "P",
                    "description": "Permanently boosts the Crit Chance of all pets. Only recharges when an attack Critical Hits",
                    "combatDescription": "When foraging, this pet contributes 3x Foraging Speed if it has the largest Number on the team"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 0, "shinyBonusDesc": "+{% Drop Rate", "bonusPerLvl": 1}
            }),
        new PetBase(38, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet6",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 29,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Flashy",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 18,
                    "lowerLetter": "o",
                    "upperLetter": "O",
                    "description": "Duplicates all friendly attacks instantly, almost like magic!",
                    "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there are no Combat Pets in team"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 9, "shinyBonusDesc": "+{ Base LUK", "bonusPerLvl": 2}
            }),
        new PetBase(39, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "bloque",
                    "x1": 9,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 31,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Alchemic",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 9,
                    "lowerLetter": "r",
                    "upperLetter": "R",
                    "description": "Turns all friendly attacks into Cursed Skulls",
                    "combatDescription": "When foraging, there is a 50% chance for 2 spices when filling the reward bar"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 4, "shinyBonusDesc": "+{% Multikill Per Tier", "bonusPerLvl": 1}
            }),
        new PetBase(40, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "mamoth",
                    "x1": 10,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 32,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Looter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 6,
                    "lowerLetter": "v",
                    "upperLetter": "V",
                    "description": "Activates a random ability, selected from all the abilites across all pets you've ever unlocked",
                    "combatDescription": "When foraging, there is a small chance to find extra spices when filling the reward bar many times before claiming"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 21,
                    "shinyBonusDesc": "+{% Higher Artifact Find Chance",
                    "bonusPerLvl": 2
                }
            }),
        new PetBase(41, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "snowball",
                    "x1": 10,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 34,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Defstone",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "t",
                    "upperLetter": "T",
                    "description": "Shoots multiple rocks based on the total number of blocks by your team. Rocks deal 250% Damage. Resets total number of blocks when activated",
                    "combatDescription": "When in combat, all pets start 2x max HP. Multiplies with other defstone pets."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 1, "shinyBonusDesc": "+{% Class EXP", "bonusPerLvl": 1}
            }),
        new PetBase(42, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "penguin",
                    "x1": 11,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 36,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Fastidious",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 10,
                    "lowerLetter": "n",
                    "upperLetter": "N",
                    "description": "Permanently gives all pets +1% Crit Chance, +5% Crit DMG, and +2% ability regen speed. After 20 stacks, additional stacks give less bonus.",
                    "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there is at least 1 Combat Pet in team"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 3, "shinyBonusDesc": "+{ Infinite Star Signs", "bonusPerLvl": 2}
            }),
        new PetBase(43, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "thermostat",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 37,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Sniper",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 9,
                    "lowerLetter": "i",
                    "upperLetter": "I",
                    "description": "Fires a bullet at farthest enemy. 200% Damage, +30% Crit chance, 4x Crit DMG",
                    "combatDescription": "When in combat, all pets have +25% Crit DMG"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 2, "shinyBonusDesc": "+{% Skill EXP", "bonusPerLvl": 2}
            }),
        new PetBase(44, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "glass",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 39,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Boomer",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 7,
                    "lowerLetter": "h",
                    "upperLetter": "H",
                    "description": "Throws a boomerang, which deals 60% Damage and has an 80% chance to bounce",
                    "combatDescription": "When in combat, the pet in front of this one has ability reset to 30%"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 16,
                    "shinyBonusDesc": "+{% Faster Shiny Pet Lv Up Rate",
                    "bonusPerLvl": 3
                }
            }),
        new PetBase(45, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "snakeB",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 40,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Eggshell",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 12,
                    "lowerLetter": "x",
                    "upperLetter": "X",
                    "description": "For 10 seconds, every critical hit boosts the block chance of all pets by 1%",
                    "combatDescription": "When in Fence Yard, randomly lays eggs which can be picked up and will appear in your incubator. Egg laying time takes MANY hours, but will stay until you revisit the pet yard personally, you don't need to stand around personally and wait."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 14, "shinyBonusDesc": "+{ Star Talent Pts", "bonusPerLvl": 2}
            }),
        new PetBase(46, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet7",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 43,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Trasher",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 20,
                    "lowerLetter": "z",
                    "upperLetter": "Z",
                    "description": "The next 6 taps delete any enemy attack you tap on. This ability will not refill while you have taps remaining",
                    "combatDescription": "When in Fence Yard, +25 daily spice claims. Only works if pet is in Fence Yard before the start of the day."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 6, "shinyBonusDesc": "+{ Base STR", "bonusPerLvl": 2}
            }),
        new PetBase(47, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "speaker",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 51,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Converter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 25,
                    "lowerLetter": "3",
                    "upperLetter": "2",
                    "description": "For 15 seconds, all basic fist attacks have a 30% chance to turn into the weapon of that pet's ability, but only if their ability is a weapon.",
                    "combatDescription": "When foraging, there is a 50% chance to not reset trekking progress when claiming, essentially giving you FREE SPICE! Multiple converter pets won't stack. @ WARNING: Placing this pet in a territory will reset that territory's trekking progress."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 8, "shinyBonusDesc": "+{ Base WIS", "bonusPerLvl": 2}
            }),
        new PetBase(48, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "eye",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 54,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Lazarus",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 5,
                    "lowerLetter": "y",
                    "upperLetter": "Y",
                    "description": "Fires a laser, dealing 100% Damage to all enemies every 1 sec. Strangely enough, the laser will continue zapping as long as you dont click anything.",
                    "combatDescription": "When in combat, all pets have their abilities fill up +10% faster"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 24, "shinyBonusDesc": "+{% Farming EXP gain", "bonusPerLvl": 1}
            }),
        new PetBase(49, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "ram",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 58,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Amplifier",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 10,
                    "lowerLetter": "j",
                    "upperLetter": "J",
                    "description": "Summons a spiral, which deals 100% Damage, and +50% more Damage for each attack that moves through it",
                    "combatDescription": "When in combat, all pets have +10% Crit Chance"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 4, "shinyBonusDesc": "+{% Multikill Per Tier", "bonusPerLvl": 1}
            }),
        new PetBase(50, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "skele2",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 61,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Targeter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 8,
                    "lowerLetter": "u",
                    "upperLetter": "U",
                    "description": "The next non Basic Attack fired will deal x2.50 Damage.",
                    "combatDescription": "When foraging, this pet contributes 5x Foraging Speed if the pet above this one is also a Targeter"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 24, "shinyBonusDesc": "+{% Farming EXP gain", "bonusPerLvl": 1}
            }),
        new PetBase(51, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet8",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 64,
                    "world": 2
                },
                "gene": <PetGeneModel>{
                    "name": "Converter",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 25,
                    "lowerLetter": "3",
                    "upperLetter": "2",
                    "description": "For 15 seconds, all basic fist attacks have a 30% chance to turn into the weapon of that pet's ability, but only if their ability is a weapon.",
                    "combatDescription": "When foraging, there is a 50% chance to not reset trekking progress when claiming, essentially giving you FREE SPICE! Multiple converter pets won't stack. @ WARNING: Placing this pet in a territory will reset that territory's trekking progress."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 5, "shinyBonusDesc": "+{% Total Damage", "bonusPerLvl": 1}
            }),
        new PetBase(52, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "mushP",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 38,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Tsar",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 40,
                    "lowerLetter": "k",
                    "upperLetter": "K",
                    "description": "Drop da bomba...",
                    "combatDescription": "When foraging, the pets in the territory above and below contribute 1.50x Fight Power"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 24, "shinyBonusDesc": "+{% Farming EXP gain", "bonusPerLvl": 1}
            }),
        new PetBase(53, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4a2",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 41,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Rattler",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 4,
                    "lowerLetter": "l",
                    "upperLetter": "L",
                    "description": "Throws 5 bones. Bones deal 5% Damage, +1% more damage for each bone ever thrown",
                    "combatDescription": "When in combat, this pet's Basic Attack is now a Bone instead of a Fist"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 17, "shinyBonusDesc": "+{% Sail Captain EXP Gain", "bonusPerLvl": 3}
            }),
        new PetBase(54, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4a3",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 42,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Flashy",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 18,
                    "lowerLetter": "o",
                    "upperLetter": "O",
                    "description": "Duplicates all friendly attacks instantly, almost like magic!",
                    "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there are no Combat Pets in team"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 25, "shinyBonusDesc": "+{% Summoning EXP gain", "bonusPerLvl": 1}
            }),
        new PetBase(55, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "demonP",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 45,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Superboomer",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 9,
                    "lowerLetter": "!",
                    "upperLetter": "@",
                    "description": "Throws 2 super boomerangs, which deal 100% Damage and has an 80% chance to bounce",
                    "combatDescription": "When in combat, all pets deal 1.40x Damage"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 15, "shinyBonusDesc": "+{% Faster Refinery Speed", "bonusPerLvl": 2}
            }),
        new PetBase(56, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4b1",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 47,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Borger",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 7,
                    "lowerLetter": "%",
                    "upperLetter": "^",
                    "description": "Shoots 2 basic attacks, but would much rather have shot 2 burgers into its mouth",
                    "combatDescription": "When in combat, this pet has +2000% hp. Big borger, big health. @ When foraging, this pet contributes 10x more foraging speed if the territory above has at least one Forager type (the Green Leaf type) pet."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 7, "shinyBonusDesc": "+{ Base AGI", "bonusPerLvl": 2}
            }),
        new PetBase(57, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet9",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 48,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Peapeapod",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 6,
                    "lowerLetter": "#",
                    "upperLetter": "$",
                    "description": "Shoot 10 tiny peas which deal 75% damage. Pow pow pow pow pow pow pow pow pow pow!!!",
                    "combatDescription": "When in combat, all pets have a 25% chance to shoot another basic attack. This can happen multiple times in a row."
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 18,
                    "shinyBonusDesc": "+{% Lower Minimum Travel Time for Sailing",
                    "bonusPerLvl": 1
                }
            }),
        new PetBase(58, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4b2",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 49,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Fastihoop",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 13,
                    "lowerLetter": "7",
                    "upperLetter": "6",
                    "description": "Shoots a gold hoop, which deals 50% Damage. Each bullet that passes through the hoop has a 30% chance to give a permanent +1 Fastidious buff.",
                    "combatDescription": "When in combat, all pets have a +20% crit chance"
                },
                "shinyBonus": <ShinyBonusModel>{
                    "shinyIndex": 21,
                    "shinyBonusDesc": "+{% Higher Artifact Find Chance",
                    "bonusPerLvl": 2
                }
            }),
        new PetBase(59, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4b3",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 50,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Flashy",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 18,
                    "lowerLetter": "o",
                    "upperLetter": "O",
                    "description": "Duplicates all friendly attacks instantly, almost like magic!",
                    "combatDescription": "When foraging, all pets contribute 1.50x more Foraging Speed if there are no Combat Pets in team"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 5, "shinyBonusDesc": "+{% Total Damage", "bonusPerLvl": 1}
            }),
        new PetBase(60, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4b4",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 52,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Superboomer",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 9,
                    "lowerLetter": "!",
                    "upperLetter": "@",
                    "description": "Throws 2 super boomerangs, which deal 100% Damage and has an 80% chance to bounce",
                    "combatDescription": "When in combat, all pets deal 1.40x Damage"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 0, "shinyBonusDesc": "+{% Drop Rate", "bonusPerLvl": 1}
            }),
        new PetBase(61, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4b5",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 55,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Tsar",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 40,
                    "lowerLetter": "k",
                    "upperLetter": "K",
                    "description": "Drop da bomba...",
                    "combatDescription": "When foraging, the pets in the territory above and below contribute 1.50x Fight Power"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 1, "shinyBonusDesc": "+{% Class EXP", "bonusPerLvl": 1}
            }),
        new PetBase(62, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet10",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 56,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Borger",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 7,
                    "lowerLetter": "%",
                    "upperLetter": "^",
                    "description": "Shoots 2 basic attacks, but would much rather have shot 2 burgers into its mouth",
                    "combatDescription": "When in combat, this pet has +2000% hp. Big borger, big health. @ When foraging, this pet contributes 10x more foraging speed if the territory above has at least one Forager type (the Green Leaf type) pet."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 6, "shinyBonusDesc": "+{ Base STR", "bonusPerLvl": 2}
            }),
        new PetBase(63, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4c1",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 57,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Mercenary",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 4,
                    "lowerLetter": "g",
                    "upperLetter": "G",
                    "description": "Throws 2-3 small daggers which deal 150% Damage",
                    "combatDescription": "When foraging, this pet contributes 2x Fight Power"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 2, "shinyBonusDesc": "+{% Skill EXP", "bonusPerLvl": 2}
            }),
        new PetBase(64, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4c2",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 59,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Cursory",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 3,
                    "lowerLetter": "m",
                    "upperLetter": "M",
                    "description": "Shoots a Cursed Skull, which deals 50% Damage, and makes all future attacks deal +5% more dmg",
                    "combatDescription": "When in combat, pets in front and behind this one deal 1.50x Damage"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 23, "shinyBonusDesc": "+{ Base Critters per Trap", "bonusPerLvl": 1}
            }),
        new PetBase(65, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4c3",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 63,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Trasher",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 20,
                    "lowerLetter": "z",
                    "upperLetter": "Z",
                    "description": "The next 6 taps delete any enemy attack you tap on. This ability will not refill while you have taps remaining",
                    "combatDescription": "When in Fence Yard, +25 daily spice claims. Only works if pet is in Fence Yard before the start of the day."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 7, "shinyBonusDesc": "+{ Base AGI", "bonusPerLvl": 2}
            }),
        new PetBase(66, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "w4c4",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 65,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Borger",
                    "abilityType": AbilityTypeEnum.Green,
                    "x2": 7,
                    "lowerLetter": "%",
                    "upperLetter": "^",
                    "description": "Shoots 2 basic attacks, but would much rather have shot 2 burgers into its mouth",
                    "combatDescription": "When in combat, this pet has +2000% hp. Big borger, big health. @ When foraging, this pet contributes 10x more foraging speed if the territory above has at least one Forager type (the Green Leaf type) pet."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 8, "shinyBonusDesc": "+{ Base WIS", "bonusPerLvl": 2}
            }),
        new PetBase(67, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "Pet11",
                    "x1": -1,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 66,
                    "world": 3
                },
                "gene": <PetGeneModel>{
                    "name": "Peapeapod",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 6,
                    "lowerLetter": "#",
                    "upperLetter": "$",
                    "description": "Shoot 10 tiny peas which deal 75% damage. Pow pow pow pow pow pow pow pow pow pow!!!",
                    "combatDescription": "When in combat, all pets have a 25% chance to shoot another basic attack. This can happen multiple times in a row."
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 9, "shinyBonusDesc": "+{ Base LUK", "bonusPerLvl": 2}
            }),
        new PetBase(68, <PetModel>{
                "stats": <PetStatModel>{
                    "petId": "_",
                    "x1": 0,
                    "x2": 2,
                    "x3": 10,
                    "x4": 3,
                    "unlockOrder": 10,
                    "world": 4
                },
                "gene": <PetGeneModel>{
                    "name": "Defender",
                    "abilityType": AbilityTypeEnum.Red,
                    "x2": 10,
                    "lowerLetter": "b",
                    "upperLetter": "B",
                    "description": "Throws an Armored Shield, which gives 85% block chance to pets it passes over, and deals 50% Damage",
                    "combatDescription": "When in combat, all pets have +12% Block Chance"
                },
                "shinyBonus": <ShinyBonusModel>{"shinyIndex": 10, "shinyBonusDesc": "+{ Tab 1 Talent Pts", "bonusPerLvl": 2}
            })    
]
}
