import { TournamentRaidModel } from '../model/tournamentRaidModel';
import { TournamentRewardTierModel } from '../model/tournamentRewardTierModel';

export class TournamentRaidBase { constructor(public index: number, public data: TournamentRaidModel) { } }



export const initTournamentRaidRepo = () => {
    return [    
        new TournamentRaidBase(0, <TournamentRaidModel>{
                "rankNames": ["Bronze", "Silver", "Gold", "Diamond", "Master"],
                "rankMaterials": [
                    200,
                    200,
                    180,
                    170,
                    160,
                    200,
                    200,
                    200
                ],
                "mapNames": [
                    "Blunder Hills Meadow",
                    "Smolderin' Plateau Ridge",
                    "Mysterious Unknown Land",
                    "Mysterious Unknown Land",
                    "Mysterious Unknown Land",
                    "Mysterious Unknown Land",
                    "Mysterious Unknown Land",
                    "Mysterious Unknown Land"
                ],
                "mapLimits": [
                    6,
                    24,
                    6,
                    6,
                    6,
                    6,
                    6,
                    6,
                    6
                ],
                "rewardTiers": [
                    <TournamentRewardTierModel>{"tier": 0, "itemIds": ["EquipmentRingsChat12"]},
                    <TournamentRewardTierModel>{"tier": 1, "itemIds": ["EquipmentHats136", "EquipmentHats137", "EquipmentHats138"]},
                    <TournamentRewardTierModel>{
                        "tier": 2,
                        "itemIds": ["EquipmentNametagReplica38", "EquipmentNametagReplica39", "EquipmentNametagReplica40"]
                    },
                    <TournamentRewardTierModel>{
                        "tier": 3,
                        "itemIds": ["EquipmentRingsChat13", "EquipmentRingsChat14", "EquipmentRingsChat15"]
                    },
                    <TournamentRewardTierModel>{"tier": 4, "itemIds": ["EquipmentHats142", "EquipmentHats143", "EquipmentHats144"]}
                ]
            })    
]
}
