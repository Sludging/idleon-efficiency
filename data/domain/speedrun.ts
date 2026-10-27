import { Domain, RawData } from './base/domain';
import { initCardRepo } from './data/CardRepo';
import { initDreamChallengeRepo } from './data/DreamChallengeRepo';
import { initMapMetadataRepo } from './data/MapMetadataRepo';
import { initMapPortalsRepo } from './data/MapPortalsRepo';
import { EnemyData, EnemyInfo } from './enemies';
import { AFKTypeEnum } from './enum/aFKTypeEnum';
import type { ImageData } from './imageData';
import { MapInfo } from './maps';
import type { Item } from './items';
import type { Player } from './player';
import { ClassIndex, Talent, TalentLevelInputs } from './talents';
import { getSpeedrunPortalEstimate, SpeedrunComparison } from './speedrun-comparison';
import type { Deathnote } from './world-3/construction/deathnote';
import type { Equinox } from './world-3/equinox';

export type SpeedrunCombatEstimate = Readonly<{
    reachable: boolean;
    maximumDamage: number;
    multikillTiers: number;
    multikillPercent: number;
    killPerKill: number;
    portalProgressPerKill: number;
    killsNeeded: number | undefined;
}>;

export type SpeedrunPortalComparison = Readonly<{
    mapId: number;
    portalIndex: number;
    world: number;
    enemyId: string;
    requiredKills: number;
    requiredCharacters?: number;
    clearedCharacters: number;
    locked: boolean;
    normal: SpeedrunCombatEstimate;
    radius: SpeedrunCombatEstimate;
}>;

const portalMaps = initMapPortalsRepo();
const comparisonMaps = portalMaps.filter(map => map.data.id % 50 !== 0
    && map.data.afkType === AFKTypeEnum.Fighting && map.data.maxOnScreen > 0
    && map.data.portalRequirements.some(requirement => requirement > 0)
    && !/^(fillername|Unused|Filler|JungleZ|Tutorial[A-Z]|Z|Nothing|test.*)$/i.test(MapInfo[map.data.id].data.map.name));
const characterRequirements = initMapMetadataRepo()[0].data.multiCharacterPortalRequirements;
const enemiesById = new Map(EnemyInfo.map(enemy => [enemy.id, enemy]));
const bossEnemyPrefixes = ['wolf', 'Boss2', 'Boss3', 'Boss4', 'Boss5', 'Boss6'];
const cards = initCardRepo();
const bossImages: readonly ImageData[] = bossEnemyPrefixes.map(prefix => ({
    location: `2Cards${cards.find(card => card.id === `${prefix}A`)!.data.cardID}`,
    width: 56,
    height: 72,
}));

export type SavedSpeedrunBuff = Readonly<{
    remainingSeconds: number;
    durationSeconds: number;
}>;

export type SpeedrunBossAward = Readonly<{
    portalCount: number;
    respawnCounterIncrease: number;
    respawnSpeedBonusPercent: number;
    respawnTimeDivisor: number;
}>;

export type SpeedrunBossContext = Readonly<{
    trialActive: boolean;
    alreadyAwarded: boolean;
}>;

export class SpeedrunBoss {
    constructor(
        public readonly index: number,
        public readonly selectedEnemy: EnemyData,
        public readonly selectedDifficulty: number,
        public readonly awardDifficulty: number,
    ) {}

    get enemyId(): string {
        return this.selectedEnemy.id;
    }

    getImageData(): ImageData {
        return bossImages[this.index];
    }

    getAward(
        runner: SpeedrunRunner,
        context: SpeedrunBossContext,
        awardDifficulty: number = this.awardDifficulty,
    ): SpeedrunBossAward {
        const awardsPortals = runner.eligible && context.trialActive
            && runner.bossingVainRespawnBonusPerPortal > 0 && !context.alreadyAwarded;
        const portalCount = awardsPortals ? Math.round(awardDifficulty + 1) : 0;
        const respawnSpeedBonusPercent = runner.bossingVainRespawnBonusPerPortal * portalCount;
        return {
            portalCount,
            respawnCounterIncrease: portalCount,
            respawnSpeedBonusPercent,
            respawnTimeDivisor: Math.max(1, 1 + respawnSpeedBonusPercent / 100),
        };
    }
}

export class SpeedrunRunner {
    readonly eligible: boolean;
    readonly trialTalentAvailable: boolean;
    readonly voidRadiusTalentAvailable: boolean;
    readonly durationSeconds: number;
    readonly talentPointsPerPortal: number;
    readonly talentPointEntitlement: number;
    readonly voidRadiusRangePixels: number;
    readonly voidRadiusMultikillPerTierBonus: number;
    readonly voidRadiusDurationSeconds = 20;
    readonly bossingVainRespawnBonusPerPortal: number;
    readonly radiusAvailable: boolean;
    portalComparisons: readonly SpeedrunPortalComparison[] = [];

