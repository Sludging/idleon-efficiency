import { Companion, getCompanionActiveBonus } from '../../../data/domain/companions';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { JellyOperator } from '../../../data/domain/world-7/jellyOperator';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { ParameterTestSpec } from '../../utils/parameter-test-config';

const upgradeParameters = [
    { index: 35, extractionKey: 'castle_base_damage_bonus', description: 'Anti-Rodent Power Move I base Royal Castle damage bonus' },
    { index: 36, extractionKey: 'castle_damage_percent_bonus', description: 'Anti-Rodent Power Move II Royal Castle damage percent bonus' },
    { index: 37, extractionKey: 'parchment_unlock_bonus', description: 'Parchment of Enchantment upgrade bonus selecting the probability branch' },
    { index: 38, extractionKey: 'parchment_surplus_bonus', description: 'Parchment Surplus probability percent bonus' },
] as const;

const parameterSpecs: ParameterTestSpec[] = [
    ...upgradeParameters.map(({ index, extractionKey, description }) => ({
        extractionKey,
        description,
        domainExtractor: (gameData: Map<string, unknown>) => (gameData.get('royalArmory') as RoyalArmory).getUpgradeBonus(index),
    })),
    {
        extractionKey: 'orblet_parchment_bonus',
        description: 'Orblet Market parchment probability percent bonus',
        domainExtractor: (gameData) => (gameData.get('royalArmory') as RoyalArmory).getOrbletMarketBonus(9),
    },
    {
        extractionKey: 'companion_parchment_bonus',
        description: 'active companion parchment probability percent bonus',
        domainExtractor: (gameData) => getCompanionActiveBonus(gameData.get('companions') as Companion[], 172),
    },
    {
        extractionKey: 'jelly_parchment_bonus',
        description: 'Jelly Operation parchment probability percent bonus',
        domainExtractor: (gameData) => (gameData.get('jellyOperator') as JellyOperator)
            .obstructions.find(obstruction => obstruction.index === 40)!.getBonus(),
    },
];

describe('Parchment acquisition and Royal Castle damage direct bonus parameters', () => {
    let gameData: Map<string, unknown>;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-parchment-acquisition-data.json');
        validateExtractionHealth(results);
        gameData = loadGameDataFromSave('latest');
    });

    parameterSpecs.forEach(spec => {
        it(`matches the ${spec.description}`, () => {
            expect(spec.domainExtractor(gameData)).toMatchLiveGame(getExtractedValue(results, spec.extractionKey), 0);
        });
    });
});
