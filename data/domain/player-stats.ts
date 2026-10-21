import { Card } from './cards';
import { EquipmentBonus, type PrimaryAttribute } from './equipment-effects';
import { SkillsIndex } from './SkillsIndex';
import { PassiveType, type Dungeons } from './dungeons';
import { Food } from './items';
import type { PlayerStatues } from './world-1/statues';
import type { Player } from './player';
import { ClassIndex, Talent } from './talents';
import { getCompanionActiveBonus, isCompanionLevelTwo, type Companion } from './companions';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';
import type { Achievement } from './achievements';
import type { Family } from './family';
import type { GoldenFood } from './golden-food';
import type { Guild } from './guild';
import type { Quests } from './quests';
import type { Orion } from './world-1/orion';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Sigils } from './world-2/alchemy/sigils';
import type { Arcade } from './world-2/arcade';
import type { IslandExpeditions } from './world-2/islandExpedition';
import type { Votes } from './world-2/votes';
import type { Breeding } from './world-4/breeding';
import type { Cooking } from './world-4/cooking';
import type { Lab } from './world-4/lab';
import type { Hole } from './world-5/hole/hole';
import type { Sailing } from './world-5/sailing/sailing';
import type { Farming } from './world-6/farming';
import type { Sneaking } from './world-6/sneaking';
import type { Summoning } from './world-6/summoning';
import type { EquipmentSets } from './misc/equipmentSets';
import type { UpgradeVault } from './upgradeVault';
import type { Bribe } from './world-1/bribes';
import type { Poppy } from './world-2/poppy';
import { ShrineConstants, type Shrine } from './world-3/construction/shrines';
import type { Prayer } from './world-3/prayers';
import type { Divinity } from './world-5/divinity';
import type { Account } from './account';
import type { Grimoire } from './grimoire';
import type { Friends } from './friends';
import type { Equinox } from './world-3/equinox';
import type { Tome } from './world-4/tome';
import { CropScientistBonusText } from './world-6/farming';
import type { Emperor } from './world-6/emperor';
import type { RoyalArmory } from './world-6/royalArmory/royalArmory';
import type { ResearchGrid } from './world-7/research';
import type { Minehead } from './world-7/minehead';
import type { LegendTalents } from './world-7/legendTalents';
import type { Spelunking } from './world-7/spelunking';
import type { SushiStation } from './world-7/sushi';
import type { JellyOperator } from './world-7/jellyOperator';
import type { Menagerie } from './menagerie';
import type { SaltLick } from './world-3/construction/saltLick';

interface AttributeSources {
    alchemy: Alchemy;
    stamps: Stamp[][];
    family: Family;
    sigils: Sigils;
    breeding: Breeding;
    arcade: Arcade;
    islandExpeditions: IslandExpeditions;
    orion: Orion;
    companions: Companion[];
    sneaking: Sneaking;
    cooking: Cooking;
    guild: Guild;
    hole: Hole;
    lab: Lab;
    summoning: Summoning;
    sailing: Sailing;
    goldenFood: GoldenFood;
    achievements: Achievement[];
    farming: Farming;
    votes: Votes;
    equipmentSets: EquipmentSets;
    quests: Quests;
}

export type SkillPowerSkill =
    | SkillsIndex.Mining
    | SkillsIndex.Chopping
    | SkillsIndex.Fishing
    | SkillsIndex.Catching
    | SkillsIndex.Trapping
    | SkillsIndex.Worship;

export type SkillStatsDNSkill =
    | SkillsIndex.Mining
    | SkillsIndex.Chopping
    | SkillsIndex.Fishing
    | SkillsIndex.Catching;

export type SkillStatsDN = Record<SkillStatsDNSkill, number>;

export interface SkillStatsDNInputs {
    toolW: number;
    toolM: number;
    toolA: number;
    fishingHighscore: number;
    totalMiningPower: number;
    totalChoppingPower: number;
    totalFishingPower: number;
    totalCatchingPower: number;
}

function equippedToolWeaponPower(player: Player, slot: number): number {
    const tool = player.gear.tools[slot];
    if (!tool || tool.internalName === 'Blank') return 0;

    const weaponPower = tool.getProperty('Weapon_Power');
    return weaponPower ? weaponPower.value + weaponPower.stone : 0;
}

function prepareSkillStatsDN(player: Player, inputs: SkillStatsDNInputs): SkillStatsDN {
    const miningLevel = player.skills.get(SkillsIndex.Mining)!.level;
    const mining = equippedToolWeaponPower(player, 0) *
        (1 + player.getTalentBonus(103) * miningLevel / 10 / 100) *
        (1 + inputs.toolW / 100) + 4 + inputs.totalMiningPower;
    const chopping = equippedToolWeaponPower(player, 1) *
        (1 + inputs.toolM / 100) + 4 + inputs.totalChoppingPower;

    const fishing = equippedToolWeaponPower(player, 2) *
        (1 + inputs.toolW / 100) +
        (3 + player.fishingToolkitPower) +
        (inputs.totalFishingPower +
            Math.min(inputs.fishingHighscore, player.getTalentBonus(116)));

    const catching = equippedToolWeaponPower(player, 3) *
        (1 + inputs.toolA / 100) + 3 + inputs.totalCatchingPower;

    return {
        [SkillsIndex.Mining]: mining,
        [SkillsIndex.Chopping]: chopping,
        [SkillsIndex.Fishing]: fishing,
        [SkillsIndex.Catching]: catching,
    };
}


interface PowerSources {
    alchemy: Alchemy;
    family: Family;
    sigils: Sigils;
    arcade: Arcade;
    guild: Guild;
    dungeons: Dungeons;
    breeding: Breeding;
    statues: PlayerStatues[];
    boostFoodStamp: number;
}

interface SecondaryStatSources {
    account: Account;
    alchemy: Alchemy;
    stamps: Stamp[][];
    sigils: Sigils;
    saltLick: SaltLick;
    arcade: Arcade;
    statues: PlayerStatues[];
    upgradeVault: UpgradeVault;
    companions: Companion[];
    cooking: Cooking;
    shrines: Shrine[];
    bribes: Bribe[];
    prayers: Prayer[];
    goldenFood: GoldenFood;
    dungeons: Dungeons;
    equipmentSets: EquipmentSets;
    divinity: Divinity;
    votes: Votes;
    poppy: Poppy;
}

