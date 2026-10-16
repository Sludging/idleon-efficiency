import { lavaLog } from '../utility';
import type { Account } from './account';
import { Card } from './cards';
import { getCompanionActiveBonus, isCompanionLevelTwo, type Companion } from './companions';
import { EquipmentBonus } from './equipment-effects';
import { Food } from './items';
import { MapInfo } from './maps';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';
import type { PlayerStatues } from './world-1/statues';
import type { Arcade } from './world-2/arcade';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Sigils } from './world-2/alchemy/sigils';
import type { Votes } from './world-2/votes';
import { Dungeons, PassiveType } from './dungeons';
import type { Player } from './player';
import { getStatCards } from './player-stats';
import { Talent } from './talents';
import type { Compass } from './compass';
import type { Grimoire } from './grimoire';
import type { UpgradeVault } from './upgradeVault';
import type { Orion } from './world-1/orion';
import type { TaskBoard } from './tasks';
import type { Bubba } from './world-3/bubba';
import type { Achievement } from './achievements';
import type { Divinity } from './world-5/divinity';
import type { Hole } from './world-5/hole/hole';
import type { Sailing } from './world-5/sailing/sailing';
import type { Gaming } from './world-5/gaming';
import type { Farming } from './world-6/farming';
import type { Summoning } from './world-6/summoning';
import type { Cooking } from './world-4/cooking';
import type { Breeding } from './world-4/breeding';
import type { Worship } from './world-3/worship';
import { TotalizerBonus } from './world-3/worship';
import type { Shrine } from './world-3/construction/shrines';
import type { SaltLick } from './world-3/construction/saltLick';
import type { Prayer } from './world-3/prayers';
import type { ResearchGrid } from './world-7/research';
import type { Spelunking } from './world-7/spelunking';
import type { JellyOperator } from './world-7/jellyOperator';
import type { ZenithMarket } from './world-7/zenithShop';
import type { BigFish } from './world-7/bigFish';
import type { DancingCoral } from './world-7/dancingCoral';
import type { CoralKid } from './world-7/coralKid';
import type { SushiStation } from './world-7/sushi';
import type { Friends } from './friends';
import type { GoldenFood } from './golden-food';
import type { EquipmentSets } from './misc/equipmentSets';
import type { Button } from './world-7/button';
import type { Clamworks } from './world-7/clamworks';
import type { Meritocraty } from './world-7/meritocraty';
import type { RoyalArmory } from './world-6/royalArmory/royalArmory';
import type { Tesseract } from './tesseract';

