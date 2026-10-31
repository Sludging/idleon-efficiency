import type { Account } from "./account";
import LavaRand from "./base/lavaRand";
import { CapacityConst, type Capacity } from "./capacity";
import { getCompanionActiveBonus, isCompanionLevelTwo, type Companion } from "./companions";
import { TypeGenEnum } from "./enum/typeGenEnum";
import { WeeklyShopSectionEnum } from "./enum/weeklyShopSectionEnum";
import type { GemStore } from "./gemPurchases";
import type { Guild } from "./guild";
import type { ImageData } from "./imageData";
import type { Player } from "./player";
import type { DeepReadonly, StaticRepositories } from "./repositories";
import type { RepositoryRecords } from "./repositories.generated";
import { SkillsIndex } from "./SkillsIndex";
import { BribeStatus, type Bribe } from "./world-1/bribes";
import type { Stamp } from "./world-1/stamps";
import type { Deathnote } from "./world-3/construction/deathnote";
import { ShrineConstants, type Shrine } from "./world-3/construction/shrines";
import type { Prayer } from "./world-3/prayers";
import type { HatRack, HatRackHat } from "./world-7/hatRack";

export interface WeeklyBossTurn {
    readonly playerIndex: number;
    readonly taskId: number;
}

export interface WeeklyBossWeek {
    readonly weekNumber: number;
    readonly startsAtSeconds: number;
    readonly endsAtSeconds: number;
    readonly bossId: number;
    readonly shopEntryIds: readonly number[];
    readonly turns: readonly WeeklyBossTurn[];
}


export interface WeeklyBossCharacterIdentity {
    readonly playerIndex: number;
    readonly playerName: string;
    readonly classImageData: ImageData;
}

export interface WeeklyBossPreparedCharacter extends WeeklyBossCharacterIdentity {
    readonly rawValue: number | undefined;
    readonly quantity: number | undefined;
    readonly power: number | undefined;
}

export interface WeeklyBossPreparationGroup {
    readonly taskId: number;
    readonly characters: readonly WeeklyBossPreparedCharacter[];
}

export interface WeeklyBossCapacityRecommendation extends WeeklyBossCharacterIdentity {
    readonly contextFactor: number;
}

export interface WeeklyBossPreparation {
    readonly week: WeeklyBossWeek;
    readonly groups: readonly WeeklyBossPreparationGroup[];
    readonly capacityRecommendation: WeeklyBossCapacityRecommendation | undefined;
}

interface WeeklyCapacityInputs {
    readonly bagCapacity: number | undefined;
    readonly extraBagsBonus: number;
    readonly materialStampBonus: number;
    readonly allCarryStampBonus: number;
    readonly starSignBonus: number;
    readonly allCapacityMultiplier: number;
}

export interface WeeklyBossShopProgress {
    readonly world2KillsLeft: number | undefined;
    readonly world3KillsLeft: number | undefined;
    readonly world4KillsLeft: number | undefined;
    readonly world5KillsLeft: number | undefined;
}

export interface WeeklyBossShopReward extends WeeklyBossCharacterIdentity {
    readonly itemId: string;
    readonly itemName: string;
    readonly quantity: number;
}

export class WeeklyBossShopCharacter implements WeeklyBossCharacterIdentity {
    readonly playerIndex: number;
    readonly playerName: string;
    readonly classImageData: ImageData;
    private readonly worldTier: number | undefined;

    constructor(
        identity: WeeklyBossCharacterIdentity,
        progress: WeeklyBossShopProgress,
    ) {
        this.playerIndex = identity.playerIndex;
        this.playerName = identity.playerName;
        this.classImageData = identity.classImageData;
        let worldTier: number | undefined = 1;
        const residuals = [
            progress.world2KillsLeft, progress.world3KillsLeft,
            progress.world4KillsLeft, progress.world5KillsLeft,
        ];
        for (let gateIndex = 0; gateIndex < residuals.length; gateIndex++) {
            const residual = residuals[gateIndex];
            if (residual === undefined) {
                worldTier = undefined;
            } else if (residual <= 0) {
                // A later cleared world gate replaces all earlier tier assignments.
                worldTier = gateIndex + 2;
            }
        }
        this.worldTier = worldTier;
    }

