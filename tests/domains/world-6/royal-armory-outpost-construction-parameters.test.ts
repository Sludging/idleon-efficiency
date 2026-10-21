import { HandleRawDataKey } from '../../../data/domain/base/domain';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadTestSave } from '../../utils/cloudsave-loader';

describe('Outpost world availability direct parameters', () => {
    let armory: RoyalArmory;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-construction-data.json');
        validateExtractionHealth(results);
        const save = loadTestSave('latest');
        const characterCount = (save.get('playerNames') as string[]).length;
        armory = new RoyalArmory('royalArmory').init([], characterCount);
        const parseData = new Map<string, unknown>([['royalArmory', armory]]);
        armory.getRawKeys().forEach(raw => HandleRawDataKey(raw, parseData, save, characterCount));
        armory.parse(parseData);
    });

    // Every contribution used directly by MapWorldsUnlocked, including locked expansions.
    [2, 3, 4, 5, 6, 7, 8].forEach(index => {
        it(`matches Kingdom Expansion upgrade ${index} contribution to available Outpost worlds`, () => {
            expect(armory.getUpgradeBonus(index)).toMatchLiveGame(
                getExtractedValue(results, `expansion_bonus_${index}`), 0,
            );
        });
    });
});
