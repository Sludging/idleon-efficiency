import { loadExtractionResults, validateExtractionHealth, getExtractedValue } from '../../utils/live-game-data-loader';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { Emperor } from '../../../data/domain/world-6/emperor';

const saveName = 'latest';
const extractionResultsName = 'emperor-parameters-data.json';

describe('Emperor public results', () => {
    let emperor: Emperor;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        emperor = loadGameDataFromSave(saveName).get('emperor') as Emperor;
    });


    it('matches extracted Showdown, boss health, and attempt outputs', () => {
        const result = loadExtractionResults(extractionResultsName);
        expect(emperor.getCurrentShowdown()).toMatchLiveGameWithDetails(getExtractedValue(result, 'emperor_showdown'), { tolerance: 0, context: 'Current Showdown' });
        expect(emperor.bossHP).toMatchLiveGameWithDetails(getExtractedValue(result, 'emperor_boss_hp'), { tolerance: 0, context: 'Emperor boss HP' });
        expect(emperor.getAttemptsLeft()).toMatchLiveGameWithDetails(getExtractedValue(result, 'emperor_attempts_left'), { tolerance: 0, context: 'Emperor attempts left' });
        expect(emperor.getDisplayedMaxAttempts()).toMatchLiveGameWithDetails(getExtractedValue(result, 'emperor_max_attempts'), { tolerance: 0, context: 'Emperor maximum attempts' });
        expect(emperor.dailyEmperorTries).toMatchLiveGameWithDetails(getExtractedValue(result, 'emperor_daily_tries'), { tolerance: 0, context: 'Daily Emperor tries' });
    });

    // Thingies.1.23.js:240226-243 derives the next award from native saved
    // progress, CustomLists, cached base totals, and the combined producer
    // inputs. These future values are source-derived, not observed transitions.
    it('matches source-derived next-award Showdowns for all bonuses', () => {
        const expectedShowdowns = loadExtractionResults(extractionResultsName)
            .extractions.emperor_next_award_showdowns.result as number[];

        for (const bonus of emperor.emperorBonuses) {
            expect(emperor.getNextAwardShowdown(bonus)).toMatchLiveGameWithDetails(
                expectedShowdowns[bonus.index],
                { tolerance: 0, context: `Next awarded Showdown for Emperor bonus ${bonus.index}` },
            );
        }
    });

    it('matches source-derived cumulative effective totals after each next award', () => {
        const expectedTotals = loadExtractionResults(extractionResultsName)
            .extractions.emperor_next_award_effective_totals.result as number[];

        for (const index of Array.from({ length: 12 }, (_, bonusIndex) => bonusIndex)) {
            expect(emperor.getNextEffectiveBonus(index)).toMatchLiveGameWithDetails(
                expectedTotals[index],
                { tolerance: 0, context: `Cumulative total after next award for Emperor bonus ${index}` },
            );
        }
    });

    it('matches extracted effective Emperor bonus rewards', () => {
        const results = loadExtractionResults(extractionResultsName);
        emperor.emperorBonuses.forEach((bonus, index) => {
            expect(emperor.getEffectiveBonus(index)).toMatchLiveGameWithDetails(
                getExtractedValue(results, `emperor_bonus_${index}`),
                { tolerance: 0, context: `Emperor reward ${index}` },
            );
        });
    });
    it('matches extracted public multiplier contributions', () => {
        expect(emperor.arcaneBonus48).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'arcane_bonus_48'),
            { tolerance: 0, context: 'Arcane upgrade bonus 48 contribution' },
        );
        expect(emperor.arcadeBonus51).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'arcade_bonus_51'),
            { tolerance: 0, context: 'Arcade bonus 51 contribution' },
        );
        expect(emperor.jellyBonus28).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'jelly_bonus_28'),
            { tolerance: 0, context: 'Jelly RoG bonus 28 contribution' },
        );
    });

    it('matches the native combined Emperor reward multiplier', () => {
        const results = loadExtractionResults(extractionResultsName);
        expect(emperor.getCombinedBonusMultiplier()).toMatchLiveGameWithDetails(
            getExtractedValue(results, 'emperor_combined_bonus_multiplier'),
            { tolerance: 0, context: 'Combined Emperor bonus multiplier' },
        );
    });

});