    getReward(itemFamily: string, seedSample: number): { readonly itemId: string; readonly quantity: number } | undefined {
        const worldTier = this.worldTier;
        if (worldTier === undefined) {
            return undefined;
        }
        if (itemFamily === "EquipmentStatues") {
            const subtype = Math.max(1, Math.min(25, Math.floor(seedSample / 1000 * (10 + 4 * worldTier))));
            return { itemId: `${itemFamily}${subtype}`, quantity: 1000 };
        }
        if (itemFamily === "FoodG") {
            const subtype = Math.max(1, Math.min(10, Math.floor(seedSample / 1000 * (3 + 2 * worldTier))));
            return { itemId: `${itemFamily}${subtype}`, quantity: 100 };
        }
        return undefined;
    }
}

const secondsPerWeek = 604800;
const emptyShopRewards: readonly WeeklyBossShopReward[] = [];
const skillTasks = new Map<number, SkillsIndex>([
    [0, SkillsIndex.Mining], [1, SkillsIndex.Fishing], [2, SkillsIndex.Chopping],
    [3, SkillsIndex.Worship], [4, SkillsIndex.Alchemy], [5, SkillsIndex.Catching],
    [6, SkillsIndex.Trapping], [7, SkillsIndex.Cooking], [8, SkillsIndex.Intellect],
    [9, SkillsIndex.Divinity], [24, SkillsIndex.Construction],
]);
const killTasks = new Map([[17, 53], [19, 1], [20, 116], [21, 205], [23, 158]]);

export class WeeklyBoss {
    defeatedDifficultiesThisWeek: number = 0;
    private classExperienceBonusPoints: number | undefined;
    private damageBonusPoints: number | undefined;
    private completedDreamChallengeIndexes = new Set<number>();
    trophies: number = 0;
    currentCharacterIndex: number = 0;
    savedBattleWeekNumber: number = 0;
    private savedGlobalTimeSeconds: number = 0;
    private ownedAppearanceIds = new Set<number>();
    private appearanceOwnershipKnown: boolean = false;
    private shopRewards = new Map<number, readonly WeeklyBossShopReward[]>();
    private shopHatDeposits = new Map<number, boolean>();
    private playerIndices: number[] = [];
    private playerIdentities: WeeklyBossCharacterIdentity[] = [];
    private shopCharacters: readonly WeeklyBossShopCharacter[] = [];
    private taskQuantities: Map<number, number>[] = [];
    private rawKillValues: Map<number, number>[] = [];
    private capacityInputs: WeeklyCapacityInputs[] = [];
    private capacityGemPurchases: number = 0;

    private repositories!: StaticRepositories;
    private bossCatalog!: DeepReadonly<RepositoryRecords<"WeeklyBoss">>;
    private taskCatalog!: DeepReadonly<RepositoryRecords<"WeeklyTask">>;
    private shopCatalog!: DeepReadonly<RepositoryRecords<"WeeklyShop">>;

    init(repositories: StaticRepositories): void {
        this.repositories = repositories;
        this.bossCatalog = repositories.get("WeeklyBoss");
        this.taskCatalog = repositories.get("WeeklyTask");
        this.shopCatalog = repositories.get("WeeklyShop");
    }

    get bosses() { return this.bossCatalog; }
    get tasks() { return this.taskCatalog; }
    get shopEntries() { return this.shopCatalog; }

    get currentWeekNumber(): number {
        return Math.floor(this.savedGlobalTimeSeconds / secondsPerWeek);
    }

