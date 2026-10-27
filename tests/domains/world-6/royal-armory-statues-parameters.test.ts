import { Storage } from '../../../data/domain/storage';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const parameterSpecs: Record<string, ParameterTestSpec> = {
    royal_reverence_bonus: {
        description: 'Royal Reverence bonus used by current and next-level statue bonuses',
        extractionKey: 'royal_reverence_bonus',
        domainExtractor: (gameData) => {
            const armory = gameData.get('royalArmory') as RoyalArmory;
            return armory.getUpgradeBonus(45);
        },
    },
    storage_parchment: {
        description: 'settled parchment quantity used by the restored Damage statue upgrade',
        extractionKey: 'storage_parchment',
        domainExtractor: (gameData) => {
            const storage = gameData.get('storage') as Storage;
            return storage.amountInStorage('RGenh');
        },
    },
};

describe('Royal Statue direct bonus and owned-material parameters', () => {
    let gameData: Map<string, unknown>;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-statues-data.json');
        validateExtractionHealth(results);
        gameData = loadGameDataFromSave('latest');
    });

    Object.values(parameterSpecs).forEach(spec => {
        it(`matches the ${spec.description}`, () => {
            const liveValue = getExtractedValue(results, spec.extractionKey);
            const domainValue = spec.domainExtractor(gameData);
            expect(domainValue).toMatchLiveGame(liveValue, 0);
        });
    });
});
