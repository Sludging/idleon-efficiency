import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { initAllItems } from '../../../data/domain/items';
import { Hole, updateHole } from '../../../data/domain/world-5/hole/hole';
import { initAccountDataKeys, updateIdleonData } from '../../../data/domain/idleonData';
import { StaticRepositories } from '../../../data/domain/repositories';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';

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

    it('matches saved collectible effects against paired game outputs', () => {
        const collectibleBonuses = [
            [4, 'collectible_4'],
            [10, 'collectible_10'],
            [12, 'collectible_12'],
            [16, 'collectible_16'],
            [22, 'collectible_22'],
            [29, 'collectible_29'],
            [35, 'collectible_35'],
            [1, 'collectible_1'],
            [15, 'collectible_15'],
            [24, 'collectible_24'],
        ] as const;
        collectibleBonuses.forEach(([index, label]) => {
            expect(hole.jar.getBonus(index)).toMatchLiveGameWithDetails(getExtractedValue(jarResults, label), {
                tolerance: 0,
                context: `Jar collectible ${index} bonus`,
            });
        });
    });

    it('matches native Jar ownership and board counts', () => {
        expect(hole.jar.ownedTypeCount).toMatchLiveGameWithDetails(
            getExtractedValue(jarResults, 'native_jar_types_owned'),
            { tolerance: 0, context: 'Owned Jar types' },
        );
        expect(hole.jar.boardCount).toMatchLiveGameWithDetails(
            getExtractedValue(jarResults, 'native_jar_board_count'),
            { tolerance: 0, context: 'Jar board count' },
        );
    });
    it('matches the prepared Jar Rupie Value against the native result', () => {
        expect(hole.jar.rupieValue).toMatchLiveGameWithDetails(getExtractedValue(jarResults, 'jar_rupie_value'), {
            tolerance: 0,
            context: 'current Jar Rupie Value',
        });
    });
    it('matches every prepared Jar Rupie operand against same-context native outputs', () => {
        const schematicValues = jarResults.extractions.rupie_schematics.result as number[];
        [[62, 1], [65, 2], [68, 4]].forEach(([index, level], offset) => {
            expect(hole.getSchematicBonus(index, level)).toMatchLiveGame(schematicValues[offset], 0);
        });
        expect(hole.lamp.getBonus(true)).toMatchLiveGame(getExtractedValue(jarResults, 'rupie_lamp_99'), 0);
        expect(hole.getMonumentBonus('Wisdom', 1)).toMatchLiveGame(getExtractedValue(jarResults, 'rupie_wisdom_monument'), 0);
        const measurementValues = jarResults.extractions.rupie_measurements.result as number[];
        [10, 14].forEach((index, offset) => {
            expect(hole.measurements[index].effectiveBenefit).toMatchLiveGame(measurementValues[offset], 0);
        });
        const collectibleValues = jarResults.extractions.rupie_collectibles.result as number[];
        [3, 17, 28, 0, 6, 13, 21, 33].forEach((index, offset) => {
            expect(hole.jar.jarBonuses[index].getBonus()).toMatchLiveGame(collectibleValues[offset], 0);
        });
        const stamps = gameData.get('stamps') as Parameters<typeof getStampBonusForKey>[0];
        expect(getStampBonusForKey(stamps, 'CavernRes'))
            .toMatchLiveGame(getExtractedValue(jarResults, 'rupie_stamp_cavern_res'), 0);
        expect(hole.cove.upgrades[14].getBonus())
            .toMatchLiveGame(getExtractedValue(jarResults, 'rupie_cove_upgrade_14'), 0);
    });

    it('matches available Jar producer inputs and outputs against the paired game', () => {
        const gameAssignment = jarResults.extractions.producer_assignment.result as number[];
        hole.jar.producers.forEach((producer, index) => {
            expect(hole.jar.producerAssignments[index].type)
                .toMatchLiveGame(gameAssignment[index], 0);
            expect(hole.jar.producerAssignments[index].work)
                .toMatchLiveGame(gameAssignment[index + 3], 0);
            expect(producer.requirement)
                .toMatchLiveGame(getExtractedValue(jarResults, `producer_requirement_${index}`), 0);
            expect(producer.ratePerHour)
                .toMatchLiveGame(getExtractedValue(jarResults, `producer_rate_${index}`), 0);
        });
        expect(hole.jar.requirementBalances[3]).toMatchLiveGame(getExtractedValue(jarResults, 'requirement_balance'), 0);
        expect(hole.measurements[12].effectiveBenefit)
            .toMatchLiveGame(getExtractedValue(jarResults, 'measurement_12'), 0);
        expect(hole.getSchematicBonus(67, 30)).toMatchLiveGame(getExtractedValue(jarResults, 'production_upgrade_67'), 0);
        expect(hole.getSchematicBonus(74, 5)).toMatchLiveGame(getExtractedValue(jarResults, 'production_upgrade_74'), 0);
        expect(hole.getSchematicBonus(72, 10)).toMatchLiveGame(getExtractedValue(jarResults, 'production_upgrade_72'), 0);
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

    it('matches Fountain currency values against native game results', () => {
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
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'all_currency_multiplier'), 0);
        expect(hole.fountain.getCurrencyBaseValue(4))
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'currency_4_base_value'), 0);
        expect(hole.fountain.desireCurrencyId)
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'desire_currency_id'), 0);
        gameCurrencyValues.forEach((value, currencyId) => {
            expect(hole.fountain.getCurrencyValue(currencyId)).toMatchLiveGameWithDetails(value, {
                tolerance: 0,
                context: `Fountain currency ${currencyId} total value`,
            });
        });
        expect(hole.fountain.getRoyalMultiplier())
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'royal_multiplier'), 0);
        expect(hole.fountain.getDuckMultiplier())
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'duck_multiplier'), 0);
    });

    it('imports Fountain stack contents and royal flags from paired saved values', () => {
        const savedCurrencyIds = fountainCoveResults.extractions.stack_currency_ids.result as number[][];
        const savedRoyalFlags = fountainCoveResults.extractions.stack_royal_flags.result as number[];
        expect(hole.fountain.stacks.map(stack => stack.items.map(item => item.currencyId)))
            .toEqual(savedCurrencyIds.map(stack => stack.map(Number)));
        expect(hole.fountain.stacks.map(stack => stack.royal))
            .toEqual(savedRoyalFlags.map(flag => Number(flag) >= 1));
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

    it('matches saved Cove Glunko kills and Fountain Opal progress against native values', () => {
        expect(hole.cove.glunkoKills).toMatchLiveGameWithDetails(
            getExtractedValue(fountainCoveResults, 'native_cove_glunko_kills'),
            { tolerance: 0, context: 'Saved Cove Glunko kills' },
        );
        expect(hole.fountain.opalProgress).toMatchLiveGameWithDetails(
            getExtractedValue(fountainCoveResults, 'native_fountain_opal_progress'),
            { tolerance: 0, context: 'Saved Fountain Opal progress' },
        );
    });

    it('repeats normal imports without mutating the saved Fountain and Jar inputs', () => {
        const save = loadTestSave(saveName);
        const sourceSnapshot = JSON.stringify(save.toJSON());
        const importNormally = () => updateIdleonData(
            initAccountDataKeys(initAllItems(), new StaticRepositories()),
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


    it('matches the saved Harp selected note and Gilded Jar bonus against native values', () => {
        expect(hole.harp.selectedNote).toMatchLiveGameWithDetails(
            getExtractedValue(jarResults, 'native_harp_selected_note'),
            { tolerance: 0, context: 'Saved Harp selected note' },
        );
        expect(hole.jar.gildedBonusPercent).toMatchLiveGameWithDetails(
            getExtractedValue(jarResults, 'native_jar_gilded_percent'),
            { tolerance: 0, context: 'Saved Gilded Jar bonus percentage' },
        );
    });


});
