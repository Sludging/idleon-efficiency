import { CosmoTypeEnum } from '../enum/cosmoTypeEnum';
import { CosmoUpgradeModel } from '../model/cosmoUpgradeModel';

export class CosmoUpgradeBase { constructor(public index: number, public data: CosmoUpgradeModel) { } }



export const initCosmoUpgradeRepo = () => {
    return [    
        new CosmoUpgradeBase(0, <CosmoUpgradeModel>{
                "perLvl": 25,
                "zero": 0,
                "name": "Monumental_Vibes",
                "desc": "All_of_your_Monument_Bonuses_are_x_higher!_9_out_of_10_monument_enjoyers_recommend_this_bonus!",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(1, <CosmoUpgradeModel>{
                "perLvl": 1,
                "zero": 0,
                "name": "String_is_Strung",
                "desc": "Adds_{_more_string_to_your_harp,_cluck_it_with_pride!_Err,_pluck_it._I'm_not_a_chicken_that_was_just_a_typo!!",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(2, <CosmoUpgradeModel>{
                "perLvl": 30,
                "zero": 0,
                "name": "Wishy_Washy",
                "desc": "+{%_chance_to_get_an_additional_Wish_every_day_at_the_Lamp!",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(3, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Don't_conjure_this..._it_does_nothing_yet!_Wait_for_future_updates,_where_this_bonus_and_more_will_be_added!",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(4, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(5, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(6, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(7, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(8, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Hole
            }),
        new CosmoUpgradeBase(9, <CosmoUpgradeModel>{
                "perLvl": 30,
                "zero": 0,
                "name": "Opal_Enthusiasm",
                "desc": "Every_10th_opal_invested_in_a_villager_boosts_their_own_exp_gain_by_+%",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(10, <CosmoUpgradeModel>{
                "perLvl": 1,
                "zero": 0,
                "name": "Contented_Creator",
                "desc": "+{%_villager_exp_gain_per_schematic_created._@_Total_Bonus:_+|%",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(11, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Cosmo,_Enhance!",
                "desc": "You_can_now_enhance_conjuror_bonuses!_Also,_uh,_+{%_villager_exp_gain,_why_not?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(12, <CosmoUpgradeModel>{
                "perLvl": 25,
                "zero": 0,
                "name": "Lengthmeister",
                "desc": "All_measurement_bonuses_are_x_higher!_Inchredible!_Meterrific!_Footastic!_Yards!!!!",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(13, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Don't_conjure_this..._it_does_nothing_yet!_Wait_for_future_updates,_where_this_bonus_and_more_will_be_added!",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(14, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(15, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(16, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(17, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(18, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(19, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(20, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Village
            }),
        new CosmoUpgradeBase(21, <CosmoUpgradeModel>{
                "perLvl": 1,
                "zero": 0,
                "name": "Pocket_Divinity",
                "desc": "Get_the_link_bonuses_from_this_god:_@_Y_@_Z",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(22, <CosmoUpgradeModel>{
                "perLvl": 2,
                "zero": 0,
                "name": "Beeg_Beeg_Forge",
                "desc": "Increase_the_forge_capacity_by_x",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(23, <CosmoUpgradeModel>{
                "perLvl": 100,
                "zero": 0,
                "name": "Resource_Bursting",
                "desc": "Increase_the_max_Multi-Ore_by_{%_but_not_just_for_ore..._for_ALL_resources!_Multi-fish,_Multi-everything!",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(24, <CosmoUpgradeModel>{
                "perLvl": 6,
                "zero": 0,
                "name": "Voter_Integrity",
                "desc": "Get_+{%_Ballot_Box_bonus_multiplier!_This_way_you_can_be_even_MORE_emotionally_invested_in_the_vote_outcome!",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(25, <CosmoUpgradeModel>{
                "perLvl": 75,
                "zero": 0,
                "name": "Weapon_Relevancy",
                "desc": "The_effect_Weapon_Power_has_on_DMG_is_{%_higher.",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(26, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Don't_conjure_this..._it_does_nothing_yet!_Wait_for_future_updates,_where_this_bonus_and_more_will_be_added!",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(27, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(28, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(29, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(30, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(31, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Idleon
            }),
        new CosmoUpgradeBase(32, <CosmoUpgradeModel>{
                "perLvl": 10,
                "zero": 0,
                "name": "Confused_Bonus",
                "desc": "Who_am_I_to_tell_you_what_bonus_I_give?",
                "cosmoType": CosmoTypeEnum.Idleon
            })    
]
}
