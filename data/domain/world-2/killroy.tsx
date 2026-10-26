import { Domain, RawData } from "../base/domain";
import { initDeathNoteRepo } from "../data/DeathNoteRepo";
import { initKillroyRunUpgradeRepo, KillroyRunUpgradeBase } from "../data/KillroyRunUpgradeRepo";
import { initSkullShopRepo, SkullShopBase } from "../data/SkullShopRepo";
import { Item } from "../items";
import { Player } from "../player";
import { Equinox } from "../world-3/equinox";
import { Rift } from "../world-4/rift";
import { KillroyCharacterFights, KillroySavedWeek } from "./killroyFights";

export enum KillroyRunUpgradeId {
    Timer,
    TalentDrops,
    BonusSkulls,
    FasterRespawn,
    DungeonDrops,
    PearlDrops,
}

export class KillroyRunUpgrade extends KillroyRunUpgradeBase {
    level: number = 0;
    completedRuns: number = 0;
    shadesOfKLevel: number = 0;
    priorTalentPointDrops: number = 0;

    static fromBase(base: KillroyRunUpgradeBase): KillroyRunUpgrade {
        return new KillroyRunUpgrade(base.index, base.data);
    }

    get id(): KillroyRunUpgradeId {
        return this.data.id;
    }

    parse(level: number): void {
        this.level = level;
        this.completedRuns = 0;
        this.shadesOfKLevel = 0;
        this.priorTalentPointDrops = 0;
    }

    get completedRunsRequired(): number {
        return this.id === KillroyRunUpgradeId.Timer ? 0 : Math.pow(2 * this.id, Math.min(this.id, 2));
    }

    get availableChoiceCount(): number {
        return Math.round(3 + this.shadesOfKLevel);
    }

    get unlocked(): boolean {
        return this.id < this.availableChoiceCount && this.completedRuns >= this.completedRunsRequired;
    }

    get runsUntilUnlock(): number {
        // This counts only missing runs. Shades of K must also make the choice available.
        return Math.max(0, this.completedRunsRequired - this.completedRuns);
    }

    get runDurationSeconds(): number {
        return this.getRunDurationSeconds();
    }

    getRunDurationSeconds(level: number = this.level): number {
        return 100 + level;
    }

    get talentPointDropProbability(): number {
        return this.getTalentPointDropProbability();
    }

    getTalentPointDropProbability(level: number = this.level): number {
        if (level <= 0.5) {
            return 0;
        }
        const priorDrops = this.priorTalentPointDrops;
        return (1 + 0.05 * level) / Math.max(10, priorDrops * priorDrops + 10 * (priorDrops + 1));
    }

    get bonusSkullMultiplier(): number {
        return this.getBonusSkullMultiplier();
    }

    getBonusSkullMultiplier(level: number = this.level): number {
        return 1 + level / 100;
    }

    get expectedRespawnCreditsMultiplier(): number {
        return this.getExpectedRespawnCreditsMultiplier();
    }

    getExpectedRespawnCreditsMultiplier(level: number = this.level): number {
        // The upgrade adds expected spawn credits. It does not shorten the spawn interval.
        return 1 + level / 100;
    }

    get dungeonCreditDropProbability(): number {
        return this.getDungeonCreditDropProbability();
    }

    getDungeonCreditDropProbability(level: number = this.level): number {
        return level > 0.5 ? 0.01 * (1 + level / 100) : 0;
    }

    get pearlDropProbability(): number {
        return this.getPearlDropProbability();
    }

    getPearlDropProbability(level: number = this.level): number {
        return level > 0.5 ? 0.002 * (1 + level / 100) : 0;
    }
}

export class KillroyPermanentBonus {
    level: number = 0;

    constructor(public readonly id: number, public readonly shopData: SkullShopBase["data"]) { }

    get skullCost(): number {
        return this.shopData.skullCost;
    }

    get value(): number {
        return this.getValue();
    }

