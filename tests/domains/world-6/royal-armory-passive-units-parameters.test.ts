import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

const saveName = 'latest';
const rankCases = [
    {
        mapIndex: 1,
        extractionResultsName: 'royal-armory-outpost-experience-rank-data.json',
        extractionKey: 'royal_armory_outpost_experience_rank_row_1_type_2',
    },
    {
        mapIndex: 53,
        extractionResultsName: 'royal-armory-passive-units-data.json',
        extractionKey: 'royal_armory_passive_units_rank_row_53_type_2',
    },
];

describe('Royal Armory passive-unit rank parameters', () => {
    let royalArmory: RoyalArmory;
    const extractionResultsByFile: Record<string, ExtractionResults | undefined> = {};

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    rankCases.forEach(({ mapIndex, extractionResultsName, extractionKey }) => {
        it(`matches the worker-granting rank for outpost row ${mapIndex}`, () => {
            let extractionResults = extractionResultsByFile[extractionResultsName];
            if (!extractionResults) {
                extractionResults = loadExtractionResults(extractionResultsName);
                extractionResultsByFile[extractionResultsName] = extractionResults;
            }
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(extractionResults, extractionKey);
            const domainValue = royalArmory.getOutpostExperienceRank(mapIndex, 2);

            expect(domainValue).toMatchLiveGame(liveValue, 0);
        });
    });
});
