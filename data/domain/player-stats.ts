import { Card } from './cards';
import { EquipmentBonus, type PrimaryAttribute } from './equipment-effects';
import { SkillsIndex } from './SkillsIndex';
import { PassiveType, type Dungeons } from './dungeons';
import { Food } from './items';
import type { PlayerStatues } from './world-1/statues';
import type { Player } from './player';
import { ClassIndex, Talent } from './talents';
import { getCompanionActiveBonus, type Companion } from './companions';
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

function postOfficeBonus(player: Player, key: string): number {
    let total = 0;
    for (const box of player.postOffice) {
        let subtotal = 0;
        for (let index = 0; index < box.bonuses.length; index++) {
            const bonus = box.bonuses[index];
            if (bonus.data.bonusKey === key) {
                subtotal += bonus.getBonus(box.level, index);
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
            5 + postOfficeBonus(player, '12a') + dungeons.passives.get(PassiveType.Flurbo)![0].getBonus() + foodWeapon
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

    update(player: Player, players: readonly Player[], sources: AttributeSources): void {
        const { alchemy, stamps, family, sigils, breeding, arcade, islandExpeditions, orion, companions,
            sneaking, cooking, guild, hole, lab, summoning, sailing, goldenFood, achievements,
            farming, votes, equipmentSets, quests } = sources;
        // Equipped passive cards must not contribute twice. Reuse prepared card objects without a set or map.
        const cards: Card[] = [];
        for (const card of player.cardInfo!.equippedCards) {
            if (!cards.includes(card)) cards.push(card);
        }
        for (const card of player.cardInfo!.cards) {
            if (card.passive && !cards.includes(card)) cards.push(card);
        }
        const will = Talent.getClassLevelAttributeBonus(player);
        const baseAllStat = getStampBonusForKey(stamps, 'BaseAllStat');
        const orionAllStat = orion.getGlobalBonus(5);
        const allStatEquipmentPercent = player.gear.getBonus(EquipmentBonus.AllStats);
        const companionFlat = getCompanionActiveBonus(companions, 8);
        const talentFlat = player.getTalentBonusAtInputs(652, player.finalTalentInputs);
        const archerFlatBubble = alchemy.getBubbleBonusForKey('A4', player);
        // Flat All Stat rounds once after Post Office, meals, and Guild. Source 1.22: AllStat, lines 95873–95876.
        const allStatFlat = Math.floor(postOfficeBonus(player, '20a') + cooking.getMealBonusForKey('Stat')
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
                                    votes.getCurrentBonus(2) + equipmentSets.getSetBonus('MARBIGLASS_SET', player)
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
                    (signBonus(player, 'STR', false) + postOfficeBonus(player, '23b') +
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
                    (signBonus(player, 'AGI', false) + postOfficeBonus(player, '21b') +
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
                (signBonus(player, 'WIS', false) + postOfficeBonus(player, '22b') +
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
                    (getStampBonusForKey(stamps, 'BaseLUK') + postOfficeBonus(player, '15c') +
                        (player.gear.getBonus(EquipmentBonus.LuckFlat) + islandExpeditions.getShimmerBonus(3)))) +
                (postOfficeBonus(player, 'LUK') + (family.getClassBonus(ClassIndex.Journeyman)!.getBonus(player) + signBonus(player, 'LUK', false) +
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
