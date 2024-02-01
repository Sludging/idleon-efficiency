import { WeeklyShopModel } from '../model/weeklyShopModel';
import { WeeklyShopSectionEnum } from '../enum/weeklyShopSectionEnum';

export class WeeklyShopBase { constructor(public index: number, public data: WeeklyShopModel) { } }



export const initWeeklyShopRepo = () => {
    return [    
        new WeeklyShopBase(0, <WeeklyShopModel>{
                "name": "Galaxy_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 50,
                "intName": "UImain_a",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(1, <WeeklyShopModel>{
                "name": "Hardwood_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 15,
                "intName": "UImain_b",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(2, <WeeklyShopModel>{
                "name": "Deadwood_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 15,
                "intName": "UImain_c",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(3, <WeeklyShopModel>{
                "name": "Corkboard_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 25,
                "intName": "UImain_d",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(4, <WeeklyShopModel>{
                "name": "Catacomb_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 40,
                "intName": "UImain_e",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(5, <WeeklyShopModel>{
                "name": "Rift_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 35,
                "intName": "UImain_f",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(6, <WeeklyShopModel>{
                "name": "Magma_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 40,
                "intName": "UImain_g",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(7, <WeeklyShopModel>{
                "name": "Grassy_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 30,
                "intName": "UImain_h",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(8, <WeeklyShopModel>{
                "name": "Sandburn_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 25,
                "intName": "UImain_i",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(9, <WeeklyShopModel>{
                "name": "Graveyard_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 20,
                "intName": "UImain_j",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(10, <WeeklyShopModel>{
                "name": "Goldwood_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 60,
                "intName": "UImain_k",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(11, <WeeklyShopModel>{
                "name": "Peachwood_UI",
                "section": WeeklyShopSectionEnum.UI,
                "cost": 20,
                "intName": "UImain_l",
                "desc": "filler",
                "itemType": 0
            }),
        new WeeklyShopBase(12, <WeeklyShopModel>{
                "name": "Pink_Headband",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 999,
                "intName": "EquipmentHats10",
                "desc": "The_legendary_Pink_Headband",
                "itemType": 1
            }),
        new WeeklyShopBase(13, <WeeklyShopModel>{
                "name": "Killroy_Skulls",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 14,
                "intName": "Quest69",
                "desc": "25_Skulls_for_Killroy's_Shop,_deposited_instantly_for_use",
                "itemType": 0
            }),
        new WeeklyShopBase(14, <WeeklyShopModel>{
                "name": "Trophy_Starbook",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 25,
                "intName": "TalentBook1",
                "desc": "Trophy_Star_Talent_book_with_random_Max_LV_up_to_Lv_100",
                "itemType": 0
            }),
        new WeeklyShopBase(15, <WeeklyShopModel>{
                "name": "Death_Starbook",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 25,
                "intName": "TalentBook1",
                "desc": "Death_Star_Talent_book_with_random_Max_LV_up_to_Lv_100",
                "itemType": 0
            }),
        new WeeklyShopBase(16, <WeeklyShopModel>{
                "name": "The_Crow_Perch",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 125,
                "intName": "EquipmentHats84",
                "desc": "A_little_crow_on_a_hat,_perfect_for_premiumify-ing",
                "itemType": 1
            }),
        new WeeklyShopBase(17, <WeeklyShopModel>{
                "name": "Gold_Food",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 12,
                "intName": "FoodG",
                "desc": "100_Gold_Food_of_the_type_shown_to_the_left",
                "itemType": 0
            }),
        new WeeklyShopBase(18, <WeeklyShopModel>{
                "name": "Statues",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 12,
                "intName": "EquipmentStatues",
                "desc": "1000_Statues_of_the_type_shown_to_the_left",
                "itemType": 0
            }),
        new WeeklyShopBase(19, <WeeklyShopModel>{
                "name": "Silver_Pocketwatch",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 2,
                "intName": "Quest76",
                "desc": "Alter_your_daily_reset_time_forward_or_backward_by_15_mins",
                "itemType": 1
            }),
        new WeeklyShopBase(20, <WeeklyShopModel>{
                "name": "Gold_Pocketwatch",
                "section": WeeklyShopSectionEnum.Items,
                "cost": 30,
                "intName": "Quest77",
                "desc": "Shift_time_forward_by_24_hours,_triggering_daily_bonuses_and_resets",
                "itemType": 1
            })    
]
}
