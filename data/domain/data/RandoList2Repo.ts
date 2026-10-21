import { RandoListModel } from '../model/randoListModel';

export class RandoListBase { constructor(public index: number, public data: RandoListModel) { } }



export const initRandoList2Repo = () => {
    return [    
        new RandoListBase(0, <RandoListModel>{
                "elements": [
                    "Gives_3x_more_₣_when_picked,_but_gives_no_gaming_exp.|Usually,_gaming_exp_is_based_on_₣_gained",
                    "Gives_4x_₣_per_evolution_instead_of_the_normal_|3x_₣_per_evolution_that_other_plants_get",
                    "Gives_growth_cycles_to_surrounding_plants_within_230_pixels.|The_more_evolutions_the_cactus_has,_the_more_cycles_it_gives!",
                    "Gives_2x_more_₣_when_picked,_and_5x_more_gaming_exp_too.",
                    "Instantly_grows_plants,_the_amount_based_on_Voraci's_Evolution.|These_plants_can_be_Sprouts,_Fungi,_Bonsai,_Cactus,_or_Blossoms.",
                    "Gives_7x_more_₣_when_picked,_and_3x_more_gaming_exp_too.",
                    "Gives_up_to_100x_more_₣_when_picked,_but_the_exact|multiplier_is_random._It_could_be_as_low_as_just_1x_₣.",
                    "Moves_everything_in_garden_ahead_in_time_when_picked.|This_includes_import_item_cooldowns_and_growing_all_plants.",
                    "Has_a_chance_of_recovering_one_of_King_Rat's_100_missing_crowns.|You_can't_get_duplicate_crowns,_just_so_you_know..."
                ]
            }),
        new RandoListBase(1, <RandoListModel>{
                "elements": [
                    "Little_Sprinkler",
                    "Dirty_Shovel",
                    "Autumn_Squirrel",
                    "Elegant_Seashell",
                    "Kitsune_Roxie",
                    "Bog_Log",
                    "POiNG_Controller",
                    "Immortal_Snail",
                    "King_Rat_of_Olde",
                    "idk"
                ]
            }),
        new RandoListBase(2, <RandoListModel>{
                "elements": [
                    "A_small_metal_sprinkler,_and_a_trusty_ally_to_have_in_the_garden._It's_heart_is_in_the_right_place,_but_it_won't_do_much_if_your_garden_has_no_space.",
                    "It_may_be_rusty_and_old,_but_this_reliable_tool_can_find_pure_gold!_With_rumors_of_a_million_multiplier_nugget,_this_is_sure_to_come_in_handy!",
                    "Everyones_favorite_garden_rodent,_other_than_the_King_Rat_of_Olde._This_furry_fella_just_cant_help_but_gather_all_the_nuts_it_can_find!",
                    "The_seashell_emits_a_soothing_ocean_noise._The_good_vibes_stop_once_you_realize_that_ninja_tsunamis_will_use_this_as_a_distraction_to_sneak_up_on_you.",
                    "Totally_kawaii,_totally_enjoys_sleeping!_IMPORTANT:_Kitsune_Rock_cannot_be_toggled_while_plants_are_unpicked.",
                    "Underneath_each_log_lies_either_a_star,_which_will_give_you_instant_garden_growth,_or_death,_which_will_end_your_career_as_a_log_flipper.",
                    "Retro_technology_capable_of_moving_a_rectangle_into_the_direct_path_of_a_circle,_in_the_hopes_that_the_opposing_rectangle_wont_do_it_as_well.",
                    "This_snail_will_slowly_drive_you_crazy._With_each_Lv,_the_snail_grows_stronger,_and_thanks_to_the_Snail_Sprout_Treaty_of_1951,_your_garden_does_too.",
                    "He_used_to_rule_the_garden..._IMPORTANT_INFO:_Higher_evolved_Royale_Sprouts_have_higher_chances_of_finding_new_Crowns!",
                    "idk"
                ]
            }),
        new RandoListBase(3, <RandoListModel>{
                "elements": [
                    "85",
                    "143",
                    "162",
                    "165",
                    "55",
                    "256",
                    "244",
                    "166",
                    "106",
                    "306",
                    "196",
                    "311",
                    "325",
                    "210",
                    "279",
                    "328",
                    "382",
                    "205"
                ]
            }),
        new RandoListBase(4, <RandoListModel>{
                "elements": [
                    "Instantly_grows_sprouts_when_activated.|Recharges_over_time.",
                    "Digs_up_gold_nuggets_when_activated.|Only_the_biggest_nugget_found_affects_₣_multi",
                    "Gives_all_acorns_it_has_found_since_your_last_visit.|Acorns_are_spent_in_the_Acorn_Shop",
                    "Boosts_₣_from_plants_based_on_Shell_Rank.|Increase_Shell_Rank_when_enough_plants_evolve.",
                    "Plants_grow_4x_faster_but_all_give_3x_less_₣|Tap_rock_to_turn_this_effect_ON_or_OFF",
                    "Lets_you_play_the_Log_Minigame,_which|awards_Instant_Progress_if_you_find_stars!",
                    "Lets_you_play_POiNG,_and_adds_a_new|₣_Multi_based_on_your_Highscore",
                    "Every_day,_the_snail_will_collect_mail.|Spend_the_mail_to_upgrade_the_snail.",
                    "Boosts_₣_for_every_Crown_found,|and_generates_King_Tokens_to_spend_on_upgrades",
                    ""
                ]
            }),
        new RandoListBase(5, <RandoListModel>{
                "elements": [
                    "Recharges_+{%_faster",
                    "+{%_big_nugget_luck",
                    "+{%_acorns_found",
                    "+{%_₣_per_Rank",
                    "+{%_faster_active_bonus",
                    "{%_chance_for_free_game",
                    "No_bonus._It's_all_skill.",
                    "+{%_chance_for_2x_daily_mail",
                    "+{%_chance_to_find_Crowns",
                    "box10"
                ]
            }),
        new RandoListBase(6, <RandoListModel>{
                "elements": [
                    "1",
                    "1",
                    "1",
                    "2",
                    "3",
                    "4",
                    "5",
                    "7",
                    "8",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9",
                    "9"
                ]
            }),
        new RandoListBase(7, <RandoListModel>{
                "elements": [
                    "1",
                    "1",
                    "2",
                    "3",
                    "5",
                    "8",
                    "12",
                    "24",
                    "36",
                    "72",
                    "96",
                    "96",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120",
                    "120"
                ]
            }),
        new RandoListBase(8, <RandoListModel>{
                "elements": [
                    "200",
                    "1",
                    "30",
                    "10",
                    "2",
                    "20"
                ]
            }),
        new RandoListBase(9, <RandoListModel>{
                "elements": [
                    "SALTY",
                    "SPICY",
                    "SWEET",
                    "SMOKY",
                    "SOUR",
                    "SAVORY"
                ]
            }),
        new RandoListBase(10, <RandoListModel>{
                "elements": [
                    "弱",
                    "弦",
                    "弄",
                    "异",
                    "开",
                    "幽",
                    "幻",
                    "平",
                    "干",
                    "帮",
                    "帝",
                    "塑"
                ]
            }),
        new RandoListBase(11, <RandoListModel>{
                "elements": [
                    "Opal_Find",
                    "Slop_Drop",
                    "Reslime",
                    "Droplier",
                    "Killionaire",
                    "Insta-Ribbon",
                    "Big_Hit_Multkill",
                    "Active_Drops",
                    "Sleepy_Drops",
                    "One_Big_Blue",
                    "Blue_Collector",
                    "Researchy",
                    "Droplier+",
                    "Sleepy_Drops+",
                    "Cavernicus",
                    "Multikill",
                    "One_Big_Purp",
                    "Slop_Drop+",
                    "Rich_Get_Rich",
                    "DeEmGe",
                    "Grandioso",
                    "Slop_Drop++",
                    "Purp_Collector",
                    "IDK_Broh"
                ]
            }),
        new RandoListBase(12, <RandoListModel>{
                "elements": [
                    "Get_+1_opal_to_invest_into_Villagers!",
                    "Boost_Drop_Rate_here_in_The_Cove_by_{%",
                    "Increase_Crystal_Glunko_respawn_rate_by_+{%",
                    "Mulitply_Drop_Rate_here_in_this_Cove_by_}x",
                    "+{%_DR_here_in_The_Cove_per_POW_10_Glunko_kills",
                    "Get_a_Rank_15_Ribbon_for_Cooking,_instantly!",
                    "Boost_your_Multikill_Per_Dmg_Tier_here_to_{%",
                    "Decrease_the_cost_of_all_upgrades_here_by_$%",
                    "Boost_AFK_Gains_rate_here_by_+{%",
                    "}x_Drop_Value_for_your_specified_blue_shape",
                    "+{%_DR_here,_per_digit_of_Blue_Shapes_owned",
                    "}x_Research_EXP_gain_for_outside_this_cove",
                    "Mulitply_Drop_Rate_here_in_this_Cove_by_}x",
                    "Boost_AFK_Gains_rate_here_by_+{%",
                    "Earn_}x_more_resources_from_all_caverns",
                    "Boost_base_Multikill_here_by_+{%",
                    "}x_Drop_Value_for_your_specified_purp_shape",
                    "Boost_Drop_Rate_here_by_+{%",
                    "Boost_DR_here_by_+{%_per_POW_10_normal_DR",
                    "Boost_Total_Damage_for_all_chars_by_}x",
                    "Boost_Grand_Discovery_Chance_in_Spelunking_by_}x",
                    "Boost_Drop_Rate_here_in_Cavern_18_by_{%",
                    "+{%_DR_here,_per_digit_of_Purp_Shapes_owned",
                    "World_7_Skill_3_my_man,_not_yet."
                ]
            }),
        new RandoListBase(13, <RandoListModel>{
                "elements": [
                    "1",
                    "15",
                    "2",
                    "8",
                    "3",
                    "1",
                    "1",
                    "3",
                    "1",
                    "10",
                    "1",
                    "1",
                    "25",
                    "3",
                    "10",
                    "100",
                    "10",
                    "25",
                    "2",
                    "1",
                    "5",
                    "150",
                    "2",
                    "1"
                ]
            }),
        new RandoListBase(14, <RandoListModel>{
                "elements": [
                    "7.5",
                    "1.35",
                    "2.50",
                    "1.55",
                    "1.60",
                    "5.00",
                    "2.00",
                    "1.50",
                    "1.75",
                    "1.45",
                    "1.85",
                    "1.25",
                    "1.70",
                    "2.00",
                    "3.00",
                    "1.75",
                    "1.45",
                    "1.35",
                    "3.00",
                    "1.50",
                    "1.12",
                    "1.40",
                    "1.95",
                    "5.0"
                ]
            })    
]
}
