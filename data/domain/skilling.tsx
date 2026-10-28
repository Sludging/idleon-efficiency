import { Card } from "./cards";
import { Companion, getCompanionActiveBonus } from "./companions";
import { Domain, RawData } from "./base/domain";
import { Family } from "./family";
import { Item } from "./items";
import { Player } from "./player";
import { SkillsIndex } from "./SkillsIndex";
import { Prayer } from "./world-3/prayers";
import { ShrineConstants, Shrine } from "./world-3/construction/shrines";
import { PlayerStatues, StatueConst } from "./world-1/statues";
import { ClassIndex, getRightHandOfActionBonus } from "./talents";
import { ImageData } from "./imageData";
import { Divinity } from "./world-5/divinity";
import { Achievement } from "./achievements";
import { Rift, SkillMastery } from "./world-4/rift";
import { Breeding } from "./world-4/breeding";
import { Worship, TotalizerBonus } from "./world-3/worship";
import { Votes } from "./world-2/votes";
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
import { Poppy } from "./world-2/poppy";
import { getStampBonusForKey, Stamp } from "./world-1/stamps";
import { EquipmentSets } from "./misc/equipmentSets";
import { AtomCollider } from "./world-3/construction/atomCollider";
import { Storage } from "./storage";
import { Lab } from "./world-4/lab";
import { GoldenFood } from "./golden-food";
import { Bribe } from "./world-1/bribes";
import { getStatCards } from "./player-stats";
import type { SkillStatsDNSkill } from "./player-stats";
import { lavaLog } from "../utility";
import type { Sneaking } from "./world-6/sneaking";
import { Meritocraty } from "./world-7/meritocraty";
import { LegendTalents } from "./world-7/legendTalents";
export type SkillingSkill = SkillStatsDNSkill | SkillsIndex.Worship;


const getStarSignEfficiency = (player: Player, bonusText: string): number =>
    player.starSigns.reduce((total, sign) => total + sign.getBonus(bonusText), 0);



export class Skilling extends Domain {
    private allEfficiencies = new Map<number, number>();
    private skillEfficiencies = new Map<number, Record<SkillingSkill, number>>();
    private allBaseSkillEfficiencies = new Map<number, number>();

    private allSkillExperienceMultiplier = 1;

    private resetEfficiencies(charCount: number): void {
        this.allEfficiencies.clear();
        this.skillEfficiencies.clear();
        this.allBaseSkillEfficiencies.clear();

        for (let playerID = 0; playerID < charCount; playerID++) {
            this.allEfficiencies.set(playerID, 1);
            this.allBaseSkillEfficiencies.set(playerID, 0);
            this.skillEfficiencies.set(playerID, {
                [SkillsIndex.Mining]: 0,
                [SkillsIndex.Chopping]: 0,
                [SkillsIndex.Fishing]: 0,
                [SkillsIndex.Catching]: 0,
                [SkillsIndex.Worship]: 0,
            });
        }
    }

    updateAllSkillExperienceMultiplier(
        meritocracyBonus: number,
        legendPointsBonus: number,
        companionBonus: number,
    ): void {
        this.allSkillExperienceMultiplier =
            (1 + meritocracyBonus / 100)
            * (1 + legendPointsBonus / 100)
            * (1 + companionBonus);
    }

    getAllSkillExperienceMultiplier(): number {
        return this.allSkillExperienceMultiplier;
    }

    getSkillEfficiency(playerID: number, skill: SkillingSkill): number {
        return this.skillEfficiencies.get(playerID)![skill];
    }

    getAllBaseSkillEfficiency(player: Player): number {
        return this.allBaseSkillEfficiencies.get(player.playerID)!;
    }