interface DropRateSources {
    account: Account;
    alchemy: Alchemy;
    stamps: Stamp[][];
    family: Family;
    sigils: Sigils;
    breeding: Breeding;
    arcade: Arcade;
    guild: Guild;
    hole: Hole;
    shrines: Shrine[];
    prayers: Prayer[];
    goldenFood: GoldenFood;
    equipmentSets: EquipmentSets;
    votes: Votes;
    orion: Orion;
    companions: Companion[];
    sneaking: Sneaking;
    summoning: Summoning;
    achievements: Achievement[];
    farming: Farming;
    grimoire: Grimoire;
    upgradeVault: UpgradeVault;
    emperor: Emperor;
    friends: Friends;
    legendTalents: LegendTalents;
    spelunking: Spelunking;
    royalArmory: RoyalArmory;
    tome: Tome;
    research: ResearchGrid;
    minehead: Minehead;
    equinox: Equinox;
    sushi: SushiStation;
    jellyOperator: JellyOperator;
    menagerie: Menagerie;
}

export function getStatCards(player: Player): Card[] {
    // Equipped passive cards must not contribute twice. Reuse prepared card objects without a set or map.
    const cards: Card[] = [];
    for (const card of player.cardInfo!.equippedCards) {
        if (!cards.includes(card)) cards.push(card);
    }
    for (const card of player.cardInfo!.cards) {
        if (card.passive && !cards.includes(card)) cards.push(card);
    }
    return cards;
}

function secondTalentBonus(player: Player, index: number): number {
    const talent = player.getTalent(index);
    // Unallocated class talents contribute zero, including their second curve.
    return talent && talent.pointsSpent > 0.5 ? talent.getBonus(false, true) : 0;
}

function signBonus(player: Player, attribute: PrimaryAttribute, percent: boolean): number {
    let total = 0;
    // All Stat signs enter each attribute. Flat and percentage channels stay separate.
    for (const sign of player.starSigns) {
        let subtotal = 0;
        for (const bonus of sign.bonuses) {
            if (bonus.percent === percent && (bonus.text === attribute || bonus.text.startsWith('All Stat'))) {
                subtotal += sign.getBonus(bonus.text);
            }
        }
        total += subtotal;
    }
    return total;
}


function pristineBonus(sneaking: Sneaking, itemId: number): number {
    const charm = sneaking.pristineCharms.find(charm => charm.data.itemId === itemId)!;
    return charm.unlocked ? charm.getBonus() : 0;
}

export class PlayerStats {
    strength: number = 0;
    agility: number = 0;
    wisdom: number = 0;
    luck: number = 0;
    private preparedWeaponPower: number | undefined;
    private skillPowers: Record<SkillPowerSkill, number> | undefined;
    private preparedDefence: number | undefined;
    private preparedBaseAccuracy: number | undefined;
    private preparedAccuracy: number | undefined;
    private preparedDropRateMultiplier: number | undefined;
    private preparedMovementSpeed: number | undefined;
    private preparedSkillStatsDN: SkillStatsDN | undefined;

    get defence(): number {
        if (this.preparedDefence === undefined) {
            throw new Error('Defence has not been calculated');
        }
        return this.preparedDefence;
    }

    get baseAccuracy(): number {
        if (this.preparedBaseAccuracy === undefined) {
            throw new Error('Base Accuracy has not been calculated');
        }
        return this.preparedBaseAccuracy;
    }

    get accuracy(): number {
        if (this.preparedAccuracy === undefined) {
            throw new Error('Accuracy has not been calculated');
        }
        return this.preparedAccuracy;
    }

    get movementSpeed(): number {
        if (this.preparedMovementSpeed === undefined) {
            throw new Error('Movement speed has not been calculated');
        }
        return this.preparedMovementSpeed;
    }

    get dropRateMultiplier(): number {
        if (this.preparedDropRateMultiplier === undefined) {
            throw new Error('Drop-rate multiplier has not been calculated');
        }
        return this.preparedDropRateMultiplier;
    }

    get weaponPower(): number {
        if (this.preparedWeaponPower === undefined) {
            throw new Error('Weapon Power has not been calculated');
        }
        return this.preparedWeaponPower;
    }

    getSkillPower(skill: SkillPowerSkill): number {
        if (this.skillPowers === undefined) {
            throw new Error('Skill powers have not been calculated');
        }
        return this.skillPowers[skill];
    }

    getSkillStatsDN(skill: SkillStatsDNSkill): number {
        if (this.preparedSkillStatsDN === undefined) {
            throw new Error('SkillStatsDN has not been prepared');
        }
        return this.preparedSkillStatsDN[skill];
    }

    prepareSkillStatsDN(player: Player, inputs: SkillStatsDNInputs): void {
        this.preparedSkillStatsDN = prepareSkillStatsDN(player, inputs);
    }