    constructor(
        player: Player,
        highscore: number,
        public readonly accountMultikillPerTierBonus: number,
        public readonly savedTrialBuff: SavedSpeedrunBuff | undefined,
        public readonly savedRadiusBuff: SavedSpeedrunBuff | undefined,
    ) {
        this.playerID = player.playerID;
        this.classId = player.classId;
        this.eligible = Speedrun.isEligibleClass(player.classId);
        this.trialTalentAvailable = (player.getTalent(45)?.pointsSpent ?? 0) > 0;
        this.voidRadiusTalentAvailable = (player.getTalent(46)?.pointsSpent ?? 0) > 0;
        this.radiusAvailable = this.trialTalentAvailable && this.voidRadiusTalentAvailable;
        this.durationSeconds = this.trialTalentAvailable
            ? Math.round(1 + player.getTalentBonusAtInputs(45, player.finalTalentInputs)) : 0;
        this.talentPointsPerPortal = player.getTalentBonusAtInputs(45, player.finalTalentInputs, true);
        this.talentPointEntitlement = this.talentPointsPerPortal * highscore;
        this.voidRadiusRangePixels = player.getTalentBonusAtInputs(46, player.finalTalentInputs);
        this.voidRadiusMultikillPerTierBonus = player.getTalentBonusAtInputs(46, player.finalTalentInputs, true);
        this.bossingVainRespawnBonusPerPortal = player.getTalentBonusAtInputs(47, player.finalTalentInputs, true);
    }

    readonly playerID: number;
    readonly classId: ClassIndex;

    get savedTrialBuffPresent(): boolean {
        return this.savedTrialBuff !== undefined;
    }

    get savedRadiusBuffPresent(): boolean {
        return this.savedRadiusBuff !== undefined;
    }

    get savedRadiusMultikillActive(): boolean {
        return this.eligible && this.savedTrialBuffPresent && this.savedRadiusBuffPresent;
    }

    getRespawnTimeDivisor(awardedBossPortalCount: number, trialActive: boolean): number {
        if (!this.eligible || !trialActive || this.bossingVainRespawnBonusPerPortal <= 0) {
            return 1;
        }
        return Math.max(1, 1 + this.bossingVainRespawnBonusPerPortal * awardedBossPortalCount / 100);
    }

    prepareComparisons(data: Map<string, any>, player: Player, players: readonly Player[], deathnote: Deathnote): void {
        const comparison = new SpeedrunComparison(data, player, this.accountMultikillPerTierBonus);
        const radiusBonus = this.radiusAvailable ? this.voidRadiusMultikillPerTierBonus : 0;
        const rows: SpeedrunPortalComparison[] = [];
        for (const map of comparisonMaps) {
            const enemy = enemiesById.get(map.data.afkTarget)!;
            const normal = comparison.getForTarget(map.data, enemy, 0);
            // Normal excludes Void Radius. The Radius comparison includes one copy of its bonus.
            const radius = radiusBonus === 0
                ? normal : comparison.getWithRadius(map.data, enemy, normal, radiusBonus);
            const threshold = characterRequirements[map.data.id];
            let clearedCharacters = 1;
            for (const other of players) {
                if (other.playerID === this.playerID) {
                    continue;
                }
                const remainingKills = deathnote.getKillsLeftToAdvance(other.playerID, map.data.id);
                if (remainingKills !== undefined && remainingKills <= 0) {
                    clearedCharacters++;
                }
            }
            map.data.portalRequirements.forEach((requiredKills, portalIndex) => {
                if (requiredKills <= 0) {
                    return;
                }
                const requiredCharacters = portalIndex === 0 ? threshold : undefined;
                rows.push({
                    mapId: map.data.id,
                    portalIndex,
                    world: Math.floor(map.data.id / 50) + 1,
                    enemyId: enemy.id,
                    requiredKills,
                    requiredCharacters,
                    clearedCharacters,
                    locked: requiredCharacters !== undefined && Math.round(requiredCharacters - clearedCharacters) > 0,
                    normal: getSpeedrunPortalEstimate(normal, requiredKills),
                    radius: getSpeedrunPortalEstimate(radius, requiredKills),
                });
            });
        }
        this.portalComparisons = rows;
    }
}

export class Speedrun extends Domain {
    highscore = 0;
    accountMultikillPerTierBonus = 0;
    equinoxGoal = initDreamChallengeRepo().find(challenge => challenge.index === 32)!.data.req;
    equinoxChallengeProgress = 0;
    equinoxChallengeComplete = false;
    runners: SpeedrunRunner[] = [];
    bosses: SpeedrunBoss[] = [];
    private savedBuffs = new Map<number, Map<number, SavedSpeedrunBuff>>();

