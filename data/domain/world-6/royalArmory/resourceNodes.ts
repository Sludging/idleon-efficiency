import type { RoyalResourceBase } from "../../data/RoyalResourceRepo";
import type { ImageData } from "../../imageData";
import type { RoyalResourceModel } from "../../model/royalResourceModel";

// Match game number conversion for missing, boolean, and saved string values.
export const royalArmoryAsNumber = (value: unknown): number => {
    if (value === null || value === undefined) return 0;
    if (typeof value === "number") return value;
    if (typeof value === "boolean") return Number(value);
    return parseFloat(typeof value === "string" ? value : String(value));
};

export class RoyalResource {
    constructor(public readonly resourceType: number, public quantity: number) {}

    parse(quantity: unknown): void {
        this.quantity = royalArmoryAsNumber(quantity);
    }

    getImageData(): ImageData {
        return { location: `RGres${this.resourceType}`, width: 28, height: 28 };
    }
}

export class RoyalResourceNode {
    readonly nodeId: number;
    readonly resourceType: number;
    readonly world: number;
    readonly order: number;
    readonly x: number;
    readonly y: number;
    readonly baseCapacity: number;
    grade = 0;
    removedQuantity = 0;
    depleted = false;

    constructor(data: RoyalResourceModel) {
        this.nodeId = data.resourceId;
        this.resourceType = data.nodeType;
        this.world = data.world;
        this.order = data.order;
        this.x = data.x;
        this.y = data.y;
        this.baseCapacity = data.capacity;
    }

    static fromBase(data: RoyalResourceBase[]): RoyalResourceNode[] {
        // A resource type of -1 marks a catalog filler, not a real node.
        return data.filter((entry) => entry.data.nodeType !== -1).map((entry) => new RoyalResourceNode(entry.data));
    }

    parse(grade: unknown, removedQuantity: unknown): void {
        this.grade = royalArmoryAsNumber(grade);
        const removed = royalArmoryAsNumber(removedQuantity);
        // The save uses -1 for an exhausted node, not a negative removed quantity.
        this.depleted = removed === -1;
        this.removedQuantity = this.depleted ? 0 : removed;
    }

    // The saved grade and world scale the node's base capacity.
    getMaximumQuantity(): number {
        return 5 * this.baseCapacity * Math.pow(1.5, this.grade) * Math.pow(5, this.world);
    }

    // An exhausted node has no resources left to collect.
    getAvailableQuantity(): number {
        return this.depleted ? 0 : this.getMaximumQuantity() - this.removedQuantity;
    }

    getImageData(): ImageData {
        return { location: `RGresB${Math.min(49, Math.round(this.grade))}`, width: 56, height: 56 };
    }
}

export class RoyalResourceNodes {
    private readonly nodesById: ReadonlyMap<number, RoyalResourceNode>;
    private readonly uncatalogedGrades = new Map<number, number>();
    private savedGradeCount = 0;
    totalResourceGrade = 0;

    constructor(readonly nodes: readonly RoyalResourceNode[]) {
        this.nodesById = new Map(nodes.map((node) => [node.nodeId, node]));
    }

    static fromBase(data: RoyalResourceBase[]): RoyalResourceNodes {
        return new RoyalResourceNodes(RoyalResourceNode.fromBase(data));
    }

    getNode(nodeId: number): RoyalResourceNode | undefined {
        return this.nodesById.get(nodeId);
    }

    parse(grades: readonly unknown[], removedQuantities: readonly unknown[] = []): void {
        this.totalResourceGrade = 0;
        this.savedGradeCount = grades.length;
        this.uncatalogedGrades.clear();
        for (const node of this.nodes) node.parse(grades[node.nodeId], removedQuantities[node.nodeId]);
        // Filler and uncovered save slots still contribute to the account grade total.
        for (let nodeId = 0; nodeId < grades.length; nodeId++) {
            if (!this.nodesById.has(nodeId)) this.uncatalogedGrades.set(nodeId, royalArmoryAsNumber(grades[nodeId]));
        }
    }

    prepareTotalResourceGrade(): void {
        this.totalResourceGrade = 0;
        // Keep the save's addition order, including slots without real node metadata.
        for (let nodeId = 0; nodeId < this.savedGradeCount; nodeId++) {
            this.totalResourceGrade += this.nodesById.get(nodeId)?.grade ?? this.uncatalogedGrades.get(nodeId) ?? 0;
        }
    }
}
