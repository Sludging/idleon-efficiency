import { initMenagerieJellyfishRepo } from "../../../data/domain/data/MenagerieJellyfishRepo";
import {
    MenagerieGreenJellyfish,
    MenagerieRedJellyfish,
    MenagerieSilverJellyfish,
} from "../../../data/domain/menagerieJellyfish";

const jellyfishData = initMenagerieJellyfishRepo().map(record => record.data);

describe("Menagerie side jellyfish calculations", () => {
    it("requires an unlocked Red panel and a positive opportunity, replacing chapter rows", () => {
        const red = new MenagerieRedJellyfish(jellyfishData[2]);
        red.readingOpportunities = 0;
        red.update(true, [{ index: 0, name: "The fear within" }, { index: 1, name: "Decay surrounds" }]);
        expect(red.ready).toBe(false);
        expect(red.readingMultiplier).toBe(1);

        red.readingOpportunities = 5;
        red.update(true, [{ index: 0, name: "The fear within" }, { index: 1, name: "Decay surrounds" }]);
        expect(red.ready).toBe(true);
        expect(red.readingMultiplier).toBe(3);

        const previousChapterRows = red.chapterInputs;
        red.update(false, [{ index: 0, name: "The fear within" }]);
        expect(red.ready).toBe(false);
        expect(red.chapterInputs).toEqual([{ index: 0, name: "The fear within", input: 0 }]);
        expect(red.chapterInputs).not.toBe(previousChapterRows);
    });

    it("calculates Silver at r=1, above one, and maximum level", () => {
        const silver = new MenagerieSilverJellyfish(jellyfishData[3]);
        silver.miscLevel = silver.data.upgrades![0].maxLevel!;
        silver.conversionLevel = 90;
        silver.update(true, 0);
        expect(silver.miscLevelCap).toBe(100);
        expect(silver.miscMultiplier).toBe(2);
        expect(silver.conversionRate).toBe(1);
        expect(silver.conversionEvents).toEqual([{ fragments: 1, probability: 1 }]);
        expect(silver.expectedCreditedFragments).toBe(1);

        silver.conversionLevel = 91;
        silver.update(true, 0);
        expect(silver.conversionRate).toBeCloseTo(1.01);
        expect(silver.conversionEvents).toEqual([
            { fragments: 1, probability: 0.99 },
            { fragments: 2, probability: 0.010000000000000009 },
        ]);
        expect(silver.expectedCreditedFragments).toBeCloseTo(1.01);

        silver.conversionLevel = silver.conversionLevelCap;
        silver.update(true, 0);
        expect(silver.conversionRate).toBe(2);
        expect(silver.conversionEvents).toEqual([
            { fragments: 1, probability: 0 },
            { fragments: 2, probability: 1 },
        ]);
        expect(silver.expectedCreditedFragments).toBe(2);
    });

    it("truncates Silver credited events at remaining capacity, including a full balance", () => {
        const silver = new MenagerieSilverJellyfish(jellyfishData[3]);
        silver.conversionLevel = 190;
        silver.update(true, 2_000_000_000 - 1);
        expect(silver.conversionEvents).toEqual([{ fragments: 1, probability: 1 }]);
        expect(silver.expectedCreditedFragments).toBe(1);

        const previousEvents = silver.conversionEvents;
        silver.update(true, 2_000_000_000);
        expect(silver.conversionEvents).toEqual([{ fragments: 0, probability: 1 }]);
        expect(silver.expectedCreditedFragments).toBe(0);
        expect(silver.conversionEvents).not.toBe(previousEvents);
    });

    it("keeps Green unlock and deposit threshold as separate states", () => {
        const green = new MenagerieGreenJellyfish(jellyfishData[5]);
        green.depositedNametags = green.requiredNametag.count - 1;
        green.update(true, () => 4, () => 2);
        expect(green.unlocked).toBe(true);
        expect(green.depositRequirementMet).toBe(false);
        expect(green.requiredNametag.inStorage).toBe(4);
        expect(green.rewardNametag.equipped).toBe(2);

        green.depositedNametags = green.requiredNametag.count + 1;
        green.update(false, () => 0, () => 0);
        expect(green.unlocked).toBe(false);
        expect(green.depositRequirementMet).toBe(true);
        expect(green.requiredNametag.inStorage).toBe(0);
        expect(green.rewardNametag.equipped).toBe(0);

        green.update(true, () => 1, () => 3);
        expect(green.unlocked).toBe(true);
        expect(green.depositRequirementMet).toBe(true);
        expect(green.requiredNametag.inStorage).toBe(1);
        expect(green.rewardNametag.equipped).toBe(3);
    });
});
