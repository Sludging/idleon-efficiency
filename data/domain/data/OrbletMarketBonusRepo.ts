import { OrbletMarketBonusModel } from '../model/orbletMarketBonusModel';

export class OrbletMarketBonusBase { constructor(public index: number, public data: OrbletMarketBonusModel) { } }



export const initOrbletMarketBonusRepo = () => {
    return [    
        new OrbletMarketBonusBase(0, <OrbletMarketBonusModel>{
                "index": 0,
                "name": "EMULSION",
                "costBase": 2,
                "costMultiplier": 50,
                "maxLevel": 5,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "{%_chance_to_get_1M_statues_worth_of_Statue_EXP_when_a_Zenith_Cluster_is_formed!"
            }),
        new OrbletMarketBonusBase(1, <OrbletMarketBonusModel>{
                "index": 1,
                "name": "HYDRATION",
                "costBase": 3,
                "costMultiplier": 1.08,
                "maxLevel": 200,
                "bonusPerLevel": 5,
                "x1": 1,
                "description": "+{%_Resource_Collection_for_all_Outposts"
            }),
        new OrbletMarketBonusBase(2, <OrbletMarketBonusModel>{
                "index": 2,
                "name": "TALENTED",
                "costBase": 5,
                "costMultiplier": 1.12,
                "maxLevel": 100,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "+{_Talent_Points_for_Royal_Guardians"
            }),
        new OrbletMarketBonusBase(3, <OrbletMarketBonusModel>{
                "index": 3,
                "name": "FULL_CLEAR",
                "costBase": 10,
                "costMultiplier": 1.25,
                "maxLevel": 50,
                "bonusPerLevel": 1,
                "x1": 4,
                "description": "+{%_extra_kills_for_Clearing_Mobs_in_order_to_build_new_outposts!"
            }),
        new OrbletMarketBonusBase(4, <OrbletMarketBonusModel>{
                "index": 4,
                "name": "GLORIFICATION",
                "costBase": 25,
                "costMultiplier": 1.25,
                "maxLevel": 50,
                "bonusPerLevel": 4,
                "x1": 1,
                "description": "$"
            }),
        new OrbletMarketBonusBase(5, <OrbletMarketBonusModel>{
                "index": 5,
                "name": "INTERVENE",
                "costBase": 20,
                "costMultiplier": 1.125,
                "maxLevel": 100,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "}x_higher_chance_for_Regal_Intervention_to_trigger!"
            }),
        new OrbletMarketBonusBase(6, <OrbletMarketBonusModel>{
                "index": 6,
                "name": "STRONK_RANK",
                "costBase": 50,
                "costMultiplier": 1.2,
                "maxLevel": 50,
                "bonusPerLevel": 5,
                "x1": 1,
                "description": "All_kingdom_units_generate_Rank_EXP_+{%_faster"
            }),
        new OrbletMarketBonusBase(7, <OrbletMarketBonusModel>{
                "index": 7,
                "name": "BARGAIN",
                "costBase": 100,
                "costMultiplier": 1.5,
                "maxLevel": 25,
                "bonusPerLevel": 10,
                "x1": 1,
                "description": "All_Masterclass_upgrades_cost_+{%_less_than_before"
            }),
        new OrbletMarketBonusBase(8, <OrbletMarketBonusModel>{
                "index": 8,
                "name": "LONG_RANGE",
                "costBase": 200,
                "costMultiplier": 1.105,
                "maxLevel": 20,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "All_Outposts_get_+{px_longer_connection_range"
            }),
        new OrbletMarketBonusBase(9, <OrbletMarketBonusModel>{
                "index": 9,
                "name": "PARCHMORE",
                "costBase": 500,
                "costMultiplier": 1.15,
                "maxLevel": 100,
                "bonusPerLevel": 1,
                "x1": 1,
                "description": "+{%_Parchment_of_Enchantment_Drop_Rate_from_Verminous_Rats"
            })    
]
}
