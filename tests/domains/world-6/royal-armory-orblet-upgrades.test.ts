/**
 * Approved correctness case #429: read-only Orblet upgrade list after normal
 * processing of the paired real account. Prices/raw bonuses are game calls;
 * ordinary previews use the source's bonus formula at the real level + 1.
 * No purchase/map eligibility or fabricated saved-state coverage is implied.
 */
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { updateIdleonData } from '../../../data/domain/idleonData';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import {
    RoyalArmory,
    RoyalArmoryOrbletMarketBonus,
} from '../../../data/domain/world-6/royalArmory';

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

// Generic list consumer: no identity/type branch chooses its optional fields.
function presentation(upgrade: RoyalArmoryOrbletMarketBonus) {
    return {
        level: upgrade.getLevel(),
        maxLevel: upgrade.getMaxLevel(),
        nextBonus: upgrade.getNextBonus(),
        nextDescription: upgrade.getNextBonusDescription(),
    };
}

describe('Royal Armory Orblet upgrade data', () => {
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
            { tolerance: 0, context: `${context}: raw numeric current bonus` },
        );
    }

    function assertNextBonus(upgrade: RoyalArmoryOrbletMarketBonus): void {
        const nextBonus = upgrade.getNextBonus();
        if (upgrade.index === 4) {
            expect(nextBonus).toBeUndefined();
            return;
        }
        // -1 encodes absent preview in the numeric-only extraction loader;
        // it is not a bonus value or a mutated game level. See the config.
        const expected = getExtractedValue(extractionResults, `orblet_market_next_bonus_${upgrade.index}`);
        if (expected === -1) {
            expect(nextBonus).toBeUndefined();
        } else {
            expect(nextBonus).toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: `Orblet entry ${upgrade.index}: next effect at the real saved level + 1, even when progression-locked`,
            });
        }
    }

    marketRows.forEach(({ index, name }) => {
        it(`shows the game's current ${name} price even when locked or capped`, () => {
            expect(upgradeAt(index).getCost()).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, `orblet_market_cost_${index}`),
                { tolerance: 0, context: `${name}: current Orblet price` },
            );
        });

        if (index === 4) {
            it('preserves Glorification raw numeric compatibility without presenting a passive effect', () => {
                const expected = getExtractedValue(extractionResults, 'orblet_market_bonus_4');
                // Ordinary raw effects remain in the intact existing core suite.
                expect(royalArmory.getOrbletMarketBonus(index)).toMatchLiveGameWithDetails(expected, {
                    tolerance: 0,
                    context: 'Glorification: established numeric calculation API remains unchanged',
                });
            });
        }

        it(`keeps the ${name} progression gate independent of its balance`, () => {
            const expected = getExtractedValue(extractionResults, `orblet_market_unlocked_${index}`);
            expect(Number(upgradeAt(index).isUnlocked())).toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: index === 5
                    ? 'Intervene: immediately preceding Glorification saved cell, not the preceding ordinary entry'
                    : `${name}: first entry or immediately preceding saved-level progression gate`,
            });
        });

        it(`reports only whether the real Orblet balance covers the ${name} price`, () => {
            const gameBalance = getExtractedValue(extractionResults, 'calculationStorage.amountInStorageOrblet');
            const gameCost = getExtractedValue(extractionResults, `orblet_market_cost_${index}`);
            const affordable = upgradeAt(index).isAffordable(royalArmory.getOrbletsOwned());
            expect(Number(affordable)).toMatchLiveGameWithDetails(Number(gameBalance >= gameCost), {
                tolerance: 0,
                context: `${name}: balance >= exact source price; no unlock, cap, or map eligibility condition`,
            });
        });

        it(`previews ${name} without changing its current price or raw numeric effect`, () => {
            const upgrade = upgradeAt(index);
            assertCurrentValues(upgrade, name);
            assertNextBonus(upgrade);
            upgrade.getNextBonusDescription();
            assertCurrentValues(upgrade, `${name} after preview`);
        });
    });

    it('exposes the settled real Orblet balance used by upgrade affordability', () => {
        expect(royalArmory.getOrbletsOwned()).toMatchLiveGameWithDetails(
            getExtractedValue(extractionResults, 'calculationStorage.amountInStorageOrblet'),
            { tolerance: 0, context: 'Account-list Orblet balance after normal late preparation' },
        );
    });

    marketRows.filter(({ index }) => index !== 4).forEach(({ index, name }) => {
        it(`presents ${name} as ordinary level progress with an optional next effect`, () => {
            const display = presentation(upgradeAt(index));
            expect(display.level).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, `orblet_market_display_level_${index}`),
                { tolerance: 0, context: `${name}: player-facing current level, not a cleared lifecycle value` },
            );
            const expectedNext = getExtractedValue(extractionResults, `orblet_market_next_bonus_${index}`);
            if (expectedNext === -1) {
                expect(display.nextBonus).toBeUndefined();
                expect(display.nextDescription).toBeUndefined();
            }
        });
    });

    it('omits misleading ordinary level progress and next effects for Glorification', () => {
        const display = presentation(upgradeAt(4));
        expect(display.level).toBeUndefined();
        expect(display.maxLevel).toBeUndefined();
        expect(display.nextBonus).toBeUndefined();
        expect(display.nextDescription).toBeUndefined();
        // The same public list consumer above still presents ordinary levels;
        // raw ID4 numeric compatibility is checked separately, not displayed.
    });

    it('keeps current prices, numeric effects, previews and balance correct when processing the same real account again', () => {
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
                assertCurrentValues(upgrade, `${name}, account processing pass ${pass + 1}`);
                assertNextBonus(upgrade);
                assertCurrentValues(upgrade, `${name}, account processing pass ${pass + 1} after preview`);
            }
            expect(royalArmory.getOrbletsOwned()).toMatchLiveGameWithDetails(
                getExtractedValue(extractionResults, 'calculationStorage.amountInStorageOrblet'),
                { tolerance: 0, context: `Repeated real-account processing pass ${pass + 1}: balance overwrite, not stacking` },
            );
        }
    });
});