    static isEligibleClass(classId: ClassIndex): boolean {
        return classId === ClassIndex.Voidwalker || classId === ClassIndex.Infinilyte;
    }

    get completedPortalSteps(): number {
        return Math.floor(this.highscore / 5);
    }

    get portalsToNextStep(): number {
        return 5 - this.highscore % 5;
    }

    get portalsToEquinoxGoal(): number {
        return Math.max(0, this.equinoxGoal - this.highscore);
    }

    get equinoxGoalReached(): boolean {
        return this.highscore >= this.equinoxGoal;
    }

    getTalentPointEntitlement(player: Player, inputs: Readonly<TalentLevelInputs>): number {
        return Speedrun.isEligibleClass(player.classId)
            ? player.getTalentBonusAtInputs(45, inputs, true) * this.highscore : 0;
    }

    updateAccountBonus(players: readonly Player[]): void {
        // Family talent58 uses saved allocations. Its curve does not add shared or Super Talent levels.
        this.accountMultikillPerTierBonus = players.length === 0 ? 0
            : Talent.getAccountTalentBonus(players, 58, players[0].currentTalentInputs) * this.completedPortalSteps;
    }

    getRawKeys(): RawData[] {
        return [
            { key: 'OptLacc', perPlayer: false, default: [] },
            { key: 'WeeklyBoss', perPlayer: false, default: {} },
            { key: 'BossInfo', perPlayer: false, default: [] },
            { key: 'BuffsActive_', perPlayer: true, default: [] },
        ];
    }

    init(_allItems: Item[], _charCount: number) {
        return this;
    }

    parse(data: Map<string, any>): void {
        const speedrun = data.get(this.getDataKey()) as Speedrun;
        const options = data.get('OptLacc') as number[];
        const challenges = data.get('WeeklyBoss') as Record<string, number>;
        const bossInfo = data.get('BossInfo') as Record<number, Record<number, number>>;
        const charCount = data.get('charCount') as number;
        speedrun.highscore = Number(options[158] ?? 0);
        const savedChallengeProgress = Number(challenges.d_32 ?? 0);
        speedrun.equinoxChallengeProgress = savedChallengeProgress === -1
            ? speedrun.equinoxGoal : savedChallengeProgress;
        speedrun.equinoxChallengeComplete = false;
        speedrun.accountMultikillPerTierBonus = 0;
        speedrun.runners = [];
        speedrun.savedBuffs = new Map();
        for (let playerID = 0; playerID < charCount; playerID++) {
            const buffs = data.get(`BuffsActive_${playerID}`) as Record<number, number>[];
            const trialBuffs = new Map<number, SavedSpeedrunBuff>();
            for (const buff of Object.values(buffs)) {
                const talentId = Number(buff[0]);
                if (talentId === 45 || talentId === 46) {
                    trialBuffs.set(talentId, {
                        remainingSeconds: Number(buff[1]),
                        durationSeconds: Number(buff[2]),
                    });
                }
            }
            speedrun.savedBuffs.set(playerID, trialBuffs);
        }
        speedrun.bosses = bossEnemyPrefixes.map((enemyPrefix, index) => new SpeedrunBoss(
            index,
            EnemyInfo.find(enemy => enemy.id === `${enemyPrefix}${'ABC'[Number(bossInfo[index]?.[0] ?? 0)]}`)!,
            Number(bossInfo[index]?.[0] ?? 0),
            // The native Emperor handler uses Kattlekruk's selected difficulty.
            Number(bossInfo[index === 5 ? 4 : index]?.[0] ?? 0),
        ));
    }

    update(players: readonly Player[], equinox: Equinox, data: Map<string, any>): void {
        const challenge = equinox.challenges.find(candidate => candidate.index === 32)!;
        this.equinoxGoal = challenge.data.req;
        this.equinoxChallengeComplete = challenge.complete;
        this.runners = players.filter(player => Speedrun.isEligibleClass(player.classId)).map(player => {
            const buffs = this.savedBuffs.get(player.playerID)!;
            const runner = new SpeedrunRunner(player, this.highscore, this.accountMultikillPerTierBonus, buffs.get(45), buffs.get(46));
            runner.prepareComparisons(data, player, players, data.get('deathnote') as Deathnote);
            return runner;
        });
    }
}

export const updateSpeedrunBonuses = (data: Map<string, any>): Speedrun => {
    const speedrun = data.get('speedrun') as Speedrun;
    speedrun.updateAccountBonus(data.get('players') as Player[]);
    return speedrun;
};

export const updateSpeedrun = (data: Map<string, any>): Speedrun => {
    const speedrun = data.get('speedrun') as Speedrun;
    speedrun.update(data.get('players') as Player[], data.get('equinox') as Equinox, data);
    return speedrun;
};
