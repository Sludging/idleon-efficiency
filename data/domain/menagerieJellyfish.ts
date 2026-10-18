import type { MenagerieJellyfishModel } from "./model/menagerieJellyfishModel";

export class MenageriePurpleJellyfish {
    unlocked = false;
    moneyBalance = 0;
    shellPurchaseCount = 0;
    shellBalance = 0;
    nextShellCost = 0;
    lumiLevel = 0;
    nextLumiCost = 0;
    lumiContribution = 0;

    constructor(public readonly data: MenagerieJellyfishModel) {}

    parse(savedRow: (number | string)[] | undefined): void {
        this.shellBalance = Number(savedRow?.[1] ?? 0);
        this.shellPurchaseCount = Number(savedRow?.[3] ?? 0);
        this.lumiLevel = Number(savedRow?.[4] ?? 0);
        this.lumiContribution = this.lumiLevel;
    }

    update(unlocked: boolean, moneyBalance: number): void {
        this.unlocked = unlocked;
        this.moneyBalance = moneyBalance;
        this.nextShellCost = 10 ** 35 * (350 + 150 * this.shellPurchaseCount) ** this.shellPurchaseCount;
        this.nextLumiCost = 10 ** 30 * 6 ** this.lumiLevel;
    }
}

export class MenagerieBlueJellyfish {
    unlocked = false;
    donatedLadles = 0;
    ownedLadles = 0;

    constructor(public readonly data: MenagerieJellyfishModel) {}

    parse(savedRow: (number | string)[] | undefined): void {
        this.donatedLadles = Number(savedRow?.[5] ?? 0);
    }

    update(unlocked: boolean, ownedLadles: number): void {
        this.unlocked = unlocked;
        this.ownedLadles = ownedLadles;
    }
}

export class MenagerieRedJellyfish {
    unlocked = false;
    readingOpportunities = 0;
    ready = false;
    readingMultiplier = 1;
    chapterInputs: { index: number; name: string; input: number }[] = [];

    constructor(public readonly data: MenagerieJellyfishModel) {}

    parse(savedRow: (number | string)[] | undefined, savedChapterInputs: (number | string)[] | undefined): void {
        this.readingOpportunities = Number(savedRow?.[6] ?? 0);
        this.savedChapterInputs = Array.from({ length: 14 }, (_, index) => Number(savedChapterInputs?.[index] ?? 0));
    }

    private savedChapterInputs: number[] = [];

    update(unlocked: boolean, chapters: { index: number; name: string }[]): void {
        this.unlocked = unlocked;
        this.ready = unlocked && this.readingOpportunities > 0;
        this.readingMultiplier = Math.floor(Math.max(1, this.readingOpportunities ** 0.74));
        this.chapterInputs = chapters.map(chapter => ({
            ...chapter,
            input: this.savedChapterInputs[chapter.index] ?? 0,
        }));
    }
}

export class MenagerieSilverJellyfish {
    unlocked = false;
    obolFragments = 0;
    miscLevel = 0;
    miscLevelCap = 0;
    nextMiscCost = 0;
    miscMultiplier = 1;
    conversionLevel = 0;
    conversionLevelCap = 0;
    nextConversionCost = 0;
    conversionRate = 0.1;
    conversionEvents: { fragments: number; probability: number }[] = [];
    expectedCreditedFragments = 0;

    constructor(public readonly data: MenagerieJellyfishModel) {}

    parse(savedRow: (number | string)[] | undefined): void {
        this.miscLevel = Number(savedRow?.[9] ?? 0);
        this.conversionLevel = Number(savedRow?.[10] ?? 0);
    }

