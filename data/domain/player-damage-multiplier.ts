import type { CrystalSteakArtifact, FunHippoeteArtifact } from './world-5/sailing/artifacts';
import { Card } from './cards';
import { ClassIndex, Talent } from './talents';
import { EquipmentBonus } from './equipment-effects';
import { TotalizerBonus } from './world-3/worship';
import { initRandoList2Repo } from './data/RandoList2Repo';
import { getStatCards } from './player-stats';
import { getCompanionActiveBonus, type Companion } from './companions';
import { CropScientistBonusText } from './world-6/farming';
import { ConstructionMastery, KillroyPrime, Rift, SkillMastery } from './world-4/rift';
import { lavaLog } from '../utility';
import type { Player } from './player';
import type { Account } from './account';
import type { Achievement } from './achievements';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Arcade } from './world-2/arcade';
import type { Breeding } from './world-4/breeding';
import type { AtomCollider } from './world-3/construction/atomCollider';
import type { Deathnote } from './world-3/construction/deathnote';
import type { Divinity } from './world-5/divinity';
import type { EquipmentSets } from './misc/equipmentSets';
import type { Equinox } from './world-3/equinox';
import type { Family } from './family';
import type { Farming } from './world-6/farming';
import type { Friends } from './friends';
import type { Gaming } from './world-5/gaming';
import type { Grimoire } from './grimoire';
import type { Hole } from './world-5/hole/hole';
import type { Lab } from './world-4/lab';
import type { Meritocraty } from './world-7/meritocraty';
import type { Minehead } from './world-7/minehead';
import type { Prayer } from './world-3/prayers';
import type { Quests } from './quests';
import type { ResearchGrid } from './world-7/research';
import type { SaltLick } from './world-3/construction/saltLick';
import type { RoyalArmory } from './world-6/royalArmory/royalArmory';
import type { Sailing } from './world-5/sailing/sailing';
import type { Shrine } from './world-3/construction/shrines';
import type { Sneaking } from './world-6/sneaking';
import type { Storage } from './storage';
import type { Summoning } from './world-6/summoning';
import type { SushiStation } from './world-7/sushi';
import type { UpgradeVault } from './upgradeVault';
import type { Compass } from './compass';
import type { Worship } from './world-3/worship';
import type { Cooking } from './world-4/cooking';
import type { Tome } from './world-4/tome';
import type { Votes } from './world-2/votes';
import type { JellyOperator } from './world-7/jellyOperator';
import type { CoralKid } from './world-7/coralKid';


const randoList2 = initRandoList2Repo();
const getAchievementBonus = (achievements: Achievement[], index: number): number =>
    Number(achievements[index].completed);
const damageSoftcaps: readonly [number, number][] = [
    [20_000_000, 0.8], [500_000_000, 0.6],
    [2_000_000_000, 0.45], [15_000_000_000, 0.36], [60_000_000_000, 0.28],
];


