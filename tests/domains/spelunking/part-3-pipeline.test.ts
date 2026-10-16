import type * as SaveLoader from '../../utils/cloudsave-loader';
import type * as Pipeline from '../../../data/domain/idleonData';
import { Cloudsave } from '../../../data/domain/cloudsave';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import type { Player } from '../../../data/domain/player';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { saved } from './part-2-test-helpers';
import type { Cooking } from '../../../data/domain/world-4/cooking';

interface AccountRun {
    data: Map<string, unknown>;
    save: Cloudsave;
    process: typeof Pipeline.updateIdleonData;
}

// Domain registration retains instances. Isolate modules to obtain independent normal account factories.
function freshAccount(): AccountRun {
    let run: AccountRun;
    jest.isolateModules(() => {
        const loader: typeof SaveLoader = require('../../utils/cloudsave-loader');
        const pipeline: typeof Pipeline = require('../../../data/domain/idleonData');
        run = { data: loader.loadGameDataFromSave('latest'), save: loader.loadTestSave('latest'), process: pipeline.updateIdleonData };
    });
    return run!;
}
function copySave(save: Cloudsave): Cloudsave {
    return Cloudsave.fromJSON(JSON.parse(JSON.stringify(save.toJSON())));
}

function readArrayField<T>(save: Cloudsave, key: string): T {
    const value = save.get(key);
    return typeof value === 'string' ? JSON.parse(value) : value;
}
function replaceArrayField(save: Cloudsave, key: string, value: unknown[]): void {
    const previousValue = save.get(key);
    save.fields.set(key, typeof previousValue === 'string' ? JSON.stringify(value) : value);
}

function processSave(run: AccountRun, data: Map<string, unknown>, save: Cloudsave): Map<string, unknown> {
    return run.process(data, save, save.get('playerNames'), normalizeCompanionStates(save.get('companions')),
        save.get('servervars'), true).getData();
}

function part3Snapshot(data: Map<string, unknown>): string {
    const owner = data.get('spelunking') as Spelunking;
    return JSON.stringify({
        tools: owner.tools.map(tool => [tool.index, tool.isUnlocked(index => owner.getUpgradeBonus(index))]),
        automaticToolUse: [owner.automaticToolUse.fullClearSetting, owner.automaticToolUse.eligible],
        elixirs: [owner.elixirs.equippedSlots, owner.elixirs.memorizedIndices, owner.elixirs.ownedCount,
            owner.elixirs.slotLimit, owner.elixirs.duplicateLimit, owner.elixirs.memorizeLimit,
            owner.elixirs.consumptionReduction, owner.elixirs.descriptions],
        upgrades: owner.upgrades.map(upgrade => [upgrade.index, upgrade.sourceBonus,
            upgrade.nextCost, upgrade.costToMax, upgrade.costNext10, upgrade.remainingCap]),
        observations: [owner.spelunkingSkillLevelTotal, owner.bestDepthTotal, owner.biggestHaulDigitTotal,
            owner.grandDiscoveryCount, owner.exaltedStampFragments, owner.prismaBubblesFound,
            owner.exaltDropChanceDenominator, owner.prismaDropChanceDenominator, owner.deepPocketsMultiplier,
            [owner.bestUnlockedTool.index, owner.bestUnlockedTool.data.name, owner.bestUnlockedTool.data.damageMultiplier]],
        manic: [owner.manic.unlocked, owner.manic.enabled, owner.manic.depthByTunnel, owner.manic.totalDepth,
            owner.manic.staminaCostMultiplier, [54, 55, 56].map(index => owner.getEffectiveUpgradeBonus(index))],
        overstim: [owner.overstim.unlocked, owner.overstim.level, owner.overstim.fill, owner.overstim.threshold,
            owner.overstim.bonusPerLevel, owner.overstim.bonus, owner.overstim.amberMultiplier],
        trackometer: [owner.trackometer.level, owner.trackometer.fill, owner.trackometer.threshold, owner.trackometer.unlocked,
            [59, 60, 61].map(index => owner.getEffectiveUpgradeBonus(index))],
    });
}