    updateSkillEfficiencies(data: Map<string, any>): void {
        const players = data.get("players") as Player[];
        const stamps = data.get("stamps") as Stamp[][];
        const breeding = data.get("breeding") as Breeding;
        const divinity = data.get("divinity") as Divinity;
        const alchemy = data.get("alchemy") as Alchemy;
        const hole = data.get("hole") as Hole;
        const skillMastery = (data.get("rift") as Rift).bonuses.find(bonus => bonus.name === "Skill Mastery") as SkillMastery;
        const votes = data.get("votes") as Votes;
        const equipmentSets = data.get("equipmentSets") as EquipmentSets;
        const goldenFood = data.get("goldenFood") as GoldenFood;
        const atomCollider = data.get("collider") as AtomCollider;
        const storage = data.get("storage") as Storage;
        const statues = data.get("statues") as PlayerStatues[];
        const achievements = data.get("achievements") as Achievement[];
        const bribes = data.get("bribes") as Bribe[];
        const lab = data.get("lab") as Lab;
        const sneaking = data.get("sneaking") as Sneaking;

        const atomEfficiency = atomCollider.atoms.find(atom => atom.index === 1)!.getBonus();
        const fishingRooBonus = (data.get("poppy") as Poppy).getGlobalBonus(0);
        const fishingBribe = bribes.find(bribe => bribe.bribeIndex === 29)!.getBonus();

        for (const player of players) {
            // Toilet Paper Postage applies character-specific efficiency stamp bonuses.
            const efficiencyStampMultiplier = Math.max(player.getTalentBonus(625), 1);
            const postOfficeBox = player.postOffice.find(box => box.index === 20)!;
            const allBaseSkillEfficiency = breeding.shinyBonuses.find(bonus => bonus.data.index === 22)!.getBonus()
                + getStampBonusForKey(stamps, "BaseAllEff", player) * efficiencyStampMultiplier
                + divinity.gods.find(god => god.index === 2)!.getBlessingBonus(player)
                + (postOfficeBox.bonuses[1].getBonus(postOfficeBox.level, 1)
                    + (player.getChipBonus("eff") + (player.getTalentBonus(636)
                        + lab.jewels[12].getBonus())));
            this.allBaseSkillEfficiencies.set(player.playerID, allBaseSkillEfficiency);

            const miningLevel = player.skills.get(SkillsIndex.Mining)!.level;
            const choppingLevel = player.skills.get(SkillsIndex.Chopping)!.level;
            const fishingLevel = player.skills.get(SkillsIndex.Fishing)!.level;
            const catchingLevel = player.skills.get(SkillsIndex.Catching)!.level;
            const miningPower = player.stats.getSkillStatsDN(SkillsIndex.Mining);
            const choppingPower = player.stats.getSkillStatsDN(SkillsIndex.Chopping);
            const fishingPower = player.stats.getSkillStatsDN(SkillsIndex.Fishing);
            const catchingPower = player.stats.getSkillStatsDN(SkillsIndex.Catching);
            const strength = player.stats.strength;
            const agility = player.stats.agility;
            const wisdom = player.stats.wisdom;
            const miningTalent142 = player.getTalentBonus(142);
            const miningTalent101 = player.getTalentBonus(101);
            const rightHandMining = getRightHandOfActionBonus(players, player, SkillsIndex.Mining);
            const rightHandChopping = getRightHandOfActionBonus(players, player, SkillsIndex.Chopping);
            const rightHandFishing = getRightHandOfActionBonus(players, player, SkillsIndex.Fishing);
            const rightHandCatching = getRightHandOfActionBonus(players, player, SkillsIndex.Catching);
            const allEfficiencies = this.getAllEfficiencies(player);
            const statCards = getStatCards(player);
            const cardBonus = (index: number) => Card.GetTotalBonusForId(statCards, index);
            const achievement = (index: number) => achievements.find(value => value.index === index)!;
            const copperSet = equipmentSets.getSetBonus("COPPER_SET", true);
            const platinumSet = equipmentSets.getSetBonus("PLATINUM_SET", true);
            const starSignMining = getStarSignEfficiency(player, "Mining Efficiency");
            const starSignChopping = getStarSignEfficiency(player, "Chop Efficiency");
            const starSignFishing = getStarSignEfficiency(player, "Fishing Efficiency");
            const starSignCatching = getStarSignEfficiency(player, "Catch Efficiency");
            const baseMiningStamp = getStampBonusForKey(stamps, "BaseMinEff", player) * efficiencyStampMultiplier;
            const baseChoppingStamp = getStampBonusForKey(stamps, "BaseChopEff", player) * efficiencyStampMultiplier;
            const baseFishingStamp = getStampBonusForKey(stamps, "BaseFishEff", player) * efficiencyStampMultiplier;
            const baseCatchingStamp = getStampBonusForKey(stamps, "BaseCatchEff", player) * efficiencyStampMultiplier;
            const miningVial = alchemy.getVialBonusForKey("MinEff");
            const choppingVial = alchemy.getVialBonusForKey("ChopEff");
            const fishingVial = alchemy.getVialBonusForKey("FishEff");
            const catchingVial = alchemy.getVialBonusForKey("CatchEff");
            const miningBubble = alchemy.getBubbleBonusForKey("MinEff", player);
            const choppingBubble = alchemy.getBubbleBonusForKey("ChopEff", player);
            const miningMonument = hole.getMonumentBonus("Bravery", 0);
            const choppingMonument = hole.getMonumentBonus("Wisdom", 0);
            const catchingMonument = hole.getMonumentBonus("Justice", 0);
            const miningExtraEfficiency = 1;
            // Native material bonuses count only the active player's inventory, chest, and refinery.
            const miningAtomLog = lavaLog(storage.amountInStorage("Copper", player.playerID));
            const choppingLog = lavaLog(storage.amountInStorage("Leaf1", player.playerID));
            const catchingLog = lavaLog(storage.amountInStorage("OakTree", player.playerID));
            const miningGoldFood = goldenFood.getSkillEfficiencyMultiplier(player, sneaking, "MiningEff");
            const fishingGoldFood = goldenFood.getSkillEfficiencyMultiplier(player, sneaking, "FishingEff");
            const miningSkillEffPct = player.getPostOfficeBonus("MinEffPct");
            const choppingSkillEffPct = player.getPostOfficeBonus("ChopEffPct");
            const fishingSkillEffPct = player.getPostOfficeBonus("FishEffPct");
            const catchingSkillEffPct = player.getPostOfficeBonus("CatchEffPct");
            const miningRiftBonus = skillMastery.getSkillBonus(SkillsIndex.Mining, 1);
            const choppingRiftBonus = skillMastery.getSkillBonus(SkillsIndex.Chopping, 1);
            const fishingRiftBonus = skillMastery.getSkillBonus(SkillsIndex.Fishing, 1);
            const catchingRiftBonus = skillMastery.getSkillBonus(SkillsIndex.Catching, 1);

            const miningEfficiency = 12 + (Math.pow(miningPower, 1.3) +
                (Math.pow(strength + 1, 0.6) * (1 + miningTalent142 / 100) +
                    (baseMiningStamp + allBaseSkillEfficiency))) *
                (1 + miningLevel / 200) *
                (1 + (miningSkillEffPct + rightHandMining) / 100) *
                (1 + Math.pow(strength / 100, 0.35) * (1 + miningTalent142 / 100)) *
                miningGoldFood *
                (1 + (player.getTalentBonus(85) +
                    (player.gear.getBonus(EquipmentBonus.MiningEfficiency) +
                        (miningRiftBonus + (votes.getCurrentBonus(7) + copperSet)))) / 100) *
                (1 + (cardBonus(24) +
                    (starSignMining + (miningVial + miningMonument))) / 100) *
                (1 + miningPower / 100) *
                miningExtraEfficiency *
                (1 + miningBubble / 100) *
                (1 + (miningTalent101 * (atomEfficiency + miningAtomLog)) / 100) *
                allEfficiencies;

            const choppingEfficiency = 8 + (Math.pow(choppingPower, 1.3) +
                (Math.pow((wisdom + 2) * (1 + player.getTalentBonus(462) / 100) *
                    (1 + player.getTalentBonus(532) / 100), 0.6) +
                    (baseChoppingStamp + allBaseSkillEfficiency))) *
                (1 + choppingLevel / 200) *
                (1 + (choppingSkillEffPct + rightHandChopping + starSignChopping) / 100) *
                (1 + (choppingBubble + choppingMonument) / 100) *
                (1 + Math.pow((wisdom * (1 + player.getTalentBonus(462) / 100)) / 100, 0.35) *
                    (1 + player.getTalentBonus(532) / 100)) *
                (1 + (player.getTalentBonus(445) +
                    (player.gear.getBonus(EquipmentBonus.ChopEfficiency) +
                        (choppingRiftBonus + (votes.getCurrentBonus(9) + copperSet)))) / 100) *
                (1 + (cardBonus(27) + (choppingVial + 10 * (achievement(352).completed ? 1 : 0))) / 100) *
                (1 + choppingPower / 100) *
                (1 + (player.getTalentBonus(461) * choppingLog) / 100) *
                allEfficiencies;

            const fishingEfficiency = (Math.pow(fishingPower, 1.3) +
                (Math.pow(strength, 0.6) * (1 + miningTalent142 / 100) +
                    (baseFishingStamp + allBaseSkillEfficiency))) *
                (1 + fishingLevel / 200) *
                (1 + Math.pow(strength / 100, 0.35) *
                    (1 + (miningTalent142 +
                        (fishingRiftBonus + (votes.getCurrentBonus(8) + platinumSet)) +
                        15 * fishingBribe +
                        getStampBonusForKey(stamps, "FishEffPerLv", player) * efficiencyStampMultiplier * fishingLevel) / 100)) *
                (1 + (fishingSkillEffPct + rightHandFishing) / 100) *
                (1 + fishingPower / 100) *
                allEfficiencies *
                fishingGoldFood *
                (1 + (cardBonus(30) + fishingVial +
                    (player.gear.getBonus(EquipmentBonus.FishingEfficiency) +
                        fishingRooBonus)) / 100) *
                (1 + player.getTalentBonus(85) / 100) *
                (1 + starSignFishing / 100);

            const catchingEfficiency = (Math.pow(catchingPower, 1.3) +
                (Math.pow(agility * (1 + player.getTalentBonus(296) / 100), 0.6) *
                    (1 + player.getTalentBonus(367) / 100) +
                    (baseCatchingStamp + allBaseSkillEfficiency))) *
                (1 + catchingLevel / 200) *
                (1 + Math.pow((agility * (1 + player.getTalentBonus(296) / 100)) / 100, 0.35) *
                    (1 + player.getTalentBonus(367) / 100)) *
                (1 + (cardBonus(32) +
                    (catchingVial + catchingMonument +
                        (catchingRiftBonus +
                            (votes.getCurrentBonus(10) + platinumSet))) +
                    (player.gear.getBonus(EquipmentBonus.CatchEfficiency) +
                        10 * (achievement(351).completed ? 1 : 0))) / 100) *
                (1 + (catchingSkillEffPct + rightHandCatching + starSignCatching) / 100) *
                (1 + (player.getTalentBonus(295) * (atomEfficiency + catchingLog)) / 100) *
                (1 + (catchingPower + Math.min(5, 5 * (achievement(74).completed ? 1 : 0))) / 100) *
                allEfficiencies *
                (1 + player.getTalentBonus(263) / 100);
            // Skulls label this upgraded stat as Worship Power; resolve it by its Weapon_Power key.
            const worshipSkullWeaponPower = player.gear.tools[5]?.getProperty("Weapon_Power")?.getValue() ?? 0;
            const worshipStatuePower = statues[player.playerID].statues
                .find(statue => statue.index === 16)!.getBonus(player);
            const worshipPower = player.stats.getSkillPower(SkillsIndex.Worship);
            // The skull contributes here and again through shared Worship Power, matching game source.
            const worshipPowerTerm = Math.pow(
                worshipSkullWeaponPower * (1 + alchemy.getBubbleBonusForKey("ToolM", player) / 100)
                + 4 + worshipPower + worshipStatuePower,
                1.3,
            );
            // Count only this character's inventory and shared chest, not other characters or refinery.
            const worshipSoulCount = storage.playerStorage[player.playerID]
                .reduce((total, item) => total + (item.internalName === "Soul1" ? item.count : 0), 0)
                + storage.chest.reduce((total, item) => total + (item.internalName === "Soul1" ? item.count : 0), 0);
            // Skill Mastery returns the source's 10-point coefficient; do not scale it again.
            const worshipMastery = skillMastery.getSkillBonus(SkillsIndex.Worship, 1);
            // Game adds the outer 10 after every multiplicative efficiency bonus.
            const worshipEfficiency = (worshipPowerTerm +
                (Math.pow(wisdom + 1, 0.6) * (1 + player.getTalentBonus(532) / 100) +
                    (getStampBonusForKey(stamps, "WorshipEff", player) * efficiencyStampMultiplier + allBaseSkillEfficiency))) *
                (1 + player.skills.get(SkillsIndex.Worship)!.level / 200) *
                (1 + (player.getTalentBonus(445) * worshipMastery
                    + player.getPostOfficeBonus("18a")
                    + getRightHandOfActionBonus(players, player, SkillsIndex.Worship)
                    + getStarSignEfficiency(player, "Worship Efficiency")) / 100) *
                allEfficiencies *
                (1 + player.getTalentBonus(476) * (atomEfficiency + lavaLog(worshipSoulCount)) / 100)
                + 10;

            this.skillEfficiencies.set(player.playerID, {
                [SkillsIndex.Mining]: miningEfficiency,
                [SkillsIndex.Chopping]: choppingEfficiency,
                [SkillsIndex.Fishing]: fishingEfficiency,
                [SkillsIndex.Catching]: catchingEfficiency,
                [SkillsIndex.Worship]: worshipEfficiency,
            });
        }
    }

