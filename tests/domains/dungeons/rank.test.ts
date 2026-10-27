import { Dungeons } from "../../../data/domain/dungeons";

describe("Dungeon rank", () => {
    it.each([
        [14336023859, 77],
        [4999999999, 76],
        [5000000000, 77],
        [14999999999, 77],
        [15000000000, 78],
        [0, 1],
        [4, 2],
    ])("returns rank %s XP → %s", (xp, expectedRank) => {
        expect(Dungeons.getDungeonRank(xp)).toBe(expectedRank);
    });

    it.each([1e16, 2e16])("retains native rank 1 fallback at %s XP", (xp) => {
        expect(Dungeons.getDungeonRank(xp)).toBe(1);
    });
});
