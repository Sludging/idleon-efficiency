import type { Tesseract } from '../../../data/domain/tesseract';
import type { ExtractionResults } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import {
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';

const saveName = 'latest';
const extractionResultsName = 'tesseract-upgrade-cost-data.json';
const currentPrices = [
    {
        upgradeId: 0,
        label: 'tesseract_upgrade_cost_0',
        mechanic: 'Arcanist Damage current actionable purchase price',
    },
    {
        upgradeId: 49,
        label: 'tesseract_upgrade_cost_49',
        mechanic: 'Massivon Hoarding current actionable purchase price',
    },
    {
        upgradeId: 57,
        label: 'tesseract_upgrade_cost_57',
        mechanic: 'Universe Talent current actionable purchase price',
    },
] as const;

describe('Tesseract upgrade purchase costs', () => {
    let tesseract: Tesseract;
    let extractionResults: ExtractionResults;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        const gameData: Map<string, unknown> = loadGameDataFromSave(saveName);
        tesseract = gameData.get('tesseract') as Tesseract;
    });


    currentPrices.forEach(({ upgradeId, label, mechanic }) => {
        it(`matches calculated ${mechanic}`, () => {
            const selectedUpgrade = tesseract.upgrades[upgradeId];
            expect(selectedUpgrade.cost).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, label),
                {
                    tolerance: 0,
                    context: `${mechanic}; upgrade ${upgradeId}, owned level ${selectedUpgrade.level}`,
                },
            );
        });

        it(`matches public quote for ${mechanic}`, () => {
            const selectedUpgrade = tesseract.upgrades[upgradeId];
            expect(selectedUpgrade.getCost(tesseract.upgrades)).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, label),
                {
                    tolerance: 0,
                    context: `${mechanic}; upgrade ${upgradeId}, owned level ${selectedUpgrade.level}`,
                },
            );
        });
    });

});
