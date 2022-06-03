import { CardDataModel } from '../model/cardDataModel';

export class CardDataBase { constructor(public id: string, public data: CardDataModel) { } }



export const initCardRepo = () => {
    return [    
        new CardDataBase("mushG", <CardDataModel>{
                "cardID": "A0",
                "category": "Blunder Hills",
                "perTier": 5,
                "effect": "+{ Base HP",
                "bonus": 12,
                "order": 1
            }),
        new CardDataBase("mushR", <CardDataModel>{
                "cardID": "A1",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{ Base LUK",
                "bonus": 3,
                "order": 2
            }),
        new CardDataBase("frogG", <CardDataModel>{
                "cardID": "A2",
                "category": "Blunder Hills",
                "perTier": 6,
                "effect": "+{ Base MP",
                "bonus": 10,
                "order": 3
            }),
        new CardDataBase("beanG", <CardDataModel>{
                "cardID": "A3",
                "category": "Blunder Hills",
                "perTier": 7,
                "effect": "+{ Base Damage",
                "bonus": 7,
                "order": 4
            }),
        new CardDataBase("slimeG", <CardDataModel>{
                "cardID": "A4",
                "category": "Blunder Hills",
                "perTier": 8,
                "effect": "+{ Base WIS",
                "bonus": 2,
                "order": 5
            }),
        new CardDataBase("snakeG", <CardDataModel>{
                "cardID": "A5",
                "category": "Blunder Hills",
                "perTier": 9,
                "effect": "+{ Move Spd",
                "bonus": 1,
                "order": 6
            }),
        new CardDataBase("carrotO", <CardDataModel>{
                "cardID": "A6",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{ Base AGI",
                "bonus": 2,
                "order": 7
            }),
        new CardDataBase("goblinG", <CardDataModel>{
                "cardID": "A7",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{% Total HP",
                "bonus": 2,
                "order": 8
            }),
        new CardDataBase("plank", <CardDataModel>{
                "cardID": "A8",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{ Base STR",
                "bonus": 2,
                "order": 9
            }),
        new CardDataBase("frogBIG", <CardDataModel>{
                "cardID": "A9",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{% Card Drop Chance",
                "bonus": 5,
                "order": 10
            }),
        new CardDataBase("poopSmall", <CardDataModel>{
                "cardID": "A10",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{% Crystal Mob Spawn Chance",
                "bonus": 10,
                "order": 11
            }),
        new CardDataBase("ratB", <CardDataModel>{
                "cardID": "A11",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{% Critical Chance",
                "bonus": 1,
                "order": 12
            }),
        new CardDataBase("branch", <CardDataModel>{
                "cardID": "A12",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{ Base WIS",
                "bonus": 5,
                "order": 13
            }),
        new CardDataBase("acorn", <CardDataModel>{
                "cardID": "A13",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{% Money from Monsters",
                "bonus": 5,
                "order": 14
            }),
        new CardDataBase("Crystal0", <CardDataModel>{
                "cardID": "A14",
                "category": "Blunder Hills",
                "perTier": 3,
                "effect": "+{% Total Drop Rate",
                "bonus": 5,
                "order": 15
            }),
        new CardDataBase("mushW", <CardDataModel>{
                "cardID": "A16",
                "category": "Blunder Hills",
                "perTier": 10,
                "effect": "+{% Total Accuracy",
                "bonus": 5,
                "order": 16
            }),
        new CardDataBase("jarSand", <CardDataModel>{
                "cardID": "B1",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% EXP Conversion from Talent",
                "bonus": 12,
                "order": 1
            }),
        new CardDataBase("mimicA", <CardDataModel>{
                "cardID": "B2",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% Total Drop Rate",
                "bonus": 2,
                "order": 2
            }),
        new CardDataBase("crabcake", <CardDataModel>{
                "cardID": "B3",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% To not consume Food",
                "bonus": 5,
                "order": 3
            }),
        new CardDataBase("coconut", <CardDataModel>{
                "cardID": "B4",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{ Base AGI",
                "bonus": 5,
                "order": 4
            }),
        new CardDataBase("sandcastle", <CardDataModel>{
                "cardID": "B5",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% Total Accuracy",
                "bonus": 4,
                "order": 5
            }),
        new CardDataBase("pincermin", <CardDataModel>{
                "cardID": "B6",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{ Weapon Power",
                "bonus": 1,
                "order": 6
            }),
        new CardDataBase("potato", <CardDataModel>{
                "cardID": "B7",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% Critical Damage",
                "bonus": 3,
                "order": 7
            }),
        new CardDataBase("steak", <CardDataModel>{
                "cardID": "B8",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{ Base STR",
                "bonus": 5,
                "order": 8
            }),
        new CardDataBase("moonman", <CardDataModel>{
                "cardID": "B9",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% Monster EXP While Active",
                "bonus": 8,
                "order": 9
            }),
        new CardDataBase("sandgiant", <CardDataModel>{
                "cardID": "B10",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% Minimum Damage",
                "bonus": 2,
                "order": 10
            }),
        new CardDataBase("snailZ", <CardDataModel>{
                "cardID": "B11",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{% Card Drop Chance",
                "bonus": 8,
                "order": 11
            }),
        new CardDataBase("shovelR", <CardDataModel>{
                "cardID": "B12",
                "category": "Yum Yum Desert",
                "perTier": 10,
                "effect": "+{ Base LUK",
                "bonus": 6,
                "order": 12
            }),
        new CardDataBase("Crystal1", <CardDataModel>{
                "cardID": "B13",
                "category": "Yum Yum Desert",
                "perTier": 3,
                "effect": "+{% EXP from monsters",
                "bonus": 2,
                "order": 13
            }),
        new CardDataBase("Bandit_Bob", <CardDataModel>{
                "cardID": "B14",
                "category": "Yum Yum Desert",
                "perTier": 1,
                "effect": "+{% Money from Monsters",
                "bonus": 1,
                "order": 14
            }),
        new CardDataBase("Blank", <CardDataModel>{
                "cardID": "A0",
                "category": "Event",
                "perTier": 10,
                "effect": "+{% Base HP",
                "bonus": 3,
                "order": 16
            }),
        new CardDataBase("Copper", <CardDataModel>{
                "cardID": "C1",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{ Base accuracy",
                "bonus": 4,
                "order": 1
            }),
        new CardDataBase("Iron", <CardDataModel>{
                "cardID": "C2",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Total Mining Efficiency",
                "bonus": 5,
                "order": 2
            }),
        new CardDataBase("Gold", <CardDataModel>{
                "cardID": "C3",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Mining EXP",
                "bonus": 5,
                "order": 3
            }),
        new CardDataBase("ForgeA", <CardDataModel>{
                "cardID": "C16",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Smithing EXP",
                "bonus": 4,
                "order": 4
            }),
        new CardDataBase("OakTree", <CardDataModel>{
                "cardID": "C4",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{ Base Defence",
                "bonus": 3,
                "order": 5
            }),
        new CardDataBase("BirchTree", <CardDataModel>{
                "cardID": "C5",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Total Choppin Efficiency",
                "bonus": 5,
                "order": 6
            }),
        new CardDataBase("JungleTree", <CardDataModel>{
                "cardID": "C6",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Choppin EXP",
                "bonus": 5,
                "order": 7
            }),
        new CardDataBase("ForestTree", <CardDataModel>{
                "cardID": "C7",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% EXP Conversion from Talent",
                "bonus": 8,
                "order": 8
            }),
        new CardDataBase("Fish1", <CardDataModel>{
                "cardID": "C8",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Total MP",
                "bonus": 3,
                "order": 9
            }),
        new CardDataBase("Fish2", <CardDataModel>{
                "cardID": "C9",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Total Fishing Efficiency",
                "bonus": 5,
                "order": 10
            }),
        new CardDataBase("Fish3", <CardDataModel>{
                "cardID": "C10",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Fishing EXP",
                "bonus": 5,
                "order": 11
            }),
        new CardDataBase("Bug1", <CardDataModel>{
                "cardID": "C11",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Monster EXP While Active",
                "bonus": 4,
                "order": 12
            }),
        new CardDataBase("Bug2", <CardDataModel>{
                "cardID": "C12",
                "category": "Easy Resources",
                "perTier": 10,
                "effect": "+{% Total Catching Efficiency",
                "bonus": 5,
                "order": 13
            }),
        new CardDataBase("Plat", <CardDataModel>{
                "cardID": "D2",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Mining Away Gains",
                "bonus": 2,
                "order": 1
            }),
        new CardDataBase("Dementia", <CardDataModel>{
                "cardID": "D1",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Mining Speed",
                "bonus": 4,
                "order": 2
            }),
        new CardDataBase("Void", <CardDataModel>{
                "cardID": "D3",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Total Mining Efficiency",
                "bonus": 6,
                "order": 3
            }),
        new CardDataBase("ForgeB", <CardDataModel>{
                "cardID": "D16",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Smithing EXP",
                "bonus": 7,
                "order": 4
            }),
        new CardDataBase("PalmTree", <CardDataModel>{
                "cardID": "D7",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Choppin Away Gains",
                "bonus": 2,
                "order": 5
            }),
        new CardDataBase("ToiletTree", <CardDataModel>{
                "cardID": "D5",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Choppin Speed",
                "bonus": 4,
                "order": 6
            }),
        new CardDataBase("StumpTree", <CardDataModel>{
                "cardID": "D6",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Total Accuracy",
                "bonus": 3,
                "order": 7
            }),
        new CardDataBase("Fish4", <CardDataModel>{
                "cardID": "D11",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Fishing Away Gains",
                "bonus": 2,
                "order": 8
            }),
        new CardDataBase("Bug3", <CardDataModel>{
                "cardID": "D10",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Catching EXP",
                "bonus": 5,
                "order": 9
            }),
        new CardDataBase("Bug4", <CardDataModel>{
                "cardID": "D9",
                "category": "Medium Resources",
                "perTier": 10,
                "effect": "+{% Catching Away Gains",
                "bonus": 2,
                "order": 10
            }),
        new CardDataBase("SoulCard1", <CardDataModel>{
                "cardID": "D17",
                "category": "Medium Resources",
                "perTier": 3,
                "effect": "+{% Defence from Equipment",
                "bonus": 3,
                "order": 11
            }),
        new CardDataBase("SoulCard2", <CardDataModel>{
                "cardID": "D18",
                "category": "Medium Resources",
                "perTier": 3,
                "effect": "+{ Starting Pts in Worship",
                "bonus": 4,
                "order": 12
            }),
        new CardDataBase("CritterCard1", <CardDataModel>{
                "cardID": "D19",
                "category": "Medium Resources",
                "perTier": 4,
                "effect": "+{% Shiny Critter Chance",
                "bonus": 3,
                "order": 13
            }),
        new CardDataBase("CritterCard2", <CardDataModel>{
                "cardID": "D20",
                "category": "Medium Resources",
                "perTier": 4,
                "effect": "+{% Trapping Efficiency",
                "bonus": 5,
                "order": 14
            }),
        new CardDataBase("CritterCard3", <CardDataModel>{
                "cardID": "D21",
                "category": "Medium Resources",
                "perTier": 4,
                "effect": "+{% Trapping EXP",
                "bonus": 5,
                "order": 15
            }),
        new CardDataBase("sheep", <CardDataModel>{
                "cardID": "E0",
                "category": "Frostbite Tundra",
                "perTier": 11,
                "effect": "+{% Defence from Equipment",
                "bonus": 3,
                "order": 1
            }),
        new CardDataBase("flake", <CardDataModel>{
                "cardID": "E1",
                "category": "Frostbite Tundra",
                "perTier": 12,
                "effect": "+{ Base STR",
                "bonus": 7,
                "order": 2
            }),
        new CardDataBase("stache", <CardDataModel>{
                "cardID": "E2",
                "category": "Frostbite Tundra",
                "perTier": 13,
                "effect": "+{% Card Drop Chance",
                "bonus": 9,
                "order": 3
            }),
        new CardDataBase("bloque", <CardDataModel>{
                "cardID": "E3",
                "category": "Frostbite Tundra",
                "perTier": 14,
                "effect": "+{ Base AGI",
                "bonus": 7,
                "order": 4
            }),
        new CardDataBase("mamoth", <CardDataModel>{
                "cardID": "E4",
                "category": "Frostbite Tundra",
                "perTier": 15,
                "effect": "+{% Total HP",
                "bonus": 3.5,
                "order": 5
            }),
        new CardDataBase("snowball", <CardDataModel>{
                "cardID": "E5",
                "category": "Frostbite Tundra",
                "perTier": 15,
                "effect": "+{% Total Damage",
                "bonus": 3,
                "order": 6
            }),
        new CardDataBase("penguin", <CardDataModel>{
                "cardID": "E6",
                "category": "Frostbite Tundra",
                "perTier": 15,
                "effect": "+{ Base WIS",
                "bonus": 7,
                "order": 7
            }),
        new CardDataBase("thermostat", <CardDataModel>{
                "cardID": "E7",
                "category": "Frostbite Tundra",
                "perTier": 15,
                "effect": "+{% Critical Damage",
                "bonus": 4,
                "order": 8
            }),
        new CardDataBase("glass", <CardDataModel>{
                "cardID": "E8",
                "category": "Frostbite Tundra",
                "perTier": 17,
                "effect": "+{ Base LUK",
                "bonus": 7,
                "order": 9
            }),
        new CardDataBase("snakeB", <CardDataModel>{
                "cardID": "E9",
                "category": "Frostbite Tundra",
                "perTier": 17,
                "effect": "+{% MP regen rate",
                "bonus": 5,
                "order": 10
            }),
        new CardDataBase("speaker", <CardDataModel>{
                "cardID": "E10",
                "category": "Frostbite Tundra",
                "perTier": 17,
                "effect": "+{% Total Drop Rate",
                "bonus": 3.5,
                "order": 11
            }),
        new CardDataBase("eye", <CardDataModel>{
                "cardID": "E11",
                "category": "Frostbite Tundra",
                "perTier": 17,
                "effect": "+{% Total Accuracy",
                "bonus": 5,
                "order": 12
            }),
        new CardDataBase("ram", <CardDataModel>{
                "cardID": "E14",
                "category": "Frostbite Tundra",
                "perTier": 20,
                "effect": "+{ Weapon Power",
                "bonus": 2,
                "order": 13
            }),
        new CardDataBase("skele", <CardDataModel>{
                "cardID": "E12",
                "category": "Frostbite Tundra",
                "perTier": 15,
                "effect": "+{% Critical Chance",
                "bonus": 1,
                "order": 14
            }),
        new CardDataBase("skele2", <CardDataModel>{
                "cardID": "E13",
                "category": "Frostbite Tundra",
                "perTier": 15,
                "effect": "+{% Total Damage",
                "bonus": 3,
                "order": 15
            }),
        new CardDataBase("Crystal2", <CardDataModel>{
                "cardID": "E15",
                "category": "Frostbite Tundra",
                "perTier": 10,
                "effect": "+{% EXP from monsters",
                "bonus": 3,
                "order": 16
            }),
        new CardDataBase("Lustre", <CardDataModel>{
                "cardID": "D4",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Mining Speed",
                "bonus": 5,
                "order": 1
            }),
        new CardDataBase("Starfire", <CardDataModel>{
                "cardID": "F16",
                "category": "Hard Resources",
                "perTier": 12,
                "effect": "+{% Mining EXP",
                "bonus": 8,
                "order": 2
            }),
        new CardDataBase("SaharanFoal", <CardDataModel>{
                "cardID": "D8",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Choppin Away Gains",
                "bonus": 2.5,
                "order": 3
            }),
        new CardDataBase("Tree7", <CardDataModel>{
                "cardID": "F2",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Choppin Speed",
                "bonus": 6,
                "order": 4
            }),
        new CardDataBase("AlienTree", <CardDataModel>{
                "cardID": "F13",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Total Choppin Efficiency",
                "bonus": 8,
                "order": 5
            }),
        new CardDataBase("Tree8", <CardDataModel>{
                "cardID": "F12",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Choppin Speed",
                "bonus": 7,
                "order": 6
            }),
        new CardDataBase("Fish5", <CardDataModel>{
                "cardID": "F20",
                "category": "Hard Resources",
                "perTier": 8,
                "effect": "+{% Total Fishing Efficiency",
                "bonus": 8,
                "order": 7
            }),
        new CardDataBase("Fish6", <CardDataModel>{
                "cardID": "F21",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Fishing Speed",
                "bonus": 4,
                "order": 8
            }),
        new CardDataBase("Fish7", <CardDataModel>{
                "cardID": "F22",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Fishing EXP",
                "bonus": 10,
                "order": 9
            }),
        new CardDataBase("Fish8", <CardDataModel>{
                "cardID": "F23",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Fishing Away Gains",
                "bonus": 3,
                "order": 10
            }),
        new CardDataBase("Bug5", <CardDataModel>{
                "cardID": "F8",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Total Catching Efficiency",
                "bonus": 7,
                "order": 11
            }),
        new CardDataBase("Bug6", <CardDataModel>{
                "cardID": "F9",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Catching Away Gains",
                "bonus": 2.5,
                "order": 12
            }),
        new CardDataBase("Bug7", <CardDataModel>{
                "cardID": "F14",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Total Catching Efficiency",
                "bonus": 8,
                "order": 13
            }),
        new CardDataBase("Bug8", <CardDataModel>{
                "cardID": "F15",
                "category": "Hard Resources",
                "perTier": 10,
                "effect": "+{% Catching Speed",
                "bonus": 4,
                "order": 14
            }),
        new CardDataBase("CritterCard4", <CardDataModel>{
                "cardID": "F4",
                "category": "Hard Resources",
                "perTier": 4,
                "effect": "+{% Shiny Critter Chance",
                "bonus": 5,
                "order": 15
            }),
        new CardDataBase("CritterCard5", <CardDataModel>{
                "cardID": "F5",
                "category": "Hard Resources",
                "perTier": 4,
                "effect": "+{% EXP from monsters",
                "bonus": 1.25,
                "order": 16
            }),
        new CardDataBase("CritterCard6", <CardDataModel>{
                "cardID": "F6",
                "category": "Hard Resources",
                "perTier": 5,
                "effect": "+{% Shiny Critter Chance",
                "bonus": 6,
                "order": 17
            }),
        new CardDataBase("CritterCard7", <CardDataModel>{
                "cardID": "F7",
                "category": "Hard Resources",
                "perTier": 6,
                "effect": "+{% Skill AFK gain rate",
                "bonus": 1,
                "order": 18
            }),
        new CardDataBase("CritterCard8", <CardDataModel>{
                "cardID": "F17",
                "category": "Hard Resources",
                "perTier": 7,
                "effect": "+{% Trapping Efficiency",
                "bonus": 7,
                "order": 19
            }),
        new CardDataBase("CritterCard9", <CardDataModel>{
                "cardID": "F18",
                "category": "Hard Resources",
                "perTier": 9,
                "effect": "+{% Trapping EXP",
                "bonus": 8,
                "order": 20
            }),
        new CardDataBase("CritterCard10", <CardDataModel>{
                "cardID": "F19",
                "category": "Hard Resources",
                "perTier": 12,
                "effect": "+{% Shiny Critter Chance",
                "bonus": 8,
                "order": 21
            }),
        new CardDataBase("SoulCard3", <CardDataModel>{
                "cardID": "F3",
                "category": "Hard Resources",
                "perTier": 3,
                "effect": "+{ Starting Pts in Worship",
                "bonus": 6,
                "order": 22
            }),
        new CardDataBase("SoulCard4", <CardDataModel>{
                "cardID": "F10",
                "category": "Hard Resources",
                "perTier": 4,
                "effect": "+{% Max Charge",
                "bonus": 7,
                "order": 23
            }),
        new CardDataBase("SoulCard5", <CardDataModel>{
                "cardID": "F11",
                "category": "Hard Resources",
                "perTier": 5,
                "effect": "+{% Charge Rate",
                "bonus": 5,
                "order": 24
            }),
        new CardDataBase("mushP", <CardDataModel>{
                "cardID": "G1",
                "category": "Hyperion Nebula",
                "perTier": 15,
                "effect": "+{% Money from Monsters",
                "bonus": 8,
                "order": 1
            }),
        new CardDataBase("w4a2", <CardDataModel>{
                "cardID": "G2",
                "category": "Hyperion Nebula",
                "perTier": 17,
                "effect": "+{% Breeding EXP (Passive)",
                "bonus": 5,
                "order": 2
            }),
        new CardDataBase("w4a3", <CardDataModel>{
                "cardID": "G3",
                "category": "Hyperion Nebula",
                "perTier": 18,
                "effect": "+{% Defence from Equipment",
                "bonus": 4,
                "order": 3
            }),
        new CardDataBase("demonP", <CardDataModel>{
                "cardID": "G4",
                "category": "Hyperion Nebula",
                "perTier": 19,
                "effect": "+{% Crystal Mob Spawn Chance",
                "bonus": 15,
                "order": 4
            }),
        new CardDataBase("w4b2", <CardDataModel>{
                "cardID": "G6",
                "category": "Hyperion Nebula",
                "perTier": 20,
                "effect": "+{ Star Talent Pts (Passive)",
                "bonus": 5,
                "order": 5
            }),
        new CardDataBase("w4b1", <CardDataModel>{
                "cardID": "G5",
                "category": "Hyperion Nebula",
                "perTier": 21,
                "effect": "+{ Base WIS",
                "bonus": 12,
                "order": 6
            }),
        new CardDataBase("w4b3", <CardDataModel>{
                "cardID": "G7",
                "category": "Hyperion Nebula",
                "perTier": 22,
                "effect": "+{% Lab EXP gain",
                "bonus": 4,
                "order": 7
            }),
        new CardDataBase("w4b4", <CardDataModel>{
                "cardID": "G8",
                "category": "Hyperion Nebula",
                "perTier": 23,
                "effect": "+{ Weapon Power",
                "bonus": 2.5,
                "order": 8
            }),
        new CardDataBase("w4b5", <CardDataModel>{
                "cardID": "G9",
                "category": "Hyperion Nebula",
                "perTier": 24,
                "effect": "+{ Base AGI",
                "bonus": 12,
                "order": 9
            }),
        new CardDataBase("w4c1", <CardDataModel>{
                "cardID": "G10",
                "category": "Hyperion Nebula",
                "perTier": 26,
                "effect": "+{% Multikill per tier",
                "bonus": 1.5,
                "order": 10
            }),
        new CardDataBase("w4c2", <CardDataModel>{
                "cardID": "G11",
                "category": "Hyperion Nebula",
                "perTier": 27,
                "effect": "+{ Base STR",
                "bonus": 12,
                "order": 11
            }),
        new CardDataBase("w4c3", <CardDataModel>{
                "cardID": "G12",
                "category": "Hyperion Nebula",
                "perTier": 28,
                "effect": "+{% Critical Chance (Passive)",
                "bonus": 1.5,
                "order": 12
            }),
        new CardDataBase("w4c4", <CardDataModel>{
                "cardID": "G13",
                "category": "Hyperion Nebula",
                "perTier": 30,
                "effect": "+{% All Stat",
                "bonus": 0.5,
                "order": 13
            }),
        new CardDataBase("Crystal3", <CardDataModel>{
                "cardID": "G14",
                "category": "Hyperion Nebula",
                "perTier": 10,
                "effect": "+px Line Width (Passive)",
                "bonus": 2,
                "order": 14
            }),
        new CardDataBase("frogP", <CardDataModel>{
                "cardID": "X0",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{ Base Dungeon MP",
                "bonus": 2,
                "order": 1
            }),
        new CardDataBase("frogD", <CardDataModel>{
                "cardID": "X1",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{% Block Chance",
                "bonus": 2,
                "order": 2
            }),
        new CardDataBase("frogY", <CardDataModel>{
                "cardID": "X2",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{ Base Dungeon Damage",
                "bonus": 1.5,
                "order": 3
            }),
        new CardDataBase("frogR", <CardDataModel>{
                "cardID": "X14",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{% Dungeon Card Chance",
                "bonus": 6,
                "order": 4
            }),
        new CardDataBase("frogW", <CardDataModel>{
                "cardID": "X15",
                "category": "Dungeons",
                "perTier": 3,
                "effect": "+{% Dungeon Credits",
                "bonus": 2.5,
                "order": 5
            }),
        new CardDataBase("frogGG", <CardDataModel>{
                "cardID": "X22",
                "category": "Dungeons",
                "perTier": 5,
                "effect": "{% to start with RNG item",
                "bonus": 20,
                "order": 6
            }),
        new CardDataBase("frogGR", <CardDataModel>{
                "cardID": "X3",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "{% to start with RNG item",
                "bonus": 15,
                "order": 7
            }),
        new CardDataBase("frogGR2", <CardDataModel>{
                "cardID": "X4",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{% Dungeon Flurbos",
                "bonus": 4,
                "order": 8
            }),
        new CardDataBase("frogGR3", <CardDataModel>{
                "cardID": "X5",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{% Dungeon Credits",
                "bonus": 5,
                "order": 9
            }),
        new CardDataBase("frogGR4", <CardDataModel>{
                "cardID": "X21",
                "category": "Dungeons",
                "perTier": 1,
                "effect": "+{% Dungeon Move Speed",
                "bonus": 7,
                "order": 10
            }),
        new CardDataBase("target", <CardDataModel>{
                "cardID": "X6",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{ Base Dungeon HP",
                "bonus": 2,
                "order": 11
            }),
        new CardDataBase("rocky", <CardDataModel>{
                "cardID": "X7",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{% Dungeon Card Chance",
                "bonus": 8,
                "order": 12
            }),
        new CardDataBase("steakR", <CardDataModel>{
                "cardID": "X9",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{% Dungeon Money",
                "bonus": 6,
                "order": 13
            }),
        new CardDataBase("totem", <CardDataModel>{
                "cardID": "X16",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{% RNG item rarity",
                "bonus": 10,
                "order": 14
            }),
        new CardDataBase("cactus", <CardDataModel>{
                "cardID": "X8",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{% Dungeon Boss Dmg",
                "bonus": 3,
                "order": 15
            }),
        new CardDataBase("potatoB", <CardDataModel>{
                "cardID": "X10",
                "category": "Dungeons",
                "perTier": 5,
                "effect": "+{% Dungeon MP regen",
                "bonus": 5,
                "order": 16
            }),
        new CardDataBase("snakeZ", <CardDataModel>{
                "cardID": "X11",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{% Dungeon Drop Rate",
                "bonus": 4,
                "order": 17
            }),
        new CardDataBase("snakeZ2", <CardDataModel>{
                "cardID": "X12",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{% Total Dungeon Dmg",
                "bonus": 5,
                "order": 18
            }),
        new CardDataBase("snakeZ3", <CardDataModel>{
                "cardID": "X13",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{% Dungeon Flurbos",
                "bonus": 5,
                "order": 19
            }),
        new CardDataBase("iceknight", <CardDataModel>{
                "cardID": "X17",
                "category": "Dungeons",
                "perTier": 8,
                "effect": "+{% Dungeon MP regen",
                "bonus": 8,
                "order": 20
            }),
        new CardDataBase("iceBossZ", <CardDataModel>{
                "cardID": "X18",
                "category": "Dungeons",
                "perTier": 2,
                "effect": "+{% Dungeon Card Chance",
                "bonus": 15,
                "order": 21
            }),
        new CardDataBase("iceBossZ2", <CardDataModel>{
                "cardID": "X19",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{% Dungeon Credits",
                "bonus": 8,
                "order": 22
            }),
        new CardDataBase("iceBossZ3", <CardDataModel>{
                "cardID": "X20",
                "category": "Dungeons",
                "perTier": 1.5,
                "effect": "+{% Total Dungeon Dmg",
                "bonus": 8,
                "order": 23
            }),
        new CardDataBase("babayaga", <CardDataModel>{
                "cardID": "Z0",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Money from Monsters",
                "bonus": 10,
                "order": 1
            }),
        new CardDataBase("poopBig", <CardDataModel>{
                "cardID": "Z1",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Total Damage",
                "bonus": 5,
                "order": 2
            }),
        new CardDataBase("poopD", <CardDataModel>{
                "cardID": "A15",
                "category": "Bosses",
                "perTier": 1,
                "effect": "+{% Fighting AFK gain rate",
                "bonus": 1,
                "order": 3
            }),
        new CardDataBase("wolfA", <CardDataModel>{
                "cardID": "Z2",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Skill AFK gain rate",
                "bonus": 2.5,
                "order": 4
            }),
        new CardDataBase("wolfB", <CardDataModel>{
                "cardID": "Z4",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Fighting AFK gain rate",
                "bonus": 2.5,
                "order": 5
            }),
        new CardDataBase("wolfC", <CardDataModel>{
                "cardID": "Z14",
                "category": "Bosses",
                "perTier": 10,
                "effect": "+{ Weapon Power",
                "bonus": 3,
                "order": 6
            }),
        new CardDataBase("babaHour", <CardDataModel>{
                "cardID": "Z5",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Double AFK claim chance",
                "bonus": 3,
                "order": 7
            }),
        new CardDataBase("babaMummy", <CardDataModel>{
                "cardID": "Z6",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Total Drop Rate",
                "bonus": 6,
                "order": 8
            }),
        new CardDataBase("Boss2A", <CardDataModel>{
                "cardID": "Z3",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% EXP from monsters",
                "bonus": 5,
                "order": 9
            }),
        new CardDataBase("Boss2B", <CardDataModel>{
                "cardID": "Z7",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Skill EXP",
                "bonus": 3.75,
                "order": 10
            }),
        new CardDataBase("Boss2C", <CardDataModel>{
                "cardID": "Z15",
                "category": "Bosses",
                "perTier": 11,
                "effect": "+{ Star Talent Pts (Passive)",
                "bonus": 15,
                "order": 11
            }),
        new CardDataBase("mini3a", <CardDataModel>{
                "cardID": "Z12",
                "category": "Bosses",
                "perTier": 5,
                "effect": "+{% Money from Monsters",
                "bonus": 12,
                "order": 12
            }),
        new CardDataBase("Boss3A", <CardDataModel>{
                "cardID": "Z8",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Cog Build Spd (Passive)",
                "bonus": 8,
                "order": 13
            }),
        new CardDataBase("Boss3B", <CardDataModel>{
                "cardID": "Z9",
                "category": "Bosses",
                "perTier": 1.5,
                "effect": "+{% Shrine Effects",
                "bonus": 5,
                "order": 14
            }),
        new CardDataBase("Boss3C", <CardDataModel>{
                "cardID": "Z16",
                "category": "Bosses",
                "perTier": 12,
                "effect": "+{% All Stat",
                "bonus": 1.5,
                "order": 15
            }),
        new CardDataBase("mini4a", <CardDataModel>{
                "cardID": "Z13",
                "category": "Bosses",
                "perTier": 5,
                "effect": "+{% Cooking EXP gain",
                "bonus": 6,
                "order": 16
            }),
        new CardDataBase("Boss4A", <CardDataModel>{
                "cardID": "Z10",
                "category": "Bosses",
                "perTier": 2,
                "effect": "+{% Kitchen Speed (Passive)",
                "bonus": 6,
                "order": 17
            }),
        new CardDataBase("Boss4B", <CardDataModel>{
                "cardID": "Z11",
                "category": "Bosses",
                "perTier": 2,
                "effect": "+{% All Skill Efficiency",
                "bonus": 10,
                "order": 18
            }),
        new CardDataBase("ghost", <CardDataModel>{
                "cardID": "Y0",
                "category": "Event",
                "perTier": 2,
                "effect": "+{% Monster EXP While Active",
                "bonus": 3,
                "order": 1
            }),
        new CardDataBase("xmasEvent", <CardDataModel>{
                "cardID": "Y1",
                "category": "Event",
                "perTier": 1.5,
                "effect": "+{% Total Drop Rate",
                "bonus": 3,
                "order": 2
            }),
        new CardDataBase("xmasEvent2", <CardDataModel>{
                "cardID": "Y2",
                "category": "Event",
                "perTier": 1.5,
                "effect": "+{% Money from Monsters",
                "bonus": 3,
                "order": 3
            }),
        new CardDataBase("slimeR", <CardDataModel>{
                "cardID": "Y3",
                "category": "Event",
                "perTier": 2,
                "effect": "+{% Defence from Equipment",
                "bonus": 3,
                "order": 4
            }),
        new CardDataBase("loveEvent", <CardDataModel>{
                "cardID": "Y4",
                "category": "Event",
                "perTier": 1.5,
                "effect": "+{% Total HP",
                "bonus": 5,
                "order": 5
            }),
        new CardDataBase("loveEvent2", <CardDataModel>{
                "cardID": "Y5",
                "category": "Event",
                "perTier": 1.5,
                "effect": "+{% Boost Food Effect",
                "bonus": 4,
                "order": 6
            }),
        new CardDataBase("sheepB", <CardDataModel>{
                "cardID": "Y6",
                "category": "Event",
                "perTier": 3,
                "effect": "+{% MP regen rate",
                "bonus": 3,
                "order": 7
            }),
        new CardDataBase("snakeY", <CardDataModel>{
                "cardID": "Y7",
                "category": "Event",
                "perTier": 3,
                "effect": "+{ Base LUK",
                "bonus": 3,
                "order": 8
            }),
        new CardDataBase("EasterEvent1", <CardDataModel>{
                "cardID": "Y8",
                "category": "Event",
                "perTier": 1.5,
                "effect": "+{% Card Drop Chance",
                "bonus": 1,
                "order": 9
            }),
        new CardDataBase("EasterEvent2", <CardDataModel>{
                "cardID": "Y9",
                "category": "Event",
                "perTier": 1.5,
                "effect": "+{% Critical Damage",
                "bonus": 1,
                "order": 10
            }),
        new CardDataBase("shovelY", <CardDataModel>{
                "cardID": "Y13",
                "category": "Event",
                "perTier": 4,
                "effect": "+{ Base Defence",
                "bonus": 2,
                "order": 11
            }),
        new CardDataBase("crabcakeB", <CardDataModel>{
                "cardID": "Y10",
                "category": "Event",
                "perTier": 4,
                "effect": "+{% Total Drop Rate",
                "bonus": 3,
                "order": 12
            }),
        new CardDataBase("SummerEvent1", <CardDataModel>{
                "cardID": "Y11",
                "category": "Event",
                "perTier": 8,
                "effect": "+{% Fishing Away Gains",
                "bonus": 1,
                "order": 13
            }),
        new CardDataBase("SummerEvent2", <CardDataModel>{
                "cardID": "Y12",
                "category": "Event",
                "perTier": 8,
                "effect": "+{% Catching EXP",
                "bonus": 4,
                "order": 14
            }),
        new CardDataBase("xmasEvent3", <CardDataModel>{
                "cardID": "Y14",
                "category": "Event",
                "perTier": 1,
                "effect": "+{% Defence from Equipment",
                "bonus": 3,
                "order": 15
            })    
]
}
