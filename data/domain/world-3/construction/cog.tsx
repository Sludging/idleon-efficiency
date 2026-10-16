import { initCogMatrixRepo } from "../../data/CogMatrixRepo";
import { letterToNumber } from "../../../utility";
import type { Player } from "../../player";
import { getCogPlayerBuildSpeed } from "./playerBuildSpeed";
const COG_BOARD_WIDTH = 12;
const COG_BOARD_HEIGHT = 8;
const COG_BOARD_SLOT_COUNT = COG_BOARD_WIDTH * COG_BOARD_HEIGHT;

const SMALL_COG_INVENTORY_START = 228;
const SMALL_COG_INVENTORY_SLOT_COUNT = 24;

const cogMatrices = new Map(
    initCogMatrixRepo().map(matrix => [matrix.data.matrixIndex, matrix.data.offsets] as const),
);

export type CogSupportType = "adjacent" | "diagonal" | "left" | "right" | "up" | "down" | "corners" | "around" | "row" | "column" | "everything";
export type CogZaPart = "topLeft" | "topRight" | "bottomLeft" | "bottomRight";

const COG_SUPPORT_TYPES: Record<CogSupportType, true> = {
    adjacent: true, diagonal: true, left: true, right: true, up: true, down: true,
    corners: true, around: true, row: true, column: true, everything: true,
};

const isCogSupportType = (value: unknown): value is CogSupportType => {
    return typeof value === "string" && Object.prototype.hasOwnProperty.call(COG_SUPPORT_TYPES, value);
};


const getObject = (value: unknown): Record<string, unknown> => {
    return value !== null && typeof value === "object" ? value as Record<string, unknown> : {};
};

const getNumber = (value: unknown): number => {
    const parsed = Number(value);
    return Number.isNaN(parsed) ? 0 : parsed;
};

const getCogZaPart = (order: string): CogZaPart | undefined => {
    switch (order) {
        case "CogZA00": return "topLeft";
        case "CogZA01": return "topRight";
        case "CogZA02": return "bottomLeft";
        case "CogZA03": return "bottomRight";
        default: return undefined;
    }
};

class SmallCog {
    constructor(readonly level: number) {}

    static fromOrder(order: unknown): SmallCog | undefined {
        if (typeof order !== "string" || !order.includes("CogSm") || letterToNumber(order.charAt(5)) !== 1) {
            return undefined;
        }
        return new SmallCog(Math.round(getNumber(order.substring(6))));
    }

    getBuildSpeedBonus(): number {
        return Math.round(4 * (25 + 25 * Math.pow(this.level, 2)) * (1 + this.level / 5));
    }
}

export class Cog {
    buildRate: number = 0;
    savedBuildRate: number = 0;
    buildRateSupport: number = 0;
    buildRateSupportType: CogSupportType | undefined;
    buildRateSupportTarget: number = 0;
    position: number = 0;
    playerName: string | undefined;
    cogZaPart: CogZaPart | undefined;
    isEmpty: boolean = true;

    static fromSave(orderValue: unknown, cogMapValue: unknown): Cog {
        const cog = new Cog();
        const order = typeof orderValue === "string" ? orderValue : "Blank";
        const savedStats = getObject(cogMapValue);
        const supportType = savedStats.h;

        cog.isEmpty = order === "Blank";
        cog.playerName = order.indexOf("Player_") >= 0 ? order.substring(7) : undefined;
        cog.cogZaPart = getCogZaPart(order);
        cog.savedBuildRate = getNumber(savedStats.a);
        cog.buildRate = cog.savedBuildRate;
        cog.buildRateSupport = getNumber(savedStats.e);
        cog.buildRateSupportType = isCogSupportType(supportType) ? supportType : undefined;
        return cog;
    }
}

export class CogBoard {
    slots: Cog[] = [];
    private smallCogs: SmallCog[] = [];

    parse(cogMap: unknown, cogOrder: unknown): void {
        const savedMap = getObject(cogMap);
        const savedOrder = Array.isArray(cogOrder) ? cogOrder : [];
        this.slots = Array.from({ length: COG_BOARD_SLOT_COUNT }, (_, index) =>
            Cog.fromSave(savedOrder[index], savedMap[index]));
        this.smallCogs = Array.from({ length: SMALL_COG_INVENTORY_SLOT_COUNT }, (_, index) =>
            SmallCog.fromOrder(savedOrder[SMALL_COG_INVENTORY_START + index]))
            .filter((cog): cog is SmallCog => cog !== undefined);
    }

    getSmallCogBuildSpeedBonus(): number {
        return this.smallCogs.reduce((total, cog) => total + cog.getBuildSpeedBonus(), 0);
    }

    getBuildRateForContext(players: Player[], extraBuildSpeedMultiplier: number, calculationData: Map<string, any>, contextPlayer: Player): number {
        const board = new CogBoard();
        board.slots = this.slots.map(cog => Object.assign(new Cog(), cog));
        board.smallCogs = this.smallCogs.slice();
        return board.updateBuildRate(players, extraBuildSpeedMultiplier, calculationData, contextPlayer);
    }

