import type { Account } from './account';
import type { Achievement } from './achievements';
import { Card } from './cards';
import { getCompanionActiveBonus, type Companion } from './companions';
import { EquipmentBonus } from './equipment-effects';
import type { Family } from './family';
import type { Friends } from './friends';
import type { Player } from './player';
import { getStatCards } from './player-stats';
import { ClassIndex } from './talents';
import type { UpgradeVault } from './upgradeVault';
import { getStampBonusForKey, type Stamp } from './world-1/stamps';
import { StatusType, type PlayerStatues } from './world-1/statues';
import type { Alchemy } from './world-2/alchemy/alchemy';
import type { Arcade } from './world-2/arcade';
import type { Votes } from './world-2/votes';
import type { Bubba } from './world-3/bubba';
import type { Construction } from './world-3/construction/construction';
import { deathNoteMinibossesOrder, deathNoteMobOrder, type Deathnote } from './world-3/construction/deathnote';
import type { SaltLick } from './world-3/construction/saltLick';
import type { Prayer } from './world-3/prayers';
import type { Breeding } from './world-4/breeding';
import type { Lab } from './world-4/lab';
import type { Divinity } from './world-5/divinity';
import type { Hole } from './world-5/hole/hole';
import type { Sailing } from './world-5/sailing/sailing';
import type { Farming } from './world-6/farming';
import type { RoyalArmory } from './world-6/royalArmory/royalArmory';
import type { Sneaking } from './world-6/sneaking';
import type { BigFish } from './world-7/bigFish';
import type { LegendTalents } from './world-7/legendTalents';

export interface SpeedrunTargetKillCredit {
    multikillTiers: number;
    multikillPercent: number;
    killPerKill: number;
    portalProgressPerKill: number;
}

const diminishMultikill = (percent: number): number => {
    if (percent >= 250) return 98.14 + (percent - 250) / 50;
    if (percent >= 200) return 95.6 + (percent - 200) / 20;
    if (percent >= 150) return 90.6 + (percent - 150) / 10;
    if (percent >= 100) return 80.6 + (percent - 100) / 5;
    if (percent >= 50) return 47.3 + (percent - 50) / 1.5;
    if (percent >= 20) return 20 + (percent - 20) / 1.1;
    return percent;
};

/** Prepares native multikill and active portal credit without changing the saved character. */
export class SpeedrunKillCredit {
    private readonly accuracy: number;
    private readonly deathNoteUnlocked: boolean;
    private readonly baseMultikillPercent: number;
    private readonly multikillPerTierPercent: number;
    private readonly worldRanks: readonly number[];
    private readonly worldGearKillPercent: readonly number[];
    private readonly familyAndVoteKillPercent: number;
    private readonly killMultiplier: number;
    private readonly additiveKillPercent: number;
    private readonly attributeKillPercent: number;
    private readonly portalMultiplier: number;
    private readonly portalVialCredit: number;
    private readonly assignedToCove: boolean;
    private readonly coveBaseMultikillPercent: number;
    private readonly coveMultikillPerTierPercent: number;

