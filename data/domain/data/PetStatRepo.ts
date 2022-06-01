import { PetStatModel } from '../model/petStatModel';

export class PetStatBase { constructor(public index: number, public data: PetStatModel) { } }



export const initPetStatRepo = () => {
    return [    
        new PetStatBase(0, <PetStatModel>{
                "petId": "mushG",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 1,
                "world": 0
            }),
        new PetStatBase(1, <PetStatModel>{
                "petId": "Pet0",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 2,
                "world": 0
            }),
        new PetStatBase(2, <PetStatModel>{
                "petId": "frogG",
                "x1": 1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 3,
                "world": 0
            }),
        new PetStatBase(3, <PetStatModel>{
                "petId": "beanG",
                "x1": 2,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 4,
                "world": 0
            }),
        new PetStatBase(4, <PetStatModel>{
                "petId": "mushR",
                "x1": 3,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 5,
                "world": 0
            }),
        new PetStatBase(5, <PetStatModel>{
                "petId": "slimeG",
                "x1": 4,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 6,
                "world": 0
            }),
        new PetStatBase(6, <PetStatModel>{
                "petId": "Pet1",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 8,
                "world": 0
            }),
        new PetStatBase(7, <PetStatModel>{
                "petId": "snakeG",
                "x1": 12,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 9,
                "world": 0
            }),
        new PetStatBase(8, <PetStatModel>{
                "petId": "carrotO",
                "x1": 12,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 11,
                "world": 0
            }),
        new PetStatBase(9, <PetStatModel>{
                "petId": "goblinG",
                "x1": 12,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 13,
                "world": 0
            }),
        new PetStatBase(10, <PetStatModel>{
                "petId": "plank",
                "x1": 13,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 16,
                "world": 0
            }),
        new PetStatBase(11, <PetStatModel>{
                "petId": "frogBIG",
                "x1": 13,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 19,
                "world": 0
            }),
        new PetStatBase(12, <PetStatModel>{
                "petId": "Pet2",
                "x1": 14,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 22,
                "world": 0
            }),
        new PetStatBase(13, <PetStatModel>{
                "petId": "branch",
                "x1": 14,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 28,
                "world": 0
            }),
        new PetStatBase(14, <PetStatModel>{
                "petId": "acorn",
                "x1": 15,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 33,
                "world": 0
            }),
        new PetStatBase(15, <PetStatModel>{
                "petId": "poopSmall",
                "x1": 15,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 38,
                "world": 0
            }),
        new PetStatBase(16, <PetStatModel>{
                "petId": "ratB",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 44,
                "world": 0
            }),
        new PetStatBase(17, <PetStatModel>{
                "petId": "jarSand",
                "x1": 16,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 7,
                "world": 1
            }),
        new PetStatBase(18, <PetStatModel>{
                "petId": "mimicA",
                "x1": 16,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 10,
                "world": 1
            }),
        new PetStatBase(19, <PetStatModel>{
                "petId": "crabcake",
                "x1": 17,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 12,
                "world": 1
            }),
        new PetStatBase(20, <PetStatModel>{
                "petId": "coconut",
                "x1": 18,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 14,
                "world": 1
            }),
        new PetStatBase(21, <PetStatModel>{
                "petId": "Pet3",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 15,
                "world": 1
            }),
        new PetStatBase(22, <PetStatModel>{
                "petId": "sandcastle",
                "x1": 19,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 17,
                "world": 1
            }),
        new PetStatBase(23, <PetStatModel>{
                "petId": "pincermin",
                "x1": 19,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 18,
                "world": 1
            }),
        new PetStatBase(24, <PetStatModel>{
                "petId": "potato",
                "x1": 20,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 19,
                "world": 1
            }),
        new PetStatBase(25, <PetStatModel>{
                "petId": "steak",
                "x1": 18,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 20,
                "world": 1
            }),
        new PetStatBase(26, <PetStatModel>{
                "petId": "Pet4",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 24,
                "world": 1
            }),
        new PetStatBase(27, <PetStatModel>{
                "petId": "moonman",
                "x1": 20,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 26,
                "world": 1
            }),
        new PetStatBase(28, <PetStatModel>{
                "petId": "sandgiant",
                "x1": 7,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 30,
                "world": 1
            }),
        new PetStatBase(29, <PetStatModel>{
                "petId": "snailZ",
                "x1": 7,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 35,
                "world": 1
            }),
        new PetStatBase(30, <PetStatModel>{
                "petId": "shovelR",
                "x1": 7,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 46,
                "world": 1
            }),
        new PetStatBase(31, <PetStatModel>{
                "petId": "steakR",
                "x1": 7,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 53,
                "world": 1
            }),
        new PetStatBase(32, <PetStatModel>{
                "petId": "potatoB",
                "x1": 7,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 60,
                "world": 1
            }),
        new PetStatBase(33, <PetStatModel>{
                "petId": "Pet5",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 62,
                "world": 1
            }),
        new PetStatBase(34, <PetStatModel>{
                "petId": "sheep",
                "x1": 7,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 21,
                "world": 2
            }),
        new PetStatBase(35, <PetStatModel>{
                "petId": "flake",
                "x1": 8,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 23,
                "world": 2
            }),
        new PetStatBase(36, <PetStatModel>{
                "petId": "stache",
                "x1": 8,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 25,
                "world": 2
            }),
        new PetStatBase(37, <PetStatModel>{
                "petId": "skele",
                "x1": 9,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 27,
                "world": 2
            }),
        new PetStatBase(38, <PetStatModel>{
                "petId": "Pet6",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 29,
                "world": 2
            }),
        new PetStatBase(39, <PetStatModel>{
                "petId": "bloque",
                "x1": 9,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 31,
                "world": 2
            }),
        new PetStatBase(40, <PetStatModel>{
                "petId": "mamoth",
                "x1": 10,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 32,
                "world": 2
            }),
        new PetStatBase(41, <PetStatModel>{
                "petId": "snowball",
                "x1": 10,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 34,
                "world": 2
            }),
        new PetStatBase(42, <PetStatModel>{
                "petId": "penguin",
                "x1": 11,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 36,
                "world": 2
            }),
        new PetStatBase(43, <PetStatModel>{
                "petId": "thermostat",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 37,
                "world": 2
            }),
        new PetStatBase(44, <PetStatModel>{
                "petId": "glass",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 39,
                "world": 2
            }),
        new PetStatBase(45, <PetStatModel>{
                "petId": "snakeB",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 40,
                "world": 2
            }),
        new PetStatBase(46, <PetStatModel>{
                "petId": "Pet7",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 43,
                "world": 2
            }),
        new PetStatBase(47, <PetStatModel>{
                "petId": "speaker",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 51,
                "world": 2
            }),
        new PetStatBase(48, <PetStatModel>{
                "petId": "eye",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 54,
                "world": 2
            }),
        new PetStatBase(49, <PetStatModel>{
                "petId": "ram",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 58,
                "world": 2
            }),
        new PetStatBase(50, <PetStatModel>{
                "petId": "skele2",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 61,
                "world": 2
            }),
        new PetStatBase(51, <PetStatModel>{
                "petId": "Pet8",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 64,
                "world": 2
            }),
        new PetStatBase(52, <PetStatModel>{
                "petId": "mushP",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 38,
                "world": 3
            }),
        new PetStatBase(53, <PetStatModel>{
                "petId": "w4a2",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 41,
                "world": 3
            }),
        new PetStatBase(54, <PetStatModel>{
                "petId": "w4a3",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 42,
                "world": 3
            }),
        new PetStatBase(55, <PetStatModel>{
                "petId": "demonP",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 45,
                "world": 3
            }),
        new PetStatBase(56, <PetStatModel>{
                "petId": "w4b1",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 47,
                "world": 3
            }),
        new PetStatBase(57, <PetStatModel>{
                "petId": "Pet9",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 48,
                "world": 3
            }),
        new PetStatBase(58, <PetStatModel>{
                "petId": "w4b2",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 49,
                "world": 3
            }),
        new PetStatBase(59, <PetStatModel>{
                "petId": "w4b3",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 50,
                "world": 3
            }),
        new PetStatBase(60, <PetStatModel>{
                "petId": "w4b4",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 52,
                "world": 3
            }),
        new PetStatBase(61, <PetStatModel>{
                "petId": "w4b5",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 55,
                "world": 3
            }),
        new PetStatBase(62, <PetStatModel>{
                "petId": "Pet10",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 56,
                "world": 3
            }),
        new PetStatBase(63, <PetStatModel>{
                "petId": "w4c1",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 57,
                "world": 3
            }),
        new PetStatBase(64, <PetStatModel>{
                "petId": "w4c2",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 59,
                "world": 3
            }),
        new PetStatBase(65, <PetStatModel>{
                "petId": "w4c3",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 63,
                "world": 3
            }),
        new PetStatBase(66, <PetStatModel>{
                "petId": "w4c4",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 65,
                "world": 3
            }),
        new PetStatBase(67, <PetStatModel>{
                "petId": "Pet11",
                "x1": -1,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 66,
                "world": 3
            }),
        new PetStatBase(68, <PetStatModel>{
                "petId": "_",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 10,
                "world": 4
            }),
        new PetStatBase(69, <PetStatModel>{
                "petId": "_",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 10,
                "world": 5
            }),
        new PetStatBase(70, <PetStatModel>{
                "petId": "_",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 10,
                "world": 6
            }),
        new PetStatBase(71, <PetStatModel>{
                "petId": "_",
                "x1": 0,
                "x2": 2,
                "x3": 10,
                "x4": 3,
                "unlockOrder": 10,
                "world": 7
            })    
]
}
