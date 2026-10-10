import type { ImageData } from "../../imageData";
import { royalArmoryAsNumber } from "./resourceNodes";

export enum RoyalUnitRole {
    Worker = 0,
    Trader = 1,
    Guard = 2,
    Surveyor = 3,
    Militia = 4,
    Commander = 5,
    Knight = 6,
    Priest = 7,
}

export type StationaryRoyalUnitRole = RoyalUnitRole.Worker | RoyalUnitRole.Trader
    | RoyalUnitRole.Guard | RoyalUnitRole.Surveyor;

export class RoyalUnitRoleDefinition {
    effect = 0;

    constructor(
        readonly role: RoyalUnitRole,
        readonly name: string,
        readonly effectMeaning: string,
        readonly effectUnit: "percent" | "pixels" | "monsters/hour",
        private readonly upgradeId: number,
        private readonly baseEffect: number = 0,
    ) {}

    getImageData(): ImageData {
        const stationary = this.role <= RoyalUnitRole.Surveyor;
        return {
            location: `RoyalArmory${this.name}`,
            width: stationary ? 29 : 16,
            height: stationary ? 32 : 17,
        };
    }

    prepareEffect(upgradeBonus: (upgradeId: number) => number): void {
        // Militia needs the late account kill bonus, unlike the other role effects.
        if (this.role !== RoyalUnitRole.Militia) this.effect = this.baseEffect + upgradeBonus(this.upgradeId);
    }

    prepareMilitiaEffect(upgradeBonus23: number, extraClearKills: number): void {
        if (this.role === RoyalUnitRole.Militia) {
            this.effect = 4000 * (1 + upgradeBonus23 / 100) * extraClearKills;
        }
    }
}

export type RoyalMovableUnit = Readonly<{
    world: number;
    rosterIndex: number;
    role: RoyalUnitRole.Militia | RoyalUnitRole.Commander | RoyalUnitRole.Knight | RoyalUnitRole.Priest;
    stationedMapId: number;
}>;

export class RoyalUnits {
    readonly roles: readonly RoyalUnitRoleDefinition[] = [
        new RoyalUnitRoleDefinition(RoyalUnitRole.Worker, "Worker", "Resource collection bonus", "percent", 19, 50),
        new RoyalUnitRoleDefinition(RoyalUnitRole.Trader, "Trader", "Trading rank experience bonus", "percent", 20),
        new RoyalUnitRoleDefinition(RoyalUnitRole.Guard, "Guard", "Connection range", "pixels", 21, 25),
        new RoyalUnitRoleDefinition(RoyalUnitRole.Surveyor, "Surveyor", "Intel rank experience bonus", "percent", 22),
        new RoyalUnitRoleDefinition(RoyalUnitRole.Militia, "Militia", "Map clearing", "monsters/hour", 23),
        new RoyalUnitRoleDefinition(RoyalUnitRole.Commander, "Commander", "Command rank experience bonus", "percent", 24),
        new RoyalUnitRoleDefinition(RoyalUnitRole.Knight, "Knight", "Military rank experience bonus", "percent", 25),
        new RoyalUnitRoleDefinition(RoyalUnitRole.Priest, "Priest", "Purity rank experience bonus", "percent", 26),
    ];
    roster: readonly RoyalMovableUnit[] = [];

    getRole(role: RoyalUnitRole): RoyalUnitRoleDefinition {
        return this.roles[role];
    }

    reset(): void {
        this.roster = [];
        for (const definition of this.roles) definition.effect = 0;
    }

    parse(royalG: readonly (readonly unknown[])[]): void {
        this.reset();
        const roster: RoyalMovableUnit[] = [];
        // Each world saves matching role and location arrays; their indices identify the units.
        for (let world = 0; world < 8; world++) {
            const roles = royalG[6 + 2 * world] ?? [];
            const locations = royalG[7 + 2 * world] ?? [];
            roles.forEach((savedRole, rosterIndex) => {
                if (!(rosterIndex in locations)) return;
                const role = royalArmoryAsNumber(savedRole);
                if (role !== RoyalUnitRole.Militia && role !== RoyalUnitRole.Commander
                    && role !== RoyalUnitRole.Knight && role !== RoyalUnitRole.Priest) return;
                roster.push({ world, rosterIndex, role, stationedMapId: royalArmoryAsNumber(locations[rosterIndex]) });
            });
        }
        this.roster = roster;
    }

