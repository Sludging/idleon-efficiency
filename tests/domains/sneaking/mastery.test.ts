import { Sneaking } from '../../../data/domain/world-6/sneaking';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

type NativeMasteryProgression = {
    selectedMastery: number;
    completedMasteries: number;
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

    it('marks existing rewards within completed Masteries as earned', () => {
        expect(sneaking.masteryRewards.slice(0, native.completedMasteries).every(reward => reward.earned)).toBe(true);
    });

    it('leaves existing rewards beyond completed Masteries locked', () => {
        const lockedRewards = sneaking.masteryRewards.slice(native.completedMasteries);
        expect(lockedRewards.every(reward => !reward.earned)).toBe(true);
    });
});
