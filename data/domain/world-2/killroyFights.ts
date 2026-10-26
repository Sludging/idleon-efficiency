import LavaRand from "../base/lavaRand";
import { initKillroyRoomPoolRepo } from "../data/KillroyRoomPoolRepo";
import { initMapDataRepo } from "../data/MapDataRepo";
import type { Player } from "../player";

export type KillroyFight = {
    slot: number;
    classCategory: 0 | 1 | 2 | 3;
    mapId: number;
    sceneKey: string;
    enemyId: string;
    bestKills: number;
};

type KillroyPortalProgress = {
    destinationWorld: number;
    killsRemaining: number | undefined;
    windWalkerTitansRequired: number | undefined;
    arcanePortalUnlocked: boolean;
};

type KillroySavedFightInputs = {
    weekNumber: number;
    serverSeedOffset: number;
    summoningPoolUnlocked: boolean;
    windWalkerTitanCount: number;
    windWalkerRequiresPortalKills: boolean;
    consumedFightSlots: readonly number[];
    thirdBattleUnlocked: boolean;
    bestKillsByEnemy: ReadonlyMap<string, number>;
};

const roomPools = new Map(initKillroyRoomPoolRepo().map(pool => [pool.data.poolId, pool.data.sceneKeys]));
const mapsByScene = new Map(initMapDataRepo().map(map => [map.data.map.intName, {
    mapId: map.data.map.id,
    enemyId: map.data.enemy,
}]));

function parseSavedNumber(value: unknown): number | undefined {
    if (typeof value !== "number" && (typeof value !== "string" || value.trim() === "")) {
        return undefined;
    }
    const number = Number(value);
    return Number.isFinite(number) ? number : undefined;
}

export class KillroyCharacterFights {
    worldProgression: number = 1;
    accessibleFightCount: number = 0;
    fights: KillroyFight[] = [];
    private portals: KillroyPortalProgress[] = [];
    private windWalkerBuffActive: boolean = false;
    private arcaneBuffActive: boolean = false;

    constructor(public readonly playerIndex: number, public readonly playerName: string) { }

    parse(portalKills: unknown[][], activeBuffs: unknown[][], arcanePortals: readonly unknown[]): void {
        this.worldProgression = 1;
        this.accessibleFightCount = 0;
        this.fights = [];
        const windWalkerTitanRequirements = [3, 8, 17, 25, 30];
        this.portals = [0, 50, 100, 150, 200, 250].map((portalId, index) => ({
            destinationWorld: index + 2,
            // An absent portal does not prove that the character cleared it.
            killsRemaining: parseSavedNumber(portalKills[portalId]?.[0]),
            windWalkerTitansRequired: windWalkerTitanRequirements[index],
            arcanePortalUnlocked: arcanePortals.includes(`${portalId}_0`),
        }));
        const windWalkerBuff = activeBuffs.find(buff => parseSavedNumber(buff[0]) === 420);
        const arcaneBuff = activeBuffs.find(buff => parseSavedNumber(buff[0]) === 585);
        this.windWalkerBuffActive = (parseSavedNumber(windWalkerBuff?.[1]) ?? 0) > 100;
        this.arcaneBuffActive = (parseSavedNumber(arcaneBuff?.[1]) ?? 0) > 100;
    }

    update(player: Player, inputs: KillroySavedFightInputs): void {
        this.worldProgression = 1;
        this.fights = [];

        // The game initializes each mode flag from its active talent bonus.
        // Wind Walker takes precedence when both saved buffs meet the mode requirements.
        const windWalkerMode = this.windWalkerBuffActive && player.getTalentBonus(420) >= 0.1;
        const arcaneMode = this.arcaneBuffActive && player.getTalentBonus(585) >= 0.1;
        for (const portal of this.portals) {
            let accessible: boolean;
            if (windWalkerMode) {
                accessible = portal.windWalkerTitansRequired !== undefined
                    && inputs.windWalkerTitanCount >= portal.windWalkerTitansRequired
                    && (!inputs.windWalkerRequiresPortalKills
                        || (portal.killsRemaining !== undefined && portal.killsRemaining < 1));
            } else if (arcaneMode) {
                // Special modes check only the first five world portals.
                accessible = portal.destinationWorld <= 6 && portal.arcanePortalUnlocked;
            } else {
                accessible = portal.killsRemaining !== undefined && portal.killsRemaining <= 0;
            }
            // The game checks each world independently, rather than stopping at the first locked portal.
            if (accessible) {
                this.worldProgression = portal.destinationWorld;
            }
        }

        this.accessibleFightCount = this.worldProgression >= 4 ? (inputs.thirdBattleUnlocked ? 3 : 2) : 1;
        const pool72Portal = this.portals.find(portal => portal.destinationWorld === 6)!;
        const pool72Unlocked = pool72Portal.killsRemaining !== undefined && pool72Portal.killsRemaining <= 0;
        for (let zeroBasedSlot = 0; zeroBasedSlot < this.accessibleFightCount; zeroBasedSlot++) {
            const slot = zeroBasedSlot + 1;
            if (inputs.consumedFightSlots.includes(slot)) {
                continue;
            }
            const seed = Math.round(inputs.weekNumber + 50 * zeroBasedSlot + inputs.serverSeedOffset);
            // Native class and map selection each reseed, then use the same first random value.
            const random = new LavaRand(seed).rand();
            const classCategory = Math.max(0, Math.min(3,
                Math.ceil(3 * random - Math.floor(zeroBasedSlot / 2)))) as KillroyFight["classCategory"];
            const roll = Math.floor(1000 * random);
            let poolId: number;
            if (roll < 300 || zeroBasedSlot === 0) {
                poolId = 68 + zeroBasedSlot;
            } else if (roll < 400 && pool72Unlocked) {
                poolId = 72;
            } else if (roll < 500 && inputs.summoningPoolUnlocked) {
                poolId = 99;
            } else {
                poolId = 69 + zeroBasedSlot;
            }
            const pool = roomPools.get(poolId)!;
            const sceneKey = pool[roll % pool.length];
            const map = mapsByScene.get(sceneKey)!;
            this.fights.push({
                slot,
                classCategory,
                mapId: map.mapId,
                sceneKey,
                enemyId: map.enemyId,
                bestKills: inputs.bestKillsByEnemy.get(map.enemyId) ?? 0,
            });
        }
    }
}