    get nextSuccessfulUpgradeValue(): number {
        return this.getValue(this.level + 1);
    }

    get upgradeSuccessProbability(): number {
        return this.id === 3 && this.level < 2 ? 0.05 : 1;
    }

    get galleryMultiplierBonus(): number {
        return this.getGalleryMultiplierBonus();
    }

    getGalleryMultiplierBonus(level: number = this.level): number {
        return this.getValue(level) / 100;
    }

    getEffectValue(level: number = this.level): number {
        switch (this.id) {
            case 3:
                return this.getGalleryMultiplierBonus(level);
            case 4:
                return 1 + this.getValue(level) / 100;
            default:
                return this.getValue(level);
        }
    }

    getEffectCap(): number {
        // These limits are asymptotes. No finite upgrade level reaches them.
        switch (this.id) {
            case 0:
                return 2;
            case 1:
                return 10;
            case 2:
            case 7:
                return 3;
            case 3:
                return 0.1;
            case 4:
                return 1.023;
            case 5:
                return 1.8;
            case 6:
                return 25;
            default:
                throw new Error(`Unknown Killroy permanent bonus: ${this.id}`);
        }
    }

    getCapProgress(): number {
        // Measure earned effect above the zero-level baseline, which is 1.01 for Masterclass drops.
        let denominator: number;
        switch (this.id) {
            case 0:
            case 1:
            case 2:
                denominator = 300;
                break;
            case 3:
            case 4:
            case 7:
                denominator = 200;
                break;
            case 5:
                denominator = 150;
                break;
            case 6:
                denominator = 250;
                break;
            default:
                throw new Error(`Unknown Killroy permanent bonus: ${this.id}`);
        }
        return Math.max(0, Math.min(100, this.level / (denominator + this.level) * 100));
    }

    getValue(level: number = this.level): number {
        switch (this.id) {
            case 0:
                return 1 + level / (300 + level);
            case 1:
                return 1 + (level / (300 + level)) * 9;
            case 2:
                return 1 + (level / (300 + level)) * 2;
            case 3:
                return (level / (200 + level)) * 10;
            case 4:
                return 1 + (level / (200 + level)) * 1.3;
            case 5:
                return 1 + (level / (150 + level)) * 0.8;
            case 6:
                return (level / (250 + level)) * 25;
            case 7:
                return 1 + (level / (200 + level)) * 2;
            default:
                throw new Error(`Unknown Killroy permanent bonus: ${this.id}`);
        }
    }
}

export class KillroyShopOffer extends SkullShopBase {
    permanentBonus?: KillroyPermanentBonus;
    unlocked: boolean = false;
    purchaseExcluded: boolean = false;

    static fromBase(base: SkullShopBase): KillroyShopOffer {
        return new KillroyShopOffer(base.index, base.data);
    }

    get rewardQuantity(): number | undefined {
        if (this.data.dropsItem) {
            return this.data.rawQuantity;
        }
        switch (this.data.id) {
            case 3:
            case 7:
            case 12:
                return 1;
            case 5:
                return 10;
            case 6:
                return 2;
            default:
                return undefined;
        }
    }

    get rewardItemIdOrPattern(): string | undefined {
        return this.data.dropsItem ? this.data.itemIdOrPattern : undefined;
    }

    get hasKnownGameplayEffect(): boolean {
        return this.data.id !== 19;
    }

    prepare(riftLevel: number, laterShopProgression: number, thirdBattleUnlocked: boolean, arcadePurchases: number): void {
        this.unlocked = this.data.id < 10 || (riftLevel >= 50 && (this.data.id < 15 || laterShopProgression >= 3));
        this.purchaseExcluded = (this.data.id === 10 && thirdBattleUnlocked) || (this.data.id === 5 && arcadePurchases >= 50);
    }
}

export type KillroyMonsterRecord = {
    enemyId: string;
    bestKills: number;
    world: number;
};