    updatePowers(player: Player, sources: PowerSources): void {
        const { alchemy, family, sigils, arcade, guild, dungeons, breeding, statues, boostFoodStamp } = sources;
        const playerStatues = statues[player.playerID].statues;
        const foodWeapon = Food.getWeaponPowerContribution(player, {
            boostFoodStamp,
            foodStatue: playerStatues.find(statue => statue.index === 3)!.getBonus(player),
        }, player.finalTalentInputs);
        const card18 = Card.GetTotalBonusForId(player.cardInfo!.equippedCards, 18);
        const cardLevel = player.cardInfo!.cards.find(card => card.id === 'w5b2')!.getLevels();
        let signWeapon = 0;
        for (const sign of player.starSigns) {
            signWeapon += sign.getBonus('Weapon Power');
        }
        const skillWeapon = Talent.getSkillWeaponPowerBonus(player);
        const petWeapon = Talent.getPetWeaponPowerBonus(player, breeding.firstStoredPetPower);
        const warriorWeapon = alchemy.getBubbleBonusForKey('W1', player);
        const archerWeapon = alchemy.getBubbleBonusForKey('A1', player);
        const mageWeapon = alchemy.getBubbleBonusForKey('M1', player);

        // Chips and weapon bubbles scale only gear. Flat bonuses remain outside this multiplier.
        this.preparedWeaponPower =
            5 + player.getPostOfficeBonus('12a') + dungeons.passives.get(PassiveType.Flurbo)![0].getBonus() + foodWeapon
            + (card18 + cardLevel + (guild.guildBonuses[3].getBonus() + sigils.sigils[17].getBonus()))
            + (player.gear.getProperty('Weapon_Power')
                * (1 + (player.getChipBonus('weppow') + (warriorWeapon + (archerWeapon + mageWeapon))) / 100)
                + Talent.getBeginnerWeaponPowerBonus(player)
                + (alchemy.getVialBonusForKey('WeaponPOW') + (family.getClassBonus(ClassIndex.Barbarian)!.getBonus(player) + (signWeapon
                    + (arcade.bonuses[17].getBonus() + (skillWeapon.progression + (petWeapon + skillWeapon.intellect)))))));

        const warriorPower = alchemy.getBubbleBonusForKey('W2', player);
        const warriorToolPower = alchemy.getBubbleBonusForKey('W7', player);
        const magePower = alchemy.getBubbleBonusForKey('M2', player);
        const mageToolPower = alchemy.getBubbleBonusForKey('M7', player);
        const archerPower = alchemy.getBubbleBonusForKey('A2', player);
        const archerToolPower = alchemy.getBubbleBonusForKey('A8', player);

        // Only Mining, Chopping, Fishing, and Catching add statues. Trapping and Worship use gear and bubbles.
        this.skillPowers = {
            [SkillsIndex.Mining]: player.gear.getProperty('Mining_Power')
                + (playerStatues.find(statue => statue.index === 2)!.getBonus(player) + (warriorPower + warriorToolPower)),
            [SkillsIndex.Chopping]: player.gear.getProperty('Choppin_Power')
                + (playerStatues.find(statue => statue.index === 6)!.getBonus(player) + (magePower + mageToolPower)),
            [SkillsIndex.Fishing]: player.gear.getProperty('Fishing_Power')
                + (playerStatues.find(statue => statue.index === 8)!.getBonus(player) + (warriorPower + warriorToolPower)),
            [SkillsIndex.Catching]: player.gear.getProperty('Catching_Power')
                + (playerStatues.find(statue => statue.index === 9)!.getBonus(player) + (archerPower + archerToolPower)),
            [SkillsIndex.Trapping]: player.gear.getProperty('Trapping_Power') + (archerPower + archerToolPower),
            [SkillsIndex.Worship]: player.gear.getProperty('Worship_Power') + (magePower + mageToolPower),
        };
    }