    update(unlocked: boolean, obolFragments: number): void {
        this.unlocked = unlocked;
        this.obolFragments = obolFragments;
        const [miscUpgrade, conversionUpgrade] = this.data.upgrades!;
        this.miscLevelCap = miscUpgrade.maxLevel!;
        this.conversionLevelCap = conversionUpgrade.maxLevel!;
        this.nextMiscCost = 2 * (100 + 25 * this.miscLevel + this.miscLevel ** 3) * 1.065 ** this.miscLevel;
        this.miscMultiplier = 1 + this.miscLevel / 100;
        this.nextConversionCost = (25 + 10 * this.conversionLevel + this.conversionLevel ** 2) * 1.056 ** this.conversionLevel;
        this.conversionRate = (10 + this.conversionLevel) / 100;

        const remainingCapacity = Math.max(0, 2_000_000_000 - obolFragments);
        const possibleEvents = this.conversionRate < 1
            ? [{ fragments: 0, probability: 1 - this.conversionRate }, { fragments: 1, probability: this.conversionRate }]
            : this.conversionRate === 1
                ? [{ fragments: 1, probability: 1 }]
                : [{ fragments: 1, probability: 2 - this.conversionRate }, { fragments: 2, probability: this.conversionRate - 1 }];
        const creditedEventProbabilities: Record<number, number> = {};
        possibleEvents.forEach(event => {
            const credited = Math.min(event.fragments, remainingCapacity);
            creditedEventProbabilities[credited] = (creditedEventProbabilities[credited] ?? 0) + event.probability;
        });
        this.conversionEvents = Object.entries(creditedEventProbabilities)
            .map(([fragments, probability]) => ({ fragments: Number(fragments), probability }));
        this.expectedCreditedFragments = this.conversionEvents.reduce(
            (expected, event) => expected + event.fragments * event.probability,
            0,
        );
    }
}

export class MenagerieYellowJellyfish {
    unlocked = false;
    progress = 0;
    requirement = 100_000;
    upgrades: { index: number; label: string; level: number; effect: number }[] = [];
    lumiContribution = 0;
    private levels: number[] = [];

    constructor(public readonly data: MenagerieJellyfishModel) {}

    parse(savedRow: (number | string)[] | undefined): void {
        this.levels = Array.from({ length: 4 }, (_, index) => Number(savedRow?.[11 + index] ?? 0));
        this.progress = Number(savedRow?.[15] ?? 0);
        this.lumiContribution = 3 * this.levels[3];
    }

    update(unlocked: boolean): void {
        this.unlocked = unlocked;
        const levelTotal = this.levels.reduce((total, level) => total + level, 0);
        this.requirement = 10 ** 5 * Math.max(3.2, 8 - 0.15 * levelTotal) ** levelTotal;
        this.upgrades = this.data.upgrades!.map(upgrade => ({
            index: upgrade.index,
            label: upgrade.label,
            level: this.levels[upgrade.index],
            effect: upgrade.bonusPerLevel! * this.levels[upgrade.index],
        }));
    }
}

export class MenagerieGreenJellyfish {
    unlocked = false;
    depositedNametags = 0;
    depositRequirementMet = false;
    requiredNametag: { item: string; count: number; inStorage: number; equipped: number };
    rewardNametag: { item: string; count: number; inStorage: number; equipped: number };

    constructor(public readonly data: MenagerieJellyfishModel) {
        const reward = data.reward!;
        this.requiredNametag = { item: reward.requiredItem, count: reward.requiredCount, inStorage: 0, equipped: 0 };
        this.rewardNametag = { item: reward.rewardItem, count: reward.rewardQuantity, inStorage: 0, equipped: 0 };
    }

    parse(depositedNametags: number): void {
        this.depositedNametags = depositedNametags;
    }

    update(
        unlocked: boolean,
        getStorageCount: (item: string) => number,
        getEquippedCount: (item: string) => number,
    ): void {
        this.unlocked = unlocked;
        this.depositRequirementMet = this.depositedNametags >= this.requiredNametag.count;
        [this.requiredNametag, this.rewardNametag].forEach(nametag => {
            nametag.inStorage = getStorageCount(nametag.item);
            nametag.equipped = getEquippedCount(nametag.item);
        });
    }
}
