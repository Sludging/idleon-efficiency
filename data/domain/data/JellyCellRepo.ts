import { JellyCellModel } from '../model/jellyCellModel';

export class JellyCellBase { constructor(public index: number, public data: JellyCellModel) { } }



export const initJellyCellRepo = () => {
    return [    
        new JellyCellBase(0, <JellyCellModel>{
                "index": 0,
                "name": "Amoeba",
                "tileCount": 1,
                "footprintOffsets": [0],
                "passiveDescription": "+10% All DMG",
                "damageCoefficient": 1,
                "attackCooldownCoefficient": 145
            }),
        new JellyCellBase(1, <JellyCellModel>{
                "index": 1,
                "name": "Plasmid",
                "tileCount": 2,
                "footprintOffsets": [0, 1],
                "passiveDescription": "+15% All SPD",
                "damageCoefficient": 1.2,
                "attackCooldownCoefficient": 60
            }),
        new JellyCellBase(2, <JellyCellModel>{
                "index": 2,
                "name": "Ribosome",
                "tileCount": 3,
                "footprintOffsets": [0, 18, 36],
                "passiveDescription": "+50% All DMG",
                "damageCoefficient": 12,
                "attackCooldownCoefficient": 400
            }),
        new JellyCellBase(3, <JellyCellModel>{
                "index": 3,
                "name": "Organelle",
                "tileCount": 5,
                "footprintOffsets": [0, 1, -1, 18, -18],
                "passiveDescription": "+25% All SPD",
                "damageCoefficient": 6,
                "attackCooldownCoefficient": 160
            }),
        new JellyCellBase(4, <JellyCellModel>{
                "index": 4,
                "name": "Immunoid",
                "tileCount": 4,
                "footprintOffsets": [0, 1, 18, 19],
                "passiveDescription": "None",
                "damageCoefficient": 20,
                "attackCooldownCoefficient": 750
            }),
        new JellyCellBase(5, <JellyCellModel>{
                "index": 5,
                "name": "Virus",
                "tileCount": 1,
                "footprintOffsets": [0],
                "passiveDescription": "None",
                "damageCoefficient": 1,
                "attackCooldownCoefficient": 200
            }),
        new JellyCellBase(6, <JellyCellModel>{
                "index": 6,
                "name": "Mitochondria",
                "tileCount": 16,
                "footprintOffsets": [
                    0,
                    1,
                    2,
                    3,
                    18,
                    19,
                    20,
                    21,
                    36,
                    37,
                    38,
                    39,
                    54,
                    55,
                    56,
                    57
                ],
                "passiveDescription": "1.5x All SPD",
                "damageCoefficient": 2,
                "attackCooldownCoefficient": 10
            }),
        new JellyCellBase(7, <JellyCellModel>{
                "index": 7,
                "name": "Gigacyst",
                "tileCount": 13,
                "footprintOffsets": [
                    -36,
                    -19,
                    -18,
                    -17,
                    -2,
                    -1,
                    0,
                    1,
                    2,
                    17,
                    18,
                    19,
                    36
                ],
                "passiveDescription": "3x All DMG",
                "damageCoefficient": 4,
                "attackCooldownCoefficient": 20
            }),
        new JellyCellBase(8, <JellyCellModel>{
                "index": 8,
                "name": "Bruhollio",
                "tileCount": 1,
                "footprintOffsets": [0],
                "passiveDescription": undefined,
                "damageCoefficient": 1,
                "attackCooldownCoefficient": 30
            })    
]
}