/** Reproduces native ExpMulti(0) for the selected persistent player. */
export const getClassExperienceMultiplier = (data: Map<string, any>, player: Player): number => {
    const players = data.get('players') as Player[];
    const account = data.get('account') as Account;
    const hole = data.get('hole') as Hole;
    const upgradeVault = data.get('upgradeVault') as UpgradeVault;
    const grimoire = data.get('grimoire') as Grimoire;
    const summoning = data.get('summoning') as Summoning;
    const orion = data.get('orion') as Orion;
    const votes = data.get('votes') as Votes;
    const compass = data.get('compass') as Compass;
    const divinity = data.get('divinity') as Divinity;
    const tesseract = data.get('tesseract') as Tesseract;
    const sailing = data.get('sailing') as Sailing;
    const gaming = data.get('gaming') as Gaming;
    const farming = data.get('farming') as Farming;
    const research = data.get('research') as ResearchGrid;
    const spelunking = data.get('spelunking') as Spelunking;
    const jellyOperator = data.get('jellyOperator') as JellyOperator;
    const zenithMarket = data.get('zenithMarket') as ZenithMarket;
    const bigFish = data.get('bigFish') as BigFish;
    const dancingCoral = data.get('dancingCoral') as DancingCoral;
    const coralKid = data.get('coralKid') as CoralKid;
    const sushi = data.get('sushi') as SushiStation;
    const arcade = data.get('arcade') as Arcade;
    const companions = data.get('companions') as Companion[];
    const taskBoard = data.get('taskboard') as TaskBoard;
    const statues = data.get('statues') as PlayerStatues[];
    const dungeons = data.get('dungeons') as Dungeons;
    const sigils = data.get('sigils') as Sigils;
    const alchemy = data.get('alchemy') as Alchemy;
    const cooking = data.get('cooking') as Cooking;
    const breeding = data.get('breeding') as Breeding;
    const worship = data.get('worship') as Worship;
    const shrines = data.get('shrines') as Shrine[];
    const saltLick = data.get('saltLick') as SaltLick;
    const prayers = data.get('prayers') as Prayer[];
    const friends = data.get('friends') as Friends;
    const goldenFood = data.get('goldenFood') as GoldenFood;
    const equipmentSets = data.get('equipmentSets') as EquipmentSets;
    const button = data.get('button') as Button;
    const clamworks = data.get('clamworks') as Clamworks;
    const meritocraty = data.get('meritocraty') as Meritocraty;
    const achievements = data.get('achievements') as Achievement[];
    const royalArmory = data.get('royalArmory') as RoyalArmory;

    const luck = player.stats.luck;
    const expGainLuck = luck < 1000
        ? (Math.pow(luck + 1, 0.37) - 1) / 30
        : ((luck - 1000) / (luck + 2500)) * 0.8 + 0.3963;

    let expGainLuck2 = 0;
    if (taskBoard.merits[2].level > 0 && players.every(candidate => candidate === player || player.level < candidate.level)) {
        expGainLuck2 = 3 * taskBoard.merits[2].level + upgradeVault.getBonusForId(12);
    }
    if (player.level < 50) expGainLuck2 += player.cardInfo!.getBonusForId(0);
    if (player.level < 120) expGainLuck2 += cooking.getMealBonusForKey('Clexp');
    const weeklyBossExp = account.weeklyBoss.getClassExperienceBonusPoints();
    if (weeklyBossExp !== undefined) expGainLuck2 += Math.min(150, weeklyBossExp);
    if (player.level < 10) expGainLuck2 += 150;
    else if (player.level < 30) expGainLuck2 += 100;
    else if (player.level < 50) expGainLuck2 += 50;
    expGainLuck2 += divinity.getMinorBonus(player.playerID, 4) + player.cardInfo!.getBonusForId(5);

    const hasCompassMedallion = compass.medallionsCollected.includes(MapInfo[player.currentMapId].data.enemy);
    const expGainLuck4 = compass.getUpgradeBonus(51)
        + hole.getSchematicBonus(47)
        + summoning.getSummoningWinnerBonusFromIndex(23)
        + grimoire.getUpgradeBonus(24)
        + upgradeVault.getBonusForId(3)
        + upgradeVault.getBonusForId(35) * lavaLog(account.lifetimeFishCaught)
        + hole.getSchematicBonus(83, 40);

    const expGainLuck5 = getClassExperienceMultiplierFactors(
        data, player, players, hasCompassMedallion, compass, gaming, farming, research, jellyOperator,
        zenithMarket, arcade, alchemy, tesseract, bigFish, dancingCoral, coralKid, divinity,
        sushi, hole, spelunking, clamworks, meritocraty, account, royalArmory,
    );
    const isLowestLevelPlayer = players.every(candidate => candidate === player || player.level < candidate.level);
    const expGainLuck3 = Number(account.hasEquinoxBundle) * 20
        + (taskBoard.merits[2].level > 0 && gaming.isSuperbitPurchased(19) && isLowestLevelPlayer ? 50 : 0);
    const shimmerMultiplier = Math.max(1, Math.min(4, 1 + sailing.artifacts[31].getBonus()));
    const expGainLuck6 = 2 * Number(player.cardInfo!.cards.find(card => card.id === 'springEvent1')?.getLevels() ?? 0)
        + getCompanionActiveBonus(companions, 3)
        + getCompanionActiveBonus(companions, 50)
        + account.classExperienceShimmerCount * shimmerMultiplier
        + goldenFood.getClassExperiencePercent(player)
        + orion.getGlobalBonus(0)
        + votes.getCurrentBonus(15)
        + hole.getMonumentBonus('Justice', 6)
        + expGainLuck4
        + equipmentSets.getSetBonus('IRON_SET', undefined, true)
        + farming.getExoticMarketBonusValue(50)
        + account.classExperienceBonusPoints
        + getStampBonusForKey(data.get('stamps') as Stamp[][], 'classxp')
        + friends.getFriendBonus(1)
        + getCompanionActiveBonus(companions, 47)
        + getCompanionActiveBonus(companions, 111)
        + button.getBonusForIndex(8)
        + getCompanionActiveBonus(companions, 128);

    const workbenchExtraExperience = 1 + Talent.getAccountTalentBonus(players, 328, player.finalTalentInputs)
        * lavaLog(account.plunderousMobKills) / 100;
    const boxMonsterExperience = player.getPostOfficeBonus('monsterExp');
    const mainExperienceSignBonus = player.starSigns.reduce((sum, sign) => sum + sign.getClassExperienceBonus(player.level), 0);
    const monsterExperienceVial = alchemy.getVialBonusForKey('MonsterEXP');
    const cardMonsterExperience = Card.GetTotalBonusForId(getStatCards(player), 44);
    const activeMonsterExperienceBubble = alchemy.getBubbleBonusForKey('expACTIVE', player);
    const shrineExperience = shrines[5].getBonus(player.currentMapId);
    const saltLickExperience = saltLick.getBonus(3);
    const prayer0 = prayers.find(prayer => prayer.index === 0)!.getBonusForPlayer(player);
    const prayer2 = prayers.find(prayer => prayer.index === 2)!.getBonusForPlayer(player);
    const prayer9 = player.activePrayers.includes(9) ? prayers.find(prayer => prayer.index === 9)!.getCurse() : 0;
    const flurboExperience = dungeons.passives.get(PassiveType.Flurbo)![2].getBonus();
    const arcadeExperience = arcade.bonuses[12].getBonus();
    const statueExperience = statues[player.playerID].statues[10].getBonus(player);

    const additiveExperience = player.gear.getBonus(EquipmentBonus.XpFromMonsters)
        + boxMonsterExperience
        + Food.getClassExperienceContribution(player)
        + mainExperienceSignBonus
        + monsterExperienceVial
        + activeMonsterExperienceBubble
        + cardMonsterExperience
        + expGainLuck2
        + statueExperience
        + player.getTalentBonusAtInputs(632, player.finalTalentInputs)
        + shrineExperience
        + saltLickExperience
        + prayer0
        + prayer2
        - prayer9
        + flurboExperience
        + Number(achievements[57].completed)
        + 20 * Number(achievements[357].completed)
        + 3 * Number(achievements[61].completed)
        + 2 * Number(achievements[124].completed)
        + 5 * Number(achievements[188].completed)
        + arcadeExperience
        + sigils.sigils[8].getBonus() * (1 + meritocraty.getCurrentBonus(21) / 100)
        + 25 * Number(achievements[286].completed)
        + (breeding.shinyBonuses.find(bonus => bonus.data.index === 1)?.getBonus() ?? 0)
        + worship.totalizer.getBonus(TotalizerBonus.ExpMulti)
        + Talent.getAccountTalentBonus(players, 55, player.finalTalentInputs)
        + expGainLuck6;

    return workbenchExtraExperience
        * (1 + expGainLuck3 / 100)
        * expGainLuck5
        * (1 + player.gear.getBonus(EquipmentBonus.ClassExpMulti) / 100)
        * (1 + expGainLuck * (1 + player.getTalentBonusAtInputs(35, player.finalTalentInputs) / 100) / 1.8
            + additiveExperience / 100);
};

