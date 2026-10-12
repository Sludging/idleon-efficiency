import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { OutpostRank, OutpostRankProgress } from '../../../data/domain/world-6/royalArmory/outposts';
import { expectOutpostXpWithinBounds } from '../../utils/outpost-xp-comparison';

const extractionResultsName = 'royal-armory-outpost-experience-rank-data.json';
// Row 1 reaches rank 11 on track 0, so every passed requirement and the first unmet one are direct inputs.
const formulaCases: { rank: number; rankType: OutpostRank }[] = [
    ...Array.from({ length: 12 }, (_, rank) => ({ rank, rankType: OutpostRank.Trading })),
    { rank: 0, rankType: OutpostRank.Command },
    { rank: 0, rankType: OutpostRank.Purity },
];

describe('Royal Armory outpost-rank direct parameters', () => {
    formulaCases.forEach(({ rank, rankType }) => {
        it(`matches the experience requirement for track ${rankType}, rank ${rank}`, () => {
            const extractionResults = loadExtractionResults(extractionResultsName);
            validateExtractionHealth(extractionResults);
            const liveValue = getExtractedValue(
                extractionResults,
                `royal_armory_outpost_experience_formula_rank_${rank}_type_${rankType}`,
            );
            const domainValue = OutpostRankProgress.getExperienceThreshold(rank, rankType);

            expectOutpostXpWithinBounds(domainValue, liveValue);
        });
    });
});