    parse(
        optionList: readonly (string | number)[] | undefined,
        weeklyBossMap: Record<string, unknown> | undefined,
        globalTimeSeconds: number,
    ): void {
        weeklyBossMap ??= {};
        // Boss Battle Spillover uses the weekly defeated-difficulty high-water snapshot, not the current difficulty.
        this.defeatedDifficultiesThisWeek = Number(optionList?.[189] ?? 0);
        this.trophies = Number(optionList?.[188] ?? 0);
        this.currentCharacterIndex = Number(optionList?.[185] ?? 0);
        this.savedBattleWeekNumber = Number(optionList?.[191] ?? 0);
        this.savedGlobalTimeSeconds = globalTimeSeconds;
        this.playerIndices = [];
        this.playerIdentities = [];
        this.shopCharacters = [];
        this.taskQuantities = [];
        this.rawKillValues = [];
        this.capacityInputs = [];
        this.capacityGemPurchases = 0;
        this.ownedAppearanceIds = new Set();
        this.appearanceOwnershipKnown = Object.keys(weeklyBossMap).length > 0;
        this.shopRewards.clear();
        this.shopHatDeposits.clear();
        this.shopEntries.filter(entry => entry.data.section === WeeklyShopSectionEnum.UI)
            .forEach((entry, sectionIndex) => {
                const ownershipKey = `UI_${String.fromCharCode(97 + sectionIndex)}`;
                if (Number(weeklyBossMap[ownershipKey]) === 1) {
                    this.ownedAppearanceIds.add(entry.index);
                }
            });
        this.classExperienceBonusPoints = Object.prototype.hasOwnProperty.call(weeklyBossMap, "c")
            ? Number(weeklyBossMap.c)
            : undefined;
        this.damageBonusPoints = Object.prototype.hasOwnProperty.call(weeklyBossMap, "g")
            ? Number(weeklyBossMap.g)
            : undefined;
        this.completedDreamChallengeIndexes = new Set();
        for (const [key, value] of Object.entries(weeklyBossMap)) {
            const challengeIndex = /^d_(\d+)$/.exec(key);
            if (challengeIndex && Number(value) === -1) {
                this.completedDreamChallengeIndexes.add(Number(challengeIndex[1]));
            }
        }
    }

    getClassExperienceBonusPoints(): number | undefined {
        return this.classExperienceBonusPoints;
    }

    getDamageBonusPoints(): number | undefined {
        return this.damageBonusPoints;
    }

    isDreamChallengeCompleted(index: number): boolean {
        return this.completedDreamChallengeIndexes.has(index);
    }

    isUIOwned(shopEntryId: number): boolean | undefined {
        return this.appearanceOwnershipKnown ? this.ownedAppearanceIds.has(shopEntryId) : undefined;
    }

    getWeek(offset: number): WeeklyBossWeek {
        const weekNumber = this.currentWeekNumber + offset;
        const seedSample = Math.floor(1000 * new LavaRand(Math.round(weekNumber)).rand());
        const bossId = Math.max(0, Math.min(this.bosses.length - 1,
            Math.floor(seedSample / 1000 * this.bosses.length)));
        const bossTasks = this.bosses[bossId].data.possibleTasks.map(task =>
            this.tasks.find(candidate => candidate.data.icon === task.icon)!.index);
        const taskIds: number[] = [];
        for (let slot = 0; slot < 15; slot++) {
            const random = new LavaRand(Math.round(seedSample + 3 * slot)).rand();
            const taskIndex = Math.max(0, Math.min(bossTasks.length - 1, Math.floor(bossTasks.length * random)));
            taskIds.push(bossTasks[taskIndex]);
        }

        const appearances = this.shopEntries.filter(entry => entry.data.section === WeeklyShopSectionEnum.UI);
        const items = this.shopEntries.filter(entry => entry.data.section === WeeklyShopSectionEnum.Items);
        const selectIndex = (seed: number, count: number): number =>
            Math.max(0, Math.min(count - 1, Math.floor(new LavaRand(Math.round(seed)).rand() * count)));
        const appearanceIndices = [selectIndex(seedSample + 36, appearances.length), selectIndex(seedSample + 72, appearances.length)];
        let retryCounter = 0;
        while (appearanceIndices[0] === appearanceIndices[1]) {
            retryCounter++;
            appearanceIndices[1] = selectIndex(seedSample + retryCounter, appearances.length);
        }
        const itemIndices = [selectIndex(seedSample + 10, items.length), selectIndex(seedSample + 20, items.length)];
        // Item retries use their own counter, independent of appearance retries.
        retryCounter = 0;
        while (itemIndices[0] === itemIndices[1]) {
            retryCounter += 71;
            itemIndices[1] = selectIndex(seedSample + retryCounter, items.length);
        }
        const shopEntryIds = [
            appearances[appearanceIndices[0]].index, appearances[appearanceIndices[1]].index,
            items[itemIndices[0]].index, items[itemIndices[1]].index,
        ];

        const week: WeeklyBossWeek = {
            weekNumber,
            startsAtSeconds: weekNumber * secondsPerWeek,
            endsAtSeconds: (weekNumber + 1) * secondsPerWeek,
            bossId,
            shopEntryIds,
            turns: this.playerIndices.map(playerIndex => ({
                playerIndex,
                taskId: taskIds[playerIndex],
            })),
        };
        return week;
    }

