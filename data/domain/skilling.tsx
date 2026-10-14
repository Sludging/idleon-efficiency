import { Card } from "./cards";
import type { GoldenFood } from "./golden-food";
import { Companion, getCompanionActiveBonus } from "./companions";
import { Domain, RawData } from "./base/domain";
import { Family } from "./family";
import { Item } from "./items";
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";
import { Prayer } from "./world-3/prayers";
import { ShrineConstants, Shrine } from "./world-3/construction/shrines";
import { PlayerStatues, StatueConst } from "./world-1/statues";
import { ClassIndex } from "./talents";
import { ImageData } from "./imageData";
import { Divinity } from "./world-5/divinity";
import { Achievement } from "./achievements";
import { Rift, SkillMastery } from "./world-4/rift";
import { Breeding } from "./world-4/breeding";
import { Worship, TotalizerBonus } from "./world-3/worship";
import { Summoning } from "./world-6/summoning";
import { Guild } from './guild';
import { Cooking } from "./world-4/cooking";
import { EquipmentBonus } from "./equipment-effects";
import { Alchemy } from "./world-2/alchemy/alchemy";
import { Quests } from "./quests";
import { Sailing } from "./world-5/sailing/sailing";
import { Tome } from "./world-4/tome";
import { Gaming } from "./world-5/gaming";
import { Friends } from "./friends";
import { Hole } from "./world-5/hole/hole";
import { Hoops } from "./world-1/hoops";
import { IslandExpeditions } from "./world-2/islandExpedition";

