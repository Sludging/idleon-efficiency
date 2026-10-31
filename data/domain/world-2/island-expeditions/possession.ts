import type { Item } from "../../items";
import type { Player } from "../../player";
import type { Storage } from "../../storage";
import { StaticRepositories } from "../../repositories";
import type { Talent } from "../../talents";
import type { Stamp } from "../../world-1/stamps";
import type { Slab } from "../../world-5/slab";

export interface IslandPossessionInputs {
    readonly storage: Readonly<Storage>;
    readonly players: readonly Player[];
    readonly stamps: readonly (readonly Stamp[])[];
    readonly slab: Readonly<Slab>;
}

export interface IslandPhysicalReward {
    readonly itemId: string;
    readonly bookPayload?: number;
}

export interface IslandBookReward {
    readonly talentId: 649 | 650;
    readonly maxLevel: number;
}

export interface IslandCharacterEvidence {
    readonly playerID: number;
    readonly playerName: string;
}

export type IslandItemLocation = Readonly<{
    kind: "chest";
    slot: number;
}> | Readonly<{
    kind: "inventory";
    slot: number;
    character: IslandCharacterEvidence;
}>;

export interface IslandHeldEvidence {
    readonly location: IslandItemLocation;
    readonly count: number;
    readonly bookMaxLevel?: number;
}

export interface IslandUnresolvedSlot {
    readonly location: IslandItemLocation;
    readonly count: number | undefined;
    readonly reason: "book-identity-unavailable" | "quantity-unavailable";
}

export interface IslandLearnedEvidence extends IslandCharacterEvidence {
    readonly bookMaxLevel: number;
}

export interface IslandDepositedEvidence {
    readonly level: number;
    readonly maxLevel: number;
}

export type IslandPossessionLimitation =
    | "source-presence-unavailable"
    | "purchase-history-unavailable"
    | "chest-book-metadata-unavailable"
    | "inventory-book-metadata-unavailable"
    | "quantity-unavailable"
    | "inventory-character-unavailable"
    | "unsupported-book-payload";

export interface IslandRewardPossession {
    readonly itemId: string;
    readonly book: (IslandBookReward & {
        readonly talentName: string;
        readonly talent: Readonly<Talent> | undefined;
    }) | undefined;
    readonly held: readonly IslandHeldEvidence[];
    readonly unresolvedSlots: readonly IslandUnresolvedSlot[];
    readonly deposited: IslandDepositedEvidence | undefined;
    readonly learnedBy: readonly IslandLearnedEvidence[];
    readonly equippedBy: readonly IslandCharacterEvidence[];
    readonly slabRegistered: true | undefined;
    readonly limitations: readonly IslandPossessionLimitation[];
}

const islandBookTalentByOrder: Readonly<Record<number, 649 | 650 | undefined>> = {
    649: 649,
    650: 650,
};

const repositories = new StaticRepositories();

export function getIslandBookReward(bookPayload: number): IslandBookReward | undefined {
    // The first digit gives the talent identifier length. The following digits identify the talent.
    // The remaining digits give the maximum talent level.
    // Supported island books map directly to talent identifiers.
    const payload = String(bookPayload);
    const orderDigits = Number(payload[0]);
    const talentOrder = Number(payload.substring(1, orderDigits + 1));
    const maxLevel = Number(payload.substring(orderDigits + 1));
    const talentId = islandBookTalentByOrder[talentOrder];
    if (talentId === undefined || !Number.isInteger(maxLevel) || maxLevel <= 0) {
        return undefined;
    }

    return { talentId, maxLevel };
}

export function createEmptyIslandRewardPossession(reward: IslandPhysicalReward) {
    const book = reward.bookPayload === undefined ? undefined : getIslandBookReward(reward.bookPayload);
    const held: IslandHeldEvidence[] = [];
    const unresolvedSlots: IslandUnresolvedSlot[] = [];
    const learnedBy: IslandLearnedEvidence[] = [];
    const equippedBy: IslandCharacterEvidence[] = [];
    const limitations: IslandPossessionLimitation[] = [
        "source-presence-unavailable",
        "purchase-history-unavailable",
    ];
    if (reward.itemId === "TalentBook1" && book === undefined) {
        limitations.push("unsupported-book-payload");
    }

    return {
        itemId: reward.itemId,
        book: book === undefined ? undefined : {
            ...book,
            talentName: repositories.get("TalentName").find(entry => entry.data.id === book.talentId)!.data.name,
            talent: undefined,
        },
        held,
        unresolvedSlots,
        deposited: undefined,
        learnedBy,
        equippedBy,
        slabRegistered: undefined,
        limitations,
    };
}

