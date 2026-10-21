import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const resultFile = 'royal-armory-statues-data.json';
const statueCases = [
    { index: 0, description: 'restored Damage statue parchment upgrade with a rounded positive chance' },
    { index: 2, description: 'covered Frosty statue marble restoration with zero current bonus' },
] as const;

describe('Royal Statue bonuses and attempts', () => {
    let results: ExtractionResults;
    let armory: RoyalArmory;

    beforeAll(() => {
        results = loadExtractionResults(resultFile);
        validateExtractionHealth(results);
        const gameData = loadGameDataFromSave('latest');
        armory = gameData.get('royalArmory') as RoyalArmory;
    });

    statueCases.forEach(({ index, description }) => {
        it(`matches the ${description}`, () => {
            const statue = armory.statues.find(candidate => candidate.index === index);
            if (!statue) throw new Error(`Missing Royal Statue ${index} after account processing.`);

            for (const [value, key, effect] of [
                [statue.getBonus(), `statue_bonus_${index}`, 'current bonus'],
                [statue.getSuccessChance(), `statue_chance_${index}`, 'fractional success chance'],
                [Number(statue.isAffordable()), `statue_affordable_${index}`, 'balance-only affordability'],
            ] as const) {
                expect(value).toMatchLiveGameWithDetails(getExtractedValue(results, key), {
                    tolerance: 0,
                    context: `${description}: ${effect}`,
                    debugInfo: { level: statue.level },
                });
            }
        });
    });
});
