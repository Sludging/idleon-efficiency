import { FountainCurrencyModel } from '../model/fountainCurrencyModel';

export class FountainCurrencyBase { constructor(public index: number, public data: FountainCurrencyModel) { } }



export const initFountainCurrencyRepo = () => {
    return [    
        new FountainCurrencyBase(0, <FountainCurrencyModel>{"index": 0, "name": "Bronze Coins", "holesResourceIndex": 30, "icon": "歧"}),
        new FountainCurrencyBase(1, <FountainCurrencyModel>{"index": 1, "name": "Silver Coins", "holesResourceIndex": 31, "icon": "武"}),
        new FountainCurrencyBase(2, <FountainCurrencyModel>{"index": 2, "name": "Golden Coins", "holesResourceIndex": 32, "icon": "歌"}),
        new FountainCurrencyBase(3, <FountainCurrencyModel>{"index": 3, "name": "Dollar Bills", "holesResourceIndex": 33, "icon": "歉"}),
        new FountainCurrencyBase(4, <FountainCurrencyModel>{"index": 4, "name": "Credit Bills", "holesResourceIndex": 34, "icon": "款"}),
        new FountainCurrencyBase(5, <FountainCurrencyModel>{"index": 5, "name": "Treasury Bills", "holesResourceIndex": 35, "icon": "欺"}),
        new FountainCurrencyBase(6, <FountainCurrencyModel>{"index": 6, "name": "Moolah Stacks", "holesResourceIndex": 36, "icon": "欧"}),
        new FountainCurrencyBase(7, <FountainCurrencyModel>{"index": 7, "name": "Shilling Stacks", "holesResourceIndex": 37, "icon": "欣"}),
        new FountainCurrencyBase(8, <FountainCurrencyModel>{"index": 8, "name": "Greane Stacks", "holesResourceIndex": 38, "icon": "欢"})    
]
}
