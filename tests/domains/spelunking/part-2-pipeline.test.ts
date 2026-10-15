import type * as SaveLoader from '../../utils/cloudsave-loader';
import type * as Pipeline from '../../../data/domain/idleonData';
import type { Cloudsave } from '../../../data/domain/cloudsave';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { assertPairing, assertPopulatedAccount, snapshot } from './part-2-test-helpers';

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

describe('Spelunking Part 2 normal account factory and repeated calculation', () => {
    beforeAll(assertPairing);

    it('populates chapters, page locations, shared reads, recharge contributors, and every character on two independent factories', () => {
        const first = freshAccount();
        assertPopulatedAccount(first.data);
        const firstSnapshot = snapshot(first.data);
        const second = freshAccount();
        assertPopulatedAccount(second.data);
        expect(snapshot(second.data)).toBe(firstSnapshot);
        expect(second.data.get('spelunking')).not.toBe(first.data.get('spelunking'));
    });

    it('does not stack effects or recharge contributors, or lose saved inputs when the normal pipeline repeats', () => {
        const run = freshAccount();
        assertPopulatedAccount(run.data);
        const initial = snapshot(run.data);
        for (let pass = 0; pass < 2; pass++) {
            run.data = run.process(run.data, run.save, run.save.get('playerNames'),
                normalizeCompanionStates(run.save.get('companions')), run.save.get('servervars'), true).getData();
            assertPopulatedAccount(run.data);
            expect(snapshot(run.data)).toBe(initial);
        }
    });
});
