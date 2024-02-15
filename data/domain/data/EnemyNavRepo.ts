import { EnemyNavModel } from '../model/enemyNavModel';

export class EnemyNavBase { constructor(public id: string, public data: EnemyNavModel) { } }



export const initEnemyNavRepo = () => {
    return [    
        new EnemyNavBase("mushG", <EnemyNavModel>{
                "prev": undefined,
                "next": "mushR",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("mushR", <EnemyNavModel>{
                "prev": "mushG",
                "next": "frogG",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("frogG", <EnemyNavModel>{
                "prev": "mushR",
                "next": "beanG",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("beanG", <EnemyNavModel>{
                "prev": "frogG",
                "next": "slimeG",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("slimeG", <EnemyNavModel>{
                "prev": "beanG",
                "next": "snakeG",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("snakeG", <EnemyNavModel>{
                "prev": "slimeG",
                "next": "carrotO",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("carrotO", <EnemyNavModel>{
                "prev": "snakeG",
                "next": "goblinG",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("goblinG", <EnemyNavModel>{
                "prev": "carrotO",
                "next": "plank",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("plank", <EnemyNavModel>{
                "prev": "goblinG",
                "next": "frogBIG",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("frogBIG", <EnemyNavModel>{
                "prev": "plank",
                "next": "poopSmall",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("poopSmall", <EnemyNavModel>{
                "prev": "frogBIG",
                "next": "ratB",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("ratB", <EnemyNavModel>{
                "prev": "poopSmall",
                "next": "branch",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("branch", <EnemyNavModel>{
                "prev": "ratB",
                "next": "acorn",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("acorn", <EnemyNavModel>{
                "prev": "branch",
                "next": "Crystal0",
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("Crystal0", <EnemyNavModel>{
                "prev": "acorn",
                "next": "mushW",
                "hasCrystal": false,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("mushW", <EnemyNavModel>{
                "prev": "Crystal0",
                "next": undefined,
                "hasCrystal": true,
                "crystalName": "Crystal0",
                "hasCard": true
            }),
        new EnemyNavBase("jarSand", <EnemyNavModel>{
                "prev": undefined,
                "next": "mimicA",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("mimicA", <EnemyNavModel>{
                "prev": "jarSand",
                "next": "crabcake",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("crabcake", <EnemyNavModel>{
                "prev": "mimicA",
                "next": "coconut",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("coconut", <EnemyNavModel>{
                "prev": "crabcake",
                "next": "sandcastle",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("sandcastle", <EnemyNavModel>{
                "prev": "coconut",
                "next": "pincermin",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("pincermin", <EnemyNavModel>{
                "prev": "sandcastle",
                "next": "potato",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("potato", <EnemyNavModel>{
                "prev": "pincermin",
                "next": "steak",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("steak", <EnemyNavModel>{
                "prev": "potato",
                "next": "moonman",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("moonman", <EnemyNavModel>{
                "prev": "steak",
                "next": "sandgiant",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("sandgiant", <EnemyNavModel>{
                "prev": "moonman",
                "next": "snailZ",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("snailZ", <EnemyNavModel>{
                "prev": "sandgiant",
                "next": "shovelR",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("shovelR", <EnemyNavModel>{
                "prev": "snailZ",
                "next": "Crystal1",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("Crystal1", <EnemyNavModel>{
                "prev": "shovelR",
                "next": "Bandit_Bob",
                "hasCrystal": false,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("Bandit_Bob", <EnemyNavModel>{
                "prev": "Crystal1",
                "next": "Blank",
                "hasCrystal": true,
                "crystalName": "Crystal1",
                "hasCard": true
            }),
        new EnemyNavBase("sheep", <EnemyNavModel>{
                "prev": undefined,
                "next": "flake",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("flake", <EnemyNavModel>{
                "prev": "sheep",
                "next": "stache",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("stache", <EnemyNavModel>{
                "prev": "flake",
                "next": "bloque",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("bloque", <EnemyNavModel>{
                "prev": "stache",
                "next": "mamoth",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("mamoth", <EnemyNavModel>{
                "prev": "bloque",
                "next": "snowball",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("snowball", <EnemyNavModel>{
                "prev": "mamoth",
                "next": "penguin",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("penguin", <EnemyNavModel>{
                "prev": "snowball",
                "next": "thermostat",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("thermostat", <EnemyNavModel>{
                "prev": "penguin",
                "next": "glass",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("glass", <EnemyNavModel>{
                "prev": "thermostat",
                "next": "snakeB",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("snakeB", <EnemyNavModel>{
                "prev": "glass",
                "next": "speaker",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("speaker", <EnemyNavModel>{
                "prev": "snakeB",
                "next": "eye",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("eye", <EnemyNavModel>{
                "prev": "speaker",
                "next": "ram",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("ram", <EnemyNavModel>{
                "prev": "eye",
                "next": "skele",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("skele", <EnemyNavModel>{
                "prev": "ram",
                "next": "skele2",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("skele2", <EnemyNavModel>{
                "prev": "skele",
                "next": "Crystal2",
                "hasCrystal": true,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("Crystal2", <EnemyNavModel>{
                "prev": "skele2",
                "next": undefined,
                "hasCrystal": false,
                "crystalName": "Crystal2",
                "hasCard": true
            }),
        new EnemyNavBase("Lustre", <EnemyNavModel>{
                "prev": undefined,
                "next": "Starfire",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Starfire", <EnemyNavModel>{
                "prev": "Lustre",
                "next": "Dreadlo",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Dreadlo", <EnemyNavModel>{
                "prev": "Starfire",
                "next": "Godshard",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Godshard", <EnemyNavModel>{
                "prev": "Dreadlo",
                "next": "SaharanFoal",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("SaharanFoal", <EnemyNavModel>{
                "prev": "Godshard",
                "next": "Tree7",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Tree7", <EnemyNavModel>{
                "prev": "SaharanFoal",
                "next": "AlienTree",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("AlienTree", <EnemyNavModel>{
                "prev": "Tree7",
                "next": "Tree8",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Tree8", <EnemyNavModel>{
                "prev": "AlienTree",
                "next": "Tree9",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Tree9", <EnemyNavModel>{
                "prev": "Tree8",
                "next": "Tree10",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Tree10", <EnemyNavModel>{
                "prev": "Tree9",
                "next": "Tree12",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Tree12", <EnemyNavModel>{
                "prev": "Tree10",
                "next": "Tree13",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Tree13", <EnemyNavModel>{
                "prev": "Tree12",
                "next": "Fish5",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish5", <EnemyNavModel>{
                "prev": "Tree13",
                "next": "Fish6",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish6", <EnemyNavModel>{
                "prev": "Fish5",
                "next": "Fish7",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish7", <EnemyNavModel>{
                "prev": "Fish6",
                "next": "Fish8",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish8", <EnemyNavModel>{
                "prev": "Fish7",
                "next": "Bug5",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug5", <EnemyNavModel>{
                "prev": "Fish8",
                "next": "Bug6",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug6", <EnemyNavModel>{
                "prev": "Bug5",
                "next": "Bug7",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug7", <EnemyNavModel>{
                "prev": "Bug6",
                "next": "Bug8",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug8", <EnemyNavModel>{
                "prev": "Bug7",
                "next": "Bug9",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug9", <EnemyNavModel>{
                "prev": "Bug8",
                "next": "Bug10",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug10", <EnemyNavModel>{
                "prev": "Bug9",
                "next": "Bug12",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug12", <EnemyNavModel>{
                "prev": "Bug10",
                "next": "Bug13",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Bug13", <EnemyNavModel>{
                "prev": "Bug12",
                "next": "CritterCard4",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("CritterCard4", <EnemyNavModel>{
                "prev": "Bug13",
                "next": "CritterCard5",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("CritterCard5", <EnemyNavModel>{
                "prev": "CritterCard4",
                "next": "CritterCard6",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("CritterCard6", <EnemyNavModel>{
                "prev": "CritterCard5",
                "next": "CritterCard7",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("CritterCard7", <EnemyNavModel>{
                "prev": "CritterCard6",
                "next": "CritterCard8",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("CritterCard8", <EnemyNavModel>{
                "prev": "CritterCard7",
                "next": "CritterCard9",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("CritterCard9", <EnemyNavModel>{
                "prev": "CritterCard8",
                "next": "CritterCard10",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("CritterCard10", <EnemyNavModel>{
                "prev": "CritterCard9",
                "next": "SoulCard3",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("SoulCard3", <EnemyNavModel>{
                "prev": "CritterCard10",
                "next": "SoulCard4",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("SoulCard4", <EnemyNavModel>{
                "prev": "SoulCard3",
                "next": "SoulCard5",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("SoulCard5", <EnemyNavModel>{
                "prev": "SoulCard4",
                "next": "SoulCard6",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("SoulCard6", <EnemyNavModel>{
                "prev": "SoulCard5",
                "next": "SoulCard7",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("SoulCard7", <EnemyNavModel>{
                "prev": "SoulCard6",
                "next": "Fish9",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish9", <EnemyNavModel>{
                "prev": "SoulCard7",
                "next": "Fish10",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish10", <EnemyNavModel>{
                "prev": "Fish9",
                "next": "Fish11",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish11", <EnemyNavModel>{
                "prev": "Fish10",
                "next": "Fish12",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Fish12", <EnemyNavModel>{
                "prev": "Fish11",
                "next": undefined,
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("w5a1", <EnemyNavModel>{
                "prev": undefined,
                "next": "w5a2",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5a2", <EnemyNavModel>{
                "prev": "w5a1",
                "next": "w5a3",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5a3", <EnemyNavModel>{
                "prev": "w5a2",
                "next": "w5a4",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5a4", <EnemyNavModel>{
                "prev": "w5a3",
                "next": "w5a5",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5a5", <EnemyNavModel>{
                "prev": "w5a4",
                "next": "w5b1",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5b1", <EnemyNavModel>{
                "prev": "w5a5",
                "next": "w5b2",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5b2", <EnemyNavModel>{
                "prev": "w5b1",
                "next": "w5b3",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5b3", <EnemyNavModel>{
                "prev": "w5b2",
                "next": "w5b4",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5b4", <EnemyNavModel>{
                "prev": "w5b3",
                "next": "w5b5",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5b5", <EnemyNavModel>{
                "prev": "w5b4",
                "next": "w5b6",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5b6", <EnemyNavModel>{
                "prev": "w5b5",
                "next": "w5c1",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5c1", <EnemyNavModel>{
                "prev": "w5b6",
                "next": "w5c2",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w5c2", <EnemyNavModel>{
                "prev": "w5c1",
                "next": "Crystal4",
                "hasCrystal": true,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("Crystal4", <EnemyNavModel>{
                "prev": "w5c2",
                "next": "Blank",
                "hasCrystal": false,
                "crystalName": "Crystal3",
                "hasCard": true
            }),
        new EnemyNavBase("w6a1", <EnemyNavModel>{
                "prev": undefined,
                "next": "w6a2",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6a2", <EnemyNavModel>{
                "prev": "w6a1",
                "next": "w6a3",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6a3", <EnemyNavModel>{
                "prev": "w6a2",
                "next": "w6a4",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6a4", <EnemyNavModel>{
                "prev": "w6a3",
                "next": "w6a5",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6a5", <EnemyNavModel>{
                "prev": "w6a4",
                "next": "w6b1",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6b1", <EnemyNavModel>{
                "prev": "w6a5",
                "next": "w6b2",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6b2", <EnemyNavModel>{
                "prev": "w6b1",
                "next": "w6b3",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6b3", <EnemyNavModel>{
                "prev": "w6b2",
                "next": "w6b4",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6b4", <EnemyNavModel>{
                "prev": "w6b3",
                "next": "w6c1",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6c1", <EnemyNavModel>{
                "prev": "w6b4",
                "next": "w6c2",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6c2", <EnemyNavModel>{
                "prev": "w6c1",
                "next": "w6d1",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6d1", <EnemyNavModel>{
                "prev": "w6c2",
                "next": "w6d2",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6d2", <EnemyNavModel>{
                "prev": "w6d1",
                "next": "w6d3",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("w6d3", <EnemyNavModel>{
                "prev": "w6d2",
                "next": "Crystal5",
                "hasCrystal": true,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("Crystal5", <EnemyNavModel>{
                "prev": "w6d3",
                "next": "Blank",
                "hasCrystal": false,
                "crystalName": "Crystal4",
                "hasCard": true
            }),
        new EnemyNavBase("babayaga", <EnemyNavModel>{
                "prev": undefined,
                "next": "poopBig",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("poopBig", <EnemyNavModel>{
                "prev": "babayaga",
                "next": "poopD",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("poopD", <EnemyNavModel>{
                "prev": "poopBig",
                "next": "wolfA",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("wolfA", <EnemyNavModel>{
                "prev": "poopD",
                "next": "wolfB",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("wolfB", <EnemyNavModel>{
                "prev": "wolfA",
                "next": "wolfC",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("wolfC", <EnemyNavModel>{
                "prev": "wolfB",
                "next": "babaHour",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("babaHour", <EnemyNavModel>{
                "prev": "wolfC",
                "next": "babaMummy",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("babaMummy", <EnemyNavModel>{
                "prev": "babaHour",
                "next": "Boss2A",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss2A", <EnemyNavModel>{
                "prev": "babaMummy",
                "next": "Boss2B",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss2B", <EnemyNavModel>{
                "prev": "Boss2A",
                "next": "Boss2C",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss2C", <EnemyNavModel>{
                "prev": "Boss2B",
                "next": "mini3a",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("mini3a", <EnemyNavModel>{
                "prev": "Boss2C",
                "next": "Boss3A",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss3A", <EnemyNavModel>{
                "prev": "mini3a",
                "next": "Boss3B",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss3B", <EnemyNavModel>{
                "prev": "Boss3A",
                "next": "Boss3C",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss3C", <EnemyNavModel>{
                "prev": "Boss3B",
                "next": "mini4a",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("mini4a", <EnemyNavModel>{
                "prev": "Boss3C",
                "next": "Boss4A",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss4A", <EnemyNavModel>{
                "prev": "mini4a",
                "next": "Boss4B",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss4B", <EnemyNavModel>{
                "prev": "Boss4A",
                "next": "Boss4C",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss4C", <EnemyNavModel>{
                "prev": "Boss4B",
                "next": "Boss5A",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss5A", <EnemyNavModel>{
                "prev": "Boss4C",
                "next": "Boss5B",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss5B", <EnemyNavModel>{
                "prev": "Boss5A",
                "next": "Boss5C",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss5C", <EnemyNavModel>{
                "prev": "Boss5B",
                "next": "Boss6A",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss6A", <EnemyNavModel>{
                "prev": "Boss5C",
                "next": "Boss6B",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss6B", <EnemyNavModel>{
                "prev": "Boss6A",
                "next": "Boss6C",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            }),
        new EnemyNavBase("Boss6C", <EnemyNavModel>{
                "prev": "Boss6B",
                "next": "Blank",
                "hasCrystal": true,
                "crystalName": undefined,
                "hasCard": true
            })    
]
}
