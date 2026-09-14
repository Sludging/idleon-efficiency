export type CompanionLevel = 1 | 2;

export type CompanionState = {
    id: number;
    level: CompanionLevel;
};

const isCompanionLevel = (value: unknown): value is CompanionLevel => value === 1 || value === 2;

const isCompanionState = (value: unknown): value is CompanionState => {
    if (typeof value !== "object" || value === null) {
        return false;
    }

    const state = value as Partial<CompanionState>;
    return Number.isFinite(state.id)
        && isCompanionLevel(state.level);
};

// Merge duplicate companion records, preserving the maximum level.
export const mergeCompanionStates = (states: readonly CompanionState[]): CompanionState[] => {
    const byId = new Map<number, CompanionState>();

    states.forEach(state => {
        const existing = byId.get(state.id);
        if (existing) {
            existing.level = Math.max(existing.level, state.level) as CompanionLevel;
        }
        else {
            byId.set(state.id, { ...state });
        }
    });

    return [...byId.values()];
};

// Adapt legacy numeric IDs and validate canonical objects at external input boundaries.
export const normalizeCompanionStates = (value: unknown): CompanionState[] => {
    if (!Array.isArray(value)) {
        return [];
    }

    const states: CompanionState[] = [];
    value.forEach(entry => {
        if (typeof entry === "number" && Number.isFinite(entry)) {
            states.push({ id: entry, level: 1 });
        }
        else if (isCompanionState(entry)) {
            states.push({ id: entry.id, level: entry.level });
        }
    });

    return mergeCompanionStates(states);
};
