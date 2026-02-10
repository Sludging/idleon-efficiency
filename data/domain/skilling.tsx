import { Card } from "./cards";
import { Family } from "./family";
import { Food } from "./items";
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";
import { Prayer } from "./world-3/prayers";
import { ShrineConstants, Shrine } from "./world-3/construction/shrines";
import { PlayerStatues, StatueConst } from "./world-1/statues";
import { ClassIndex } from "./talents";
import { ImageData } from "./imageData";
import { Divinity } from "./world-5/divinity";
import { Achievement } from "./achievements";
import { SkillMastery } from "./world-4/rift";
import { Breeding } from "./world-4/breeding";
import { Worship, TotalizerBonus } from "./world-3/worship";
import { Summoning } from "./world-6/summoning";
import { Guild } from './guild';
import { BeanstalkingBonusType, Sneaking } from "./world-6/sneaking";
import { Bribe } from "./world-1/bribes";
import { Cooking } from "./world-4/cooking";
import { EquipmentSets } from "./misc/equipmentSets";
import { LegendTalents } from "./world-7/legendTalents";
import { Companion } from "./companions";
import { Votes } from "./world-2/votes";

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

    // if ("AllSkillxpz" == d) {
    static getAllSkillXP = (
            player: Player, 
            players: Player[],
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
            worship: Worship,
            guild: Guild,
            summoning: Summoning,
            sneaking: Sneaking,
            bribes: Bribe[],
            cooking: Cooking,
            equipementSets: EquipmentSets,
            legendTalents: LegendTalents,
            companions: Companion[],
            votes: Votes
        ) => {
        const skillingCardBonus = Card.GetTotalBonusForId(player.cardInfo?.equippedCards ?? [], 50);

        const pristineCharm14 = sneaking.pristineCharms.find(charm => charm.data.itemId == 14);
        const bribeBonus36 = bribes.find(bribe => bribe.bribeIndex == 36)?.value ?? 0;
        const zGoldFoodMealBonus = cooking.meals.filter(meal => meal.bonusKey == "zGoldFood").reduce((sum, meal) => sum += meal.getBonus() ?? 0, 0);
        const goldFoodAchievement37 = achievements[37].completed;
        const goldFoodAchievement380 = achievements[380].completed;
        const goldFoodAchievement383 = achievements[383].completed;
        const equipmentSetBonus = equipementSets.getSetBonus("SECRET_SET", player);
        const votingBonus26 = votes.getCurrentBonus(26);
        const companion48 = companions.find(c => c.id === 48)?.owned || false ? 5 : 0;
        const legenTalent25 = legendTalents.getBonusFromIndex(25);
        const cropFallEventCard = cards.filter(card => card.data.cardID == "cropfallEvent1").reduce((sum, card) => sum += card.getBonus(), 0);
        
        let apocalypseWoW = 0;
        const bestDeathBringer = players.filter(player => player.classId == ClassIndex.Death_Bringer).sort((player1, player2) => player1.getTalentBonus(209) > player2.getTalentBonus(209) ? 1 : -1).pop();
        const deathBringerForKills = players.filter(player => [ClassIndex.Blood_Berserker, ClassIndex.Death_Bringer].indexOf(player.classId) >= 0).sort((player1, player2) => player1.playerID > player2.playerID ? 1 : -1).pop();
        if (bestDeathBringer && deathBringerForKills) {
            const deathbringeWoWStacks = Array.from(deathBringerForKills.killInfo.entries()).filter(([_, count]) => count >= 1000000000).length;;
            const skillBonus = bestDeathBringer.getTalentBonus(209);
            apocalypseWoW = skillBonus * deathbringeWoWStacks;
        }
        const goldFoodBoost = player.getGoldFoodMulti(family.classBonus.get(ClassIndex.Shaman)?.getBonus(player) ?? 0, goldFoodStampBonus, goldFoodAchievement37, goldFoodAchievement380, goldFoodAchievement383, sigilBonus, bubbleBonus, zGoldFoodMealBonus, player.starSigns.find(sign => sign.name == "Beanbie Major")?.getBonus("Golden Food") ?? 0, bribeBonus36, ((pristineCharm14 && pristineCharm14.unlocked) ? pristineCharm14.data.x1 : 0), equipmentSetBonus, votingBonus26, apocalypseWoW, companion48, legenTalent25, cropFallEventCard);
        const goldenFoodBonus = player.gear.food.filter(food => food && food.goldenFood != undefined && food.description.includes("Skill EXP"))
            .reduce((sum, food) => sum += (food as Food).goldFoodBonus(food?.count ?? 0, goldFoodBoost), 0);
        const beanstalkBaseBonus = sneaking.beanstalking.bonuses.find(bonus => bonus.type == BeanstalkingBonusType.GoldenHam);
        const bonusFromBeanstalk = beanstalkBaseBonus ? beanstalkBaseBonus.item.goldFoodBonus(beanstalkBaseBonus.getStackSize(), goldFoodBoost) : 0;
        const cardSetBonus = player.cardInfo?.getBonusForId(3) ?? 0;
        const shrineBonus = shrines[ShrineConstants.ExpShrine].getBonus(player.currentMapId);
        const statueBonus = playerStatues.statues[StatueConst.SkillXpIndex].getBonus(player);
        const prayerIncrease = prayers.filter(prayer => [2, 17].includes(prayer.index) && player.activePrayers.includes(prayer.index)).reduce((sum, prayer) => sum += prayer.getBonus(), 0) ?? 0;
        const prayerDecrease = prayers.filter(prayer => [1, 9].includes(prayer.index) && player.activePrayers.includes(prayer.index)).reduce((sum, prayer) => sum += prayer.getCurse(), 0) ?? 0;
        const masteroBuff = player.activeBuffs.find(talent => talent.skillIndex == 40)?.getBonus() ?? 0;
        const equipmentBonus = player.gear.equipment.reduce((sum, item) => sum += item?.getMiscBonus("Skill Exp") ?? 0, 0);
        const starSignBonus = player.starSigns.reduce((sum, sign) => sum += sign.getBonus("Skill EXP gain"), 0);
        const summoningBonus = summoning.summonBonuses?.find(bonus => bonus.data.bonusId == 13)?.getBonus() || 0;
        const guildBonus = guild.guildBonuses.find(bonus => bonus.index == 14)?.getBonus() ?? 0;

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

        return starSignBonus + guildBonus + (skillingCardBonus + goldenFoodBonus + bonusFromBeanstalk) + (cardSetBonus + w5crystalCardBonus + shrineBonus + statueBonus + (prayerIncrease - prayerDecrease + (equipmentBonus + (masteroBuff + (saltLickBonus + dungeonBonus + poBonus + divinityBonus + achieveBonuses + riftBonus + shinyBonus + worshipBonus + summoningBonus)))));
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
            case SkillsIndex.Farming:
                imageSrc = 'ClassIcons57';
                break;
            case SkillsIndex.Sneaking:
                imageSrc = 'ClassIcons58';
                break;
            case SkillsIndex.Summoning:
                imageSrc = 'ClassIcons59';
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