export class KillRoy extends Domain {
    skulls: number = 0;
    completedRuns: number = 0;
    thirdBattleUnlocked: boolean = false;
    consumedFightSlots: number[] = [];
    airhornUsed: boolean = false;
    priorTalentPointDrops: number = 0;
    laterShopProgression: number = 0;
    runUpgrades: KillroyRunUpgrade[] = initKillroyRunUpgradeRepo().map(KillroyRunUpgrade.fromBase);
    shopOffers: KillroyShopOffer[] = initSkullShopRepo().map(KillroyShopOffer.fromBase);
    permanentBonuses: KillroyPermanentBonus[] = [11, 13, 14, 15, 16, 17, 18, 19].map((shopId, id) => {
        const offer = this.shopOffers[shopId];
        const bonus = new KillroyPermanentBonus(id, offer.data);
        offer.permanentBonus = bonus;
        return bonus;
    });
    monsterRecords: KillroyMonsterRecord[] = [];
    riftLevel: number = 0;
    arcadePurchases: number = 0;
    savedWeek: KillroySavedWeek = new KillroySavedWeek();

    get characterFights(): KillroyCharacterFights[] {
        return this.savedWeek.characters;
    }

    get accountFightProjection(): KillroyCharacterFights | undefined {
        return this.savedWeek.accountProjection;
    }

    get savedWeekStartTimestamp(): number | undefined {
        return this.savedWeek.startTimestamp;
    }

    get savedWeekEndTimestamp(): number | undefined {
        return this.savedWeek.endTimestamp;
    }

