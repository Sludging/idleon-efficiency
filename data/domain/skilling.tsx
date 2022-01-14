import { round } from "../utility";
import { Card } from "./cards";
import { Player } from "./player";
import { Prayer } from "./prayers";
import { SaltLick } from "./saltLick";
import { ShrineConstants, Shrine } from "./shrines";
import { PlayerStatues, StatueConst } from "./statues";

export class Skilling {
    // if ("AllSkillxpz" == t) {
    //     var o = b.engine.getGameAttribute("DNSM"),
    //         u = null != d.StarSigns ? o.getReserved("StarSigns") : o.h.StarSigns,
    //         c = null != d.SkillEXP ? u.getReserved("SkillEXP") : u.h.SkillEXP;
    //     return (
    //         parsenum(c) +
    //         (U._customBlock_CardBonusREAL(50) +
    //             I._customBlock_GoldFoodBonuses("SkillExp") +
    //             (C._customBlock_CardSetBonuses(0, "3") +
    //                 C._customBlock_Shrine(5) +
    //                 F._customBlock_ArbitraryCode("StatueBonusGiven17") +
    //                 (C._customBlock_prayersReal(2, 0) -
    //                     C._customBlock_prayersReal(1, 1) -
    //                     C._customBlock_prayersReal(9, 1) +
    //                     (U._customBlock_EtcBonuses("27") + (F._customBlock_GetBuffBonuses(40, 1) + (C._customBlock_SaltLick(3) + C._customBlock_FlurboShop(2)))))))
    //     );
    // }
    static lavaLog = (num: number) => {
        return Math.log(Math.max(num, 1)) / 2.303;
    }
    
    static goldFoodBonus = (amount: number,stack: number) => {
        return round(amount*0.05*this.lavaLog(1+stack)*(1+ this.lavaLog(1+stack)/2.14));
    }

    static getAllSkillXP = (player: Player, shrines: Shrine[], playerStatues: PlayerStatues, prayers: Prayer[], saltLickBonus: number = 0, dungeonBonus: number = 0) => {
        const skillingCardBonus = Card.GetTotalBonusForId(player.cardInfo?.equippedCards ?? [], 50);
        const foodBonus = 7.5; //this.goldFoodBonus(18, 629); // DO GOLDEN FOOD STUFF! player.gear.food.find(item => item.)
        const cardSetBonus = player.cardInfo?.getBonusForId(3) ?? 0;
        const chizCardBonus = player.cardInfo?.equippedCards.find(x => x.id == "Z9")?.getBonus() ?? 0
        const shrineBonus = shrines[ShrineConstants.ExpShrine].getBonus(player.currentMapId, chizCardBonus);
        const statueBonus = playerStatues.statues[StatueConst.SkillXpIndex].getBonus(player);
        const prayerIncrease = prayers.find(prayer => prayer.prayerIndex == 2 && player.activePrayers.includes(prayer.prayerIndex))?.getBonus() ?? 0;
        const prayerDecrease = prayers.filter(prayer => [1, 9].includes(prayer.prayerIndex) && player.activePrayers.includes(prayer.prayerIndex)).reduce((sum, prayer) => sum += prayer.getCurse(), 0) ?? 0;
        const masteroBuff = player.activeBuffs.find(talent => talent.skillIndex == 40)?.getBonus() ?? 0;
        const equipmentBonus = player.gear.equipment.reduce((sum, item) => sum += item?.getMiscBonus("Skill Exp") ?? 0, 0);
        const starSignBonus = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Skill EXP gain"), 0);

        return starSignBonus + (skillingCardBonus + foodBonus) + (cardSetBonus + shrineBonus + statueBonus + (prayerIncrease - prayerDecrease + (equipmentBonus + (masteroBuff + (saltLickBonus + dungeonBonus)))));
    }
}