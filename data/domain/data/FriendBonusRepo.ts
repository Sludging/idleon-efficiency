import { FriendBonusModel } from '../model/friendBonusModel';

export class FriendBonusBase { constructor(public index: number, public data: FriendBonusModel) { } }



export const initFriendBonusRepo = () => {
    return [    
        new FriendBonusBase(0, <FriendBonusModel>{"description": "{% Total Damage", "value": 100}),
        new FriendBonusBase(1, <FriendBonusModel>{"description": "{% Class EXP gain", "value": 30}),
        new FriendBonusBase(2, <FriendBonusModel>{"description": "{% Skill Efficiency", "value": 50}),
        new FriendBonusBase(3, <FriendBonusModel>{"description": "{% Drop Rate", "value": 25}),
        new FriendBonusBase(4, <FriendBonusModel>{"description": "{% Skill EXP gain", "value": 30}),
        new FriendBonusBase(5, <FriendBonusModel>{"description": "{% more Coins", "value": 40}),
        new FriendBonusBase(6, <FriendBonusModel>{"description": "{% Extra Kills", "value": 10})    
]
}