    updateSecondaryStats(player: Player, sources: SecondaryStatSources): void {
        const { account, alchemy, stamps, sigils, saltLick, arcade, statues, upgradeVault,
            companions, cooking, shrines, bribes, prayers, goldenFood, dungeons, equipmentSets,
            divinity, votes, poppy } = sources;
        const cards = getStatCards(player);
        const alchemyDefPct = alchemy.getBubbleBonusForKey('DefPct', player);
        const card26 = Card.GetTotalBonusForId(cards, 26);
        const card15 = Card.GetTotalBonusForId(cards, 15);
        const cardLevelW6A2 = player.cardInfo!.cards.find(card => card.id === 'w6a2')!.getLevels();
        const stampBaseDef = getStampBonusForKey(stamps, 'BaseDef');
        const equipmentBaseDef = player.gear.getBonus(EquipmentBonus.BaseDefence);
        const arcade1 = arcade.bonuses[1].getBonus();
        const statue7 = statues[player.playerID].statues.find(statue => statue.index === 7)!.getBonus(player);
        const vault46 = upgradeVault.getBonusForId(46);
        const companion21 = getCompanionActiveBonus(companions, 21);
        const mealDef = cooking.getMealBonusForKey('Def');
        const secondTalent122 = secondTalentBonus(player, 122);
        // The Shrine owner excludes local and same-world activation from this permanent bonus.
        const mapIndependentShrine = shrines[ShrineConstants.HpDefShrine].getMapIndependentBonus();
        const bribe22 = bribes.find(bribe => bribe.bribeIndex === 22)!.getBonus();
        const prayer15Curse = player.activePrayers.includes(15) ? prayers.find(prayer => prayer.index === 15)!.getCurse() : 0;
        const prayer16Curse = player.activePrayers.includes(16) ? prayers.find(prayer => prayer.index === 16)!.getCurse() : 0;
        let signDefence = 0;
        for (const sign of player.starSigns) {
            signDefence += sign.getBonus('Defence');
        }
        const selectedBuff124 = player.activeBuffs.find(talent => talent.skillIndex === 124)?.getBonus() ?? 0;
        const cardSet4 = player.cardInfo!.getBonusForId(4);
        const flurbo6 = dungeons.passives.get(PassiveType.Flurbo)![6].getBonus();
        const chipDefence = player.getChipBonus('def');
        const amarokSetPercent = equipmentSets.getSetBonus('AMAROK_SET', true);
        const recipientSnehebatuMinor = divinity.gods[0].getMinorLinkBonus(player);

        // Only gear receives this inner percentage. Floor the additive base before later multipliers.
        const defenceBase = Math.floor(
            player.getPostOfficeBonus('def')
            + card26
            + Math.min(player.level, alchemyDefPct)
            + (stampBaseDef + equipmentBaseDef + arcade1 + statue7)
            + (player.gear.getProperty('Defence')
                * (1 + (alchemyDefPct + vault46 + (card15 + companion21 + 3 * cardLevelW6A2)) / 100)
                + (mealDef + secondTalent122))
        );
        // Combine selected prayer curses before applying the shared lower clamp.
        const prayerFactor = Math.max(0.05, 1 - (prayer15Curse + prayer16Curse) / 100);
        // Poppy and Vault flat Defence remain outside the floor and all percentage multipliers.
        this.preparedDefence = defenceBase
            * (1 + (mapIndependentShrine + bribe22) / 100)
            * prayerFactor
            * (1 + (
                goldenFood.getDefencePercent(player) + player.getTalentBonusAtInputs(9, player.finalTalentInputs)
                + (player.gear.getBonus(EquipmentBonus.Defence) + (signDefence
                    + (selectedBuff124 + (cardSet4 + (flurbo6 + (chipDefence + amarokSetPercent))))))
            ) / 100)
            * (1 + (recipientSnehebatuMinor + votes.getCurrentBonus(3)) / 100)
            + (poppy.getGlobalBonus(1) + upgradeVault.getBonusForId(5));

        this.preparedBaseAccuracy = 2
            + alchemy.getVialBonusForKey('baseACC')
            + (player.getPostOfficeBonus('acc')
                + (Card.GetTotalBonusForId(cards, 23) + player.gear.getBonus(EquipmentBonus.Accuracy) + goldenFood.getBaseAccuracy(player))
                + (getStampBonusForKey(stamps, 'BaseAcc') + upgradeVault.getBonusForId(4)))
            + player.gear.getProperty('Accuracy');

        let selectedClassStat: number;
        switch (player.getBaseClass()) {
            // Native ClassStatTypes uses secondary keys WIS, STR, AGI, then LUK.
            case ClassIndex.Warrior:
                selectedClassStat = this.wisdom;
                break;
            case ClassIndex.Archer:
                selectedClassStat = this.strength;
                break;
            case ClassIndex.Mage:
                selectedClassStat = this.agility;
                break;
            default:
                selectedClassStat = this.luck;
        }
        const accountBuff273 = player.activeBuffs.find(talent => talent.skillIndex === 273)?.getBonus() ?? 0;
        const foodMovementSpeed = Food.getMovementSpeedContribution(player, {
            boostFoodStamp: getStampBonusForKey(stamps, 'BFood'),
            foodStatue: statues[player.playerID].statues.find(statue => statue.index === 3)!.getBonus(player),
        }, player.finalTalentInputs);
        const movementSpeedFlat = foodMovementSpeed
            + (player.getTalentBonusAtInputs(266, player.finalTalentInputs)
                + (getStampBonusForKey(stamps, 'PctMoveSpd')
                    + (accountBuff273 + account.movementSpeedBonusPercent)));
        const agilitySpeed = this.agility < 1000
            ? (Math.pow(this.agility + 1, 0.4) - 1) / 40
            : (this.agility - 1000) / (this.agility + 2500) * 0.5 + 0.371;
        let movementSpeed = (movementSpeedFlat + (
            statues[player.playerID].statues.find(statue => statue.index === 1)!.getBonus(player)
            + (player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Movement Speed'), 0)
                + (player.gear.getBonus(EquipmentBonus.MovementSpeed)
                    + (Card.GetTotalBonusForId(cards, 6)
                        + player.getTalentBonusAtInputs(77, player.finalTalentInputs))))
        )) / 100 + agilitySpeed / 2.2 + 1;
        const movementTalent641 = player.getTalentBonusAtInputs(641, player.finalTalentInputs);
        // Native leaves values above 2 unchanged; remaining values use strict >1.75 and low branches.
        if (movementSpeed <= 2) {
            if (movementSpeed > 1.75) {
                movementSpeed = Math.min(2, Math.floor(100 * (movementSpeed + movementTalent641 / 100)) / 100);
            } else {
                movementSpeed = Math.min(1.75, Math.floor(100 * (movementSpeed + (
                    saltLick.getBonus(7) + player.getChipBonus('move')
                    + (movementTalent641 + sigils.sigils[13].getBonus())
                ) / 100)) / 100);
            }
        }
        this.preparedMovementSpeed = Math.floor(100 * movementSpeed) / 100;

        const selectedBuff288 = player.activeBuffs.find(talent => talent.skillIndex === 288);
        const cardAccuracy = Card.GetTotalBonusForId(cards, 17);
        const signAccuracy = player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Accuracy'), 0);
        const statueAccuracy = statues[player.playerID].statues.find(statue => statue.index === 14)!.getBonus(player);
        const arcadeAccuracy = arcade.bonuses[2].getBonus();
        const flurboAccuracy = dungeons.passives.get(PassiveType.Flurbo)![5].getBonus();
        const bribeAccuracy = bribes.find(bribe => bribe.bribeIndex === 21)!.getBonus();
        const companionAccuracy = getCompanionActiveBonus(companions, 23);
        // Apply native Accuracy order: alchemy percentage, remaining percentage, speed talent, then power curve.
        let accuracyStat = selectedClassStat * (1 + alchemy.getBubbleBonusForKey('AccPct', player) / 100)
            * (1 + (
                (selectedBuff288 && selectedBuff288.pointsSpent > 0.5 ? selectedBuff288.getBonus(false, true) : 0)
                + (cardAccuracy + (signAccuracy + (selectedBuff124
                    + (statueAccuracy + (arcadeAccuracy + (flurboAccuracy + (bribeAccuracy + companionAccuracy)))))))
            ) / 100);
        if (this.preparedMovementSpeed > 1.99) {
            accuracyStat *= 1 + secondTalentBonus(player, 641) / 100;
        }
        const cardSetAccuracy = player.cardInfo!.getBonusForId(4);
        const prayer6 = player.activePrayers.includes(6) ? prayers.find(prayer => prayer.index === 6)!.getBonus() : 0;
        const prayer15 = player.activePrayers.includes(15) ? prayers.find(prayer => prayer.index === 15)!.getCurse() : 0;
        const prayer16 = player.activePrayers.includes(16) ? prayers.find(prayer => prayer.index === 16)!.getCurse() : 0;
        const accuracyPrayerFactor = Math.max(0.1, 1 + (prayer6 - prayer15 - prayer16) / 100);
        const accuracyChip = player.getChipBonus('acc');
        const accuracyMeal = cooking.getMealBonusForKey('TotAcc');
        this.preparedAccuracy = (
            Math.pow(accuracyStat / 4, 1.4) + (accuracyStat + this.preparedBaseAccuracy)
        ) * (1 + (accuracyStat + 2 * cardSetAccuracy) / 200)
            * accuracyPrayerFactor
            * (1 + (accuracyChip + (accuracyMeal + (poppy.getGlobalBonus(3)
                + (votes.getCurrentBonus(3) + amarokSetPercent)))) / 100)
            * (1 + recipientSnehebatuMinor / 100);
    }

