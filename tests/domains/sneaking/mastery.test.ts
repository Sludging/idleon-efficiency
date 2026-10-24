import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NativeMasteryProgression = {
    selectedMastery: number;
    completedMasteries: number;
    earnedRewardCount: number;
};

describe('Sneaking Mastery reward progression', () => {
    let sneaking: Sneaking;
    let native: NativeMasteryProgression;

    beforeAll(() => {
        const results: ExtractionResults = loadExtractionResults('sneaking-mastery-data.json');
        validateExtractionHealth(results);
        native = results.extractions.mastery_progression.result as NativeMasteryProgression;
        sneaking = loadGameDataFromSave('latest').get('sneaking') as Sneaking;
    });

    it('shows the current tower difficulty without replacing earned progression', () => {
        expect(sneaking.selectedMastery).toMatchLiveGameWithDetails(native.selectedMastery, {
            tolerance: 0,
            context: 'Current Mastery difficulty shown with ninja detection',
        });
    });

    it('retains the real account earned reward boundary', () => {
        const rewards = sneaking.masteryRewards.filter(reward => reward.earned);
        expect(rewards.length).toMatchLiveGameWithDetails(native.earnedRewardCount, {
            tolerance: 0,
            context: 'Earned Mastery card count from the source-backed native reward boundary',
        });
        expect(sneaking.masteryRewards.slice(0, native.earnedRewardCount).every(reward => reward.earned)).toBe(true);
    });

    it('leaves every reward after the real earned boundary locked', () => {
        // The native reward panel first conceals the row at the completed-count boundary.
        // Compare the locked suffix without copying the per-row unlock formula.
        const lockedRewards = sneaking.masteryRewards.slice(native.earnedRewardCount);
        expect(lockedRewards.every(reward => !reward.earned)).toBe(true);
    });
});