describe('Spelunking Part 3 normal account factory and repeated processing', () => {
    it('matches retained Part 3 source formulas and saved account outputs', () => {
        const run = freshAccount();
        const owner = run.data.get('spelunking') as Spelunking;
        const spelunkingSave = saved('Spelunk');
        const currencies = spelunkingSave[4];
        const shopLevels = spelunkingSave[5];
        const rawBonus = (index: number): number =>
            owner.upgrades[index].data.bonusPerLevel * Math.max(0, Number(shopLevels[index] ?? -1));
        const players = run.data.get('players') as Player[];
        const skillLevelTotal = players.reduce((total, player) =>
            total + Math.max(0, player.skills.get(SkillsIndex.Spelunking)!.level), 0);
        const bestDepthTotal = spelunkingSave[1].reduce((total, depth) => total + Number(depth), 0);
        const biggestHaulDigitTotal = spelunkingSave[2].reduce((total, haul) => {
            const amount = Number(haul);
            return total + Math.ceil(Math.log(Math.max(amount, 1)) / 2.30259);
        }, 0);
        const discoveryCount = spelunkingSave[6].length;
        const grandDiscoveryCount = spelunkingSave[44].reduce((total, count) => total + Number(count), 0);

        expect(owner.spelunkingSkillLevelTotal).toBe(skillLevelTotal);
        expect(owner.bestDepthTotal).toBe(bestDepthTotal);
        expect(owner.biggestHaulDigitTotal).toBe(biggestHaulDigitTotal);
        expect(owner.grandDiscoveryCount).toBe(grandDiscoveryCount);
        expect(owner.exaltedStampFragments).toBe(currencies[3]);
        expect(owner.prismaBubblesFound).toBe(currencies[4]);
        expect(owner.exaltDropChanceDenominator).toBe(
            60 * Math.pow(8, currencies[3]) / (1 + rawBonus(27) / 100)
        );
        expect(owner.prismaDropChanceDenominator).toBe(
            100 * Math.pow(1.5, currencies[4]) / (1 + rawBonus(28) / 100)
        );

        const expectedSourceBonuses: Record<number, number> = {
            0: rawBonus(0) * skillLevelTotal,
            1: rawBonus(1) * (1 + 5 * discoveryCount / 100),
            2: rawBonus(2) * (2 + bestDepthTotal / 100),
            3: rawBonus(3) * (1 + 3 * biggestHaulDigitTotal / 100),
            7: 15 + rawBonus(7) / (250 + rawBonus(7)) * 45,
            8: rawBonus(8) * (1 + skillLevelTotal / 100),
            9: rawBonus(9) * (1 + bestDepthTotal / 100),
            10: rawBonus(10) * (1 + 5 * discoveryCount / 100),
            19: Math.max(10, 50 - rawBonus(19)),
            25: 1 + rawBonus(25),
            38: 20 + rawBonus(38),
            44: rawBonus(44) * grandDiscoveryCount,
            45: rawBonus(45) * grandDiscoveryCount,
            46: rawBonus(46) * grandDiscoveryCount,
            54: rawBonus(54) * (1 + 5 * owner.manic.totalDepth / 100),
            55: rawBonus(55) * (1 + 5 * owner.manic.totalDepth / 100),
            56: rawBonus(56) * (1 + 5 * owner.manic.totalDepth / 100),
            59: rawBonus(59) * currencies[8],
            60: rawBonus(60) * currencies[8],
            61: rawBonus(61) * currencies[8],
        };
        expect(owner.deepPocketsMultiplier).toBe(1 + 7 * rawBonus(21) / 100);
        expect(owner.upgrades[21].sourceBonus).toBe(rawBonus(21));
        const testedSourceBonusIndices = Object.keys(expectedSourceBonuses).map(Number);
        // Index 43's numeric Grand Discovery chance is intentionally absent from these regressions.
        expect(testedSourceBonusIndices).not.toContain(43);
        testedSourceBonusIndices.forEach(index => {
            expect(owner.upgrades[index].sourceBonus).toBe(expectedSourceBonuses[index]);
        });
        for (const upgrade of owner.upgrades) {
            if (!Object.prototype.hasOwnProperty.call(expectedSourceBonuses, upgrade.index)) {
                expect(upgrade.sourceBonus).toBe(rawBonus(upgrade.index));
            }
        }

        const bestUnlockedTool = owner.tools
            .filter(tool => tool.index <= 4)
            .filter(tool => {
                const unlock = tool.data.unlock;
                if (unlock.kind === 'default') {
                    return true;
                }
                return unlock.kind === 'upgrade'
                    && unlock.upgradeIndex !== undefined
                    && rawBonus(unlock.upgradeIndex) >= (unlock.minimumBonus ?? 0);
            })
            .reduce((best, tool) => tool.index > best.index ? tool : best);
        expect(owner.bestUnlockedTool).toBe(bestUnlockedTool);
        expect([owner.bestUnlockedTool.index, owner.bestUnlockedTool.data.name,
            owner.bestUnlockedTool.data.damageMultiplier]).toEqual([
            bestUnlockedTool.index, bestUnlockedTool.data.name, bestUnlockedTool.data.damageMultiplier,
        ]);

        const authorizedElixirQuantities = [25, 1, 30, 1, 20, 60, 25, 30, 1, 1, 1, 0];
        expect(owner.elixirs.descriptions).toHaveLength(12);
        owner.elixirs.records.forEach((record, index) => {
            const expectedDescription = record.data.description.replace(
                '{', String(authorizedElixirQuantities[index])
            );
            expect(owner.elixirs.descriptions[index]).toBe(expectedDescription);
            expect(owner.elixirs.descriptions[index].match(/%/g)?.length ?? 0)
                .toBe(record.data.description.match(/%/g)?.length ?? 0);
            expect(owner.elixirs.descriptions[index].match(/@/g)?.length ?? 0)
                .toBe(record.data.description.match(/@/g)?.length ?? 0);
        });
    });

    it('maps saved progression and checks tool and elixir rule outcomes', () => {
        const run = freshAccount();
        const owner = run.data.get('spelunking') as Spelunking;
        const spelunkingSave = saved('Spelunk');
        const currencies = spelunkingSave[4];
        const shopLevels = spelunkingSave[5];

        expect(owner.tools.map(tool => tool.isUnlocked(index => owner.getUpgradeBonus(index))))
            .toEqual([true, true, true, true, true, false, false]);
        expect(owner.automaticToolUse.fullClearSetting).toBe(saved('OptLacc')[538] === 1);
        expect(owner.automaticToolUse.eligible).toBe(true);
        expect(shopLevels[12]).toBeGreaterThanOrEqual(1);
        expect(saved('OptLacc')[478]).toBeGreaterThanOrEqual(15);

        expect(owner.stamina[6].eligibleForTeam).toBe(true);

        expect(owner.elixirs.equippedSlots).toEqual([0, 2, 6, 9, 7]);
        expect(owner.elixirs.memorizedIndices).toEqual([6]);
        expect(owner.elixirs.ownedCount).toBe(12);
        expect(owner.elixirs.slotLimit).toBe(5);
        expect(owner.elixirs.duplicateLimit).toBe(4);
        expect(owner.elixirs.memorizeLimit).toBe(1);
        expect(owner.elixirs.consumptionReduction).toBe(Math.min(0.6,
            (owner.getUpgradeBonus(26) + owner.chapters[3].bonuses[2].getBonus()) / 100));

        expect(owner.manic.unlocked).toBe(shopLevels[53] >= 1);
        expect(owner.manic.enabled).toBe(spelunkingSave[4][10] === 1);
        expect(owner.manic.depthByTunnel).toEqual(spelunkingSave[47]);
        expect(owner.manic.totalDepth).toBe(73);
        expect(owner.manic.staminaCostMultiplier).toBe(30);
        const manicDepthMultiplier = 1 + 5 * owner.manic.totalDepth / 100;
        [54, 55, 56].forEach(index => {
            expect(owner.getEffectiveUpgradeBonus(index)).toBe(owner.getUpgradeBonus(index) * manicDepthMultiplier);
        });

        expect(owner.overstim.unlocked).toBe(shopLevels[6] >= 1);
        expect(owner.overstim.level).toBe(currencies[1]);
        expect(owner.overstim.fill).toBe(currencies[2]);
        expect(owner.overstim.threshold).toBe(41753.90541341315);
        expect(owner.overstim.bonusPerLevel).toBe((30 + owner.getUpgradeBonus(6)));
        expect(owner.overstim.bonus).toBe(owner.overstim.bonusPerLevel * owner.overstim.level);
        expect(owner.overstim.amberMultiplier).toBe(1 + owner.getUpgradeBonus(6) * owner.overstim.bonus / 100);

        expect(owner.trackometer.level).toBe(currencies[8]);
        expect(owner.trackometer.fill).toBe(currencies[9]);
        expect(owner.trackometer.threshold).toBe(25628.90625);
        expect(owner.trackometer.unlocked).toBe(shopLevels[59] >= 1);
        [59, 60, 61].forEach(index => {
            expect(owner.getEffectiveUpgradeBonus(index)).toBe(owner.getUpgradeBonus(index) * owner.trackometer.level);
        });
        expect(owner.getUpgradeBonus(6)).toBe(owner.upgrades[6].getBonus());
    });

    it('replaces elixir equipment, memorization, and limits across absent, partial, and changed saves', () => {
        const run = freshAccount();
        let data = run.data;

        const absentSave = copySave(run.save);
        const absentSpelunking = readArrayField<(unknown[] | undefined)[]>(absentSave, 'Spelunk');
        absentSpelunking[7] = undefined;
        absentSpelunking[48] = undefined;
        replaceArrayField(absentSave, 'Spelunk', absentSpelunking);
        data = processSave(run, data, absentSave);
        let elixirs = (data.get('spelunking') as Spelunking).elixirs;
        expect(elixirs.equippedSlots).toEqual([-1, -1, -1, -1, -1]);
        expect(elixirs.memorizedIndices).toEqual([]);
        expect(elixirs.ownedCount).toBe(12);

        const partialSave = copySave(run.save);
        const partialSpelunking = readArrayField<number[][]>(partialSave, 'Spelunk');
        partialSpelunking[7] = [-1, 4];
        partialSpelunking[48] = [];
        replaceArrayField(partialSave, 'Spelunk', partialSpelunking);
        data = processSave(run, data, partialSave);
        elixirs = (data.get('spelunking') as Spelunking).elixirs;
        expect(elixirs.equippedSlots).toEqual([-1, 4, -1, -1, -1]);
        expect(elixirs.memorizedIndices).toEqual([]);

        const changedSave = copySave(run.save);
        const changedSpelunking = readArrayField<number[][]>(changedSave, 'Spelunk');
        changedSpelunking[7] = [3, -1, 2];
        changedSpelunking[48] = [2, 5];
        [23, 24, 25, 26, 57].forEach(index => { changedSpelunking[5][index] = 0; });
        replaceArrayField(changedSave, 'Spelunk', changedSpelunking);
        data = processSave(run, data, changedSave);
        elixirs = (data.get('spelunking') as Spelunking).elixirs;
        expect(elixirs.equippedSlots).toEqual([3, -1, 2, -1, -1]);
        expect(elixirs.memorizedIndices).toEqual([2, 5]);
        expect(elixirs.ownedCount).toBe(0);
        expect(elixirs.slotLimit).toBe(1);
        expect(elixirs.duplicateLimit).toBe(0);
        expect(elixirs.memorizeLimit).toBe(0);
        const owner = data.get('spelunking') as Spelunking;
        expect(elixirs.consumptionReduction).toBe(Math.min(0.6,
            owner.chapters[3].bonuses[2].getBonus() / 100));
    });

    it('uses either AUTO unlock route and still requires account progress', () => {
        const run = freshAccount();
        let data = run.data;

        const lockedSave = copySave(run.save);
        const lockedSpelunking = readArrayField<number[][]>(lockedSave, 'Spelunk');
        lockedSpelunking[5][12] = -1;
        replaceArrayField(lockedSave, 'Spelunk', lockedSpelunking);
        const noGemPurchases = readArrayField<number[]>(lockedSave, 'GemItemsPurchased');
        noGemPurchases[43] = 0;
        replaceArrayField(lockedSave, 'GemItemsPurchased', noGemPurchases);
        data = processSave(run, data, lockedSave);
        expect((data.get('spelunking') as Spelunking).automaticToolUse.eligible).toBe(false);

        const gemPurchaseSave = copySave(run.save);
        const gemPurchaseSpelunking = readArrayField<number[][]>(gemPurchaseSave, 'Spelunk');
        gemPurchaseSpelunking[5][12] = -1;
        replaceArrayField(gemPurchaseSave, 'Spelunk', gemPurchaseSpelunking);
        const gemPurchases = readArrayField<number[]>(gemPurchaseSave, 'GemItemsPurchased');
        gemPurchases[43] = 1;
        replaceArrayField(gemPurchaseSave, 'GemItemsPurchased', gemPurchases);
        data = processSave(run, data, gemPurchaseSave);
        expect((data.get('spelunking') as Spelunking).automaticToolUse.eligible).toBe(true);

        const insufficientProgressSave = copySave(run.save);
        const insufficientOptions = readArrayField<number[]>(insufficientProgressSave, 'OptLacc');
        insufficientOptions[478] = 14;
        replaceArrayField(insufficientProgressSave, 'OptLacc', insufficientOptions);
        data = processSave(run, data, insufficientProgressSave);
        const autoUse = (data.get('spelunking') as Spelunking).automaticToolUse;
        expect(autoUse.eligible).toBe(false);
        expect(autoUse.fullClearSetting).toBe(saved('OptLacc')[538] === 1);
    });

    it('recalculates source bonuses from varied prepared account inputs', () => {
        const run = freshAccount();
        const owner = run.data.get('spelunking') as Spelunking;
        const ownedBonus = (index: number) => owner.upgrades[index].getBonus();
        const inputs = {
            spelunkingSkillLevelTotal: 85,
            ordinaryDiscoveryCount: 17,
            bestDepthTotal: 237,
            biggestHaulDigitTotal: 42,
            grandDiscoveryCount: 19,
            manicTotalDepth: 73,
            trackometerLevel: 4,
        };

        owner.upgrades.forEach(upgrade => upgrade.updateSourceBonus(inputs));
        expect(owner.upgrades[0].sourceBonus).toBe(ownedBonus(0) * 85);
        expect(owner.upgrades[1].sourceBonus).toBe(ownedBonus(1) * (1 + 5 * 17 / 100));
        expect(owner.upgrades[2].sourceBonus).toBe(ownedBonus(2) * (2 + 237 / 100));
        expect(owner.upgrades[3].sourceBonus).toBe(ownedBonus(3) * (1 + 3 * 42 / 100));
        expect(owner.upgrades[8].sourceBonus).toBe(ownedBonus(8) * (1 + 85 / 100));
        expect(owner.upgrades[9].sourceBonus).toBe(ownedBonus(9) * (1 + 237 / 100));
        expect(owner.upgrades[10].sourceBonus).toBe(ownedBonus(10) * (1 + 5 * 17 / 100));
        [44, 45, 46].forEach(index => {
            expect(owner.upgrades[index].sourceBonus).toBe(ownedBonus(index) * 19);
        });
        [54, 55, 56].forEach(index => {
            expect(owner.upgrades[index].sourceBonus).toBe(ownedBonus(index) * (1 + 5 * 73 / 100));
        });
        [59, 60, 61].forEach(index => {
            expect(owner.upgrades[index].sourceBonus).toBe(ownedBonus(index) * 4);
        });

        const zeroInputs = { ...inputs, spelunkingSkillLevelTotal: 0, ordinaryDiscoveryCount: 0,
            bestDepthTotal: 0, biggestHaulDigitTotal: 0, grandDiscoveryCount: 0,
            manicTotalDepth: 0, trackometerLevel: 0 };
        owner.upgrades.forEach(upgrade => upgrade.updateSourceBonus(zeroInputs));
        expect(owner.upgrades[0].sourceBonus).toBe(0);
        expect(owner.upgrades[1].sourceBonus).toBe(ownedBonus(1));
        expect(owner.upgrades[2].sourceBonus).toBe(ownedBonus(2) * 2);
        expect(owner.upgrades[3].sourceBonus).toBe(ownedBonus(3));
        [44, 45, 46].forEach(index => expect(owner.upgrades[index].sourceBonus).toBe(0));
        [59, 60, 61].forEach(index => expect(owner.upgrades[index].sourceBonus).toBe(0));
    });

    it('replaces source bonus inputs from an isolated changed save copy', () => {
        const run = freshAccount();
        const changedSave = copySave(run.save);
        const changedSpelunking = readArrayField<(number | string)[][]>(changedSave, 'Spelunk');
        changedSpelunking[1] = Array.from(changedSpelunking[1] ?? [], (_, index) => index * 10);
        changedSpelunking[2] = [1, 10, 100, 1000, 0];
        changedSpelunking[6] = [];
        changedSpelunking[44] = Array.from(changedSpelunking[44] ?? [], (_, index) => index === 0 ? 2 : 0);
        changedSpelunking[4] = [...(changedSpelunking[4] ?? [])];
        changedSpelunking[4][3] = 2;
        changedSpelunking[4][4] = 3;
        replaceArrayField(changedSave, 'Spelunk', changedSpelunking);

        const playerNames = readArrayField<string[]>(changedSave, 'playerNames');
        playerNames.forEach((_, playerID) => {
            const skillLevels = readArrayField<(number | string)[]>(changedSave, `Lv0_${playerID}`);
            skillLevels[SkillsIndex.Spelunking] = playerID === 0 ? 120 : playerID === 1 ? -5 : 0;
            replaceArrayField(changedSave, `Lv0_${playerID}`, skillLevels);
        });

        const data = processSave(run, run.data, changedSave);
        const owner = data.get('spelunking') as Spelunking;
        const skillTotal = playerNames.length > 0 ? 120 : 0;
        const depthTotal = changedSpelunking[1].slice(0, 10)
            .reduce((total, depth) => total + Number(depth), 0);
        const haulDigitTotal = [1, 10, 100, 1000, 0].reduce((total, haul) =>
            total + Math.ceil(Math.log(Math.max(haul, 1)) / 2.30259), 0);
        const grandCount = 2;

        expect(owner.spelunkingSkillLevelTotal).toBe(skillTotal);
        expect(owner.bestDepthTotal).toBe(depthTotal);
        expect(owner.biggestHaulDigitTotal).toBe(haulDigitTotal);
        expect(owner.getTotalDiscoveries()).toBe(0);
        expect(owner.grandDiscoveryCount).toBe(grandCount);
        expect(owner.exaltedStampFragments).toBe(2);
        expect(owner.prismaBubblesFound).toBe(3);
        expect(owner.exaltDropChanceDenominator).toBe(
            60 * Math.pow(8, 2) / (1 + owner.getUpgradeBonus(27) / 100)
        );
        expect(owner.prismaDropChanceDenominator).toBe(
            100 * Math.pow(1.5, 3) / (1 + owner.getUpgradeBonus(28) / 100)
        );
        expect(owner.upgrades[0].sourceBonus).toBe(owner.getUpgradeBonus(0) * skillTotal);
        expect(owner.upgrades[2].sourceBonus).toBe(owner.getUpgradeBonus(2) * (2 + depthTotal / 100));
        expect(owner.upgrades[3].sourceBonus).toBe(owner.getUpgradeBonus(3) * (1 + 3 * haulDigitTotal / 100));
        expect(owner.upgrades[1].sourceBonus).toBe(owner.getUpgradeBonus(1));
        [44, 45, 46].forEach(index => {
            expect(owner.upgrades[index].sourceBonus).toBe(owner.getUpgradeBonus(index) * grandCount);
        });
    });

    it('prepares quotes from account producers and refreshes them for changed first-user input', () => {
        const run = freshAccount();
        let data = run.data;
        const owner = data.get('spelunking') as Spelunking;
        const players = data.get('players') as Player[];
        const savedPlayerNames = readArrayField<string[]>(run.save, 'playerNames');
        const firstSavedPlayer = players.find(player => player.playerName === savedPlayerNames[0]);
        expect(firstSavedPlayer).toBeDefined();
        const firstPlayer = firstSavedPlayer!;
        const firstLevelSave = copySave(run.save);
        const firstPlayerSkillLevels = readArrayField<(number | string)[]>(
            firstLevelSave, `Lv0_${firstPlayer.playerID}`
        );
        const oldSkillLevel = Number(firstPlayerSkillLevels[SkillsIndex.Spelunking]);
        const newSkillLevel = oldSkillLevel < 50 ? 50 : 0;
        firstPlayerSkillLevels[SkillsIndex.Spelunking] = newSkillLevel;
        replaceArrayField(firstLevelSave, `Lv0_${firstPlayer.playerID}`, firstPlayerSkillLevels);

        const initialCost = owner.upgrades[0].nextCost;
        expect(initialCost).toBeDefined();
        const cooking = data.get('cooking') as Cooking;
        const mealBonus = cooking.getMealBonusForKey('SplkUpg');
        const oldMealScale = Math.min(2, Math.max(1, 1 + Math.floor(oldSkillLevel / 50)));
        const newMealScale = Math.min(2, Math.max(1, 1 + Math.floor(newSkillLevel / 50)));

        data = processSave(run, data, firstLevelSave);
        const updatedOwner = data.get('spelunking') as Spelunking;
        const updatedCost = updatedOwner.upgrades[0].nextCost;
        expect(updatedCost).toBeDefined();
        if (mealBonus > 0 && oldMealScale !== newMealScale) {
            expect(updatedCost).not.toBe(initialCost);
        }
        expect(updatedOwner.canAffordUpgrade(updatedOwner.upgrades[0], 0)).toBe(true);
        updatedOwner.prepareUpgradePrices(undefined);
        expect(updatedOwner.upgrades.every(upgrade => upgrade.nextCost === undefined
            && upgrade.costToMax === undefined && upgrade.costNext10 === undefined)).toBe(true);

        const noAmberSave = copySave(firstLevelSave);
        const noAmberSpelunking = readArrayField<(number | string)[][]>(noAmberSave, 'Spelunk');
        noAmberSpelunking[4][0] = 0;
        replaceArrayField(noAmberSave, 'Spelunk', noAmberSpelunking);
        data = processSave(run, data, noAmberSave);
        const noAmberOwner = data.get('spelunking') as Spelunking;
        expect(noAmberOwner.ownedAmber).toBe(0);
        expect(noAmberOwner.upgrades[0].nextCost).toBe(updatedCost);
        expect(noAmberOwner.canAffordUpgrade(noAmberOwner.upgrades[0])).toBe(false);
    });

    it('keeps Part 3 observations stable across fresh factories and repeated normal processing', () => {
        const first = freshAccount();
        const firstSnapshot = part3Snapshot(first.data);
        const second = freshAccount();
        expect(part3Snapshot(second.data)).toBe(firstSnapshot);
        expect(second.data.get('spelunking')).not.toBe(first.data.get('spelunking'));

        let data = first.data;
        for (let pass = 0; pass < 2; pass++) {
            data = first.process(data, first.save, first.save.get('playerNames'),
                normalizeCompanionStates(first.save.get('companions')), first.save.get('servervars'), true).getData();
            expect(part3Snapshot(data)).toBe(firstSnapshot);
        }
    });

});
