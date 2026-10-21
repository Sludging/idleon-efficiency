import { HoleCurrencyModel } from '../model/holeCurrencyModel';

export class HoleCurrencyBase { constructor(public index: number, public data: HoleCurrencyModel) { } }



export const initHoleCurrencyRepo = () => {
    return [    
        new HoleCurrencyBase(0, <HoleCurrencyModel>{"index": 0, "kind": "Sediment", "localIndex": 0, "name": "Gravel", "icon": "`"}),
        new HoleCurrencyBase(1, <HoleCurrencyModel>{"index": 1, "kind": "Sediment", "localIndex": 1, "name": "Goldust", "icon": "@"}),
        new HoleCurrencyBase(2, <HoleCurrencyModel>{"index": 2, "kind": "Sediment", "localIndex": 2, "name": "Redstone", "icon": "#"}),
        new HoleCurrencyBase(3, <HoleCurrencyModel>{"index": 3, "kind": "Sediment", "localIndex": 3, "name": "Mythril", "icon": "$"}),
        new HoleCurrencyBase(4, <HoleCurrencyModel>{
                "index": 4,
                "kind": "Sediment",
                "localIndex": 4,
                "name": "Cobaltine",
                "icon": "%"
            }),
        new HoleCurrencyBase(5, <HoleCurrencyModel>{"index": 5, "kind": "Sediment", "localIndex": 5, "name": "Bruntine", "icon": "^"}),
        new HoleCurrencyBase(6, <HoleCurrencyModel>{"index": 6, "kind": "Sediment", "localIndex": 6, "name": "Freezium", "icon": "&"}),
        new HoleCurrencyBase(7, <HoleCurrencyModel>{"index": 7, "kind": "Sediment", "localIndex": 7, "name": "Sweetium", "icon": "*"}),
        new HoleCurrencyBase(8, <HoleCurrencyModel>{"index": 8, "kind": "Sediment", "localIndex": 8, "name": "RadCoral", "icon": "("}),
        new HoleCurrencyBase(9, <HoleCurrencyModel>{
                "index": 9,
                "kind": "Sediment",
                "localIndex": 9,
                "name": "HyperCoral",
                "icon": ")"
            }),
        new HoleCurrencyBase(10, <HoleCurrencyModel>{
                "index": 10,
                "kind": "HarpNote",
                "localIndex": 0,
                "name": "Crotchet Note",
                "icon": ":"
            }),
        new HoleCurrencyBase(11, <HoleCurrencyModel>{
                "index": 11,
                "kind": "HarpNote",
                "localIndex": 1,
                "name": "Natural Note",
                "icon": ";"
            }),
        new HoleCurrencyBase(12, <HoleCurrencyModel>{
                "index": 12,
                "kind": "HarpNote",
                "localIndex": 2,
                "name": "Bass Note",
                "icon": "<"
            }),
        new HoleCurrencyBase(13, <HoleCurrencyModel>{
                "index": 13,
                "kind": "HarpNote",
                "localIndex": 3,
                "name": "Treble Note",
                "icon": ","
            }),
        new HoleCurrencyBase(14, <HoleCurrencyModel>{
                "index": 14,
                "kind": "HarpNote",
                "localIndex": 4,
                "name": "Eighth Note",
                "icon": ">"
            }),
        new HoleCurrencyBase(15, <HoleCurrencyModel>{
                "index": 15,
                "kind": "HarpNote",
                "localIndex": 5,
                "name": "Quaver Note",
                "icon": "."
            }),
        new HoleCurrencyBase(16, <HoleCurrencyModel>{
                "index": 16,
                "kind": "HarpNote",
                "localIndex": 6,
                "name": "Sharp Note",
                "icon": "?"
            }),
        new HoleCurrencyBase(17, <HoleCurrencyModel>{
                "index": 17,
                "kind": "HarpNote",
                "localIndex": 7,
                "name": "(F)Clef Note",
                "icon": "{"
            }),
        new HoleCurrencyBase(18, <HoleCurrencyModel>{
                "index": 18,
                "kind": "HarpNote",
                "localIndex": 8,
                "name": "(G)Clef Note",
                "icon": "["
            }),
        new HoleCurrencyBase(19, <HoleCurrencyModel>{
                "index": 19,
                "kind": "HarpNote",
                "localIndex": 9,
                "name": "Sixteenth Note",
                "icon": "}"
            }),
        new HoleCurrencyBase(20, <HoleCurrencyModel>{"index": 20, "kind": "Rupie", "localIndex": 0, "name": "Rupie 0", "icon": "船"}),
        new HoleCurrencyBase(21, <HoleCurrencyModel>{"index": 21, "kind": "Rupie", "localIndex": 1, "name": "Rupie 1", "icon": "般"}),
        new HoleCurrencyBase(22, <HoleCurrencyModel>{"index": 22, "kind": "Rupie", "localIndex": 2, "name": "Rupie 2", "icon": "航"}),
        new HoleCurrencyBase(23, <HoleCurrencyModel>{"index": 23, "kind": "Rupie", "localIndex": 3, "name": "Rupie 3", "icon": "舞"}),
        new HoleCurrencyBase(24, <HoleCurrencyModel>{"index": 24, "kind": "Rupie", "localIndex": 4, "name": "Rupie 4", "icon": "窗"}),
        new HoleCurrencyBase(25, <HoleCurrencyModel>{"index": 25, "kind": "Rupie", "localIndex": 5, "name": "Rupie 5", "icon": "皮"}),
        new HoleCurrencyBase(26, <HoleCurrencyModel>{"index": 26, "kind": "Rupie", "localIndex": 6, "name": "Rupie 6", "icon": "白"}),
        new HoleCurrencyBase(27, <HoleCurrencyModel>{"index": 27, "kind": "Rupie", "localIndex": 7, "name": "Rupie 7", "icon": "癖"}),
        new HoleCurrencyBase(28, <HoleCurrencyModel>{"index": 28, "kind": "Rupie", "localIndex": 8, "name": "Rupie 8", "icon": "爬"}),
        new HoleCurrencyBase(29, <HoleCurrencyModel>{"index": 29, "kind": "Rupie", "localIndex": 9, "name": "Rupie 9", "icon": "爆"}),
        new HoleCurrencyBase(30, <HoleCurrencyModel>{
                "index": 30,
                "kind": "Fountain",
                "localIndex": 0,
                "name": "Bronze Coins",
                "icon": "歧"
            }),
        new HoleCurrencyBase(31, <HoleCurrencyModel>{
                "index": 31,
                "kind": "Fountain",
                "localIndex": 1,
                "name": "Silver Coins",
                "icon": "武"
            }),
        new HoleCurrencyBase(32, <HoleCurrencyModel>{
                "index": 32,
                "kind": "Fountain",
                "localIndex": 2,
                "name": "Golden Coins",
                "icon": "歌"
            }),
        new HoleCurrencyBase(33, <HoleCurrencyModel>{
                "index": 33,
                "kind": "Fountain",
                "localIndex": 3,
                "name": "Dollar Bills",
                "icon": "歉"
            }),
        new HoleCurrencyBase(34, <HoleCurrencyModel>{
                "index": 34,
                "kind": "Fountain",
                "localIndex": 4,
                "name": "Credit Bills",
                "icon": "款"
            }),
        new HoleCurrencyBase(35, <HoleCurrencyModel>{
                "index": 35,
                "kind": "Fountain",
                "localIndex": 5,
                "name": "Treasury Bills",
                "icon": "欺"
            }),
        new HoleCurrencyBase(36, <HoleCurrencyModel>{
                "index": 36,
                "kind": "Fountain",
                "localIndex": 6,
                "name": "Moolah Stacks",
                "icon": "欧"
            }),
        new HoleCurrencyBase(37, <HoleCurrencyModel>{
                "index": 37,
                "kind": "Fountain",
                "localIndex": 7,
                "name": "Shilling Stacks",
                "icon": "欣"
            }),
        new HoleCurrencyBase(38, <HoleCurrencyModel>{
                "index": 38,
                "kind": "Fountain",
                "localIndex": 8,
                "name": "Greane Stacks",
                "icon": "欢"
            })    
]
}
