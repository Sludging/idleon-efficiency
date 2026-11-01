import type { GemStore } from "../../gemPurchases";
import { Item } from "../../items";
import type { ImageData } from "../../imageData";
import type { Player } from "../../player";
import { SkillsIndex } from "../../SkillsIndex";
import { getStampBonusForKey, type Stamp } from "../../world-1/stamps";
import type { SaltLick } from "../../world-3/construction/saltLick";
import type { Cooking } from "../../world-4/cooking";
import type { Lab } from "../../world-4/lab";
import { SkillMastery, type Rift } from "../../world-4/rift";
import type { Arcade } from "../arcade";
import type { Alchemy } from "./alchemy";

export interface LiquidCapacityInputs {
    unlocked: boolean;
    bleached: boolean;
    saltLickBonus: number;
    mealCapacityBonus: number;
    riftCapacityBonus: number;
    labCapacityMultiplier: number;
    vialCapacityBonus: number;
    p2wCapacityBonus: number;
    bubbleCapacityBonus: number;
    stampCapacityBonus: number;
    arcadeCapacityBonus: number;
}

type LiquidUpgrade = {
    level: number;
    progress: number;
    requirement: number;
    readyToRegister: boolean;
};

export class LiquidCauldron {
    amount: number = 0;
    capacity: number = 0;
    fillPercent: number = 0;
    capacityUpgrade: LiquidUpgrade = { level: 0, progress: 0, requirement: 0, readyToRegister: false };
    rateUpgrade: LiquidUpgrade = { level: 0, progress: 0, requirement: 0, readyToRegister: false };
    assignedPlayers: Player[] = [];
    dragonic: boolean = false;
    private assignedPlayerIds: number[] = [];

    constructor(public liquidIndex: number, public name: string) { }

    getImageData(): ImageData {
        return Item.getImageData(`Liquid${this.liquidIndex + 1}`);
    }

    parse(amount: unknown, levels: unknown[], progress: unknown[], jobs: unknown[], dragonicCount: number): void {
        const capacityOffset = 18 + 4 * this.liquidIndex;
        const rateOffset = capacityOffset + 1;
        this.amount = Number(amount ?? 0);
        this.capacityUpgrade = {
            level: Number(levels[capacityOffset] ?? 0),
            progress: Number(progress[capacityOffset] ?? 0),
            requirement: 0,
            readyToRegister: false,
        };
        this.rateUpgrade = {
            level: Number(levels[rateOffset] ?? 0),
            progress: Number(progress[rateOffset] ?? 0),
            requirement: 0,
            readyToRegister: false,
        };
        this.dragonic = dragonicCount > this.liquidIndex;
        this.assignedPlayerIds = [];
        jobs.forEach((job, playerId) => {
            if (Number(job) === this.liquidIndex + 4) {
                this.assignedPlayerIds.push(playerId);
            }
        });
        this.assignedPlayers = [];
        this.capacity = 0;
        this.fillPercent = 0;
    }

    prepare(players: Player[], inputs: LiquidCapacityInputs): void {
        this.assignedPlayers = players.filter(player => this.assignedPlayerIds.includes(player.playerID));
        this.capacityUpgrade.requirement = Math.floor(1.6 + Math.pow(1.25 * (this.capacityUpgrade.level + 1), 1.8));
        this.rateUpgrade.requirement = Math.floor(1.6 + Math.pow(1.25 * (this.rateUpgrade.level + 1), 1.8));
        this.capacityUpgrade.readyToRegister = this.capacityUpgrade.progress >= this.capacityUpgrade.requirement;
        this.rateUpgrade.readyToRegister = this.rateUpgrade.progress >= this.rateUpgrade.requirement;
        this.capacity = inputs.unlocked ? this.getCapacity(inputs) : 0;
        this.fillPercent = this.capacity === 0 ? 0 : 100 * this.amount / this.capacity;
    }

