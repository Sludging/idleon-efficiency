import { loadTestGameData } from '../utils/test-data-loader';
import { expectCalculationToMatch } from '../utils/calculation-helpers';
import { Tesseract, TesseractType } from '../../data/domain/tesseract';

describe('Tesseract Domain Calculations', () => {
    const testCases = [
        { saveName: 'sludger-20250628', description: 'Save with tesseract data' }
    ];

    // Skip tests if no test cases available
    if (testCases.length === 0) {
        it('should have test cases when tesseract save data is available', () => {
            console.warn('No tesseract test cases defined - add save data to enable tests');
            expect(true).toBe(true); // Placeholder to prevent empty test suite
        });
        return;
    }

    testCases.forEach(({ saveName, description }) => {
        describe(`${description} (${saveName})`, () => {
            let gameData: Map<string, any>;
            let tesseract: Tesseract;
            let expectedResults: any;
            
            beforeAll(() => {
                gameData = loadTestGameData(saveName);
                tesseract = gameData.get('tesseract') as Tesseract;
                expectedResults = require(`../fixtures/expected-results/tesseract/${saveName}.json`);
            });

            it('loads tesseract data correctly', () => {
                expect(tesseract).toBeDefined();
                expect(expectedResults).toBeDefined();
                expect(tesseract.upgrades.length).toBeGreaterThan(0);
            });

            describe('Basic Structure Tests', () => {
                it('should have upgrades loaded', () => {
                    expect(tesseract.upgrades).toBeDefined();
                    expect(tesseract.upgrades.length).toBeGreaterThan(0);
                });

                it('should have tachyon counts', () => {
                    expect(tesseract.resources[TesseractType.Purple]).toBeDefined();
                    expect(tesseract.resources[TesseractType.Brown]).toBeDefined();
                    expect(tesseract.resources[TesseractType.Green]).toBeDefined();
                    expect(tesseract.resources[TesseractType.Red]).toBeDefined();
                    expect(tesseract.resources[TesseractType.Silver]).toBeDefined();
                    expect(tesseract.resources[TesseractType.Gold]).toBeDefined();
                });

                it('should calculate total tesseract level', () => {
                    expect(tesseract.totalTesseractLevel).toBeDefined();
                    expect(tesseract.totalTesseractLevel).toBeGreaterThanOrEqual(0);
                });
            });

            describe('Upgrade Bonus Calculations', () => {
                it('calculates upgrade bonuses correctly', () => {
                    if (!expectedResults.upgradeBonuses || expectedResults.upgradeBonuses.length === 0) {
                        throw new Error('No valid upgrade bonus test data found - please provide at least one expected upgrade bonus value.');
                    }

                    expectedResults.upgradeBonuses.forEach((expected: any) => {
                        const upgrade = tesseract.upgrades[expected.id];
                        const actualBonus = upgrade.bonus;
                        
                        expectCalculationToMatch(
                            actualBonus,
                            expected.bonus,
                            0.05,
                            `Upgrade ${expected.id} (${upgrade.data.name}) bonus`
                        );
                    });
                });
            });

            describe('Upgrade Cost Calculations', () => {
                it('calculates upgrade costs correctly', () => {
                    if (!expectedResults.upgradeCosts || expectedResults.upgradeCosts.length === 0) {
                        console.warn('No upgrade cost test data found - skipping upgrade cost tests');
                        return;
                    }

                    expectedResults.upgradeCosts.forEach((expected: any) => {
                        const upgrade = tesseract.upgrades[expected.id];
                        const actualCost = upgrade.cost;
                        
                        expectCalculationToMatch(
                            actualCost,
                            expected.nextLevelCost,
                            0.05,
                            `Upgrade ${expected.id} (${upgrade.data.name}) next level cost`
                        );
                    });
                });
            });

            describe('Utility Method Tests', () => {
                it('should set unlock status correctly', () => {
                    tesseract.upgrades.forEach(upgrade => {
                        const expectedUnlocked = tesseract.totalTesseractLevel >= upgrade.data.unlock_req;
                        expect(upgrade.unlocked).toBe(expectedUnlocked);
                    });
                });
            });
        });
    });
}); 