export class KillroySavedWeek {
    readonly source = "saved-week";
    startTimestamp: number | undefined;
    endTimestamp: number | undefined;
    characters: KillroyCharacterFights[] = [];
    accountProjection: KillroyCharacterFights | undefined;
    private parsedCharacters: KillroyCharacterFights[] = [];
    private fightInputs: KillroySavedFightInputs | undefined;

    parse(data: Map<string, unknown>, consumedFightSlots: number[], thirdBattleUnlocked: boolean,
        bestRecords: readonly { enemyId: string; bestKills: number }[]): void {
        this.startTimestamp = undefined;
        this.endTimestamp = undefined;
        this.characters = [];
        this.parsedCharacters = [];
        this.accountProjection = undefined;
        this.fightInputs = undefined;

        const savedTime = data.get("TimeAway") as Record<string, unknown>;
        const accountOptions = data.get("OptLacc") as unknown[];
        const serverVariables = data.get("servervars") as Record<string, unknown>;
        const globalTime = parseSavedNumber(savedTime?.GlobalTime);
        const shopRestock = parseSavedNumber(savedTime?.ShopRestock);
        const weekResetCounter = parseSavedNumber(accountOptions?.[39]);
        if (globalTime === undefined || shopRestock === undefined || weekResetCounter === undefined) {
            return;
        }

        // Timestamps are Unix seconds. Never advance the saved clock without processing its weekly reset.
        this.endTimestamp = globalTime + Math.round(shopRestock + 86400 * weekResetCounter);
        this.startTimestamp = this.endTimestamp - 604800;
        const serverSeedOffset = parseSavedNumber(serverVariables?.KillroySwap);
        if (serverSeedOffset === undefined) {
            return;
        }

        const summoning = data.get("Summon") as unknown[][];
        const compass = data.get("Compass") as unknown[][];
        const tesseract = data.get("Tess") as unknown[][];
        const summoningProgress = parseSavedNumber(summoning?.[3]?.[2]);
        this.fightInputs = {
            weekNumber: Math.floor(this.endTimestamp / 604800),
            serverSeedOffset,
            summoningPoolUnlocked: summoningProgress !== undefined && summoningProgress >= 4,
            windWalkerTitanCount: (compass?.[1] ?? []).filter(status => status === 1).length,
            windWalkerRequiresPortalKills: parseSavedNumber(accountOptions?.[387]) === 1,
            consumedFightSlots: [...consumedFightSlots],
            thirdBattleUnlocked,
            bestKillsByEnemy: new Map(bestRecords.map(record => [record.enemyId, record.bestKills])),
        };
        const playerNames = data.get("playerNames") as string[];
        const characterCount = data.get("charCount") as number;
        this.parsedCharacters = Array.from({ length: characterCount }, (_, playerIndex) => {
            const character = new KillroyCharacterFights(playerIndex, playerNames[playerIndex]);
            character.parse(
                (data.get(`KLA_${playerIndex}`) ?? []) as unknown[][],
                (data.get(`BuffsActive_${playerIndex}`) ?? []) as unknown[][],
                tesseract?.[0] ?? [],
            );
            return character;
        });
    }

    update(players: Player[]): void {
        this.characters = [];
        this.accountProjection = undefined;
        if (this.fightInputs === undefined) {
            return;
        }
        const playersByIndex = new Map(players.map(player => [player.playerID, player]));
        // The prepared character with the lowest character index supplies the account's default fight list.
        for (const character of this.parsedCharacters) {
            const player = playersByIndex.get(character.playerIndex);
            if (player !== undefined) {
                character.update(player, this.fightInputs);
                this.characters.push(character);
            }
        }
        this.accountProjection = this.characters[0];
    }
}