    constructor(data: Map<string, any>, player: Player, accountMultikillPerTierBonus: number) {
        const account = data.get('account') as Account;
        const achievements = data.get('achievements') as Achievement[];
        const alchemy = data.get('alchemy') as Alchemy;
        const arcade = data.get('arcade') as Arcade;
        const bigFish = data.get('bigFish') as BigFish;
        const breeding = data.get('breeding') as Breeding;
        const bubba = data.get('bubba') as Bubba;
        const companions = data.get('companions') as Companion[];
        const construction = data.get('construction') as Construction;
        const deathnote = data.get('deathnote') as Deathnote;
        const divinity = data.get('divinity') as Divinity;
        const family = data.get('family') as Family;
        const farming = data.get('farming') as Farming;
        const friends = data.get('friends') as Friends;
        const hole = data.get('hole') as Hole;
        const lab = data.get('lab') as Lab;
        const legendTalents = data.get('legendTalents') as LegendTalents;
        const prayers = data.get('prayers') as Prayer[];
        const royalArmory = data.get('royalArmory') as RoyalArmory;
        const sailing = data.get('sailing') as Sailing;
        const saltLick = data.get('saltLick') as SaltLick;
        const sneaking = data.get('sneaking') as Sneaking;
        const stamps = data.get('stamps') as Stamp[][];
        const statues = data.get('statues') as PlayerStatues[];
        const upgradeVault = data.get('upgradeVault') as UpgradeVault;
        const votes = data.get('votes') as Votes;
        const talentInputs = player.finalTalentInputs;
        const deathNoteLevel = construction.buildings.find(building => building.index === 2)!.level;
        const activeBubbleBonus = (key: string): number => player.activeBubbles.some(bubble => bubble.data.bonusKey === key)
            ? alchemy.getBubbleBonusForKey(key, player) : 0;

        this.accuracy = player.stats.accuracy;
        this.deathNoteUnlocked = deathNoteLevel > 0.5;

        const onyxStatueIds = new Set<number>();
        if (account.onyxStatuesUnlocked) {
            for (const playerStatues of statues) {
                for (const statue of playerStatues.statues) {
                    if (statue.type >= StatusType.Onyx) onyxStatueIds.add(statue.index);
                }
            }
        }
        this.baseMultikillPercent = player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Total Multikill'), 0)
            + saltLick.getBonus(8)
            + (getStampBonusForKey(stamps, 'Overkill') + 2 * deathNoteLevel)
            + (player.gear.getBonus(EquipmentBonus.Multikill)
                + (Math.min(5, Number(achievements[148].completed))
                    + (6 * Number(achievements[122].completed)
                        + (2 * Number(achievements[123].completed)
                            + onyxStatueIds.size * player.getTalentBonusAtInputs(654, talentInputs)))));

        let minibossRank = 0;
        for (const monster of deathNoteMinibossesOrder) {
            const kills = deathnote.mobKillCount.get(monster)!.reduce((sum, count) => sum + Math.round(count), 0);
            minibossRank += deathnote.getDeathnoteMinibossRank(kills);
        }
        this.worldRanks = deathNoteMobOrder.map(world => {
            let rank = minibossRank;
            for (const monster of world) {
                const kills = deathnote.mobKillCount.get(monster)!.reduce((sum, count) => sum + Math.round(count), 0);
                rank += deathnote.getNormalWorldRank(kills, deathnote.hasRiftBonus);
            }
            return rank;
        });

        // Radius comes only from the scenario argument. Keep other saved buffs, including Mana Is Life.
        const manaIsLife = player.activeBuffs.some(buff => buff.skillIndex === 469)
            ? player.getTalentBonusAtInputs(469, talentInputs, true) : 0;
        this.multikillPerTierPercent = alchemy.getVialBonusForKey('Overkill')
            + accountMultikillPerTierBonus
            + arcade.bonuses[8].getBonus()
            + (sailing.artifacts.find(artifact => artifact.index === 26)!.getBonus() + manaIsLife)
            + (player.getChipBonus('mkill')
                + (player.gear.getBonus(EquipmentBonus.MultikillPerTier)
                    + hole.measurements.find(measurement => measurement.index === 9)!.getBonus()
                    + (Card.GetTotalBonusForId(getStatCards(player), 80)
                        + player.starSigns.reduce((sum, sign) => sum + sign.getBonus('Multikill Per Tier'), 0))
                    + (prayers.find(prayer => prayer.index === 16)!.getBonusForPlayer(player)
                        + breeding.shinyBonuses.find(bonus => bonus.data.index === 4)!.getBonus())))
            + (player.getPostOfficeBonus('13b') + activeBubbleBonus('MKtierACTIVE') + player.cardInfo!.getBonusForId(11));

        // Prepared equipment effects already include personal and family Obols.
        this.worldGearKillPercent = [
            0,
            player.gear.getBonus(EquipmentBonus.KillsInWorld2),
            player.gear.getBonus(EquipmentBonus.KillsInWorld3),
            player.gear.getBonus(EquipmentBonus.KillsInWorld4),
            player.gear.getBonus(EquipmentBonus.KillsInWorld5),
            player.gear.getBonus(EquipmentBonus.KillsInWorld6),
            bigFish.getBonusFromIndex(3) + player.gear.getBonus(EquipmentBonus.KillsInWorld7),
        ];
        // No Death Bringer character means no class Family entry.
        this.familyAndVoteKillPercent = (family.getClassBonus(ClassIndex.Death_Bringer)?.getBonus(player) ?? 0)
            + votes.getCurrentBonus(5);
        const divinityInfo = divinity.playerInfo.find(info => info.playerIndex === player.playerID);
        const nobisectActive = divinity.w7ChosenDivinityBonusIndex === 7
            || hole.majiks.pocketDivinity.selections.some(selection => selection.active && selection.bonusId === 7)
            || (divinityInfo?.gods.some(god => god.data.bonusIndex === 7) ?? false);
        this.killMultiplier = Math.max(1, lab.bonuses.find(bonus => bonus.index === 4)!.getBonus())
            * (1 + getCompanionActiveBonus(companions, 14))
            * (1 + royalArmory.statues.find(statue => statue.index === 2)!.getBonus() / 100)
            * (1 + 0.2 * getCompanionActiveBonus(companions, 168))
            * (1 + getCompanionActiveBonus(companions, 29))
            * (1 + getCompanionActiveBonus(companions, 154))
            * (1 + player.gear.getBonus(EquipmentBonus.BonusKills) / 100)
            * (1 + player.gear.getBonus(EquipmentBonus.MoreKills) / 100)
            * (nobisectActive ? 2 : 1);
        const bubblegumLaw = sneaking.pristineCharms.find(charm => charm.data.itemId === 6)!;
        this.additiveKillPercent = player.getTalentBonusAtInputs(109, talentInputs)
            + activeBubbleBonus('kpkACTIVE')
            + prayers.find(prayer => prayer.index === 13)!.getBonusForPlayer(player)
            + (bubblegumLaw.unlocked ? bubblegumLaw.data.x1 : 0)
            + farming.getExoticMarketBonusValue(56)
            + legendTalents.getBonusFromIndex(16)
            + bubba.getGlobalBonus(5)
            + upgradeVault.getBonusForId(64)
            + friends.getFriendBonus(6);
        this.attributeKillPercent = player.getTalentBonusAtInputs(141, talentInputs) * (player.stats.strength / 1000)
            + player.getTalentBonusAtInputs(366, talentInputs) * (player.stats.agility / 1000)
            + player.getTalentBonusAtInputs(531, talentInputs) * (player.stats.wisdom / 1000);
        this.portalMultiplier = 1 + upgradeVault.getBonusForId(43) / 100;
        this.portalVialCredit = alchemy.getVialBonusForKey('MultiKillPlay') / 100;
        this.assignedToCove = hole.playerLocationData[player.playerID] === 17;
        this.coveBaseMultikillPercent = hole.cove.upgrades[15].getBonus();
        this.coveMultikillPerTierPercent = hole.cove.upgrades[6].getBonus();
    }