    updateDropRate(player: Player, players: readonly Player[], sources: DropRateSources): void {
        this.preparedDropRateMultiplier = undefined;
        const { account, alchemy, stamps, family, sigils, breeding, arcade, guild, hole, shrines,
            prayers, goldenFood, equipmentSets, votes, orion, companions, sneaking, summoning,
            achievements, farming, grimoire, upgradeVault, emperor, friends, legendTalents,
            spelunking, royalArmory, tome, research, minehead, equinox, sushi, jellyOperator, menagerie } = sources;
        const cards = getStatCards(player);
        const talentInputs = player.finalTalentInputs;
        const miniBossCardLevel = player.cardInfo!.cards.find(card => card.id === 'mini5a')!.getLevels();
        const caveCCardLevel = player.cardInfo!.cards.find(card => card.id === 'caveC')!.getLevels();
        const caveDCardLevel = player.cardInfo!.cards.find(card => card.id === 'caveD')!.getLevels();
        const anniversaryCardLevel = player.cardInfo!.cards.find(card => card.id === 'anni4Event1')!.getLevels();
        const luckEventCardLevel = player.cardInfo!.cards.find(card => card.id === 'luckEvent1')!.getLevels();
        const companion132 = getCompanionActiveBonus(companions, 132);
        const companion50 = getCompanionActiveBonus(companions, 50);
        let signDropPercent = 0;
        for (const sign of player.starSigns) {
            signDropPercent += sign.getBonus('Drop Rate') + sign.getBonus('Drop Rarity');
        }
        const prayerPercent = prayers.find(prayer => prayer.index === 7)!.getBonusForPlayer(player);
        const cloverShrinePercent = shrines[ShrineConstants.DropRateShrine].getMapIndependentBonus();
        const shinyDropPercent = breeding.shinyBonuses.find(bonus => bonus.data.index === 0)?.getBonus() ?? 0;
        const wisdomMonumentPercent = hole.monuments.monuments.Wisdom.bonuses.find(bonus => bonus.index === 6)!.getBonus();
        const dreamDropLevel = equinox.upgrades.find(upgrade => upgrade.index === 8)!.level;
        const cloudDropCompleted = Number(equinox.challenges.find(challenge => challenge.index === 69)!.complete);

        // Luck changes curves at 1,000. Neither branch rounds its contribution.
        const luckFraction = this.luck < 1000
            ? (Math.pow(this.luck + 1, 0.37) - 1) / 40
            : ((this.luck - 1000) / (this.luck + 2500)) * 0.5 + 0.297;
        // Preserve these nested progression additions before the ordinary percentage sum.
        const progressionDropPercent = hole.schematics.find(schematic => schematic.index === 82)!.getBonus(20)
            + (wisdomMonumentPercent
                + (emperor.getEffectiveBonus(11)
                    + (equipmentSets.getSetBonus('EFAUNT_SET', true)
                        + (farming.getExoticMarketBonusValue(59)
                            + (friends.getFriendBonus(3) + (legendTalents.getBonusFromIndex(1)
                                + (spelunking.getUpgradeBonus(50) + (getCompanionActiveBonus(companions, 111)
                                    + player.getTalentBonusAtInputs(239, talentInputs) * (royalArmory.totalResourceGrade / 1)))))))));
        const firstAdditivePercent = Math.min(1.5 * miniBossCardLevel, 10)
            + (Math.min(4 * caveCCardLevel + 6 * caveDCardLevel, 100)
                + (Math.min(2 * anniversaryCardLevel, 20) + Math.min(3 * luckEventCardLevel, 25)))
            + (goldenFood.getDropRatePercent(player)
                + (6 * Number(achievements[377].completed) + 4 * Number(achievements[381].completed)
                    + (orion.getGlobalBonus(4)
                        + (farming.landrankDatabase.getUpgradeBonusForPlayer(9, player)
                            + (votes.getCurrentBonus(27)
                                + (hole.schematics.find(schematic => schematic.index === 46)!.getBonus()
                                    + (farming.cropScientist.getBonus(CropScientistBonusText.DropRate)
                                        + (grimoire.getUpgradeBonus(44) + (upgradeVault.getBonusForId(18)
                                            + (hole.measurements.find(measurement => measurement.index === 15)!.getBonus()
                                                + (getCompanionActiveBonus(companions, 22)
                                                    + getCompanionActiveBonus(companions, 158) + progressionDropPercent)))))))))));
        // Boss Battle Spillover uses this week's high-water count, not the selected boss difficulty.
        const laterAdditivePercent = getStampBonusForKey(stamps, 'DropRate')
            + (player.getTalentBonusAtInputs(655, talentInputs) * account.weeklyBoss.defeatedDifficultiesThisWeek
                + (5 * dreamDropLevel + (summoning.getSummoningWinnerBonusFromIndex(9)
                    + (tome.getTomeBonus(2, player)
                        + (firstAdditivePercent + (research.getBonusForId(173, 0) + companion132))))));
        const prayerAndAccountPercent = prayerPercent
            + (sigils.sigils[11].getBonus()
                + (shinyDropPercent + (arcade.bonuses[27].getBonus()
                    + (getCompanionActiveBonus(companions, 3) + companion50 + laterAdditivePercent))));
        const signAndSetPercent = signDropPercent
            + (guild.guildBonuses[10].getBonus()
                + (player.cardInfo!.getBonusForId(5) + (player.cardInfo!.getBonusForId(6)
                    + (cloverShrinePercent + prayerAndAccountPercent))));
        const additivePercent = player.getTalentBonusAtInputs(279, talentInputs)
            + (player.getPostOfficeBonus('DropRate')
                + (player.gear.getBonus(EquipmentBonus.DropRate) + player.gear.getBonus(EquipmentBonus.DropChance)
                    + (alchemy.getBubbleBonusForKey('DropRate', player) + (Card.GetTotalBonusForId(cards, 10)
                        + (player.getTalentBonusAtInputs(24, talentInputs) + signAndSetPercent)))));
        // Only percentage points divide by 100. The Luck contribution remains outside that division.
        let multiplier = 1.4 * luckFraction + additivePercent / 100 + 1;
        // Chips can raise a base below five to five, but cannot reduce a larger base.
        if (multiplier < 5) {
            multiplier = Math.min(5, multiplier + player.getChipBonus('dr') / 100);
        }
        // These flat bundle and mastery additions occur on opposite sides of the pirate talent multiplier.
        if (account.hasDeathBringerBundle) multiplier += 2;
        multiplier *= Talent.getArchlordOfThePiratesMultiplier(players, talentInputs, account.plunderousMobKills);
        if (sneaking.completedMasteries >= 1) multiplier += 0.3;
        if (account.hasExplorerBundle) multiplier = 1.2 * multiplier;

        // Map multipliers stay excluded. Minehead's two rewards are permanent account progression.
        multiplier *= 1 + royalArmory.statues.find(statue => statue.index === 1)!.getBonus() / 100;
        multiplier *= menagerie.getBonusMultiplier(24);
        multiplier *= 1 + Card.GetTotalBonusForId(cards, 101) / 100;
        multiplier *= 1 + family.getClassBonus(ClassIndex.Royal_Guardian)!.getBonus(player) / 100;
        multiplier *= 1 + 0.3 * getCompanionActiveBonus(companions, 168);
        multiplier *= 1 + (Math.min(0.5, companion132) + 0.2 * isCompanionLevelTwo(companions, 132));
        multiplier *= 1 + (sushi.getBonusFromIndex(48) + jellyOperator.getObstructionBonus(14)) / 100;
        multiplier *= Math.max(1, minehead.getTradeDropRateMultiplier());
        multiplier *= 1 + tome.getTomeBonus(7, player) / 100;
        multiplier *= 1 + player.gear.getBonus(EquipmentBonus.BonusDropRate) / 100;
        multiplier *= 1 + minehead.getBonusFromIndex(0) / 100;
        multiplier *= 1 + 5 * cloudDropCompleted / 100;

        // This pristine charm already exposes a complete multiplier, unlike the percentage owner inputs.
        const pristineCharm = sneaking.pristineCharms.find(charm => charm.data.itemId === 3)!;
        multiplier *= pristineCharm.unlocked ? pristineCharm.getBonus() : 1;
        multiplier *= 1 + player.gear.getBonus(EquipmentBonus.DropRateMulti) / 100;
        multiplier *= 1 + alchemy.getVialBonusForKey('7drMulto') / 100;
        multiplier *= Math.max(1, Math.min(1.3, 1 + getCompanionActiveBonus(companions, 26))
            * (1 + 0.5 * getCompanionActiveBonus(companions, 160)));
        multiplier *= Math.max(1, Math.min(1.01, 1 + companion50 / 2500));
        this.preparedDropRateMultiplier = multiplier;
    }