/** Calculates native DamageDealed("Max") component D in its source order. */
export const getPlayerDamageTotalMultiplier = (data: Map<string, any>, player: Player, mapId: number = player.currentMapId): number => {
    const players = data.get('players') as Player[];
    const account = data.get('account') as Account;
    const alchemy = data.get('alchemy') as Alchemy;
    const arcade = data.get('arcade') as Arcade;
    const breeding = data.get('breeding') as Breeding;
    const companions = data.get('companions') as Companion[];
    const coralKid = data.get('coralKid') as CoralKid;
    const divinity = data.get('divinity') as Divinity;
    const deathnote = data.get('deathnote') as Deathnote;
    const equinox = data.get('equinox') as Equinox;
    const family = data.get('family') as Family;
    const farming = data.get('farming') as Farming;
    const gaming = data.get('gaming') as Gaming;
    const hole = data.get('hole') as Hole;
    const lab = data.get('lab') as Lab;
    const minehead = data.get('minehead') as Minehead;
    const prayers = data.get('prayers') as Prayer[];
    const royalArmory = data.get('royalArmory') as RoyalArmory;
    const rift = data.get('rift') as Rift;
    const saltLick = data.get('saltLick') as SaltLick;
    const sailing = data.get('sailing') as Sailing;
    const sneaking = data.get('sneaking') as Sneaking;
    const storage = data.get('storage') as Storage;
    const summoning = data.get('summoning') as Summoning;
    const sushi = data.get('sushi') as SushiStation;
    const worship = data.get('worship') as Worship;
    const achievements = data.get('achievements') as Achievement[];
    const friends = data.get('friends') as Friends;
    const equipmentSets = data.get('equipmentSets') as EquipmentSets;
    const collider = data.get('collider') as AtomCollider;
    const tome = data.get('tome') as Tome;
    const upgradeVault = data.get('upgradeVault') as UpgradeVault;
    const compass = data.get('compass') as Compass;
    const shrines = data.get('shrines') as Shrine[];
    const grimoire = data.get('grimoire') as Grimoire;
    const quests = data.get('quests') as Quests;
    const meritocraty = data.get('meritocraty') as Meritocraty;
    const votes = data.get('votes') as Votes;
    const cooking = data.get('cooking') as Cooking;
    const researchGrid = data.get('research') as ResearchGrid;
    const jellyOperator = data.get('jellyOperator') as JellyOperator;
    const constructionMastery = rift.bonuses.find(bonus => bonus.name === 'Construct Mastery') as ConstructionMastery;
    const skillMastery = rift.bonuses.find(bonus => bonus.name === 'Skill Mastery') as SkillMastery;
    const killroy = rift.bonuses.find(bonus => bonus.name === 'Killroy Prime') as KillroyPrime;
    const talentInputs = player.finalTalentInputs;
    let component = 1;

    const extraDamage = (1 + Talent.getAccountTalentBonus(players, 508, talentInputs)
        * lavaLog(account.wormholeEmperorProgress) / 100)
        * (1 + Talent.getAccountTalentBonus(players, 208, talentInputs)
            * lavaLog(account.wraithOverlordProgress) / 100);
    component *= extraDamage;
    component *= 1 + alchemy.getVialBonusForKey('7dmg') / 100;
    component *= 1 + deathnote.getEclipseSkullsDamageBonus() / 100;
    component *= 1 + gaming.getPaletteBonus(34) / 100;
    component *= 1 + equinox.upgrades.find(upgrade => upgrade.index === 4)!.level / 10;
    const totalDamageCharm = sneaking.pristineCharms.find(charm => charm.data.itemId === 0)!;
    component *= totalDamageCharm.unlocked ? totalDamageCharm.getBonus() : 1;
    component *= 1 + summoning.getUpgradeBonusFromIndex(79) / 100;
    component *= 1 + account.cavernDamageUpgradeLevel * Number(randoList2[13].data.elements[19]) / 100;

    component *= 1 + ((player.activeBuffs.find(buff => buff.skillIndex === 108)?.getBonus() ?? 0)
        + friends.getFriendBonus(0)
        + player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Total Damage'), 0)
        + divinity.godRank * Talent.getAccountTalentBonus(players, 507, talentInputs)
        + Math.floor(Math.max(0, player.level - 200) / 50) * Talent.getAccountTalentBonus(players, 50, talentInputs)) / 100;

    const monumentDamageBonus = hole.getMonumentBonus('Bravery', 6);
    component *= 1 + (grimoire.getUpgradeBonus(35)
        + equipmentSets.getSetBonus('LUSTRE_SET')
        + shrines[0].getBonus(mapId)
        + monumentDamageBonus
        + player.getPostOfficeBonus('12c')
        + player.getPostOfficeBonus('21c')
        + player.getPostOfficeBonus('23c')
        + (family.getClassBonus(ClassIndex.Blood_Berserker)?.getBonus(player) ?? 0)
        + (sailing.artifacts.find(artifact => artifact.index === 25)! as CrystalSteakArtifact).getBonusForPlayer(player)
        + collider.atoms[9].getBonus()
        + breeding.shinyBonuses.find(bonus => bonus.data.index === 5)!.getBonus()
        + worship.totalizer.getBonus(TotalizerBonus.Damage)
        + account.damageShimmerCount * Math.max(1, Math.min(4, 1 + sailing.artifacts.find(artifact => artifact.index === 31)!.getBonus()))
        + farming.cropScientist.getBonus(CropScientistBonusText.TotalDamage)
        + upgradeVault.getBonusForId(41) * lavaLog(account.damageVaultProgress)) / 100;

    component *= 1 + (skillMastery.getTotalBonusByIndex(4)
        + alchemy.getBubbleBonusForKey('pctDmg1', player)
        + alchemy.getBubbleBonusForKey('pctDmg2', player)
        + alchemy.getBubbleBonusForKey('pctDmg3', player)
        + sailing.artifacts.find(artifact => artifact.index === 2)!.getBonus()
        + (sailing.artifacts.find(artifact => artifact.index === 8)! as FunHippoeteArtifact).getBonusForPlayer(player, data)
        + alchemy.getBubbleBonusForKey('W5', player) * Math.floor(Math.max(player.stats.strength, player.stats.luck) / 250)
        + alchemy.getBubbleBonusForKey('A5', player) * Math.floor(player.stats.agility / 250)
        + alchemy.getBubbleBonusForKey('M5', player) * Math.floor(player.stats.wisdom / 250)
        + constructionMastery.getBonusByIndex(2)
        + tome.getTomeBonus(0, player)
        + compass.getUpgradeBonus(48)
        + farming.getExoticMarketBonusValue(41)
        + account.damageBonusPoints) / 100;

    const prayer = (index: number): Prayer => prayers.find(prayer => prayer.index === index)!;
    const prayerDamage = (index: number): number => prayer(index).getBonusForPlayer(player);
    const prayerCurse = (index: number): number => prayer(index).getCurseForPlayer(player);
    const damageJewel = lab.jewels.find(jewel => jewel.index === 10)!;
    const lateDamagePercent = player.getTalentBonusAtInputs(6, talentInputs)
        + saltLick.getBonus(9)
        + player.gear.getBonus(EquipmentBonus.TotalDamage)
        + prayerDamage(15)
        + lab.bonuses.find(bonus => bonus.index === 0)!.getBonus()
        + lab.bonuses.find(bonus => bonus.index === 11)!.getBonus()
        + damageJewel.getBonus()
        + sailing.artifacts.find(artifact => artifact.index === 27)!.getBonus()
        + sailing.artifacts.find(artifact => artifact.index === 29)!.getBonus()
        + hole.getSchematicBonus(84, 100)
        + arcade.bonuses[46].getBonus()
        + account.lateDamageBonusPoints;
    component *= 1 + lateDamagePercent / 100;

    const statCards = getStatCards(player);
    component *= 1 + (getCompanionActiveBonus(companions, 10)
        + getCompanionActiveBonus(companions, 156)
        + Card.GetTotalBonusForId(statCards, 42)
        + player.cardInfo!.getBonusForId(5)) / 100;

    const arenaBonuses = 20 * Number(breeding.hasBonus(2)) + 40 * Number(breeding.hasBonus(15));
    const achievementsBonus = 2 * getAchievementBonus(achievements, 58)
        + 3 * getAchievementBonus(achievements, 59)
        + 5 * getAchievementBonus(achievements, 60)
        + 5 * getAchievementBonus(achievements, 62)
        + 2 * getAchievementBonus(achievements, 119)
        + 3 * getAchievementBonus(achievements, 120)
        + 5 * getAchievementBonus(achievements, 121)
        + 4 * getAchievementBonus(achievements, 189)
        + 2 * getAchievementBonus(achievements, 185)
        + 3 * getAchievementBonus(achievements, 186)
        + 5 * getAchievementBonus(achievements, 187)
        + getAchievementBonus(achievements, 240)
        + getAchievementBonus(achievements, 280)
        + 3 * getAchievementBonus(achievements, 297)
        + 2 * getAchievementBonus(achievements, 303)
        + 2 * getAchievementBonus(achievements, 364)
        + 4 * getAchievementBonus(achievements, 354)
        + 3 * getAchievementBonus(achievements, 375);
    const godBlessing = (godIndex: number): number =>
        divinity.gods.find(god => god.index === godIndex)!.getBlessingBonus(player);
    component *= 1 + (arenaBonuses
        + player.getChipBonus('dmg')
        + cooking.getMealBonusForKey('TotDmg')
        + achievementsBonus
        + godBlessing(7)
        + godBlessing(8)) / 100;

    const killroyDamage = Math.max(0, Math.min(2, killroy.getDamageBonus() / 100));
    component *= Math.max(
        (1 - player.getTalentBonusAtInputs(24, talentInputs) / 100)
            * (1 - (player.activeBuffs.find(buff => buff.skillIndex === 124)?.getBonus() ?? 0) / 100)
            * Math.max(0.01, 1 - (prayerCurse(6) + prayerCurse(13)) / 100),
        0.05,
    );

    const weaponPower = player.gear.equipment[1]?.getProperty('Weapon_Power');
    const weaponPowerValue = weaponPower ? weaponPower.value + weaponPower.stone : 0;
    const wepPowDamage = minehead.getBonusFromIndex(4) * weaponPowerValue;
    component *= (1 + minehead.getBonusFromIndex(0) / 100)
        * (1 + wepPowDamage / 100)
        * (1 + jellyOperator.getObstructionBonus(37) / 100)
        * (1 + royalArmory.statues.find(statue => statue.index === 0)!.getBonus() / 100)
        * Math.pow(1 + coralKid.getBonusFromIndex(11) / 100, Math.max(0, divinity.godRank - 25));
    const damageBonusPoints = account.weeklyBoss.getDamageBonusPoints();
    if (damageBonusPoints !== undefined) {
        component *= 1 + Math.min(150, damageBonusPoints) / 100;
    }
    if (player.classId === ClassIndex.Journeyman
        && quests.playerData[player.playerID].Cactolyte3 === 0
        && storage.playerStorage[player.playerID].some(item => item.internalName === 'Quest47')) {
        component *= 0.5;
    }

    if (component > 100) {
        component = 100 + Math.max(Math.pow(component - 100, 0.86), 0);
    }
    for (const [threshold, exponent] of damageSoftcaps) {
        if (component > threshold) {
            component = threshold * Math.pow(component / threshold, exponent);
        }
    }

    const stickerMultiplier = farming.getStickerDamageMultiplier();
    component *= (1 + player.gear.getBonus(EquipmentBonus.DamageMulti) / 100)
        * (1 + player.gear.getBonus(EquipmentBonus.DamageBonus) / 100)
        * (1 + player.gear.getBonus(EquipmentBonus.BiggerDamage) / 100)
        * (1 + votes.getCurrentBonus(1) / 100)
        * (1 + hole.getFountainBonus(1, 16) / 100)
        * (1 + sushi.getBonusFromIndex(49) / 100)
        * (1 + 0.1 * Number(gaming.isSuperbitPurchased(64)))
        * (1 + 10 * Math.floor((96 + account.damageMultiplierFloorInput) / 100) / 100)
        * (1 + Card.GetTotalBonusForId(statCards, 96) / 100)
        * Math.max(1, stickerMultiplier)
        * (1 + (tome.getTomeBonus(6, player)
            + getAchievementBonus(achievements, 371) + getAchievementBonus(achievements, 384)) / 100)
        * (1 + killroyDamage);

    const companionDamageMultiplier = Math.max(1,
        (1 + getCompanionActiveBonus(companions, 12))
        * (1 + getCompanionActiveBonus(companions, 33))
        * (1 + 2 * getCompanionActiveBonus(companions, 160))
        * (1 + 0.5 * getCompanionActiveBonus(companions, 168))
        * (1 + getCompanionActiveBonus(companions, 170)));
    const crystalCardLevel = player.cardInfo!.cards.find(card => card.id === 'Crystal6')!.getLevels();
    component *= companionDamageMultiplier
        * (1 + Math.min(1.5 * crystalCardLevel, 15) / 100)
        * (1 + meritocraty.getCurrentBonus(5) / 100);

    if (account.hasDamageMultiplierBundle) {
        component *= 1.5;
    }
    // No owned Arcane Cultist or descendant means no Family entry.
    component *= 1 + (family.getClassBonus(ClassIndex.Arcane_Cultist)?.getBonus(player) ?? 0) / 100;

    const hasReliquarium = storage.playerStorage[player.playerID]
        .some(item => item.internalName === 'Quest105');
    if (hasReliquarium) {
        component = Math.pow(component, 4 / (5 + account.damageExponentInput));
    }

    return component;
};
