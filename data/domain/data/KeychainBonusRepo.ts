import { KeychainBonusModel } from '../model/keychainBonusModel';
import { KeychainBonusesModel } from '../model/keychainBonusesModel';

export class KeychainBonusesBase { constructor(public id: string, public data: KeychainBonusesModel) { } }



export const initKeychainBonusRepo = () => {
    return [    
        new KeychainBonusesBase("EquipmentKeychain0", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "Base Defence", "lvl1": 1, "lvl2": 2, "lvl3": 5}]
            }),
        new KeychainBonusesBase("EquipmentKeychain1", <KeychainBonusesModel>{"bonuses": [<KeychainBonusModel>{"bonus": "Accuracy", "lvl1": 2, "lvl2": 3, "lvl3": 5}]}),
        new KeychainBonusesBase("EquipmentKeychain2", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Movement Speed", "lvl1": 1, "lvl2": 1.5, "lvl3": 2}]
            }),
        new KeychainBonusesBase("EquipmentKeychain3", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "Base Damage", "lvl1": 5, "lvl2": 10, "lvl3": 20}]
            }),
        new KeychainBonusesBase("EquipmentKeychain4", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Card Drop Chance", "lvl1": 3, "lvl2": 6, "lvl3": 10}]
            }),
        new KeychainBonusesBase("EquipmentKeychain5", <KeychainBonusesModel>{"bonuses": [<KeychainBonusModel>{"bonus": "% Money", "lvl1": 4, "lvl2": 7, "lvl3": 10}]}),
        new KeychainBonusesBase("EquipmentKeychain6", <KeychainBonusesModel>{
                "bonuses": [
                    <KeychainBonusModel>{"bonus": "Str", "lvl1": 2, "lvl2": 4, "lvl3": 6},
                    <KeychainBonusModel>{"bonus": "Agi", "lvl1": 2, "lvl2": 4, "lvl3": 6}
                ]
            }),
        new KeychainBonusesBase("EquipmentKeychain7", <KeychainBonusesModel>{
                "bonuses": [
                    <KeychainBonusModel>{"bonus": "Wis", "lvl1": 2, "lvl2": 4, "lvl3": 6},
                    <KeychainBonusModel>{"bonus": "Luk", "lvl1": 2, "lvl2": 4, "lvl3": 6}
                ]
            }),
        new KeychainBonusesBase("EquipmentKeychain8", <KeychainBonusesModel>{"bonuses": [<KeychainBonusModel>{"bonus": "% Defence", "lvl1": 1, "lvl2": 2, "lvl3": 4}]}),
        new KeychainBonusesBase("EquipmentKeychain9", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Mining Xp Gain", "lvl1": 8, "lvl2": 12, "lvl3": 20}]
            }),
        new KeychainBonusesBase("EquipmentKeychain10", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Total Damage", "lvl1": 1.5, "lvl2": 2.5, "lvl3": 3}]
            }),
        new KeychainBonusesBase("EquipmentKeychain11", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Drop Chance", "lvl1": 3, "lvl2": 5, "lvl3": 8}]
            }),
        new KeychainBonusesBase("EquipmentKeychain12", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Basic Atk Speed", "lvl1": 3, "lvl2": 4, "lvl3": 6}]
            }),
        new KeychainBonusesBase("EquipmentKeychain13", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Crit Chance", "lvl1": 1.5, "lvl2": 2.5, "lvl3": 3}]
            }),
        new KeychainBonusesBase("EquipmentKeychain14", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Fishing Xp Gain", "lvl1": 8, "lvl2": 12, "lvl3": 20}]
            }),
        new KeychainBonusesBase("EquipmentKeychain15", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Xp From Monsters", "lvl1": 4, "lvl2": 6, "lvl3": 10}]
            }),
        new KeychainBonusesBase("EquipmentKeychain16", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Multikill", "lvl1": 5, "lvl2": 7, "lvl3": 12}]
            }),
        new KeychainBonusesBase("EquipmentKeychain17", <KeychainBonusesModel>{"bonuses": [<KeychainBonusModel>{"bonus": "% Defence", "lvl1": 3, "lvl2": 5, "lvl3": 8}]}),
        new KeychainBonusesBase("EquipmentKeychain18", <KeychainBonusesModel>{
                "bonuses": [
                    <KeychainBonusModel>{"bonus": "% Str", "lvl1": 2, "lvl2": 4, "lvl3": 6},
                    <KeychainBonusModel>{"bonus": "% Agi", "lvl1": 2, "lvl2": 4, "lvl3": 6}
                ]
            }),
        new KeychainBonusesBase("EquipmentKeychain19", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% All Afk Gain", "lvl1": 2, "lvl2": 3, "lvl3": 5}]
            }),
        new KeychainBonusesBase("EquipmentKeychain20", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Total Damage", "lvl1": 3, "lvl2": 4, "lvl3": 7}]
            }),
        new KeychainBonusesBase("EquipmentKeychain21", <KeychainBonusesModel>{
                "bonuses": [
                    <KeychainBonusModel>{"bonus": "% Wis", "lvl1": 2, "lvl2": 4, "lvl3": 6},
                    <KeychainBonusModel>{"bonus": "% Luk", "lvl1": 2, "lvl2": 4, "lvl3": 6}
                ]
            }),
        new KeychainBonusesBase("EquipmentKeychain22", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% Mob Respawn", "lvl1": 3, "lvl2": 4, "lvl3": 6}]
            }),
        new KeychainBonusesBase("EquipmentKeychain23", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% All Skill Speed", "lvl1": 1, "lvl2": 1.5, "lvl3": 2}]
            }),
        new KeychainBonusesBase("EquipmentKeychain24", <KeychainBonusesModel>{
                "bonuses": [<KeychainBonusModel>{"bonus": "% All Stats", "lvl1": 1, "lvl2": 2.5, "lvl3": 4}]
            })    
]
}