    update(player: Player, players: readonly Player[], sources: AttributeSources): void {
        const { alchemy, stamps, family, sigils, breeding, arcade, islandExpeditions, orion, companions,
            sneaking, cooking, guild, hole, lab, summoning, sailing, goldenFood, achievements,
            farming, votes, equipmentSets, quests } = sources;
        const cards = getStatCards(player);
        const will = Talent.getClassLevelAttributeBonus(player);
        const baseAllStat = getStampBonusForKey(stamps, 'BaseAllStat');
        const orionAllStat = orion.getGlobalBonus(5);
        const allStatEquipmentPercent = player.gear.getBonus(EquipmentBonus.AllStats);
        const companionFlat = getCompanionActiveBonus(companions, 8);
        const talentFlat = player.getTalentBonusAtInputs(652, player.finalTalentInputs);
        const archerFlatBubble = alchemy.getBubbleBonusForKey('A4', player);
        // Flat All Stat rounds once after Post Office, meals, and Guild. Source 1.22: AllStat, lines 95873–95876.
        const allStatFlat = Math.floor(player.getPostOfficeBonus('20a') + cooking.getMealBonusForKey('Stat')
            + guild.guildBonuses[1].getBonus());
        // Keep the nested percentage sum and its single tenth-point floor. Dummy Target remains fractional here.
        // Source 1.22: AllStatPCT, lines 95877–95896.
        const allStatPercent = 0.1 * Math.floor(10 * (
            alchemy.getVialBonusForKey('AllStatPCT') + (
                15 * getCompanionActiveBonus(companions, 0) * hole.majiks.IdleonUpgrades.find(upgrade => upgrade.index === 21)!.getBonus()
                + lab.jewels[4].getBonus() + getStampBonusForKey(stamps, 'AllStatPct') + (
                    Card.GetTotalBonusForId(cards, 82) + summoning.summonBonuses.find(bonus => bonus.data.bonusId === 19)!.getBonus() + (
                        family.getClassBonus(ClassIndex.Bubonic_Conjuror)!.getBonus(player) + (sailing.artifacts[28].getBonus() + (goldenFood.getAllStatPercent(player) + (
                            Number(achievements[309].completed) + (Talent.getDummyTargetAllStatBonus(player, islandExpeditions.dummyTargetBestDPS) + (
                                Number(achievements[362].completed) + sneaking.getMasteryAllStatBonus() + (farming.landrankDatabase.getUpgradeBonusForPlayer(19, player) + (
                                    votes.getCurrentBonus(2) + equipmentSets.getSetBonus('MARBIGLASS_SET')
                                ))
                            ))
                        )))
                    )
                )
            )
        ));

        // Total attribute bubbles, the shared talent, and Companion 8 stay outside each percentage multiplier.
        // Preserve each distinct addition tree and final floor. Source: TotalStats.1.22.js:354–486.
        this.strength = Math.floor(
            alchemy.getBubbleBonusForKey('TotalSTR', player) + (talentFlat + companionFlat) +
            (1 + (player.getTalentBonusAtInputs(143, player.finalTalentInputs) + player.gear.getBonus(EquipmentBonus.Strength) +
                (allStatEquipmentPercent + (allStatPercent + pristineBonus(sneaking, 4)) +
                    (signBonus(player, 'STR', true) + alchemy.getBubbleBonusForKey('W8', player)))) / 100) *
            (player.gear.getProperty('STR') +
                (player.getTalentBonusAtInputs(10, player.finalTalentInputs) + Talent.getAccountTalentBonus(players, 51, player.finalTalentInputs) +
                    (getStampBonusForKey(stamps, 'BaseSTR') + player.gear.getBonus(EquipmentBonus.StrengthFlat))) +
                (player.getTalentBonusAtInputs(98, player.finalTalentInputs) + player.getTalentBonusAtInputs(203, player.finalTalentInputs) +
                    ((player.activeBuffs.find(talent => talent.skillIndex === 94)?.getBonus() ?? 0) + (secondTalentBonus(player, 142) + islandExpeditions.getShimmerBonus(0)))) +
                (family.getClassBonus(ClassIndex.Warrior)!.getBonus(player) +
                    (signBonus(player, 'STR', false) + player.getPostOfficeBonus('23b') +
                        (will + (Card.GetTotalBonusForId(cards, 9) + (baseAllStat + (allStatFlat + (sigils.sigils[0].getBonus() +
                            (alchemy.getBubbleBonusForKey('W4', player) + (breeding.shinyBonuses.find(bonus => bonus.data.index === 6)!.getBonus() +
                                (arcade.bonuses[19].getBonus() + orionAllStat))))))))))
            )
        );
        this.agility = Math.floor(
            alchemy.getBubbleBonusForKey('TotalAGI', player) + (talentFlat + companionFlat) +
            (1 + (player.getTalentBonusAtInputs(368, player.finalTalentInputs) + player.gear.getBonus(EquipmentBonus.Agility) +
                (allStatEquipmentPercent + (allStatPercent + pristineBonus(sneaking, 1)) +
                    (signBonus(player, 'AGI', true) + alchemy.getBubbleBonusForKey('A9', player)))) / 100) *
            (player.gear.getProperty('AGI') +
                (player.getTalentBonusAtInputs(11, player.finalTalentInputs) + Talent.getAccountTalentBonus(players, 52, player.finalTalentInputs) +
                    (getStampBonusForKey(stamps, 'BaseAGI') + player.gear.getBonus(EquipmentBonus.AgilityFlat))) +
                (player.getTalentBonusAtInputs(278, player.finalTalentInputs) + player.getTalentBonusAtInputs(428, player.finalTalentInputs) + islandExpeditions.getShimmerBonus(1)) +
                (family.getClassBonus(ClassIndex.Archer)!.getBonus(player) +
                    (signBonus(player, 'AGI', false) + player.getPostOfficeBonus('21b') +
                        (will + (Card.GetTotalBonusForId(cards, 7) + (baseAllStat + (allStatFlat + (sigils.sigils[1].getBonus() +
                            (secondTalentBonus(player, 367) + (archerFlatBubble + (breeding.shinyBonuses.find(bonus => bonus.data.index === 7)!.getBonus() +
                                (arcade.bonuses[20].getBonus() + orionAllStat)))))))))))
            )
        );
        this.wisdom = Math.floor(
            alchemy.getBubbleBonusForKey('TotalWIS', player) + (talentFlat + companionFlat) +
            (1 + (player.getTalentBonusAtInputs(533, player.finalTalentInputs) + player.gear.getBonus(EquipmentBonus.Wisdom) +
                (allStatEquipmentPercent + (allStatPercent + pristineBonus(sneaking, 10)) +
                    (signBonus(player, 'WIS', true) + alchemy.getBubbleBonusForKey('M9', player)))) / 100) *
            (player.gear.getProperty('WIS') +
                (player.getTalentBonusAtInputs(12, player.finalTalentInputs) + Talent.getAccountTalentBonus(players, 53, player.finalTalentInputs) +
                    (getStampBonusForKey(stamps, 'BaseWIS') + player.gear.getBonus(EquipmentBonus.WisdomFlat))) +
                (player.getTalentBonusAtInputs(459, player.finalTalentInputs) + islandExpeditions.getShimmerBonus(2)) + family.getClassBonus(ClassIndex.Mage)!.getBonus(player) +
                (signBonus(player, 'WIS', false) + player.getPostOfficeBonus('22b') +
                    (player.getTalentBonusAtInputs(593, player.finalTalentInputs) + will +
                        (Card.GetTotalBonusForId(cards, 5) + (baseAllStat + (allStatFlat + (sigils.sigils[2].getBonus() +
                            (secondTalentBonus(player, 532) + (alchemy.getBubbleBonusForKey('M4', player) +
                                (breeding.shinyBonuses.find(bonus => bonus.data.index === 8)!.getBonus() + (arcade.bonuses[21].getBonus() + orionAllStat))))))))))
            )
        );
        // Quest Chungus cannot exceed its talent bonus. Luck also uses the Archer flat bubble, not a Luck Tome bubble.
        const questChungus = Math.min(quests.getTotalQuestsComplete(), player.getTalentBonusAtInputs(618, player.finalTalentInputs));
        this.luck = Math.floor(
            alchemy.getBubbleBonusForKey('TotalLUK', player) + (talentFlat + companionFlat) +
            (1 + (player.gear.getBonus(EquipmentBonus.Luck) +
                (allStatEquipmentPercent + (allStatPercent + pristineBonus(sneaking, 5)) + signBonus(player, 'LUK', true))) / 100) *
            (player.gear.getProperty('LUK') +
                (player.getTalentBonusAtInputs(13, player.finalTalentInputs) + Talent.getAccountTalentBonus(players, 54, player.finalTalentInputs) +
                    (getStampBonusForKey(stamps, 'BaseLUK') + player.getPostOfficeBonus('15c') +
                        (player.gear.getBonus(EquipmentBonus.LuckFlat) + islandExpeditions.getShimmerBonus(3)))) +
                (player.getPostOfficeBonus('LUK') + (family.getClassBonus(ClassIndex.Journeyman)!.getBonus(player) + signBonus(player, 'LUK', false) +
                    (questChungus + (will + (Card.GetTotalBonusForId(cards, 2) + (player.getTalentBonusAtInputs(23, player.finalTalentInputs) +
                        (baseAllStat + (allStatFlat + (sigils.sigils[3].getBonus() + (archerFlatBubble +
                            (breeding.shinyBonuses.find(bonus => bonus.data.index === 9)!.getBonus() + (arcade.bonuses[22].getBonus() + orionAllStat))))))))))))
            )
        );
    }
}

