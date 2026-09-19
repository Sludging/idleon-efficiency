import { RoyalResourceModel } from '../model/royalResourceModel';

export class RoyalResourceBase { constructor(public index: number, public data: RoyalResourceModel) { } }



export const initRoyalResourceRepo = () => {
    return [    
        new RoyalResourceBase(0, <RoyalResourceModel>{
                "resourceId": 0,
                "world": 0,
                "order": 0,
                "x": 93,
                "y": 361,
                "capacity": 1000000,
                "nodeType": 5
            }),
        new RoyalResourceBase(1, <RoyalResourceModel>{
                "resourceId": 1,
                "world": 0,
                "order": 1,
                "x": 197,
                "y": 151,
                "capacity": 15000,
                "nodeType": 3
            }),
        new RoyalResourceBase(2, <RoyalResourceModel>{
                "resourceId": 2,
                "world": 0,
                "order": 2,
                "x": 327,
                "y": 115,
                "capacity": 1500,
                "nodeType": 3
            }),
        new RoyalResourceBase(3, <RoyalResourceModel>{
                "resourceId": 3,
                "world": 0,
                "order": 3,
                "x": 343,
                "y": 281,
                "capacity": 50000,
                "nodeType": 3
            }),
        new RoyalResourceBase(4, <RoyalResourceModel>{
                "resourceId": 4,
                "world": 0,
                "order": 4,
                "x": 467,
                "y": 403,
                "capacity": 50000,
                "nodeType": 5
            }),
        new RoyalResourceBase(5, <RoyalResourceModel>{
                "resourceId": 5,
                "world": 0,
                "order": 5,
                "x": 395,
                "y": 198,
                "capacity": 30000,
                "nodeType": 0
            }),
        new RoyalResourceBase(6, <RoyalResourceModel>{
                "resourceId": 6,
                "world": 0,
                "order": 6,
                "x": 466,
                "y": 333,
                "capacity": 70000,
                "nodeType": 4
            }),
        new RoyalResourceBase(7, <RoyalResourceModel>{
                "resourceId": 7,
                "world": 0,
                "order": 7,
                "x": 563,
                "y": 226,
                "capacity": 2000,
                "nodeType": 0
            }),
        new RoyalResourceBase(8, <RoyalResourceModel>{
                "resourceId": 8,
                "world": 0,
                "order": 8,
                "x": 478,
                "y": 247,
                "capacity": 10000,
                "nodeType": 0
            }),
        new RoyalResourceBase(9, <RoyalResourceModel>{
                "resourceId": 9,
                "world": 0,
                "order": 9,
                "x": 603,
                "y": 346,
                "capacity": 20000,
                "nodeType": 4
            }),
        new RoyalResourceBase(10, <RoyalResourceModel>{
                "resourceId": 10,
                "world": 0,
                "order": 10,
                "x": 705,
                "y": 305,
                "capacity": 5000,
                "nodeType": 4
            }),
        new RoyalResourceBase(11, <RoyalResourceModel>{
                "resourceId": 11,
                "world": 0,
                "order": 11,
                "x": 812,
                "y": 266,
                "capacity": 4000,
                "nodeType": 2
            }),
        new RoyalResourceBase(12, <RoyalResourceModel>{
                "resourceId": 12,
                "world": 0,
                "order": 12,
                "x": 816,
                "y": 173,
                "capacity": 40000,
                "nodeType": 2
            }),
        new RoyalResourceBase(13, <RoyalResourceModel>{
                "resourceId": 13,
                "world": 0,
                "order": 13,
                "x": 714,
                "y": 118,
                "capacity": 12000,
                "nodeType": 2
            }),
        new RoyalResourceBase(14, <RoyalResourceModel>{
                "resourceId": 14,
                "world": 0,
                "order": 14,
                "x": 811,
                "y": 43,
                "capacity": 200000,
                "nodeType": 5
            }),
        new RoyalResourceBase(15, <RoyalResourceModel>{
                "resourceId": 15,
                "world": 0,
                "order": 15,
                "x": 606,
                "y": 106,
                "capacity": 5000,
                "nodeType": 1
            }),
        new RoyalResourceBase(16, <RoyalResourceModel>{
                "resourceId": 16,
                "world": 0,
                "order": 16,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(17, <RoyalResourceModel>{
                "resourceId": 17,
                "world": 0,
                "order": 17,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(18, <RoyalResourceModel>{
                "resourceId": 18,
                "world": 0,
                "order": 18,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(19, <RoyalResourceModel>{
                "resourceId": 19,
                "world": 0,
                "order": 19,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(20, <RoyalResourceModel>{
                "resourceId": 20,
                "world": 1,
                "order": 0,
                "x": 123,
                "y": 126,
                "capacity": 3000,
                "nodeType": 13
            }),
        new RoyalResourceBase(21, <RoyalResourceModel>{
                "resourceId": 21,
                "world": 1,
                "order": 1,
                "x": 93,
                "y": 362,
                "capacity": 3000000,
                "nodeType": 15
            }),
        new RoyalResourceBase(22, <RoyalResourceModel>{
                "resourceId": 22,
                "world": 1,
                "order": 2,
                "x": 173,
                "y": 255,
                "capacity": 50000,
                "nodeType": 13
            }),
        new RoyalResourceBase(23, <RoyalResourceModel>{
                "resourceId": 23,
                "world": 1,
                "order": 3,
                "x": 271,
                "y": 185,
                "capacity": 6000,
                "nodeType": 10
            }),
        new RoyalResourceBase(24, <RoyalResourceModel>{
                "resourceId": 24,
                "world": 1,
                "order": 4,
                "x": 254,
                "y": 314,
                "capacity": 750000,
                "nodeType": 13
            }),
        new RoyalResourceBase(25, <RoyalResourceModel>{
                "resourceId": 25,
                "world": 1,
                "order": 5,
                "x": 365,
                "y": 132,
                "capacity": 250,
                "nodeType": 10
            }),
        new RoyalResourceBase(26, <RoyalResourceModel>{
                "resourceId": 26,
                "world": 1,
                "order": 6,
                "x": 353,
                "y": 228,
                "capacity": 1000,
                "nodeType": 10
            }),
        new RoyalResourceBase(27, <RoyalResourceModel>{
                "resourceId": 27,
                "world": 1,
                "order": 7,
                "x": 396,
                "y": 322,
                "capacity": 2000,
                "nodeType": 11
            }),
        new RoyalResourceBase(28, <RoyalResourceModel>{
                "resourceId": 28,
                "world": 1,
                "order": 8,
                "x": 450,
                "y": 72,
                "capacity": 80000,
                "nodeType": 12
            }),
        new RoyalResourceBase(29, <RoyalResourceModel>{
                "resourceId": 29,
                "world": 1,
                "order": 9,
                "x": 565,
                "y": 323,
                "capacity": 5000,
                "nodeType": 11
            }),
        new RoyalResourceBase(30, <RoyalResourceModel>{
                "resourceId": 30,
                "world": 1,
                "order": 10,
                "x": 567,
                "y": 169,
                "capacity": 25000,
                "nodeType": 12
            }),
        new RoyalResourceBase(31, <RoyalResourceModel>{
                "resourceId": 31,
                "world": 1,
                "order": 11,
                "x": 637,
                "y": 226,
                "capacity": 10000,
                "nodeType": 12
            }),
        new RoyalResourceBase(32, <RoyalResourceModel>{
                "resourceId": 32,
                "world": 1,
                "order": 12,
                "x": 598,
                "y": 54,
                "capacity": 150000,
                "nodeType": 14
            }),
        new RoyalResourceBase(33, <RoyalResourceModel>{
                "resourceId": 33,
                "world": 1,
                "order": 13,
                "x": 793,
                "y": 41,
                "capacity": 1500000,
                "nodeType": 15
            }),
        new RoyalResourceBase(34, <RoyalResourceModel>{
                "resourceId": 34,
                "world": 1,
                "order": 14,
                "x": 765,
                "y": 132,
                "capacity": 300000,
                "nodeType": 14
            }),
        new RoyalResourceBase(35, <RoyalResourceModel>{
                "resourceId": 35,
                "world": 1,
                "order": 15,
                "x": 804,
                "y": 251,
                "capacity": 500000,
                "nodeType": 14
            }),
        new RoyalResourceBase(36, <RoyalResourceModel>{
                "resourceId": 36,
                "world": 1,
                "order": 16,
                "x": 810,
                "y": 336,
                "capacity": 1000000,
                "nodeType": 11
            }),
        new RoyalResourceBase(37, <RoyalResourceModel>{
                "resourceId": 37,
                "world": 1,
                "order": 17,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(38, <RoyalResourceModel>{
                "resourceId": 38,
                "world": 1,
                "order": 18,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(39, <RoyalResourceModel>{
                "resourceId": 39,
                "world": 1,
                "order": 19,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(40, <RoyalResourceModel>{
                "resourceId": 40,
                "world": 2,
                "order": 0,
                "x": 87,
                "y": 137,
                "capacity": 1000000,
                "nodeType": 25
            }),
        new RoyalResourceBase(41, <RoyalResourceModel>{
                "resourceId": 41,
                "world": 2,
                "order": 1,
                "x": 158,
                "y": 44,
                "capacity": 500000,
                "nodeType": 24
            }),
        new RoyalResourceBase(42, <RoyalResourceModel>{
                "resourceId": 42,
                "world": 2,
                "order": 2,
                "x": 199,
                "y": 197,
                "capacity": 750,
                "nodeType": 20
            }),
        new RoyalResourceBase(43, <RoyalResourceModel>{
                "resourceId": 43,
                "world": 2,
                "order": 3,
                "x": 179,
                "y": 314,
                "capacity": 1250,
                "nodeType": 20
            }),
        new RoyalResourceBase(44, <RoyalResourceModel>{
                "resourceId": 44,
                "world": 2,
                "order": 4,
                "x": 365,
                "y": 347,
                "capacity": 2000,
                "nodeType": 20
            }),
        new RoyalResourceBase(45, <RoyalResourceModel>{
                "resourceId": 45,
                "world": 2,
                "order": 5,
                "x": 357,
                "y": 265,
                "capacity": 300,
                "nodeType": 20
            }),
        new RoyalResourceBase(46, <RoyalResourceModel>{
                "resourceId": 46,
                "world": 2,
                "order": 6,
                "x": 382,
                "y": 55,
                "capacity": 200000,
                "nodeType": 24
            }),
        new RoyalResourceBase(47, <RoyalResourceModel>{
                "resourceId": 47,
                "world": 2,
                "order": 7,
                "x": 436,
                "y": 148,
                "capacity": 5000,
                "nodeType": 21
            }),
        new RoyalResourceBase(48, <RoyalResourceModel>{
                "resourceId": 48,
                "world": 2,
                "order": 8,
                "x": 493,
                "y": 286,
                "capacity": 10000,
                "nodeType": 21
            }),
        new RoyalResourceBase(49, <RoyalResourceModel>{
                "resourceId": 49,
                "world": 2,
                "order": 9,
                "x": 476,
                "y": 394,
                "capacity": 800000,
                "nodeType": 21
            }),
        new RoyalResourceBase(50, <RoyalResourceModel>{
                "resourceId": 50,
                "world": 2,
                "order": 10,
                "x": 509,
                "y": 44,
                "capacity": 3000000,
                "nodeType": 25
            }),
        new RoyalResourceBase(51, <RoyalResourceModel>{
                "resourceId": 51,
                "world": 2,
                "order": 11,
                "x": 560,
                "y": 186,
                "capacity": 30000,
                "nodeType": 21
            }),
        new RoyalResourceBase(52, <RoyalResourceModel>{
                "resourceId": 52,
                "world": 2,
                "order": 12,
                "x": 632,
                "y": 55,
                "capacity": 320000,
                "nodeType": 23
            }),
        new RoyalResourceBase(53, <RoyalResourceModel>{
                "resourceId": 53,
                "world": 2,
                "order": 13,
                "x": 811,
                "y": 47,
                "capacity": 5000000,
                "nodeType": 26
            }),
        new RoyalResourceBase(54, <RoyalResourceModel>{
                "resourceId": 54,
                "world": 2,
                "order": 14,
                "x": 736,
                "y": 151,
                "capacity": 100000,
                "nodeType": 23
            }),
        new RoyalResourceBase(55, <RoyalResourceModel>{
                "resourceId": 55,
                "world": 2,
                "order": 15,
                "x": 741,
                "y": 249,
                "capacity": 75000,
                "nodeType": 22
            }),
        new RoyalResourceBase(56, <RoyalResourceModel>{
                "resourceId": 56,
                "world": 2,
                "order": 16,
                "x": 698,
                "y": 334,
                "capacity": 50000,
                "nodeType": 22
            }),
        new RoyalResourceBase(57, <RoyalResourceModel>{
                "resourceId": 57,
                "world": 2,
                "order": 17,
                "x": 807,
                "y": 333,
                "capacity": 500000,
                "nodeType": 22
            }),
        new RoyalResourceBase(58, <RoyalResourceModel>{
                "resourceId": 58,
                "world": 2,
                "order": 18,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(59, <RoyalResourceModel>{
                "resourceId": 59,
                "world": 2,
                "order": 19,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(60, <RoyalResourceModel>{
                "resourceId": 60,
                "world": 3,
                "order": 0,
                "x": 98,
                "y": 49,
                "capacity": 4000000,
                "nodeType": 35
            }),
        new RoyalResourceBase(61, <RoyalResourceModel>{
                "resourceId": 61,
                "world": 3,
                "order": 1,
                "x": 91,
                "y": 358,
                "capacity": 2500000,
                "nodeType": 34
            }),
        new RoyalResourceBase(62, <RoyalResourceModel>{
                "resourceId": 62,
                "world": 3,
                "order": 2,
                "x": 141,
                "y": 195,
                "capacity": 150000,
                "nodeType": 31
            }),
        new RoyalResourceBase(63, <RoyalResourceModel>{
                "resourceId": 63,
                "world": 3,
                "order": 3,
                "x": 237,
                "y": 95,
                "capacity": 300000,
                "nodeType": 31
            }),
        new RoyalResourceBase(64, <RoyalResourceModel>{
                "resourceId": 64,
                "world": 3,
                "order": 4,
                "x": 202,
                "y": 264,
                "capacity": 50000,
                "nodeType": 31
            }),
        new RoyalResourceBase(65, <RoyalResourceModel>{
                "resourceId": 65,
                "world": 3,
                "order": 5,
                "x": 371,
                "y": 40,
                "capacity": 6000000,
                "nodeType": 36
            }),
        new RoyalResourceBase(66, <RoyalResourceModel>{
                "resourceId": 66,
                "world": 3,
                "order": 6,
                "x": 395,
                "y": 212,
                "capacity": 10000,
                "nodeType": 32
            }),
        new RoyalResourceBase(67, <RoyalResourceModel>{
                "resourceId": 67,
                "world": 3,
                "order": 7,
                "x": 369,
                "y": 398,
                "capacity": 1000000,
                "nodeType": 34
            }),
        new RoyalResourceBase(68, <RoyalResourceModel>{
                "resourceId": 68,
                "world": 3,
                "order": 8,
                "x": 460,
                "y": 321,
                "capacity": 100000,
                "nodeType": 30
            }),
        new RoyalResourceBase(69, <RoyalResourceModel>{
                "resourceId": 69,
                "world": 3,
                "order": 9,
                "x": 511,
                "y": 398,
                "capacity": 25000,
                "nodeType": 30
            }),
        new RoyalResourceBase(70, <RoyalResourceModel>{
                "resourceId": 70,
                "world": 3,
                "order": 10,
                "x": 573,
                "y": 256,
                "capacity": 5000,
                "nodeType": 30
            }),
        new RoyalResourceBase(71, <RoyalResourceModel>{
                "resourceId": 71,
                "world": 3,
                "order": 11,
                "x": 704,
                "y": 179,
                "capacity": 1000,
                "nodeType": 30
            }),
        new RoyalResourceBase(72, <RoyalResourceModel>{
                "resourceId": 72,
                "world": 3,
                "order": 12,
                "x": 682,
                "y": 343,
                "capacity": 3000,
                "nodeType": 30
            }),
        new RoyalResourceBase(73, <RoyalResourceModel>{
                "resourceId": 73,
                "world": 3,
                "order": 13,
                "x": 476,
                "y": 81,
                "capacity": 500000,
                "nodeType": 33
            }),
        new RoyalResourceBase(74, <RoyalResourceModel>{
                "resourceId": 74,
                "world": 3,
                "order": 14,
                "x": 644,
                "y": 52,
                "capacity": 1000000,
                "nodeType": 33
            }),
        new RoyalResourceBase(75, <RoyalResourceModel>{
                "resourceId": 75,
                "world": 3,
                "order": 15,
                "x": 588,
                "y": 176,
                "capacity": 1500000,
                "nodeType": 33
            }),
        new RoyalResourceBase(76, <RoyalResourceModel>{
                "resourceId": 76,
                "world": 3,
                "order": 16,
                "x": 813,
                "y": 99,
                "capacity": 10000000,
                "nodeType": 37
            }),
        new RoyalResourceBase(77, <RoyalResourceModel>{
                "resourceId": 77,
                "world": 3,
                "order": 17,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(78, <RoyalResourceModel>{
                "resourceId": 78,
                "world": 3,
                "order": 18,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            }),
        new RoyalResourceBase(79, <RoyalResourceModel>{
                "resourceId": 79,
                "world": 3,
                "order": 19,
                "x": 0,
                "y": 0,
                "capacity": 0,
                "nodeType": -1
            })    
]
}