    getTaskQuantity(playerIndex: number, taskId: number, capacityContextPlayerIndex: number): number | undefined {
        if (taskId !== 15) {
            return this.taskQuantities[playerIndex].get(taskId);
        }

        // Weekly material capacity uses the target character's bag and Extra Bags talent.
        // Shared capacity bonuses come from the selected character.
        // Unlike normal capacity, this calculation does not add base capacity.
        const target = this.capacityInputs[playerIndex];
        const context = this.capacityInputs[capacityContextPlayerIndex];
        if (target.bagCapacity === undefined) {
            return undefined;
        }
        return Math.floor(Math.min(2050000000,
            target.bagCapacity *
            (1 + context.materialStampBonus / 100) *
            (1 + 25 * this.capacityGemPurchases / 100) *
            (1 + (context.allCarryStampBonus + context.starSignBonus) / 100) *
            (1 + target.extraBagsBonus / 100) *
            context.allCapacityMultiplier));
    }

    getMaterialCapacityRecommendation(): WeeklyBossCapacityRecommendation | undefined {
        let recommendation: WeeklyBossCapacityRecommendation | undefined;
        for (const playerIndex of this.playerIndices) {
            const context = this.capacityInputs[playerIndex];
            const contextFactor = (1 + context.materialStampBonus / 100) *
                (1 + (context.allCarryStampBonus + context.starSignBonus) / 100) *
                context.allCapacityMultiplier;
            if (!recommendation || contextFactor > recommendation.contextFactor ||
                (contextFactor === recommendation.contextFactor && playerIndex < recommendation.playerIndex)) {
                const identity = this.playerIdentities[playerIndex];
                recommendation = {
                    playerIndex,
                    playerName: identity.playerName,
                    classImageData: identity.classImageData,
                    contextFactor,
                };
            }
        }
        return recommendation;
    }

    getPreparation(): WeeklyBossPreparation {
        const week = this.getWeek(0);
        const capacityRecommendation = week.turns.some(turn => turn.taskId === 15)
            ? this.getMaterialCapacityRecommendation()
            : undefined;
        const groups = new Map<number, WeeklyBossPreparedCharacter[]>();
        for (const turn of week.turns) {
            const quantity = this.getTaskQuantity(
                turn.playerIndex, turn.taskId, capacityRecommendation?.playerIndex ?? turn.playerIndex,
            );
            const characters = groups.get(turn.taskId) ?? [];
            const identity = this.playerIdentities[turn.playerIndex];
            characters.push({
                playerIndex: turn.playerIndex,
                playerName: identity.playerName,
                classImageData: identity.classImageData,
                rawValue: killTasks.has(turn.taskId)
                    ? this.rawKillValues[turn.playerIndex].get(turn.taskId)
                    : quantity,
                quantity,
                power: quantity === undefined ? undefined : this.getTaskPower(quantity, turn.taskId),
            });
            groups.set(turn.taskId, characters);
        }
        return {
            week,
            groups: Array.from(groups, ([taskId, characters]) => ({ taskId, characters })),
            capacityRecommendation,
        };
    }

