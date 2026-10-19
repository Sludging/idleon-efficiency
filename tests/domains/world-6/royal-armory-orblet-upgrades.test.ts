import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { updateIdleonData } from '../../../data/domain/idleonData';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalArmoryOrbletMarketBonus } from '../../../data/domain/world-6/royalArmory/orblets';

const saveName = 'latest';
const extractionResultsName = 'royal-armory-orblet-upgrades-data.json';
const marketRows = [
    { index: 0, name: 'Emulsion' },
    { index: 1, name: 'Hydration' },
    { index: 2, name: 'Talented' },
    { index: 3, name: 'Full Clear' },
    { index: 4, name: 'Glorification' },
    { index: 5, name: 'Intervene' },
    { index: 6, name: 'Stronk Rank' },
    { index: 7, name: 'Bargain' },
    { index: 8, name: 'Long Range' },
    { index: 9, name: 'Parchmore' },
] as const;

describe('Royal Armory Orblet upgrade calculations', () => {
    let extractionResults: ExtractionResults;
    let gameData: Map<string, unknown>;
    let royalArmory: RoyalArmory;

    beforeAll(() => {
        extractionResults = loadExtractionResults(extractionResultsName);
        validateExtractionHealth(extractionResults);
        gameData = loadGameDataFromSave(saveName);
        royalArmory = gameData.get('royalArmory') as RoyalArmory;
    });

    function upgradeAt(index: number): RoyalArmoryOrbletMarketBonus {
        const upgrade = royalArmory.orbletMarketBonuses.find(candidate => candidate.index === index);
        if (!upgrade) {
            throw new Error(`Missing selected Orblet market entry ${index} in the normally processed account.`);
        }
        return upgrade;
    }

    function assertCurrentValues(upgrade: RoyalArmoryOrbletMarketBonus, context: string): void {
        expect(upgrade.getCost()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, `orblet_market_cost_${upgrade.index}`),
            { tolerance: 0, context: `${context}: current saved-level price` },
        );
        expect(upgrade.getBonus()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, `orblet_market_bonus_${upgrade.index}`),
            { tolerance: 0, context: `${context}: current numeric bonus` },
        );
    }

    function assertNextBonus(upgrade: RoyalArmoryOrbletMarketBonus): void {
        if (upgrade.index === 4) return;
        const expected = getExtractedValue(extractionResults, `orblet_market_next_bonus_${upgrade.index}`);
        if (expected !== -1) {
            expect(upgrade.getNextBonus()).toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: `Orblet entry ${upgrade.index}: next numeric bonus`,
            });
        }
    }

    marketRows.forEach(({ index, name }) => {
        it(`matches ${name} price and progression gate`, () => {
            const upgrade = upgradeAt(index);
            expect(upgrade.getCost()).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, `orblet_market_cost_${index}`),
                { tolerance: 0, context: `${name}: Orblet price` },
            );
            expect(Number(upgrade.isUnlocked())).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, `orblet_market_unlocked_${index}`),
                { tolerance: 0, context: `${name}: progression gate` },
            );
        });

        it(`matches ${name}${index === 4 ? ' current' : ' current and next'} numeric bonus`, () => {
            const upgrade = upgradeAt(index);
            assertCurrentValues(upgrade, name);
            assertNextBonus(upgrade);
        });
    });

    it('matches the settled real Orblet balance', () => {
        expect(royalArmory.getOrbletsOwned()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'calculationStorage.amountInStorageOrblet'),
            { tolerance: 0, context: 'Orblet balance after normal account processing' },
        );
    });

    marketRows.filter(({ index }) => index !== 4).forEach(({ index, name }) => {
        it(`keeps ${name} price and current bonus unchanged by previews`, () => {
            const upgrade = upgradeAt(index);
            assertCurrentValues(upgrade, name);
            assertNextBonus(upgrade);
            upgrade.getCurrentValue();
            upgrade.getNextValue();
            upgrade.getDescription(true);
            assertCurrentValues(upgrade, `${name} after preview`);
            assertNextBonus(upgrade);
        });
    });

    it('matches prices, bonuses, previews and balance after repeated normal processing', () => {
        const cloudSave = loadTestSave(saveName);
        for (let pass = 0; pass < 2; pass++) {
            if (pass > 0) {
                gameData = updateIdleonData(
                    gameData,
                    cloudSave,
                    cloudSave.get('playerNames'),
                    normalizeCompanionStates(cloudSave.get('companions')),
                    cloudSave.get('servervars'),
                    true,
                ).getData();
                royalArmory = gameData.get('royalArmory') as RoyalArmory;
            }
            for (const { index, name } of marketRows) {
                const upgrade = upgradeAt(index);
                assertCurrentValues(upgrade, `${name}, processing pass ${pass + 1}`);
                if (index !== 4) {
                    assertNextBonus(upgrade);
                    upgrade.getCurrentValue();
                    upgrade.getNextValue();
                    upgrade.getDescription(true);
                    assertCurrentValues(upgrade, `${name}, processing pass ${pass + 1} after preview`);
                    assertNextBonus(upgrade);
                }
            }
            expect(royalArmory.getOrbletsOwned()).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, 'calculationStorage.amountInStorageOrblet'),
                { tolerance: 0, context: `Repeated account processing pass ${pass + 1}: Orblet balance` },
            );
        }
    });
});