export const updatePlayerStats = (accountData: Map<string, any>): void => {
    const players = accountData.get('players') as Player[];
    const sources: AttributeSources = {
        alchemy: accountData.get('alchemy') as Alchemy,
        stamps: accountData.get('stamps') as Stamp[][],
        family: accountData.get('family') as Family,
        sigils: accountData.get('sigils') as Sigils,
        breeding: accountData.get('breeding') as Breeding,
        arcade: accountData.get('arcade') as Arcade,
        islandExpeditions: accountData.get('islandExpeditions') as IslandExpeditions,
        orion: accountData.get('orion') as Orion,
        companions: accountData.get('companions') as Companion[],
        sneaking: accountData.get('sneaking') as Sneaking,
        cooking: accountData.get('cooking') as Cooking,
        guild: accountData.get('guild') as Guild,
        hole: accountData.get('hole') as Hole,
        lab: accountData.get('lab') as Lab,
        summoning: accountData.get('summoning') as Summoning,
        sailing: accountData.get('sailing') as Sailing,
        goldenFood: accountData.get('goldenFood') as GoldenFood,
        achievements: accountData.get('achievements') as Achievement[],
        farming: accountData.get('farming') as Farming,
        votes: accountData.get('votes') as Votes,
        equipmentSets: accountData.get('equipmentSets') as EquipmentSets,
        quests: accountData.get('quests') as Quests,
    };
    for (const player of players) {
        player.stats.update(player, players, sources);
    }
};