    getRawKeys(): RawData[] {
        return [];
    }

    init(_allItems: Item[], charCount: number): Skilling {
        this.resetEfficiencies(charCount);
        return this;
    }

    parse(data: Map<string, any>): void {
        this.resetEfficiencies(data.get("charCount") as number);
    }

    getAllEfficiencies(player: Player): number {
        return this.allEfficiencies.get(player.playerID)!;
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

        for (const player of players) {
            // Quest completion contributes 0.1% each, capped by this character's Talent 617 bonus.
            const questBonus = Math.min(0.1 * totalQuestsComplete, player.getTalentBonus(617));
            const prayerBonus = player.activePrayers.includes(1) ? prayer1?.getBonus() ?? 0 : 0;
            const prayerCurse = player.activePrayers.includes(17) ? prayer17?.getCurse() ?? 0 : 0;
            const buffPenalty = player.activeBuffs.find(talent => talent.skillIndex === 40)?.getBonus(false, true) ?? 0;

            // Preserve the source's A/B/E addition tree and six-factor multiplication order.
            const factorA = 1 + ((family.getClassBonus(ClassIndex.Hunter)?.getBonus(player) ?? 0)
                + (player.gear.getBonus(EquipmentBonus.SkillEfficiency) + vialSkillEfficiency
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
        switch (skill) {
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
        const equipmentBonus = player.gear.getBonus(EquipmentBonus.SkillExp);
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
export const updateSkillEfficiencies = (data: Map<string, any>): void => {
    (data.get("skilling") as Skilling).updateSkillEfficiencies(data);
};
export const updateAllSkillExperienceMultiplier = (data: Map<string, unknown>): void => {
    const skilling = data.get("skilling") as Skilling;
    const meritocraty = data.get("meritocraty") as Meritocraty;
    const legendTalents = data.get("legendTalents") as LegendTalents;
    const companions = data.get("companions") as Companion[];

    skilling.updateAllSkillExperienceMultiplier(
        meritocraty.getCurrentBonus(10),
        legendTalents.getBonusFromIndex(20),
        getCompanionActiveBonus(companions, 32),
    );
};