    private updateBuildRate(players: Player[], extraBuildSpeedMultiplier: number, calculationData: Map<string, any>, contextPlayer: Player): number {
        this.slots.forEach((cog, index) => {
            if (cog.playerName !== undefined) {
                const player = players.find(candidate => candidate.playerName === cog.playerName);
                cog.buildRate = (player ? getCogPlayerBuildSpeed(player, contextPlayer, calculationData) : 1) * extraBuildSpeedMultiplier;
                cog.buildRateSupport = 0;
                cog.buildRateSupportType = undefined;
            } else {
                cog.buildRate = cog.savedBuildRate;
            }
            cog.buildRateSupportTarget = 0;
            cog.position = index;
        });

        this.applyCogZaBonuses();
        this.slots.forEach(source => this.applyBuildRateSupport(source));
        this.slots.forEach(cog => {
            cog.buildRate *= 1 + cog.buildRateSupportTarget / 100;
        });
        return this.slots.reduce((total, cog) => total + cog.buildRate, 0);
    }

    private applyCogZaBonuses(): void {
        this.slots.forEach(cog => {
            if (cog.cogZaPart !== undefined) {
                cog.buildRateSupport = 0;
                cog.buildRateSupportType = undefined;
            }
        });

        this.slots.forEach((cog, index) => {
            if (cog.cogZaPart !== "topLeft" || index % COG_BOARD_WIDTH >= COG_BOARD_WIDTH - 1
                || Math.floor(index / COG_BOARD_WIDTH) >= COG_BOARD_HEIGHT - 1) return;

            const topRight = this.slots[index + 1];
            const bottomLeft = this.slots[index + COG_BOARD_WIDTH];
            const bottomRight = this.slots[index + COG_BOARD_WIDTH + 1];
            if (topRight.cogZaPart !== "topRight" || bottomLeft.cogZaPart !== "bottomLeft"
                || bottomRight.cogZaPart !== "bottomRight") return;

            [cog, topRight, bottomLeft, bottomRight].forEach(part => {
                part.buildRateSupport = 1.25;
                part.buildRateSupportType = "everything";
            });
        });
    }

    private applyBuildRateSupport(source: Cog): void {
        const sourceIndex = source.position;
        const column = sourceIndex % COG_BOARD_WIDTH;
        const row = Math.floor(sourceIndex / COG_BOARD_WIDTH);
        const offsets = source.buildRateSupportType === undefined
            ? undefined
            : cogMatrices.get(this.getMatrixIndex(source.buildRateSupportType));

        if (source.buildRateSupportType === "row") {
            for (let targetColumn = 0; targetColumn < COG_BOARD_WIDTH; targetColumn++) {
                const targetIndex = row * COG_BOARD_WIDTH + targetColumn;
                if (targetIndex !== sourceIndex) this.addSupport(targetIndex, source.buildRateSupport);
            }
            return;
        }

        if (source.buildRateSupportType === "column") {
            for (let targetRow = 0; targetRow < COG_BOARD_HEIGHT; targetRow++) {
                const targetIndex = targetRow * COG_BOARD_WIDTH + column;
                if (targetIndex !== sourceIndex) this.addSupport(targetIndex, source.buildRateSupport);
            }
            return;
        }

        if (source.buildRateSupportType === "everything") {
            for (let targetIndex = 0; targetIndex < COG_BOARD_SLOT_COUNT; targetIndex++) {
                if (targetIndex !== sourceIndex) this.addSupport(targetIndex, source.buildRateSupport);
            }
            return;
        }

        offsets?.forEach(([offsetX, offsetY]) => {
            const targetColumn = column + offsetX;
            const targetRow = row + offsetY;
            if (targetColumn >= 0 && targetColumn < COG_BOARD_WIDTH && targetRow >= 0 && targetRow < COG_BOARD_HEIGHT) {
                const targetIndex = targetColumn + COG_BOARD_WIDTH * targetRow;
                this.addSupport(targetIndex, source.buildRateSupport);
            }
        });
    }

    private addSupport(targetIndex: number, value: number): void {
        this.slots[targetIndex].buildRateSupportTarget += value;
    }

    private getMatrixIndex(supportType: CogSupportType): number {
        switch (supportType) {
            case "adjacent": return 0;
            case "diagonal": return 1;
            case "left": return 2;
            case "right": return 3;
            case "up": return 4;
            case "down": return 5;
            case "corners": return 8;
            case "around": return 10;
            default: return -1;
        }
    }
}
export const getRoyalOutpostCogBuildSpeedMultiplier = (selectedOutpostIndex: number, builtOutpostCount: number): number => {
    if (selectedOutpostIndex !== 0) return 1;

    const additionalOutposts = Math.max(1, builtOutpostCount - 6);
    return 1 + (additionalOutposts / (40 + additionalOutposts)) * 10;
}
