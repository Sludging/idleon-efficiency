import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { initAllItems } from '../../../data/domain/items';
import { Hole, updateHole } from '../../../data/domain/world-5/hole/hole';
import { initAccountDataKeys, updateIdleonData } from '../../../data/domain/idleonData';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { lavaLog } from '../../../data/utility';
import { Jar } from '../../../data/domain/world-5/hole/jar';

import { getStampBonusForKey } from '../../../data/domain/world-1/stamps';
const saveName = 'latest';

describe('Hole part-five imported state', () => {
    let hole: Hole;
    let gameData: Map<string, any>;
    let jarResults: ExtractionResults;
    let fountainCoveResults: ExtractionResults;

    beforeAll(() => {
        jarResults = loadExtractionResults('hole-part5-jar-data.json');
        fountainCoveResults = loadExtractionResults('hole-part5-fountain-cove-data.json');
        validateExtractionHealth(jarResults);
        validateExtractionHealth(fountainCoveResults);
        gameData = loadGameDataFromSave(saveName);
        hole = gameData.get('hole') as Hole;
    });
    it('resolves Village Majiks by natural catalog identity', () => {
        for (const index of [11, 12, 14]) {
            expect(hole.majiks.villageUpgradesByIndex[index].index).toBe(index);
        }
        expect(hole.measurements.every(
            measurement => measurement.cosmosBonus === hole.majiks.villageUpgradesByIndex[12].getBonus(),
        )).toBe(true);
    });

    it('prepares first-discovery Jar bonus with the imported Legend Talent multiplier', () => {
        const rupieBonus = hole.jar.jarBonuses[0];
        expect(rupieBonus.legendTalentBonus).toBe(1.6);
        expect(rupieBonus.getFirstDiscoveryBonus()).toBe(32);
    });

    it('retains all five complete next-unlock previews after normal Hole import', () => {
        const [polonai, kaipu, cosmo, minau, bolaia] = hole.villagers;
        const requiredLevels = hole.villagers.map(villager => Math.max(1, villager.level + 1));
        expect(hole.villagers.map(villager => villager.nextUnlock)).toEqual([
            {
                kind: 'cavern',
                requiredLevel: requiredLevels[0],
                identities: polonai.level >= hole.studies.length ? [] : [requiredLevels[0] - 1],
                atMaximum: polonai.level >= hole.studies.length,
            },
            {
                kind: 'schematic',
                requiredLevel: requiredLevels[1],
                identities: (() => {
                    const schematicOrder = hole.schematics.map(schematic => schematic.data.order);
                    const schematicLimit = Math.min(105, schematicOrder.length);
                    const currentCount = Math.min(schematicLimit, 1 + 3 * kaipu.level + Math.floor(kaipu.level / 5));
                    const nextCount = Math.min(schematicLimit, 1 + 3 * requiredLevels[1] + Math.floor(requiredLevels[1] / 5));
                    return currentCount >= schematicLimit ? [] : schematicOrder.slice(currentCount, nextCount);
                })(),
                atMaximum: Math.min(hole.schematics.length, 105)
                    <= Math.min(Math.min(hole.schematics.length, 105), 1 + 3 * kaipu.level + Math.floor(kaipu.level / 5)),
            },
            {
                kind: 'majik-point',
                requiredLevel: requiredLevels[2],
                identities: [],
                atMaximum: false,
            },
            {
                kind: 'measurement',
                requiredLevel: requiredLevels[3],
                identities: minau.level >= hole.measurements.length ? [] : [requiredLevels[3] - 1],
                atMaximum: minau.level >= hole.measurements.length,
            },
            {
                kind: 'study-rate',
                requiredLevel: requiredLevels[4],
                identities: [],
                atMaximum: false,
            },
        ]);
        expect(cosmo.nextUnlock.identities).toEqual([]);
        expect(bolaia.nextUnlock.identities).toEqual([]);
    });
    it('assigns a source-verified unit to each released Jar collectible', () => {
        const jar = new Jar();
        const percentageIndexes = [0, 1, 4, 5, 6, 10, 12, 13, 15, 19, 21, 22, 23, 24, 29, 30, 33, 35];
        const multiplierIndexes = [2, 3, 7, 8, 9, 11, 14, 16, 17, 18, 20, 25, 26, 27, 28, 34, 36];

        expect(jar.jarBonuses.filter(bonus => bonus.getUnit() === "percent").map(bonus => bonus.index))
            .toEqual(percentageIndexes);
        expect(jar.jarBonuses.filter(bonus => bonus.getUnit() === "multiplier").map(bonus => bonus.index))
            .toEqual(multiplierIndexes);
    });

    it('summarizes saved Jar board entries by type and quality', () => {
        expect(hole.jar.jarTypes).toHaveLength(10);
        expect(hole.jar.ownedTypeCount).toBe(9);
        expect(hole.jar.boardCapacity).toBe(120);
        const savedBoard = JSON.parse(loadTestSave(saveName).get('Jars') as string) as number[][];
        const savedEntries = savedBoard.slice(0, hole.jar.boardCapacity).filter(entry => entry?.length >= 5);
        const expectedByType = new Map<number, { count: number; quantity: number }>();
        savedEntries.forEach(entry => {
            const [type, quality] = entry;
            const totals = expectedByType.get(type) ?? { count: 0, quantity: 0 };
            totals.count += 1;
            totals.quantity += 10 ** quality;
            expectedByType.set(type, totals);
        });

        const expectedTotals = Array.from(expectedByType.values());
        expect(hole.jar.boardCount).toBe(expectedTotals.reduce((sum, totals) => sum + totals.count, 0));
        expect(hole.jar.quantity).toBe(expectedTotals.reduce((sum, totals) => sum + totals.quantity, 0));
        hole.jar.jarTypes.forEach(jarType => {
            const expected = expectedByType.get(jarType.index) ?? { count: 0, quantity: 0 };
            expect(jarType.boardCount).toBe(expected.count);
            expect(jarType.quantity).toBe(expected.quantity);
        });
        expect(hole.jar.boardCount).toBe(120);
        expect(hole.jar.quantity).toBe(59700);
        expect(hole.jar.jarTypes[4].boardCount).toBe(60);
        expect(hole.jar.jarTypes[4].quantity).toBe(42000);
        expect(hole.jar.jarTypes[8].boardCount).toBe(31);
        expect(hole.jar.jarTypes[8].quantity).toBe(10300);
        expect(hole.jar.jarTypes[9].boardCount).toBe(29);
        expect(hole.jar.jarTypes[9].quantity).toBe(7400);
        expect(hole.jar.board[0]).toEqual({ type: 9, quality: 3, x: 672, y: 312, randomRoll: 0.8404255300769636 });
        expect(hole.jar.holdings).toHaveLength(12);
        expect(hole.jar.nextTypeCost).toBeNull();
    });



    it('maps verified Jar artwork for types, collectibles, and holdings', () => {
        const jar = new Jar();
        expect(jar.jarTypes[9].getImageData()).toEqual({ location: 'HoleJar9', width: 67, height: 71 });
        expect(jar.jarBonuses[39].getImageData()).toEqual({ location: 'HoleJarC39', width: 41, height: 41 });
        expect(jar.getHoldingImageData(11)).toEqual({ location: 'HoleJarR11', width: 25, height: 25 });
    });

    it('matches saved collectible effects against paired game outputs', () => {
        expect(hole.jar.getBonus(4)).toBe(288);
        expect(hole.jar.getBonus(10)).toBe(192);
        expect(hole.jar.getBonus(12)).toBe(240);
        expect(hole.jar.getBonus(16)).toBe(48);
        expect(hole.jar.getBonus(22)).toBe(204.8);
        expect(hole.jar.getBonus(29)).toBe(243.20000000000002);
        expect(hole.jar.getBonus(35)).toBe(192);
        expect(hole.jar.getBonus(1)).toMatchLiveGame(getExtractedValue(jarResults, 'collectible_1'), 0);
        expect(hole.jar.getBonus(15)).toMatchLiveGame(getExtractedValue(jarResults, 'collectible_15'), 0);
        expect(hole.jar.getBonus(24)).toMatchLiveGame(getExtractedValue(jarResults, 'collectible_24'), 0);
    });
    it('matches the prepared Jar Rupie Value against the native formula result', () => {
        expect(hole.jar.rupieValue).toMatchLiveGameWithDetails(getExtractedValue(jarResults, 'jar_rupie_value'), {
            tolerance: 0,
            context: 'current Jar Rupie Value',
        });
    });
    it('matches every prepared Jar Rupie operand against same-context native outputs', () => {
        expect([
            hole.getSchematicBonus(62, 1),
            hole.getSchematicBonus(65, 2),
            hole.getSchematicBonus(68, 4)
        ]).toEqual(jarResults.extractions.rupie_schematics.result);
        expect(hole.earlyExplorerExpUpgrade).toBe(getExtractedValue(jarResults, 'rupie_option_355'));
        expect(hole.lamp.getBonus(true)).toBe(getExtractedValue(jarResults, 'rupie_lamp_99'));
        expect(hole.getMonumentBonus('Wisdom', 1)).toBe(getExtractedValue(jarResults, 'rupie_wisdom_monument'));
        expect([
            hole.measurements[10].effectiveBenefit,
            hole.measurements[14].effectiveBenefit
        ]).toEqual(jarResults.extractions.rupie_measurements.result);
        expect(hole.schematics[80].getIntrinsicBonus())
            .toBe(getExtractedValue(jarResults, 'rupie_evertree_factor'));
        expect(hole.jar.gildedBonusPercent).toBe(getExtractedValue(jarResults, 'rupie_gilded_percent'));
        expect([3, 17, 28, 0, 6, 13, 21, 33].map(index => hole.jar.jarBonuses[index].getBonus()))
            .toEqual(jarResults.extractions.rupie_collectibles.result);
        const stamps = gameData.get('stamps') as Parameters<typeof getStampBonusForKey>[0];
        expect(getStampBonusForKey(stamps, 'CavernRes'))
            .toBe(getExtractedValue(jarResults, 'rupie_stamp_cavern_res'));
        expect(hole.cove.upgrades[14].getBonus())
            .toBe(getExtractedValue(jarResults, 'rupie_cove_upgrade_14'));
    });


    it('matches all available Jar producer inputs and outputs against the paired game', () => {
        expect(hole.jar.producers).toHaveLength(3);
        const gameAssignment = jarResults.extractions.producer_assignment.result as number[];
        hole.jar.producers.forEach((producer, index) => {
            expect(hole.jar.producerAssignments[index].type).toBe(gameAssignment[index]);
            expect(hole.jar.producerAssignments[index].work).toBe(gameAssignment[index + 3]);
            expect(producer.requirement)
                .toMatchLiveGame(getExtractedValue(jarResults, `producer_requirement_${index}`), 0);
            expect(producer.ratePerHour)
                .toMatchLiveGame(getExtractedValue(jarResults, `producer_rate_${index}`), 0);
        });
        expect(hole.jar.requirementBalances[3]).toBe(getExtractedValue(jarResults, 'requirement_balance'));
        expect(hole.measurements[12].effectiveBenefit)
            .toMatchLiveGame(getExtractedValue(jarResults, 'measurement_12'), 0);
        expect(hole.getSchematicBonus(67, 30))
            .toMatchLiveGame(getExtractedValue(jarResults, 'production_upgrade_67'), 0);
        expect(hole.getSchematicBonus(74, 5))
            .toMatchLiveGame(getExtractedValue(jarResults, 'production_upgrade_74'), 0);
        expect(hole.getSchematicBonus(72, 10))
            .toMatchLiveGame(getExtractedValue(jarResults, 'production_upgrade_72'), 0);
    });

    it('keeps part-five outputs stable on repeated updates', () => {
        const jarBonuses = hole.jar.jarBonuses.map(bonus => bonus.getBonus());
        const jarProducers = hole.jar.producers;
        const jarHoldings = hole.jar.holdings;
        const fountainUpgrades = hole.fountain.upgrades.map(upgrade => [
            upgrade.data.waterIndex, upgrade.data.index, upgrade.level, upgrade.marbleizationLevel, upgrade.getBonus(),
            upgrade.data.marbleizeEligible,
        ]);
        const coveUpgrades = hole.cove.upgrades.map(upgrade => [upgrade.level, upgrade.getBonus()]);
        const blueShapeBalances = [...hole.cove.blueShapeBalances];
        const purpleShapeBalances = [...hole.cove.purpleShapeBalances];
        const currencyValue = hole.fountain.getCurrencyValue(0);
        const marbleizeEligibility = hole.fountain.canMarbleize(0, 9);

        updateHole(gameData);
        updateHole(gameData);

        expect(hole.jar.jarBonuses.map(bonus => bonus.getBonus())).toEqual(jarBonuses);
        expect(hole.jar.producers).toEqual(jarProducers);
        expect(hole.jar.holdings).toEqual(jarHoldings);
        expect(hole.fountain.upgrades.map(upgrade => [
            upgrade.data.waterIndex, upgrade.data.index, upgrade.level, upgrade.marbleizationLevel, upgrade.getBonus(),
            upgrade.data.marbleizeEligible,
        ])).toEqual(fountainUpgrades);
        expect(hole.cove.upgrades.map(upgrade => [upgrade.level, upgrade.getBonus()])).toEqual(coveUpgrades);
        expect(hole.fountain.getCurrencyValue(0)).toBe(currencyValue);
        expect(hole.fountain.canMarbleize(0, 9)).toBe(marbleizeEligibility);
        expect(hole.cove.blueShapeBalances).toEqual(blueShapeBalances);
        expect(hole.cove.purpleShapeBalances).toEqual(purpleShapeBalances);
    });

    it('imports every Fountain position, including empty positions and nested mixed stacks', () => {
        const expectedPositions = fountainCoveResults.extractions.stack_positions.result as {
            spaces: number;
            maximumStackSize: number;
            maximumCoins: number;
            occupiedSpaces: number;
            itemCount: number;
            positions: { space: number; itemCurrencyIds: number[]; royal: boolean; itemValues: number[] }[];
            overflowValue0: number;
        };
        const stacks = hole.fountain.stacks;

        expect(stacks).toHaveLength(expectedPositions.positions.length);
        expect(stacks.some(stack => new Set(stack.items.map(item => item.currencyId)).size > 1)).toBe(true);
        expect(stacks.some(stack => stack.items.length === 0)).toBe(true);
        expect(stacks.some(stack => stack.royal)).toBe(true);
        expect(stacks.map(stack => stack.items.map(item => item.currencyId)))
            .toEqual(expectedPositions.positions.map(position => position.itemCurrencyIds));
        expect(stacks.map(stack => stack.royal))
            .toEqual(expectedPositions.positions.map(position => position.royal));
        expect(hole.fountain.getStackItemCount()).toBe(expectedPositions.itemCount);
        expect(hole.fountain.getOccupiedSpaceCount()).toBe(expectedPositions.occupiedSpaces);
        expect(hole.fountain.getCapacity()).toBe(expectedPositions.spaces);
        expect(hole.fountain.getMaximumStackSize()).toBe(expectedPositions.maximumStackSize);
        expect(hole.fountain.getMaximumCoins()).toBe(expectedPositions.maximumCoins);
        expect(hole.fountain.getAvailableSpaceCount()).toBe(
            Math.max(0, expectedPositions.spaces - expectedPositions.occupiedSpaces),
        );
        expect(hole.fountain.currencyValueExponent)
            .toBe(getExtractedValue(fountainCoveResults, 'currency_value_exponent'));
        const extractedExcludedCurrencyIds =
            fountainCoveResults.extractions.excluded_generation_currency_ids.result as string;
        const expectedExcludedCurrencyIds = extractedExcludedCurrencyIds === ''
            ? []
            : extractedExcludedCurrencyIds.split(',').map(Number);
        expect(hole.fountain.excludedGenerationCurrencyIds).toEqual(expectedExcludedCurrencyIds);
        const gameCurrencyValues = fountainCoveResults.extractions.currency_values.result as number[];
        const gameFountainBonusTerms = fountainCoveResults.extractions.fountain_bonus_terms.result as {
            page: number;
            index: number;
            value: number;
        }[];
        gameFountainBonusTerms.forEach(({ page, index, value }) => {
            expect(hole.fountain.getBonus(page, index)).toMatchLiveGame(value, 0);
        });
        expect(hole.fountain.getAllCurrencyMultiplier())
            .toMatchLiveGame(fountainCoveResults.extractions.all_currency_multiplier.result, 0);
        const currency4BaseValue = 1 + hole.fountain.getBonus(1, 3)! *
            (1 + hole.fountain.getBonus(1, 5)! / 100) *
            (1 + lavaLog(hole.fountain.valueWallets[1]!) * hole.fountain.getBonus(1, 19)! / 100);
        expect(currency4BaseValue).toMatchLiveGame(
            fountainCoveResults.extractions.currency_4_base_value.result,
            0,
        );
        const extractedValueWallet = fountainCoveResults.extractions.currency_value_wallet_page_1.result as
            number | { type: 'large_number'; value: string };
        const gameValueWallet = typeof extractedValueWallet === 'number'
            ? extractedValueWallet
            : Number(extractedValueWallet.value);
        expect(hole.fountain.valueWallets[1]).toBe(gameValueWallet);
        expect(lavaLog(hole.fountain.valueWallets[1]!))
            .toBe(fountainCoveResults.extractions.currency_value_wallet_log_page_1.result);
        expect(hole.fountain.desireCurrencyId)
            .toBe(fountainCoveResults.extractions.desire_currency_id.result);
        gameCurrencyValues.forEach((value, currencyId) => {
            expect(hole.fountain.getCurrencyValue(currencyId)).toMatchLiveGame(value, 0);
        });
        const gameRoyalMultiplier = fountainCoveResults.extractions.royal_multiplier.result as number;
        expect(hole.fountain.getBonus(1, 9)).toMatchLiveGame((gameRoyalMultiplier - 5) * 100, 0);
        expect(hole.getSchematicBonus(95, 10))
            .toMatchLiveGame(fountainCoveResults.extractions.stack_bonus_95_10.result, 0);
        stacks.forEach((stack, index) => {
            const expected = expectedPositions.positions[index];
            stack.items.forEach((item, itemIndex) => {
                expect(item.value).toMatchLiveGame(expected.itemValues[itemIndex], 0);
            });
        });
        const expectedCollectionValues = Array.from({ length: 9 }, (_, currencyId) =>
            expectedPositions.positions.reduce((total, position) =>
                total + position.itemCurrencyIds.reduce((stackTotal, itemCurrencyId, itemIndex) =>
                    itemCurrencyId === currencyId ? stackTotal + position.itemValues[itemIndex] : stackTotal, 0), 0));
        expectedCollectionValues.forEach((expected, currencyId) => {
            expect(hole.fountain.getCollectionValue(currencyId)).toMatchLiveGame(expected, 0);
        });
    });



    it('matches the native Cove pickup-double chance', () => {
        expect(hole.getSchematicBonus(100, 25))
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'camp_upgrade_100_25'), 0);
        expect(hole.getSchematicBonus(101, 10))
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'camp_upgrade_101_10'), 0);
        expect(hole.getSchematicBonus(103, 10))
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'camp_upgrade_103_10'), 0);
        expect(hole.getSchematicBonus(105, 10))
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'camp_upgrade_105_10'), 0);
        expect(hole.cove.upgrades[2].getBonus())
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'cove_respawn_upgrade'), 0);
        expect(hole.cove.accountEffects.pickupRandomDoubleChance)
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'cove_pickup_double_chance'), 0);
    });

    it('repeats normal imports without mutating the saved Fountain and Jar inputs', () => {
        const save = loadTestSave(saveName);
        const sourceSnapshot = JSON.stringify(save.toJSON());
        const importNormally = () => updateIdleonData(
            initAccountDataKeys(initAllItems()),
            save,
            save.get('playerNames'),
            normalizeCompanionStates(save.get('companions')),
            save.get('servervars'),
            true,
        ).getData();
        const firstImport = importNormally().get('hole') as Hole;
        const secondImport = importNormally().get('hole') as Hole;

        expect(JSON.stringify(save.toJSON())).toBe(sourceSnapshot);
        expect(secondImport.fountain.stacks).toEqual(firstImport.fountain.stacks);
        expect(secondImport.cove.accountEffects).toEqual(firstImport.cove.accountEffects);
    });
    it('parses Fountain stacks as nested currency rows', () => {
        const savedHoleData = JSON.parse(loadTestSave(saveName).get('Holes') as string) as number[][];
        const parsedStacks = hole.fountain.stacks.map(stack => stack.items.map(item => item.currencyId));

        expect(parsedStacks).toEqual(savedHoleData[29]);
        expect(hole.fountain.stacks).toHaveLength(savedHoleData[29].length);
        expect(hole.fountain.upgrades).toHaveLength(60);
    });

    it('keeps Fountain currencies within nine-wallet scope', () => {

        expect(hole.fountain.currencies).toHaveLength(9);
        expect(hole.fountain.wallets).toHaveLength(9);
        expect(hole.fountain.upgrades).toHaveLength(60);
        expect(hole.fountain.opalProgress).toBe(14);
    });
    it('orders Fountain upgrades by contiguous prerequisite branches without changing catalog records', () => {
        const { upgrades, upgradesInUnlockOrder } = hole.fountain;
        const catalogBonuses = upgrades.map(upgrade => upgrade.getBonus());
        const positions = new Map(upgradesInUnlockOrder.map((upgrade, position) => [upgrade, position]));
        const getChildren = (upgrade: typeof upgrades[number]) => upgrades
            .filter(candidate =>
                candidate.data.waterIndex === upgrade.data.waterIndex
                && candidate.data.prerequisiteIndex === upgrade.data.index);

        expect(upgrades).toHaveLength(60);
        expect(upgradesInUnlockOrder).toHaveLength(60);
        expect(new Set(upgradesInUnlockOrder).size).toBe(60);
        expect(upgradesInUnlockOrder.every(upgrade => upgrades.includes(upgrade))).toBe(true);
        expect(upgrades.map(upgrade => upgrade.getBonus())).toEqual(catalogBonuses);

        for (const upgrade of upgrades) {
            const position = positions.get(upgrade)!;
            if (upgrade.data.prerequisiteIndex >= 0) {
                const parent = upgrades.find(candidate =>
                    candidate.data.waterIndex === upgrade.data.waterIndex
                    && candidate.data.index === upgrade.data.prerequisiteIndex)!;
                expect(positions.get(parent)).toBeLessThan(position);
            }
            const earlierRootsOrSiblings = upgrades.filter(candidate =>
                candidate.data.waterIndex === upgrade.data.waterIndex
                && candidate.data.index < upgrade.data.index
                && (upgrade.data.prerequisiteIndex < 0
                    ? candidate.data.prerequisiteIndex < 0
                    : candidate.data.prerequisiteIndex === upgrade.data.prerequisiteIndex));
            for (const earlier of earlierRootsOrSiblings) {
                expect(positions.get(earlier)).toBeLessThan(position);
            }

            const branch: typeof upgrades = [];
            const collectBranch = (current: typeof upgrades[number]): void => {
                branch.push(current);
                getChildren(current).forEach(collectBranch);
            };
            collectBranch(upgrade);
            const branchPositions = branch.map(node => positions.get(node)!).sort((left, right) => left - right);
            branchPositions.forEach((position, index) => {
                if (index > 0) {
                    expect(position).toBe(branchPositions[index - 1]! + 1);
                }
            });
        }

        const requestedBranch = [
            'Minaus Costs',
            'Pen N Paper',
            'Cook Maxxing',
            'Enchanterest',
            'Bubba Forever',
            'Wisdom Boost',
        ];
        const requestedBranchUpgrades = upgradesInUnlockOrder.filter(
            upgrade => requestedBranch.includes(upgrade.data.name),
        );
        expect(requestedBranchUpgrades.map(upgrade => upgrade.data.name)).toEqual(requestedBranch);
        const branchStart = positions.get(requestedBranchUpgrades[0]!)!;
        requestedBranchUpgrades.forEach((upgrade, index) => {
            expect(positions.get(upgrade)).toBe(branchStart + index);
        });
        expect(upgradesInUnlockOrder.map(upgrade => upgrade.data.waterIndex)).toEqual([
            ...Array(20).fill(0), ...Array(20).fill(1), ...Array(20).fill(2),
        ]);
    });

    it('imports the Harp selected note from its saved selection row', () => {
        const savedHoles = JSON.parse(loadTestSave(saveName).get('Holes') as string) as number[][];
        expect(Number(savedHoles[11][21])).not.toBe(Number(savedHoles[19]?.[21] ?? 0));
        expect(hole.harp.selectedNote).toBe(Number(savedHoles[11][21]));
        expect(hole.harp.tune).toBe(Number(savedHoles[11][21]));
    });



    it('matches Fountain currency ID 0 against the paired v1.23 game output', () => {
        expect(hole.fountain.getCurrencyValue(0)).toBe(15252139478210.553);
    });
    it('uses Lamp 99 and static Fountain marbleize eligibility metadata', () => {
        expect(hole.lamp.getBonus(true)).toBe(3203.5);
        expect(hole.fountain.modifiers.lampBonus99).toBe(3203.5);
        expect(hole.fountain.canMarbleize(0, 8)).toBe(false);
        expect(hole.fountain.canMarbleize(0, 9)).toBe(true);
    });

    it('imports the saved Gilded Jar bonus percentage', () => {
        const savedHoleData = JSON.parse(loadTestSave(saveName).get('Holes') as string) as number[][];
        expect(hole.jar.gildedBonusPercent).toBe(savedHoleData[11][60]);
    });

    it('imports Cove levels and both six-shape balances', () => {
        expect(hole.cove.upgrades).toHaveLength(24);
        expect(hole.cove.shapes).toHaveLength(12);
        expect(hole.cove.blueShapeBalances).toHaveLength(6);
        expect(hole.cove.purpleShapeBalances).toHaveLength(6);
        expect(hole.cove.glunkoKills).toBe(3915683771);
    });

});
