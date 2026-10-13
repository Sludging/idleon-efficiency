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
        mechanic: 'Arcanist Damage current purchase price',
    },
    {
        upgradeId: 49,
        label: 'tesseract_upgrade_cost_49',
        mechanic: 'Massivon Hoarding current purchase price with its Silver Tachyon discount active',
    },
    {
        upgradeId: 57,
        label: 'tesseract_upgrade_cost_57',
        mechanic: 'Universe Talent current purchase price at its saved zero-owned-level state',
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
        it(`matches prepared ${mechanic}`, () => {
            const selectedUpgrade = tesseract.upgrades[upgradeId];
            expect(selectedUpgrade.cost).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, label),
                {
                    tolerance: 0,
                    context: `${mechanic}; upgrade ${upgradeId}, owned level ${selectedUpgrade.level}`,
                },
            );
        });

        it(`matches quoted ${mechanic}`, () => {
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

    // The game returns a raw quote at cap, but its purchase gate prevents another purchase.
    // The website exposes the actionable price as zero.
    it('keeps Prisma Bubble actionable prepared cost at zero when capped', () => {
        expect(tesseract.upgrades[3].cost).toBe(0);
    });

    it('keeps Prisma Bubble actionable quote at zero when capped', () => {
        expect(tesseract.upgrades[3].getCost(tesseract.upgrades)).toBe(0);
    });
});