    getTaskPower(quantity: number, taskId: number): number {
        return Math.max(0, quantity / Math.max(1, quantity + this.tasks[taskId].data.reqFor50));
    }

    getTaskPowerReferences(taskId: number): readonly { power: number; quantity: number }[] {
        const halfPowerQuantity = this.tasks[taskId].data.reqFor50;
        return [
            { power: 0.5, quantity: halfPowerQuantity },
            { power: 0.75, quantity: 3 * halfPowerQuantity },
            { power: 0.9, quantity: 9 * halfPowerQuantity },
        ];
    }

    getShopCharacters(): readonly WeeklyBossCharacterIdentity[] {
        return this.shopCharacters;
    }

    getShopRewards(entryId: number): readonly WeeklyBossShopReward[] {
        return this.shopRewards.get(entryId) ?? emptyShopRewards;
    }

    getShopHatDeposited(entryId: number): boolean | undefined {
        return this.shopHatDeposits.get(entryId);
    }

    updateShopRewards(
        characters: readonly WeeklyBossShopCharacter[],
        hats: readonly Pick<HatRackHat, "internalName" | "stored">[],
    ): void {
        this.shopCharacters = characters;
        this.shopRewards.clear();
        this.shopHatDeposits.clear();
        const items = this.repositories.get("Item");
        const seedSample = Math.floor(1000 * new LavaRand(Math.round(this.currentWeekNumber)).rand());
        for (const entry of this.shopEntries) {
            if (entry.data.section !== WeeklyShopSectionEnum.Items) {
                continue;
            }
            const itemFamily = entry.data.intName;
            if (itemFamily === "EquipmentStatues" || itemFamily === "FoodG") {
                const rewards: WeeklyBossShopReward[] = [];
                for (const character of characters) {
                    const reward = character.getReward(itemFamily, seedSample);
                    if (reward) {
                        const item = items.find(candidate => candidate.id === reward.itemId)!;
                        rewards.push({
                            playerIndex: character.playerIndex,
                            playerName: character.playerName,
                            classImageData: character.classImageData,
                            itemId: reward.itemId,
                            itemName: item.data.item.displayName,
                            quantity: reward.quantity,
                        });
                    }
                }
                this.shopRewards.set(entry.index, rewards);
            } else {
                const item = items.find(candidate => candidate.id === itemFamily);
                if (item?.data.item.typeGen === TypeGenEnum.aHelmetMTX) {
                    this.shopHatDeposits.set(entry.index,
                        hats.some(hat => hat.internalName === itemFamily && hat.stored));
                }
            }
        }
    }