    getRawKeys(): RawData[] {
        return [
            { key: "OptLacc", perPlayer: false, default: [] },
            { key: "KRbest", perPlayer: false, default: {} },
            { key: "TimeAway", perPlayer: false, default: {} },
            { key: "Summon", perPlayer: false, default: [] },
            { key: "Compass", perPlayer: false, default: [] },
            { key: "Tess", perPlayer: false, default: [] },
            { key: "KLA_", perPlayer: true, default: [] },
            { key: "BuffsActive_", perPlayer: true, default: [] },
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        this.monsterRecords = initDeathNoteRepo().map(monster => ({
            enemyId: monster.data.sourceId,
            bestKills: 0,
            world: monster.data.world,
        }));
        return this;
    }

    parse(data: Map<string, unknown>): void {
        const killroy = data.get(this.getDataKey()) as KillRoy;
        const optionList = data.get("OptLacc") as (number | string)[];
        const bestRecords = data.get("KRbest") as Record<string, number>;

        killroy.skulls = Number(optionList[105] ?? 0);
        killroy.completedRuns = Number(optionList[112] ?? 0);
        killroy.consumedFightSlots = [1, 2, 3].filter(slot => String(optionList[113] ?? 0).includes(String(slot)));
        killroy.priorTalentPointDrops = Number(optionList[114] ?? 0);
        killroy.airhornUsed = Number(optionList[115] ?? 0) === 1;
        killroy.thirdBattleUnlocked = Number(optionList[227] ?? 0) === 1;
        killroy.laterShopProgression = Number(optionList[466] ?? 0);
        killroy.arcadePurchases = Number(optionList[417] ?? 0);
        killroy.shopOffers.forEach(offer => {
            offer.prepare(0, killroy.laterShopProgression, killroy.thirdBattleUnlocked, killroy.arcadePurchases);
        });
        killroy.riftLevel = 0;

        killroy.runUpgrades.forEach(upgrade => {
            upgrade.parse(Number(optionList[106 + upgrade.id] ?? 0));
        });
        killroy.permanentBonuses.forEach(bonus => {
            const saveIndex = bonus.id < 3 ? 228 + bonus.id : 464 + bonus.id;
            bonus.level = Number(optionList[saveIndex] ?? 0);
        });
        killroy.monsterRecords.forEach(record => {
            record.bestKills = Number(bestRecords[record.enemyId] ?? 0);
        });
        killroy.savedWeek.parse(data, killroy.consumedFightSlots, killroy.thirdBattleUnlocked, killroy.monsterRecords);
    }

    get runDurationSeconds(): number {
        return this.runUpgrades[KillroyRunUpgradeId.Timer].runDurationSeconds;
    }

    get talentPointDropProbability(): number {
        return this.runUpgrades[KillroyRunUpgradeId.TalentDrops].talentPointDropProbability;
    }

    get bonusSkullMultiplier(): number {
        return this.runUpgrades[KillroyRunUpgradeId.BonusSkulls].bonusSkullMultiplier;
    }

    get expectedRespawnCreditsMultiplier(): number {
        return this.runUpgrades[KillroyRunUpgradeId.FasterRespawn].expectedRespawnCreditsMultiplier;
    }

    get dungeonCreditDropProbability(): number {
        return this.runUpgrades[KillroyRunUpgradeId.DungeonDrops].dungeonCreditDropProbability;
    }

    get pearlDropProbability(): number {
        return this.runUpgrades[KillroyRunUpgradeId.PearlDrops].pearlDropProbability;
    }

    get artifactFindChanceBonus(): number {
        return this.permanentBonuses[0].value;
    }

    get farmingNextEvoChanceBonus(): number {
        return this.permanentBonuses[1].value;
    }

    get sneakingJadeGainBonus(): number {
        return this.permanentBonuses[2].value;
    }

    get podiumsOwnedLv2(): number {
        return this.permanentBonuses[3].value;
    }

    get masterClassBonusDrop(): number {
        return this.permanentBonuses[4].value;
    }

    get masterClassDropMultiplier(): number {
        // Masterclass drops apply the shop value as percentage points.
        return 1 + this.masterClassBonusDrop / 100;
    }

    get spelunkingExpMulti(): number {
        // Research and Spelunking use the native multiplier directly in version 1.24.
        return this.permanentBonuses[5].value;
    }

    get dailyCoralReefGains(): number {
        return this.permanentBonuses[6].value;
    }

    get nextUpdateBonus(): number {
        return this.permanentBonuses[7].value;
    }

    get totalBestKills(): number {
        return this.monsterRecords.reduce((total, record) => total + record.bestKills, 0);
    }

    get damageBonusPercent(): number {
        return Math.floor(Math.pow(this.totalBestKills, 0.4));
    }

    get damageMultiplier(): number {
        return 1 + Math.max(0, Math.min(2, this.damageBonusPercent / 100));
    }

    get nextDamageTotalBestKills(): number {
        return Math.ceil(Math.pow(this.damageBonusPercent + 1, 2.5));
    }

    get killsUntilNextDamageBonus(): number {
        return this.nextDamageTotalBestKills - this.totalBestKills;
    }

    get extraShopRowUnlocked(): boolean {
        return this.riftLevel >= 50;
    }

    get laterShopRowUnlocked(): boolean {
        return this.extraShopRowUnlocked && this.laterShopProgression >= 3;
    }
}

export const updateKillroy = (data: Map<string, unknown>): void => {
    const killroy = data.get("killroy") as KillRoy;
    const rift = data.get("rift") as Rift;
    const equinox = data.get("equinox") as Equinox;
    const players = data.get("players") as Player[];
    const shadesOfK = equinox.upgrades[2];

    killroy.riftLevel = rift.level;
    killroy.runUpgrades.forEach(upgrade => {
        upgrade.completedRuns = killroy.completedRuns;
        upgrade.shadesOfKLevel = shadesOfK.level;
        upgrade.priorTalentPointDrops = killroy.priorTalentPointDrops;
    });
    killroy.shopOffers.forEach(offer => {
        offer.prepare(killroy.riftLevel, killroy.laterShopProgression, killroy.thirdBattleUnlocked, killroy.arcadePurchases);
    });
    killroy.savedWeek.update(players);
};