/** Reports positive evidence only. Parsed defaults do not preserve missing save sources. */
export function getIslandRewardPossession(
    inputs: IslandPossessionInputs,
    reward: IslandPhysicalReward,
): IslandRewardPossession {
    const emptyPossession = createEmptyIslandRewardPossession(reward);
    const book = emptyPossession.book;
    const { held, unresolvedSlots, learnedBy, equippedBy } = emptyPossession;
    const limitations = new Set(emptyPossession.limitations);
    const isBook = reward.itemId === "TalentBook1";
    let talent: Readonly<Talent> | undefined;
    let deposited: IslandDepositedEvidence | undefined;

    const inspectSlot = (item: Item, location: IslandItemLocation): void => {
        if (item.internalName !== reward.itemId) {
            return;
        }
        if (!Number.isFinite(item.count)) {
            unresolvedSlots.push({ location, count: undefined, reason: "quantity-unavailable" });
            limitations.add("quantity-unavailable");
            return;
        }
        if (item.count <= 0) {
            return;
        }
        if (!isBook) {
            held.push({ location, count: item.count });
            return;
        }

        // Chest parsing drops book payload metadata. Inventory stores it in ItemStat.stone.
        const talentId = location.kind === "inventory"
            ? item.itemStats.find(stat => stat.stoneName === "Speed")?.stone
            : undefined;
        if (!Number.isInteger(talentId) || talentId === undefined || talentId <= 0 || book === undefined) {
            unresolvedSlots.push({ location, count: item.count, reason: "book-identity-unavailable" });
            limitations.add(location.kind === "chest"
                ? "chest-book-metadata-unavailable"
                : "inventory-book-metadata-unavailable");
            return;
        }
        if (talentId === book.talentId) {
            const bookMaxLevel = item.itemStats.find(stat => stat.stoneName === "Reach")?.stone;
            held.push({
                location,
                count: item.count,
                bookMaxLevel: bookMaxLevel !== undefined && bookMaxLevel > 0 ? bookMaxLevel : undefined,
            });
        }
    };

    inputs.storage.chest.forEach((item, slot) => inspectSlot(item, { kind: "chest", slot }));
    inputs.storage.playerStorage.forEach((inventory, playerID) => {
        const player = inputs.players.find(player => player.playerID === playerID);
        if (!player) {
            limitations.add("inventory-character-unavailable");
            return;
        }
        const character = { playerID: player.playerID, playerName: player.playerName };
        inventory.forEach((item, slot) => inspectSlot(item, { kind: "inventory", slot, character }));
    });

    for (const player of inputs.players) {
        const character = { playerID: player.playerID, playerName: player.playerName };
        if (!isBook && player.gear.equipment.some(item => item?.internalName === reward.itemId)) {
            equippedBy.push(character);
        }
        if (book !== undefined) {
            const playerTalent = player.getTalent(book.talentId);
            talent ??= playerTalent;
            // bookMaxLevel preserves the raw learned cap. maxLevel can include account bonuses.
            if (playerTalent !== undefined && playerTalent.bookMaxLevel > 0) {
                learnedBy.push({ ...character, bookMaxLevel: playerTalent.bookMaxLevel });
            }
        }
    }

    for (const tab of inputs.stamps) {
        const stamp = tab.find(stamp => stamp.raw_name === reward.itemId);
        if (stamp !== undefined && (stamp.level > 0 || stamp.maxLevel > 0)) {
            deposited = { level: stamp.level, maxLevel: stamp.maxLevel };
            break;
        }
    }

    // Generic book Slab registration cannot prove registration of a particular talent book.
    const slabRegistered = !isBook && inputs.slab.obtainableItems.some(
        item => item.internalName === reward.itemId && item.obtained,
    ) ? true : undefined;

    return {
        ...emptyPossession,
        book: book === undefined ? undefined : {
            ...book,
            talent,
        },
        held,
        unresolvedSlots,
        deposited,
        learnedBy,
        equippedBy,
        slabRegistered,
        limitations: [...limitations],
    };
}
