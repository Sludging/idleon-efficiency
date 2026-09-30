import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory';

type OutpostRankType = 0 | 2 | 4;

const saveName = 'latest';
const extractionResultsName = 'royal-armory-outpost-experience-rank-data.json';
// Row 1 reaches rank 11 on track 0, so every passed requirement and the first unmet one are direct inputs.
const formulaCases: { rank: number; rankType: OutpostRankType }[] = [
    ...Array.from({ length: 12 }, (_, rank) => ({ rank, rankType: 0 as const })),
    { rank: 0, rankType: 2 },
    { rank: 0, rankType: 4 },
];

describe('Royal Armory outpost-rank direct parameters', () => {
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        royalArmory = loadGameDataFromSave(saveName).get('royalArmory') as RoyalArmory;
    });

    formulaCases.forEach(({ rank, rankType }) => {
        it(`matches the experience requirement for track ${rankType}, rank ${rank}`, () => {
            const extractionResults = loadExtractionResults(extractionResultsName);
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(
                extractionResults,
                `royal_armory_outpost_experience_formula_rank_${rank}_type_${rankType}`,
            );
            const domainValue = royalArmory.getOutpostExperienceFormula(rank, rankType);

            expect(domainValue).toMatchLiveGame(liveValue, 0);
        });
    });
});
