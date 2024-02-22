import { Card } from "./cards";
import { Family } from "./family";
import { Food } from "./items";
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";
import { Prayer } from "./prayers";
import { ShrineConstants, Shrine } from "./shrines";
import { PlayerStatues, StatueConst } from "./statues";
import { ClassIndex } from "./talents";
import { ImageData } from "./imageData";
import { Divinity } from "./divinity";
import { Achievement, AchievementConst } from "./achievements";
import { SkillMastery } from "./rift";
import { Breeding } from "./breeding";
import { Worship, TotalizerBonus } from "./worship";

export class Skilling {
    static getXPReq = (skill: SkillsIndex, level: number) => {
        switch(skill) {
            case SkillsIndex.Smithing:
                return (15 + Math.pow(level, 2) + 13 * level) * Math.pow(1.225 - Math.min(0.114, (0.135 * level) / (level + 50)), level) - 26;
            case SkillsIndex.Construction:
                if (level < 71) {
                    return ((10 + Math.pow(level, 2.81) + 4 * level) * Math.pow(1.117 - (0.135 * level) / (level + 5), level) - 6) * (1 + Math.pow(level, 1.72) / 300);
                }
                return (((10 + Math.pow(level, 2.81) + 4 * level) * Math.pow(1.003, level) - 6) / 2.35) * (1 + Math.pow(level, 1.72) / 300);
            case SkillsIndex.Worship:
                return (15 + Math.pow(level, 1.3) + 6 * level) * Math.pow(1.17 - Math.min(0.07, (0.135 * level) / (level + 50)), level) - 26;
            default:
                return (15 + Math.pow(level, 2) + 15 * level) * Math.pow(1.225 - Math.min(0.18, (0.135 * level) / (level + 50)), level) - 30;
        }
    }

    // if ("AllSkillxpz" == t) {
    static getAllSkillXP = (
            player: Player, 
            shrines: Shrine[], 
            playerStatues: PlayerStatues, 
            prayers: Prayer[], 
            saltLickBonus: number = 0, 
            dungeonBonus: number = 0, 
            family: Family, 
            goldFoodStampBonus: number = 0, 
            sigilBonus: number = 0, 
            bubbleBonus: number, 
            divinity: Divinity,
            cards: Card[],
            achievements: Achievement[],
            skillMastery: SkillMastery,
            breeding: Breeding, 
            worship: Worship
        ) => {
        const skillingCardBonus = Card.GetTotalBonusForId(player.cardInfo?.equippedCards ?? [], 50);

        const goldFoodAchievement = achievements[AchievementConst.GoldFood].completed;
        const goldenFoodBonus = player.gear.food.filter(food => food && food.goldenFood != undefined && food.description.includes("Skill EXP"))
            .reduce((sum, food) => sum += (food as Food).goldFoodBonus(food?.count ?? 0, player.getGoldFoodMulti(family.classBonus.get(ClassIndex.Shaman)?.getBonus(player) ?? 0, goldFoodStampBonus, goldFoodAchievement, sigilBonus, bubbleBonus)), 0);
        const cardSetBonus = player.cardInfo?.getBonusForId(3) ?? 0;
        const shrineBonus = shrines[ShrineConstants.ExpShrine].getBonus(player.currentMapId);
        const statueBonus = playerStatues.statues[StatueConst.SkillXpIndex].getBonus(player);
        const prayerIncrease = prayers.filter(prayer => [2, 17].includes(prayer.index) && player.activePrayers.includes(prayer.index)).reduce((sum, prayer) => sum += prayer.getBonus(), 0) ?? 0;
        const prayerDecrease = prayers.filter(prayer => [1, 9].includes(prayer.index) && player.activePrayers.includes(prayer.index)).reduce((sum, prayer) => sum += prayer.getCurse(), 0) ?? 0;
        const masteroBuff = player.activeBuffs.find(talent => talent.skillIndex == 40)?.getBonus() ?? 0;
        const equipmentBonus = player.gear.equipment.reduce((sum, item) => sum += item?.getMiscBonus("Skill Exp") ?? 0, 0);
        const starSignBonus = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Skill EXP gain"), 0);

        const divinityBonus = divinity.gods[7].getMinorLinkBonus(player);
        const w5crystalCardBonus = cards.find(card => card.id == "w5a4")?.getBonus() ?? 0;
        const achieveBonuses = (10 * (achievements[283].completed ? 1 : 0)) + 
        (25 * (achievements[284].completed ? 1 : 0)) +
        (10 * (achievements[294].completed ? 1 : 0))

        const riftBonus = skillMastery.getTotalBonusByIndex(3) + skillMastery.getTotalBonusByIndex(6)
        const shinyBonus = breeding.shinyBonuses.find(bonus => bonus.data.index == 2)?.getBonus() ?? 0;
        const worshipBonus = worship.totalizer.getBonus(TotalizerBonus.SkillExp);

        const myriadBox = player.postOffice.find(box => box.index == 20)
        const poBonus = myriadBox?.bonuses[2].getBonus(myriadBox.level, 2) ?? 0;

        return starSignBonus + (skillingCardBonus + goldenFoodBonus) + (cardSetBonus + w5crystalCardBonus + shrineBonus + statueBonus + (prayerIncrease - prayerDecrease + (equipmentBonus + (masteroBuff + (saltLickBonus + dungeonBonus + poBonus + divinityBonus + achieveBonuses + riftBonus + shinyBonus + worshipBonus)))));
    }

    static getSkillImageData = (skill: SkillsIndex): ImageData => {
        let imageSrc: string;
        switch (skill) {
            case SkillsIndex.Mining:
                imageSrc = 'ClassIcons42';
                break;
            case SkillsIndex.Smithing:
                imageSrc = 'ClassIcons43';
                break;
            case SkillsIndex.Chopping:
                imageSrc = 'ClassIcons44';
                break;
            case SkillsIndex.Fishing:
                imageSrc = 'ClassIcons45';
                break;
            case SkillsIndex.Alchemy:
                imageSrc = 'ClassIcons46';
                break;
            case SkillsIndex.Catching:
                imageSrc = 'ClassIcons47';
                break;
            case SkillsIndex.Trapping:
                imageSrc = 'ClassIcons48';
                break;
            case SkillsIndex.Construction:
                imageSrc = 'ClassIcons49';
                break;
            case SkillsIndex.Worship:
                imageSrc = 'ClassIcons50';
                break;
            case SkillsIndex.Cooking:
                imageSrc = 'ClassIcons51';
                break;
            case SkillsIndex.Breeding:
                imageSrc = 'ClassIcons52';
                break;
            case SkillsIndex.Intellect:
                imageSrc = 'ClassIcons53';
                break;
            case SkillsIndex.Sailing:
                imageSrc = 'ClassIcons54';
                break;
            case SkillsIndex.Divinity:
                imageSrc = 'ClassIcons55';
                break;
            case SkillsIndex.Gaming:
                imageSrc = 'ClassIcons56';
                break;
            default:
                imageSrc = '';
                break;
        }

        return {
            location: imageSrc,
            height: 36,
            width: 38,
        }
    }
}