    updateTaskInputs(data: Map<string, any>): void {
        const players = data.get("players") as Player[];
        const deathnote = data.get("deathnote") as Deathnote;
        const capacity = data.get("capacity") as Capacity;
        const guild = data.get("guild") as Guild;
        const shrines = data.get("shrines") as Shrine[];
        const prayers = data.get("prayers") as Prayer[];
        const bribes = data.get("bribes") as Bribe[];
        const stamps = (data.get("stamps") as Stamp[][]).flat();
        const gems = data.get("gems") as GemStore;
        const companions = data.get("companions") as Companion[];
        const maps = this.repositories.get("MapData");
        const killRequirements = Array.from(killTasks, ([taskId, mapId]) => ({
            taskId,
            mapId,
            portalRequirement: maps.find(candidate => candidate.data.map.id === mapId)!.data.portalRequirements[0],
        }));

        this.playerIndices = players.map(player => player.playerID);
        this.taskQuantities = [];
        this.playerIdentities = [];
        this.rawKillValues = [];
        this.capacityInputs = [];
        const materialStamp = stamps.find(stamp => stamp.raw_name === "StampB8")!;
        const allCarryStamp = stamps.find(stamp => stamp.raw_name === CapacityConst.AllCarryStamp)!;
        this.capacityGemPurchases = gems.purchases[58].pucrhased;
        const guildCarryBonus = guild.guildBonuses[2].getBonus();
        const bribeCarryBonus = bribes.find(bribe => bribe.name === "Bottomless Bags")!.status === BribeStatus.Purchased ? 5 : 0;
        const companionCarryBonus = getCompanionActiveBonus(companions, 18);
        const companionPrayerBonus = 30 * isCompanionLevelTwo(companions, 2);

        for (const player of players) {
            this.playerIdentities[player.playerID] = {
                playerIndex: player.playerID,
                playerName: player.playerName,
                classImageData: player.getClassImageData(),
            };
            const quantities = new Map<number, number>();
            const rawKills = new Map<number, number>();
            for (const [taskId, skill] of skillTasks) {
                const level = player.skills.get(skill)?.level;
                if (level !== undefined) {
                    quantities.set(taskId, level);
                }
            }
            quantities.set(18, player.level);
            for (const { taskId, mapId, portalRequirement } of killRequirements) {
                const killsLeft = deathnote.getKillsLeftToAdvance(player.playerID, mapId);
                if (killsLeft !== undefined) {
                    const totalKills = portalRequirement - killsLeft;
                    rawKills.set(taskId, totalKills);
                    quantities.set(taskId, Math.ceil(Math.log(Math.max(totalKills, 1)) / 2.30259));
                }
            }
            this.taskQuantities[player.playerID] = quantities;
            this.rawKillValues[player.playerID] = rawKills;

            const bag = capacity.players[player.playerID].bags.find(candidate => candidate.name === "bCraft");
            const telekineticStorageBonus = player.getTalentBonus(CapacityConst.TelekineticStorageSkillIndex);
            const shrineCarryBonus = shrines[ShrineConstants.CarryShrine].getBonus(player.currentMapId);
            const zergCurse = prayers[4].getCurseForPlayer(player);
            const rucksackBonus = prayers[12].getBonusForPlayer(player);
            this.capacityInputs[player.playerID] = {
                bagCapacity: bag?.capacity,
                extraBagsBonus: player.getTalentBonus(CapacityConst.ExtraBagsSkillIndex),
                materialStampBonus: materialStamp.getBonusForPlayer(player),
                allCarryStampBonus: allCarryStamp.getBonusForPlayer(player),
                starSignBonus: player.starSigns.reduce((sum, sign) => sum + sign.getBonus("Carry Cap"), 0),
                allCapacityMultiplier: (1 + (guildCarryBonus + telekineticStorageBonus) / 100) *
                    (1 + companionCarryBonus / 100) *
                    (1 + shrineCarryBonus / 100) *
                    Math.max(1 - zergCurse / 100, 0.4) *
                    (1 + (rucksackBonus + bribeCarryBonus + companionPrayerBonus) / 100),
            };
        }
    }

}

// Display-only projections require final task inputs, character progress, and parsed Hat Rack deposits.
export function updateWeeklyBoss(data: Map<string, any>): void {
    const account = data.get("account") as Account;
    account.weeklyBoss.updateTaskInputs(data);
    const players = data.get("players") as Player[];
    const deathnote = data.get("deathnote") as Deathnote;
    const hatRack = data.get("hatRack") as HatRack;
    const characters = players.map(player => new WeeklyBossShopCharacter({
        playerIndex: player.playerID,
        playerName: player.playerName,
        classImageData: player.getClassImageData(),
    }, {
        world2KillsLeft: deathnote.getKillsLeftToAdvance(player.playerID, 0),
        world3KillsLeft: deathnote.getKillsLeftToAdvance(player.playerID, 50),
        world4KillsLeft: deathnote.getKillsLeftToAdvance(player.playerID, 100),
        world5KillsLeft: deathnote.getKillsLeftToAdvance(player.playerID, 150),
    }));
    account.weeklyBoss.updateShopRewards(characters, hatRack.hats);
}