export class Skilling extends Domain {
    private allEfficiencies = new Map<number, number>();

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], _charCount: number): Skilling {
        return this;
    }

    parse(_data: Map<string, any>): void {
        return;
    }

    getAllEfficiencies(player: Player): number {
        const result = this.allEfficiencies.get(player.playerID);
        if (result === undefined) {
            throw new Error(`AllEfficiencies has not been calculated for player ${player.playerID}`);
        }
        return result;
    }

    updateAllEfficiencies(data: Map<string, any>): void {
        const players = data.get("players") as Player[];
        const family = data.get("family") as Family;
        const alchemy = data.get("alchemy") as Alchemy;
        const sailing = data.get("sailing") as Sailing;
        const quests = data.get("quests") as Quests;
        const cooking = data.get("cooking") as Cooking;
        const tome = data.get("tome") as Tome;
        const gaming = data.get("gaming") as Gaming;
        const cards = data.get("cards") as Card[];
        const friends = data.get("friends") as Friends;
        const skillMastery = (data.get("rift") as Rift).bonuses.find(bonus => bonus.name === "Skill Mastery") as SkillMastery;
        const hole = data.get("hole") as Hole;
        const hoops = data.get("hoops") as Hoops;
        const islandExpeditions = data.get("islandExpeditions") as IslandExpeditions;
        const companions = data.get("companions") as Companion[];
        const summoning = data.get("summoning") as Summoning;
        const guild = data.get("guild") as Guild;
        const prayers = data.get("prayers") as Prayer[];

        const vialSkillEfficiency = alchemy.getVialBonusForKey("6SkillEff");
        const artifactBonus = sailing.artifacts[15]?.getBonus() ?? 0;
        const totalQuestsComplete = quests.getTotalQuestsComplete();
        const mealSkillEfficiency = cooking.getMealBonusForKey("Seff");
        const paletteBonus = gaming.getPaletteBonus(10);
        const crystalCardLevel = cards.find(card => card.id === "Crystal4")?.getLevels() ?? 0;
        const friendBonus = friends.getFriendBonus(2);
        const riftBonus = skillMastery.getTotalBonusByIndex(4);
        const holeBonus = hole.getSchematicBonus(49, 15);
        // Hoops owns option 422, while Shimmer owns the complete lantern-multiplied option 180 term.
        const hoopsBonus = hoops.getBonus(3);
        const shimmerBonus = islandExpeditions.getShimmerBonus(6);
        const companionBonus = getCompanionActiveBonus(companions, 5);
        const summoningBonus = summoning.getSummoningWinnerBonusFromIndex(14);
        const guildBonus = guild.guildBonuses.find(bonus => bonus.index === 6)?.getBonus() ?? 0;
        const prayer1 = prayers.find(prayer => prayer.index === 1);
        const prayer17 = prayers.find(prayer => prayer.index === 17);

        this.allEfficiencies.clear();
        for (const player of players) {
            // Quest completion contributes 0.1% each, capped by this character's Talent 617 bonus.
            const questBonus = Math.min(0.1 * totalQuestsComplete, player.getTalentBonus(617));
            const prayerBonus = player.activePrayers.includes(1) ? prayer1?.getBonus() ?? 0 : 0;
            const prayerCurse = player.activePrayers.includes(17) ? prayer17?.getCurse() ?? 0 : 0;
            const buffPenalty = player.activeBuffs.find(talent => talent.skillIndex === 40)?.getBonus(false, true) ?? 0;

            // Preserve the source's A/B/E addition tree and six-factor multiplication order.
            const factorA = 1 + ((family.getClassBonus(ClassIndex.Hunter)?.getBonus(player) ?? 0)
                + (player.getEquipmentBonus(EquipmentBonus.SkillEfficiency) + vialSkillEfficiency
                    + (artifactBonus + questBonus))) / 100;
            const factorB = 1 + (mealSkillEfficiency + player.getTalentBonus(646)
                + (tome.getTomeBonus(1, player) + paletteBonus)
                + (player.getChipBonus("toteff") + (3 * crystalCardLevel + friendBonus))
                + (riftBonus + (holeBonus + hoopsBonus) + shimmerBonus)) / 100;
            const factorC = 1 + (Card.GetTotalBonusForId(player.cardInfo?.equippedCards ?? [], 84) + companionBonus) / 100;
            const factorD = 1 + summoningBonus / 100;
            const factorE = 1 + (guildBonus + ((player.cardInfo?.getBonusForId(2) ?? 0) + prayerBonus)) / 100;
            // The combined Maestro Transfusion and Unending Energy penalty cannot reduce this factor below 1%.
            const penaltyFactor = Math.max(1 - (buffPenalty + prayerCurse) / 100, 0.01);

            this.allEfficiencies.set(
                player.playerID,
                factorA * factorB * factorC * factorD * factorE * penaltyFactor,
            );
        }
    }
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
            divinity: Divinity,
            cards: Card[],
            achievements: Achievement[],
            skillMastery: SkillMastery,
            breeding: Breeding, 
            worship: Worship,
            guild: Guild,
            summoning: Summoning,
            goldenFood: GoldenFood
        ) => {
        const skillingCardBonus = Card.GetTotalBonusForId(player.cardInfo?.equippedCards ?? [], 50);

        const goldenFoodBonus = goldenFood.getSkillExp(player);
        const cardSetBonus = player.cardInfo?.getBonusForId(3) ?? 0;
        const shrineBonus = shrines[ShrineConstants.ExpShrine].getBonus(player.currentMapId);
        const statueBonus = playerStatues.statues[StatueConst.SkillXpIndex].getBonus(player);
        const prayerIncrease = prayers.filter(prayer => [2, 17].includes(prayer.index) && player.activePrayers.includes(prayer.index)).reduce((sum, prayer) => sum += prayer.getBonus(), 0) ?? 0;
        const prayerDecrease = prayers.filter(prayer => [1, 9].includes(prayer.index) && player.activePrayers.includes(prayer.index)).reduce((sum, prayer) => sum += prayer.getCurse(), 0) ?? 0;
        const masteroBuff = player.activeBuffs.find(talent => talent.skillIndex == 40)?.getBonus() ?? 0;
        const equipmentBonus = player.getEquipmentBonus(EquipmentBonus.SkillExp);
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

        return starSignBonus + guildBonus + (skillingCardBonus + goldenFoodBonus) + (cardSetBonus + w5crystalCardBonus + shrineBonus + statueBonus + (prayerIncrease - prayerDecrease + (equipmentBonus + (masteroBuff + (saltLickBonus + dungeonBonus + poBonus + divinityBonus + achieveBonuses + riftBonus + shinyBonus + worshipBonus + summoningBonus)))));
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
            case SkillsIndex.Spelunking:
                imageSrc = 'ClassIcons60';
                break;
            case SkillsIndex.Research:
                imageSrc = 'ClassIcons61';
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

export const updateAllEfficiencies = (data: Map<string, any>): void => {
    (data.get("skilling") as Skilling).updateAllEfficiencies(data);
};