import type * as SaveLoader from '../../utils/cloudsave-loader';
import type * as Pipeline from '../../../data/domain/idleonData';
import { Cloudsave } from '../../../data/domain/cloudsave';
import type { Spelunking } from '../../../data/domain/world-7/spelunking';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { saved } from './part-2-test-helpers';

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
            owner.elixirs.consumptionReduction],
        manic: [owner.manic.unlocked, owner.manic.enabled, owner.manic.depthByTunnel, owner.manic.totalDepth,
            owner.manic.staminaCostMultiplier, [54, 55, 56].map(index => owner.getEffectiveUpgradeBonus(index))],
        overstim: [owner.overstim.unlocked, owner.overstim.level, owner.overstim.fill, owner.overstim.threshold,
            owner.overstim.bonusPerLevel, owner.overstim.bonus, owner.overstim.amberMultiplier],
        trackometer: [owner.trackometer.level, owner.trackometer.fill, owner.trackometer.threshold, owner.trackometer.unlocked,
            [59, 60, 61].map(index => owner.getEffectiveUpgradeBonus(index))],
    });
}

describe('Spelunking Part 3 normal account factory and repeated processing', () => {
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