    private getCapacity(inputs: LiquidCapacityInputs): number {
        let purchaseBonus = inputs.bleached ? 0.5 + inputs.saltLickBonus / 100 : 0;
        if (this.dragonic) {
            purchaseBonus = purchaseBonus === 0 ? 1 : inputs.saltLickBonus / 100 + 2;
        }
        const multiplier = (1 + (purchaseBonus + (inputs.mealCapacityBonus + inputs.riftCapacityBonus) / 100))
            * inputs.labCapacityMultiplier;
        const capacityUpgradeBonus = Math.round(this.capacityUpgrade.level);
        const arcadeBonus = Math.ceil(inputs.arcadeCapacityBonus);

        // Preserve the native addition order for each liquid. Capacity is not rounded.
        switch (this.liquidIndex) {
            case 0:
                return multiplier * (10 + (capacityUpgradeBonus + (inputs.vialCapacityBonus
                    + (inputs.p2wCapacityBonus + (inputs.bubbleCapacityBonus + (inputs.stampCapacityBonus + arcadeBonus))))));
            case 1:
                return multiplier * (10 + capacityUpgradeBonus + (inputs.vialCapacityBonus
                    + (inputs.p2wCapacityBonus + (inputs.bubbleCapacityBonus + (inputs.stampCapacityBonus + arcadeBonus)))));
            case 2:
                return multiplier * (10 + capacityUpgradeBonus + (inputs.p2wCapacityBonus + inputs.bubbleCapacityBonus
                    + (inputs.stampCapacityBonus + (arcadeBonus + inputs.vialCapacityBonus))));
            default:
                return multiplier * (10 + (capacityUpgradeBonus + (inputs.p2wCapacityBonus + inputs.bubbleCapacityBonus
                    + (inputs.stampCapacityBonus + arcadeBonus))));
        }
    }
}

export function updateAlchemyLiquids(data: Map<string, any>): Alchemy {
    const alchemy = data.get("alchemy") as Alchemy;
    const players = data.get("players") as Player[];
    const gems = data.get("gems") as GemStore;
    const saltLick = data.get("saltLick") as SaltLick;
    const cooking = data.get("cooking") as Cooking;
    const lab = data.get("lab") as Lab;
    const rift = data.get("rift") as Rift;
    const stamps = data.get("stamps") as Stamp[][];
    const arcade = data.get("arcade") as Arcade;

    const bleachCount = gems.purchases.find(purchase => purchase.no === 106)!.pucrhased;
    const saltLickBonus = saltLick.getBonus(5);
    const skillMastery = rift.bonuses.find(bonus => bonus.name === SkillMastery.displayName) as SkillMastery;
    const riftCapacityBonus = skillMastery.getSkillBonus(SkillsIndex.Alchemy, 1);
    const labCapacityMultiplier = lab.bonuses[6].getBonus();
    const bubbleCapacityBonus = alchemy.getBubbleBonusForKey("LqdCap");
    const stampCapacityBonus = getStampBonusForKey(stamps, "LiquidCap");
    const arcadeCapacityBonus = arcade.bonuses[7].getBonus();
    const firstMealCapacityBonus = cooking.getMealBonusForKey("Liquid12");
    const lastMealCapacityBonus = cooking.getMealBonusForKey("Liquid34");
    const liquidP2wUpgrades = Object.values(alchemy.p2w.liquidLevels);
    let highestAlchemyLevel = 0;
    for (const player of players) {
        highestAlchemyLevel = Math.max(highestAlchemyLevel, player.skills.get(SkillsIndex.Alchemy)!.level);
    }

    for (const liquid of alchemy.liquids) {
        const liquidIndex = liquid.liquidIndex;
        const requiredLevel = liquidIndex === 0 ? 0 : liquidIndex === 1 ? 20 : liquidIndex === 2 ? 35 : 80;
        liquid.prepare(players, {
            unlocked: highestAlchemyLevel >= requiredLevel,
            bleached: bleachCount > liquidIndex,
            saltLickBonus,
            mealCapacityBonus: liquidIndex < 2 ? firstMealCapacityBonus : lastMealCapacityBonus,
            riftCapacityBonus,
            labCapacityMultiplier,
            vialCapacityBonus: liquidIndex < 3 ? alchemy.getVialBonusForKey(`Liquid${liquidIndex + 1}Cap`) : 0,
            p2wCapacityBonus: Math.max(0, liquidP2wUpgrades[liquidIndex].capacity),
            bubbleCapacityBonus,
            stampCapacityBonus,
            arcadeCapacityBonus,
        });
    }
    return alchemy;
}
