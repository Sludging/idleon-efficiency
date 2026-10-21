import type { Compass } from '../../../data/domain/compass';
import type { MasterClasses } from '../../../data/domain/masterClasses';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'compass-upgrade-cost-data.json';

const compassBonusParameters = [
    [36, 'compass_bonus_36', 'Knockoff Compass general cost reduction'],
    [77, 'compass_bonus_77', 'Abomination Slayer XVIII general cost reduction'],
    [151, 'compass_bonus_151', 'Sneaky Sale I reduction for Moon of Sneak'],
    [152, 'compass_bonus_152', 'Sneaky Sale II reduction for Moon of Sneak'],
    [153, 'compass_bonus_153', 'Sneaky Sale III reduction for Moon of Sneak'],
    [154, 'compass_bonus_154', 'Printer Sale I reduction for Moon of Print'],
    [156, 'compass_bonus_156', 'Printer Sale II reduction for Moon of Print'],
    [155, 'compass_bonus_155', 'Damage Sale I reduction for Moon of Damage'],
    [157, 'compass_bonus_157', 'Damage Sale II reduction for Moon of Damage'],
    [158, 'compass_bonus_158', 'Damage Sale III reduction for Moon of Damage'],
    [159, 'compass_bonus_159', 'Snoozer Sale I reduction for Moon of Sleep'],
    [160, 'compass_bonus_160', 'Snoozer Sale II reduction for Moon of Sleep'],
    [161, 'compass_bonus_161', 'Snoozer Sale III reduction for Moon of Sleep'],
    [168, 'compass_bonus_168', 'Snoozer Sale IV reduction for Moon of Sleep'],
    [162, 'compass_bonus_162', 'Experience Sale I reduction for Moon of Experience'],
    [163, 'compass_bonus_163', 'Experience Sale II reduction for Moon of Experience'],
    [164, 'compass_bonus_164', 'Experience Sale III reduction for Moon of Experience'],
    [166, 'compass_bonus_166', 'Experience Sale IV reduction for Moon of Experience'],
    [167, 'compass_bonus_167', 'Experience Sale V reduction for Moon of Experience'],
    [165, 'compass_bonus_165', 'Pristine Sale I reduction for Pristine Collector'],
    [169, 'compass_bonus_169', 'Pristine Sale II reduction for Pristine Collector'],
] as const;

describe('Compass upgrade cost direct parameters', () => {
    let compass: Compass;
    let masterClasses: MasterClasses;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave(saveName);
        compass = gameData.get('compass') as Compass;
        masterClasses = gameData.get('masterClasses') as MasterClasses;
    });

    it('matches the whole shared Master Classes upgrade cost multiplier', () => {
        expect(masterClasses.getUpgradeCostMultiplier()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'masterclasses_upgrade_cost_multiplier'),
            0,
        );
    });

    it('matches the whole first-three Master Classes upgrade cost multiplier', () => {
        expect(masterClasses.getFirstThreeUpgradeCostMultiplier()).toMatchLiveGame(
            getExtractedValue(extractionResults, 'first_three_upgrade_cost_multiplier'),
            0,
        );
    });

    it.each(compassBonusParameters.map(([upgradeId, extractionKey, mechanic]) => ({
        upgradeId, extractionKey, mechanic,
    })))('matches whole $mechanic', ({ upgradeId, extractionKey }) => {
        const upgrade = compass.upgrades[upgradeId];

        expect(upgrade.getBonus(compass.upgrades)).toMatchLiveGame(
            getExtractedValue(extractionResults, extractionKey),
            0,
        );
    });
});