const getClassExperienceMultiplierFactors = (
    data: Map<string, any>,
    player: Player,
    players: Player[],
    hasCompassMedallion: boolean,
    compass: Compass,
    gaming: Gaming,
    farming: Farming,
    research: ResearchGrid,
    jellyOperator: JellyOperator,
    zenithMarket: ZenithMarket,
    arcade: Arcade,
    alchemy: Alchemy,
    tesseract: Tesseract,
    bigFish: BigFish,
    dancingCoral: DancingCoral,
    coralKid: CoralKid,
    divinity: Divinity,
    sushi: SushiStation,
    hole: Hole,
    spelunking: Spelunking,
    clamworks: Clamworks,
    meritocraty: Meritocraty,
    account: Account,
    royalArmory: RoyalArmory,
): number => {
    const companions = data.get('companions') as Companion[];
    const gatedTalent = hasCompassMedallion
        ? Math.max(1, Talent.getAccountTalentBonus(players, 429, player.finalTalentInputs))
        : 1;
    const companionMultipliers = Math.max(1,
        (1 + 9 * getCompanionActiveBonus(companions, 37))
        * (1 + getCompanionActiveBonus(companions, 33))
        * (1 + 4 * getCompanionActiveBonus(companions, 160))
        * (1 + getCompanionActiveBonus(companions, 32))
        * (1 + 0.4 * getCompanionActiveBonus(companions, 168))
        * (1 + getCompanionActiveBonus(companions, 34))
        * (1 + getCompanionActiveBonus(companions, 145))
        * (1 + jellyOperator.getObstructionBonus(30) / 100)
        * (1 + jellyOperator.getObstructionBonus(62) / 100)
        * (1 + Math.min(0.5, getCompanionActiveBonus(companions, 128)) + 0.25 * Number(isCompanionLevelTwo(companions, 128)))
        * (1 + (research.getBonusForId(130) + research.getBonusForId(131) + research.getBonusForId(132) + research.getBonusForId(152)) / 100)
        * (1 + farming.getStickerBonus(0) / 100)
        * (1 + 0.1 * Number(gaming.isSuperbitPurchased(63)))
        * (1 + zenithMarket.getBonusForId(9) / 100)
        * Math.max(1, Math.min(1.01, 1 + getCompanionActiveBonus(companions, 50) / 2500))
    );
    const firstFactor = companionMultipliers
        * (1 + player.gear.getBonus(EquipmentBonus.BonusClassExp) / 100)
        * (1 + Card.GetTotalBonusForId(getStatCards(player), 100) / 100)
        * (1 + arcade.bonuses[60].getBonus() / 100)
        * (1 + alchemy.getVialBonusForKey('7classexp') / 100)
        * Math.pow(Math.max(1, Talent.getAccountTalentBonus(players, 434, player.finalTalentInputs)), compass.titansKilled.filter(killed => killed === 1).length);
    const secondFactor = (1 + tesseract.getArcaneMapMultiBonus(player, players) / 100)
        * (1 + bigFish.getBonusFromIndex(4) / 100)
        * (1 + dancingCoral.getBonusFromIndex(3) / 100)
        * Math.pow(1 + coralKid.getBonusFromIndex(2) / 100, Math.max(0, divinity.godRank))
        * (1 + player.cardInfo!.getBonusForId(12) / 100)
        * (1 + (data.get('bubba') as Bubba).getGlobalBonus(6) / 100)
        * (1 + sushi.getBonusFromIndex(15) / 100)
        * (1 + 5 * Number(account.weeklyBoss.isDreamChallengeCompleted(70)) / 100)
        * (1 + hole.getFountainBonus(0, 16) / 100)
        * (1 + royalArmory.statues.find(statue => statue.index === 3)!.getBonus() / 100);
    const discoveryCount = spelunking.getTotalDiscoveries();
    const accountMultiplier = Math.max(1,
        Math.pow(1.03, discoveryCount)
        * Number(gaming.isSuperbitPurchased(24))
        * (1 + meritocraty.getCurrentBonus(27) / 100)
        * (1 + Math.max(0, 5 * (clamworks.promoLevel - 8)) / 100)
    );
    return gatedTalent * firstFactor * secondFactor * accountMultiplier;
};