    prepareEffects(upgradeBonus: (upgradeId: number) => number): void {
        for (const definition of this.roles) definition.prepareEffect(upgradeBonus);
    }

    prepareMilitiaEffect(upgradeBonus23: number, extraClearKills: number): void {
        this.getRole(RoyalUnitRole.Militia).prepareMilitiaEffect(upgradeBonus23, extraClearKills);
    }
}

export type OutpostUnitSlot = Readonly<{
    slotIndex: number;
    role: StationaryRoyalUnitRole | undefined;
}>;

export class OutpostUnits {
    slots: readonly OutpostUnitSlot[] = [];
    private assignedWorkers = 0;
    private assignedTraders = 0;
    private assignedGuards = 0;
    private assignedSurveyors = 0;
    private passiveWorkers = 0;
    private passiveTraders = 0;
    private passiveGuards = 0;
    private passiveSurveyors = 0;
    private totalWorkers = 0;
    private totalTraders = 0;
    private totalGuards = 0;
    private totalSurveyors = 0;

    parse(savedRow: readonly unknown[]): void {
        const encoding = String(savedRow[11] ?? "");
        const slots: OutpostUnitSlot[] = [];
        this.assignedWorkers = 0;
        this.assignedTraders = 0;
        this.assignedGuards = 0;
        this.assignedSurveyors = 0;
        // The first nine characters are physical slots; subtract two to decode each role.
        for (let slotIndex = 0; slotIndex < 9; slotIndex++) {
            const role = Math.round(Number(encoding.charAt(slotIndex)) - 2);
            switch (role) {
                case RoyalUnitRole.Worker: this.assignedWorkers++; break;
                case RoyalUnitRole.Trader: this.assignedTraders++; break;
                case RoyalUnitRole.Guard: this.assignedGuards++; break;
                case RoyalUnitRole.Surveyor: this.assignedSurveyors++; break;
            }
            slots.push({
                slotIndex,
                role: role === RoyalUnitRole.Worker || role === RoyalUnitRole.Trader
                    || role === RoyalUnitRole.Guard || role === RoyalUnitRole.Surveyor ? role : undefined,
            });
        }
        this.slots = slots;
        this.passiveWorkers = this.passiveTraders = this.passiveGuards = this.passiveSurveyors = 0;
        this.totalWorkers = this.totalTraders = this.totalGuards = this.totalSurveyors = 0;
    }

    prepare(commandRank: number, glorificationLevel = 0): void {
        this.passiveWorkers = Math.ceil(Math.max(0, commandRank) / 4) + Math.min(1, glorificationLevel);
        this.passiveTraders = Math.ceil(Math.max(0, commandRank - 1) / 4);
        this.passiveGuards = Math.ceil(Math.max(0, commandRank - 2) / 4);
        this.passiveSurveyors = Math.ceil(Math.max(0, commandRank - 3) / 4);
        this.totalWorkers = Math.round(this.assignedWorkers + this.passiveWorkers);
        this.totalTraders = Math.round(this.assignedTraders + this.passiveTraders);
        this.totalGuards = Math.round(this.assignedGuards + this.passiveGuards);
        this.totalSurveyors = Math.round(this.assignedSurveyors + this.passiveSurveyors);
    }

    getAssignedCount(role: RoyalUnitRole): number {
        switch (role) {
            case RoyalUnitRole.Worker: return this.assignedWorkers;
            case RoyalUnitRole.Trader: return this.assignedTraders;
            case RoyalUnitRole.Guard: return this.assignedGuards;
            case RoyalUnitRole.Surveyor: return this.assignedSurveyors;
            default: return 0;
        }
    }

    getPassiveCount(role: RoyalUnitRole): number {
        switch (role) {
            case RoyalUnitRole.Worker: return this.passiveWorkers;
            case RoyalUnitRole.Trader: return this.passiveTraders;
            case RoyalUnitRole.Guard: return this.passiveGuards;
            case RoyalUnitRole.Surveyor: return this.passiveSurveyors;
            default: return 0;
        }
    }

    getTotalCount(role: RoyalUnitRole): number {
        switch (role) {
            case RoyalUnitRole.Worker: return this.totalWorkers;
            case RoyalUnitRole.Trader: return this.totalTraders;
            case RoyalUnitRole.Guard: return this.totalGuards;
            case RoyalUnitRole.Surveyor: return this.totalSurveyors;
            default: return 0;
        }
    }
}