    getForTarget(
        mapId: number,
        effectiveEnemyHP: number,
        enemyDefence: number,
        maximumDamage: number,
        radiusBonus: number,
    ): SpeedrunTargetKillCredit {
        const diminished = mapId >= 300;
        const exponent = diminished ? 5 : 2;
        let multikillTiers = 1;
        for (let step = 0; step < 50; step++) {
            if (maximumDamage < effectiveEnemyHP * exponent * Math.pow(exponent, step + 1)) break;
            multikillTiers = step + 2;
        }

        const worldIndex = Math.floor(mapId / 50);
        let baseMultikill = this.baseMultikillPercent;
        let multikillPerTier = this.multikillPerTierPercent + (this.worldRanks[worldIndex] ?? 0) + radiusBonus;
        if (diminished) {
            // Native compresses both operands separately, before multiplying by the tier count.
            baseMultikill = diminishMultikill(baseMultikill);
            multikillPerTier = diminishMultikill(multikillPerTier);
        }
        if (mapId === 216 && this.assignedToCove) {
            baseMultikill = this.coveBaseMultikillPercent;
            multikillPerTier = this.coveMultikillPerTierPercent;
        }
        const multikillPercent = Math.floor(baseMultikill + multikillTiers * multikillPerTier);
        const overkill = maximumDamage >= effectiveEnemyHP * exponent
            && this.deathNoteUnlocked && this.accuracy > 1.5 * enemyDefence;
        const additiveKillPercent = (diminished ? 0 : this.attributeKillPercent)
            + (this.additiveKillPercent + (overkill ? multikillPercent : 0));
        const worldMultiplier = 1 + ((this.worldGearKillPercent[worldIndex] ?? 0) + this.familyAndVoteKillPercent) / 100;
        const killPerKill = this.killMultiplier * worldMultiplier * (1 + additiveKillPercent / 100);
        const portalProgressPerKill = this.portalMultiplier * (killPerKill + this.portalVialCredit);
        return { multikillTiers, multikillPercent, killPerKill, portalProgressPerKill };
    }
}

export const prepareSpeedrunKillCredit = (
    data: Map<string, any>,
    player: Player,
    accountMultikillPerTierBonus: number,
): SpeedrunKillCredit => new SpeedrunKillCredit(data, player, accountMultikillPerTierBonus);