export const updatePlayerPowers = (accountData: Map<string, any>): void => {
    const players = accountData.get('players') as Player[];
    const sources: PowerSources = {
        alchemy: accountData.get('alchemy') as Alchemy,
        family: accountData.get('family') as Family,
        sigils: accountData.get('sigils') as Sigils,
        arcade: accountData.get('arcade') as Arcade,
        guild: accountData.get('guild') as Guild,
        dungeons: accountData.get('dungeons') as Dungeons,
        breeding: accountData.get('breeding') as Breeding,
        statues: accountData.get('statues') as PlayerStatues[],
        boostFoodStamp: getStampBonusForKey(accountData.get('stamps') as Stamp[][], 'BFood'),
    };
    for (const player of players) {
        player.stats.updatePowers(player, sources);
    }
};

export const updatePlayerSecondaryStats = (accountData: Map<string, any>): void => {
    const players = accountData.get('players') as Player[];
    const sources: SecondaryStatSources = {
        account: accountData.get('account') as Account,
        alchemy: accountData.get('alchemy') as Alchemy,
        stamps: accountData.get('stamps') as Stamp[][],
        sigils: accountData.get('sigils') as Sigils,
        saltLick: accountData.get('saltLick') as SaltLick,
        arcade: accountData.get('arcade') as Arcade,
        statues: accountData.get('statues') as PlayerStatues[],
        upgradeVault: accountData.get('upgradeVault') as UpgradeVault,
        companions: accountData.get('companions') as Companion[],
        cooking: accountData.get('cooking') as Cooking,
        shrines: accountData.get('shrines') as Shrine[],
        bribes: accountData.get('bribes') as Bribe[],
        prayers: accountData.get('prayers') as Prayer[],
        goldenFood: accountData.get('goldenFood') as GoldenFood,
        dungeons: accountData.get('dungeons') as Dungeons,
        equipmentSets: accountData.get('equipmentSets') as EquipmentSets,
        divinity: accountData.get('divinity') as Divinity,
        votes: accountData.get('votes') as Votes,
        poppy: accountData.get('poppy') as Poppy,
    };
    for (const player of players) {
        player.stats.updateSecondaryStats(player, sources);
    }
};

export const updatePlayerDropRates = (accountData: Map<string, any>): void => {
    const players = accountData.get('players') as Player[];
    const sources: DropRateSources = {
        account: accountData.get('account') as Account,
        alchemy: accountData.get('alchemy') as Alchemy,
        stamps: accountData.get('stamps') as Stamp[][],
        family: accountData.get('family') as Family,
        sigils: accountData.get('sigils') as Sigils,
        breeding: accountData.get('breeding') as Breeding,
        arcade: accountData.get('arcade') as Arcade,
        guild: accountData.get('guild') as Guild,
        hole: accountData.get('hole') as Hole,
        shrines: accountData.get('shrines') as Shrine[],
        prayers: accountData.get('prayers') as Prayer[],
        goldenFood: accountData.get('goldenFood') as GoldenFood,
        equipmentSets: accountData.get('equipmentSets') as EquipmentSets,
        votes: accountData.get('votes') as Votes,
        orion: accountData.get('orion') as Orion,
        companions: accountData.get('companions') as Companion[],
        sneaking: accountData.get('sneaking') as Sneaking,
        summoning: accountData.get('summoning') as Summoning,
        achievements: accountData.get('achievements') as Achievement[],
        farming: accountData.get('farming') as Farming,
        grimoire: accountData.get('grimoire') as Grimoire,
        upgradeVault: accountData.get('upgradeVault') as UpgradeVault,
        emperor: accountData.get('emperor') as Emperor,
        friends: accountData.get('friends') as Friends,
        legendTalents: accountData.get('legendTalents') as LegendTalents,
        spelunking: accountData.get('spelunking') as Spelunking,
        royalArmory: accountData.get('royalArmory') as RoyalArmory,
        tome: accountData.get('tome') as Tome,
        research: accountData.get('research') as ResearchGrid,
        minehead: accountData.get('minehead') as Minehead,
        equinox: accountData.get('equinox') as Equinox,
        sushi: accountData.get('sushi') as SushiStation,
        jellyOperator: accountData.get('jellyOperator') as JellyOperator,
        menagerie: accountData.get('menagerie') as Menagerie,
    };
    for (const player of players) {
        player.stats.updateDropRate(player, players, sources);
    }
};

export const updatePlayerSkillStatsDN = (accountData: Map<string, any>): void => {
    const players = accountData.get('players') as Player[];
    const alchemy = accountData.get('alchemy') as Alchemy;
    const account = accountData.get('account') as Account;

    for (const player of players) {
        
        player.stats.prepareSkillStatsDN(player, {
            toolW: alchemy.getBubbleBonusForKey('ToolW', player),
            toolM: alchemy.getBubbleBonusForKey('ToolM', player),
            toolA: alchemy.getBubbleBonusForKey('ToolA', player),
            fishingHighscore: account.minigameHighscores[1],
            totalMiningPower: player.stats.getSkillPower(SkillsIndex.Mining),
            totalChoppingPower: player.stats.getSkillPower(SkillsIndex.Chopping),
            totalFishingPower: player.stats.getSkillPower(SkillsIndex.Fishing),
            totalCatchingPower: player.stats.getSkillPower(SkillsIndex.Catching),
        });
    }
};
