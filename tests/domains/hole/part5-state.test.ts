import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { initAllItems } from '../../../data/domain/items';
import { Hole, updateHole, updateHoleCharacterCapabilities } from '../../../data/domain/world-5/hole/hole';
import { Cove, CoveUpgrade } from '../../../data/domain/world-5/hole/cove';
import { Fountain, FountainUpgrade } from '../../../data/domain/world-5/hole/fountain';
import { initAccountDataKeys, updateIdleonData } from '../../../data/domain/idleonData';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { lavaLog } from '../../../data/utility';
import { Jar } from '../../../data/domain/world-5/hole/jar';

import { Gaming } from '../../../data/domain/world-5/gaming';
import { getPlayerDamageTotalMultiplier } from '../../../data/domain/player-damage-multiplier';
import { getClassExperienceMultiplier } from '../../../data/domain/player-experience';
import { Player } from '../../../data/domain/player';
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

    it('keeps existing account-bonus and Gaming consumers numeric after normal import', () => {
        const gaming = gameData.get('gaming') as Gaming;
        const player = (gameData.get('players') as Player[])[0];

        expect(Number.isFinite(gaming.garden.harvestBits)).toBe(true);
        expect(Number.isFinite(gaming.garden.nonPlantBitsMultiplier)).toBe(true);
        expect(Number.isFinite(hole.getMonumentBonus('Bravery', 4))).toBe(true);
        expect(Number.isFinite(hole.getFountainBonus(0, 16))).toBe(true);
        expect(Number.isFinite(getPlayerDamageTotalMultiplier(gameData, player))).toBe(true);
        expect(Number.isFinite(getClassExperienceMultiplier(gameData, player))).toBe(true);
    });
    it('resolves source descriptions only when required state is known', () => {
        const jar = new Jar();
        const percentBonus = jar.jarBonuses[5];
        percentBonus.level = 1;
        expect(percentBonus.getBonus()).toBe(10);
        expect(percentBonus.getUnit()).toBe("percent");
        expect(percentBonus.getDescription()).toBe('All skilling caverns require 10% less Resources to get opals!');

        const multiplierBonus = jar.jarBonuses[2];
        multiplierBonus.level = 1;
        expect(multiplierBonus.getUnit()).toBe("multiplier");
        expect(multiplierBonus.getDescription()).toBe('1.20× higher chance to find Opals in Tall Jars.');

        const futureBonus = jar.jarBonuses[31];
        expect(futureBonus.getUnit()).toBeNull();
        expect(futureBonus.hasReleasedEffect()).toBe(false);
        expect(futureBonus.getDescription()).toBe("Boosts a future cavern... futuuure..!");

        const fountainRecord = hole.fountain.upgrades.find(upgrade => upgrade.data.waterIndex === 0 && upgrade.data.index === 1)!;
        const fountainUpgrade = new FountainUpgrade(fountainRecord.index, fountainRecord.data);
        fountainUpgrade.level = 1;
        fountainUpgrade.marbleizationLevel = 0;
        expect(fountainUpgrade.getBonus()).toBe(10);
        expect(fountainUpgrade.getDescription(hole.fountain)).toBe('All currencies are worth +10% more.\nCurrencies are ALL money types here at the Fountain, from coins to dollars and more!');
        fountainUpgrade.marbleizationLevel = null;
        expect(fountainUpgrade.getDescription(hole.fountain)).toBeNull();

        const coveUpgradeData = hole.cove.upgrades[7];
        const coveUpgrade = new CoveUpgrade(
            coveUpgradeData.index,
            coveUpgradeData.name,
            coveUpgradeData.label,
            coveUpgradeData.bonusPerLevel,
            coveUpgradeData.costBase
        );
        coveUpgrade.level = coveUpgradeData.level;
        expect(coveUpgrade.name).toBe("Active Drops");
        expect(coveUpgrade.getBonus()).toBe(162);
        expect(coveUpgrade.getDescription()).toBe('Decrease the cost of all upgrades here by 61.83%');
        coveUpgrade.level = null;
        expect(coveUpgrade.getDescription()).toBeNull();
        const futureUpgrade = hole.cove.upgrades[23];
        futureUpgrade.level = null;
        expect(futureUpgrade.name).toBe("IDK Broh");
        expect(futureUpgrade.getDescription()).toBe('World 7 Skill 3 my man, not yet.');
        expect(hole.cove.upgrades.map(upgrade => upgrade.name)).toEqual([
            "Opal Find", "Slop Drop", "Reslime", "Droplier", "Killionaire", "Insta-Ribbon", "Big Hit Multkill", "Active Drops",
            "Sleepy Drops", "One Big Blue", "Blue Collector", "Researchy", "Droplier+", "Sleepy Drops+", "Cavernicus",
            "Multikill", "One Big Purp", "Slop Drop+", "Rich Get Rich", "DeEmGe", "Grandioso", "Slop Drop++",
            "Purp Collector", "IDK Broh"
        ]);
    });
    it('shows source-backed first-discovery benefits without changing owned effects', () => {
        const jar = new Jar();
        const percentBonus = jar.jarBonuses[5];
        percentBonus.level = 0;
        percentBonus.legendTalentBonus = 1.5;

        expect(percentBonus.getBonus()).toBe(0);
        expect(percentBonus.getFirstDiscoveryBonus()).toBe(15);
        expect(percentBonus.getFirstDiscoveryDescription()).toBe('All skilling caverns require 15% less Resources to get opals!');
        expect(percentBonus.getDescription()).toBe('All skilling caverns require 0% less Resources to get opals!');

        percentBonus.level = null;
        expect(percentBonus.getBonus()).toBeNull();
        expect(percentBonus.getDescription()).toBe('All skilling caverns require Unavailable% less Resources to get opals!');

        const futureBonus = jar.jarBonuses[31];
        expect(futureBonus.getFirstDiscoveryDescription()).toBe('Boosts a future cavern... futuuure..!');
    });
    it('resolves Fountain description values from source inputs', () => {
        const fountain = new Fountain();
        fountain.upgrades.forEach(upgrade => {
            upgrade.level = 0;
            upgrade.marbleizationLevel = 0;
        });
        fountain.valueWallets = [0, 0, 0];
        fountain.currencies[0].luckyCoins = 0;
        fountain.duckCount = 0;
        fountain.barTimerProgress = 0;
        fountain.prepare({
            arcadeBonus68: 0,
            bUpgrade94Level1: 1,
            bUpgrade95Level10: 0,
            bUpgrade97Level3: 0,
            coveUpgrade14: 0,
            cosmoBonusQuantity4: 0,
            lampBonus99: 0,
            measurementBonus16: 0,
            bellBonus6: 0,
            studyBonus15: 0,
            ownedCaverns: 0,
            currencyValueExponent: 0,
            duckCount: 0,
        });

        expect(fountain.getUpgrade(0, 2).getDescription(fountain)).toBe(
            'Increases the value of Bronze Coins.\nAll bronze coins you find have a base value of 1\nYour total Currency multi:\n1x\n(Affects value of all Fountain money)'
        );
        expect(fountain.getUpgrade(0, 9).getDescription(fountain)).toBe(
            'Every time the fountain fills up, it creates a new coin.\nThis will happen in 2hr 0min 0sec\nFrom empty, it takes:\n2hr 0min 0sec to fill'
        );
        expect(fountain.getUpgrade(0, 10).getDescription(fountain)).toBe(
            'Coins can appear in 1 different areas on the ground.\nThis means your current max coin capacity is 3 coins'
        );
        expect(fountain.getUpgrade(0, 11).getDescription(fountain)).toBe(
            'Each area can stack up to 3 coins, this upgrade increases it by +0.\nThis means your current max coin capacity is 3 coins'
        );
        expect(fountain.getUpgrade(2, 2).getDescription(fountain)).toBe(
            'You can now find Moolah Stacks.\nAll moolah stacks you find have a base value of 1, but only get 鉢(Total Currency Multi) which is:\n1x'
        );
        for (const index of [3, 4]) {
            const description = fountain.getUpgrade(2, index).getDescription(fountain);
            expect(description).not.toBeNull();
            expect(description).not.toMatch(/[$^#@]/);
        }
        expect(fountain.getUpgrade(2, 8).getDescription(fountain)).toBe(
            "All currencies collected have a 1 in 1,000 of being LUCKY, multiplying the value of that currency type forever!\nEach additional one is 4x rarer"
        );

        fountain.barTimerProgress = null;
        expect(fountain.getUpgrade(0, 9).getDescription(fountain)).toBeNull();
    });
    it('preserves missing and zero Fountain bar timer inputs', () => {
        const savedTimerData: (number[] | undefined)[] = Array(34).fill(undefined);
        savedTimerData[33] = [0];
        const savedTimer = new Fountain();
        savedTimer.parse(savedTimerData, []);
        expect(savedTimer.barTimerProgress).toBe(0);

        const missingTimer = new Fountain();
        missingTimer.parse(Array(34).fill(undefined), []);
        expect(missingTimer.barTimerProgress).toBeNull();
    });


    it('shows Jar source descriptions without unresolved chance markers', () => {
        expect(hole.jar.jarTypes[1].getDescription()).toBe('Has a chance to contain an Opal');
        expect(hole.jar.jarTypes[2].getDescription()).toBe('Has a chance to contain a new collectible');
        expect(hole.jar.jarTypes[4].getDescription()).toBe('Has a chance to enchant a collectible doubling its bonus');
        const bonus = new Jar().jarBonuses[5];
        bonus.level = 1;
        expect(bonus.getDescription()).toBe('All skilling caverns require 10% less Resources to get opals!');
        const rupieBonus = new Jar().jarBonuses[0];
        rupieBonus.level = 0;
        expect(rupieBonus.getFirstDiscoveryDescription()).toBe('Rupies found are worth +20% more.');
        expect(rupieBonus.getFirstDiscoveryDescription()).not.toContain('Current Rupie Value');
        rupieBonus.level = 1;
        expect(rupieBonus.getDescription()).toBe('Rupies found are worth +20% more.\nCurrent Rupie Value: Unavailable');
    });
    it('assigns a source-verified unit to each released Jar collectible', () => {
        const jar = new Jar();
        const percentageIndexes = [0, 1, 4, 5, 6, 10, 12, 13, 15, 19, 21, 22, 23, 24, 29, 30, 33, 35];
        const multiplierIndexes = [2, 3, 7, 8, 9, 11, 14, 16, 17, 18, 20, 25, 26, 27, 28, 34, 36];
        const futureIndexes = [31, 32, 37, 38, 39];

        expect(jar.jarBonuses.filter(bonus => bonus.getUnit() === "percent").map(bonus => bonus.index))
            .toEqual(percentageIndexes);
        expect(jar.jarBonuses.filter(bonus => bonus.getUnit() === "multiplier").map(bonus => bonus.index))
            .toEqual(multiplierIndexes);
        expect(jar.jarBonuses.filter(bonus => !bonus.hasReleasedEffect()).map(bonus => bonus.index))
            .toEqual(futureIndexes);
        for (const bonus of jar.jarBonuses) {
            bonus.level = 1;
            expect(bonus.getDescription()).not.toMatch(/@|\{%/);
        }
    });

    it('imports saved Jar board entries, type count, and holdings separately', () => {
        expect(hole.jar.jarTypes).toHaveLength(10);
        expect(hole.jar.ownedTypeCount).toBe(9);
        expect(hole.jar.boardAvailable).toBe(true);
        expect(hole.jar.board).toHaveLength(120);
        expect(hole.jar.board[0]).toEqual({ type: 9, quality: 3, x: 672, y: 312, randomRoll: 0.8404255300769636 });
        expect(hole.jar.holdings).toHaveLength(12);
        expect(hole.jar.nextTypeCost).toBeNull();
    });

    it('keeps unknown Jar ownership distinct from known zero ownership', () => {
        const jar = new Jar();
        const holeData: (number[] | undefined)[] = [];
        holeData[11] = Array(38).fill(0);

        jar.parse([], null);
        expect(jar.jarTypes).toHaveLength(10);
        expect(jar.ownedTypeCount).toBeNull();
        expect(jar.jarTypes.every(type => type.unlocked === null)).toBe(true);

        jar.parse(holeData, null);
        expect(jar.ownedTypeCount).toBe(0);
        expect(jar.jarTypes.every(type => type.unlocked === false)).toBe(true);
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
            positions: { space: number; itemCurrencyIds: number[]; royal: boolean; itemValues: number[]; value: number }[];
            overflowValue0: number;
        };
        const stacks = hole.fountain.stacks;

        expect(hole.fountain.stacksAvailable).toBe(true);
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
        expect(hole.fountain.getPendingStackValue()).toMatchLiveGame(
            expectedPositions.positions.reduce((total, position) => total + position.value, 0),
            0,
        );
        stacks.forEach((stack, index) => {
            const expected = expectedPositions.positions[index];
            stack.items.forEach((item, itemIndex) => {
                expect(item.value).toMatchLiveGame(expected.itemValues[itemIndex], 0);
            });
            expect(stack.value).toMatchLiveGame(expected.value, 0);
        });
    });

    it('prepares prospective Cove effects independently from current map and assignment', () => {
        const campBonuses = [
            [100, 25, 'camp_upgrade_100_25'],
            [101, 10, 'camp_upgrade_101_10'],
            [103, 10, 'camp_upgrade_103_10'],
            [105, 10, 'camp_upgrade_105_10'],
        ] as const;
        campBonuses.forEach(([upgrade, factor, label]) => {
            expect(hole.getSchematicBonus(upgrade, factor))
                .toMatchLiveGame(getExtractedValue(fountainCoveResults, label), 0);
        });
        expect(hole.cove.upgrades[2].getBonus())
            .toMatchLiveGame(getExtractedValue(fountainCoveResults, 'cove_respawn_upgrade'), 0);

        const player = (gameData.get('players') as Player[]).find(player => player.playerID === 3)!;
        const assignment = hole.resourceCavrens.characterAssignments?.[player.playerID] ?? -1;
        const inputs = {
            campUpgrade100Bonus: hole.getSchematicBonus(100, 25),
            campUpgrade101Bonus: hole.getSchematicBonus(101, 10),
            campUpgrade103Bonus: hole.getSchematicBonus(103, 10),
            campUpgrade105Bonus: hole.getSchematicBonus(105, 10),
            gameLog: lavaLog,
        };
        const insideCove = hole.cove.prepare({ ...inputs, mapId: 216, cavernId: 17 });
        const outsideCove = hole.cove.prepare({ ...inputs, mapId: player.currentMapId, cavernId: assignment });
        const { inCoveContext: _insideContext, ...insideEffects } = insideCove;
        const { inCoveContext: _outsideContext, ...outsideEffects } = outsideCove;
        const importedEffects = hole.cove.localEffectsByPlayerId.get(player.playerID)!;
        const { inCoveContext: _importedContext, ...importedCapability } = importedEffects;

        expect(importedEffects.inCoveContext).toBe(false);
        expect(insideEffects).toEqual(importedCapability);
        expect(outsideEffects).toEqual(importedCapability);

        expect(insideCove.inCoveContext).toBe(true);
        expect(outsideCove.inCoveContext).toBe(false);
        expect(outsideEffects).toEqual(insideEffects);
        expect(outsideCove.dropRateMultiplier).toBeGreaterThan(1);
        expect(outsideCove.afkGainMultiplier).toBeGreaterThan(1);
        expect(outsideCove.multikillPerDamageTier).toBeGreaterThan(0);
        expect(outsideCove.baseMultikill).toBeGreaterThan(0);
        expect(outsideCove.respawnTimeMultiplier).toBeLessThan(1);
        expect(outsideCove.bluePickupTargetId).not.toBeNull();
        expect(outsideCove.bluePickupAmount).toBeGreaterThan(0);
        expect(outsideCove.purplePickupTargetId).not.toBeNull();
        expect(outsideCove.purplePickupAmount).toBeGreaterThan(0);
        expect(outsideCove.pickupRandomDoubleChance).toBeGreaterThan(0);
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
        expect(secondImport.fountain.getPendingStackValue()).toBe(firstImport.fountain.getPendingStackValue());
        expect(secondImport.cove.localEffectsByPlayerId).toEqual(firstImport.cove.localEffectsByPlayerId);
    });

    it('keeps Fountain currencies within nine-wallet scope', () => {
        expect(hole.fountain.currencies).toHaveLength(9);
        expect(hole.fountain.wallets).toHaveLength(9);
        expect(hole.fountain.upgrades).toHaveLength(60);
        expect(hole.fountain.opalProgress).toBe(14);
    });

    it('matches Fountain currency ID 0 against the paired v1.23 game output', () => {
        expect(hole.fountain.getCurrencyValue(0)).toBe(15252139478210.553);
    });
    it('keeps Opal cost at progress 44 and 45 within the nine-wallet catalog', () => {
        const progress = hole.fountain.opalProgress;
        hole.fountain.opalProgress = 44;
        const finalAvailableCost = hole.fountain.getOpalCost();
        expect(finalAvailableCost).toEqual({
            amount: 100 * Math.pow(45, 1.5) * Math.pow(4.8, 44),
            currencyId: 8,
            available: true,
        });

        hole.fountain.opalProgress = 45;
        const unavailableCurrencyCost = hole.fountain.getOpalCost();
        expect(unavailableCurrencyCost).toEqual({
            amount: 100 * Math.pow(46, 1.5) * Math.pow(4.8, 45),
            currencyId: 9,
            available: false,
        });
        expect(hole.fountain.canAffordOpal()).toBe(false);
        expect(hole.fountain.currencies).toHaveLength(9);
        expect(hole.fountain.wallets).toHaveLength(9);

        hole.fountain.opalProgress = null;
        expect(hole.fountain.getOpalCost()).toBeNull();
        expect(hole.fountain.canAffordOpal()).toBeNull();
        hole.fountain.opalProgress = progress;
    });
    it('uses Lamp 99 and static Fountain marbleize eligibility metadata', () => {
        expect(hole.lamp.getBonus(true)).toBe(3203.5);
        expect(hole.fountain.modifiers?.lampBonus99).toBe(3203.5);
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
    it('keeps absent Cove OptLacc values unavailable and saved zeros known', () => {
        const parsedData = loadGameDataFromSave(saveName);
        const missingHole = new Hole('hole');
        missingHole.init(initAllItems(), (parsedData.get('playerNames') as string[]).length);
        const missingOptLaccData = new Map(parsedData);
        missingOptLaccData.set('hole', missingHole);
        missingOptLaccData.delete('OptLacc');
        const rawData = { ...(missingOptLaccData.get('rawData') as Record<string, unknown>) };
        delete rawData.OptLacc;
        missingOptLaccData.set('rawData', rawData);
        missingHole.parse(missingOptLaccData);

        const missingCove = missingHole.cove;
        expect(missingHole.sourceSaveAvailable.emperor).toBe(false);
        expect(missingCove.upgrades[0].level).toBeNull();
        expect(missingCove.upgrades[0].getBonus()).toBeNull();
        expect(missingCove.getCurrencyBalance(0)).toBeNull();
        expect(missingCove.canPurchase(0, 0, 0, 0)).toBeNull();
        expect(missingCove.blueShapeTargetAvailable).toBe(false);
        expect(missingCove.glunkoKills).toBeNull();
        expect(missingCove.prepare({
            mapId: 216, cavernId: 17, campUpgrade100Bonus: 0, campUpgrade101Bonus: 0,
            campUpgrade103Bonus: 0, campUpgrade105Bonus: 0, gameLog: () => 0,
        }).dropRateMultiplier).toBeNull();

        const savedZeroCove = new Cove();
        savedZeroCove.parse(Array(669).fill(0));
        expect(savedZeroCove.upgrades[0].level).toBe(0);
        expect(savedZeroCove.upgrades[0].getBonus()).toBe(0);
        expect(savedZeroCove.getCurrencyBalance(0)).toBe(0);
        expect(savedZeroCove.blueShapeBalances[0]).toBe(0);
        expect(savedZeroCove.blueShapeTargetAvailable).toBe(true);
        expect(savedZeroCove.blueShapeTargetId).toBeNull();
        expect(savedZeroCove.glunkoKills).toBe(0);
    });

    it('keeps absent Fountain arrays unavailable and saved zero levels known', () => {
        const missingHoleData: (number[] | undefined)[] = Array(35).fill(undefined);
        missingHoleData[9] = Array(39).fill(0);
        missingHoleData[11] = Array(84).fill(0);
        missingHoleData[30] = Array(9).fill(0);
        const missingFountain = new Fountain();
        missingFountain.parse(missingHoleData, Array(602).fill(0));
        missingFountain.prepare(hole.fountain.modifiers!);
        expect(missingFountain.upgradeLevelsAvailable).toBe(false);
        expect(missingFountain.marbleizationLevelsAvailable).toBe(false);
        expect(missingFountain.upgrades[0].level).toBeNull();
        expect(missingFountain.upgrades[0].marbleizationLevel).toBeNull();
        expect(missingFountain.getBonus(0, 0)).toBeNull();
        expect(missingFountain.getMarbleYield()).toBeNull();
        expect(missingFountain.getCurrencyValue(0)).toBeNull();
        expect(missingFountain.canAffordMarbleize(0, 9)).toBeNull();
        expect(missingFountain.canAffordMarbleize(0, 8)).toBe(false);

        const missingStacksData = [...missingHoleData];
        missingStacksData[31] = [Array(20).fill(0), Array(20).fill(0), Array(20).fill(0)] as unknown as number[];
        missingStacksData[32] = [Array(20).fill(0), Array(20).fill(0), Array(20).fill(0)] as unknown as number[];
        const missingStacksFountain = new Fountain();
        missingStacksFountain.parse(missingStacksData, []);
        missingStacksFountain.prepare(hole.fountain.modifiers!);
        expect(missingStacksFountain.stacksAvailable).toBe(false);
        expect(missingStacksFountain.getStackItemCount()).toBeNull();
        expect(missingStacksFountain.getOccupiedSpaceCount()).toBeNull();
        expect(missingStacksFountain.getPendingStackValue()).toBeNull();
        expect(missingStacksFountain.getAvailableSpaceCount()).toBeNull();

        missingStacksData[29] = [];
        missingStacksData[34] = [];
        const savedEmptyFountain = new Fountain();
        savedEmptyFountain.parse(missingStacksData, []);
        savedEmptyFountain.prepare(hole.fountain.modifiers!);
        expect(savedEmptyFountain.stacksAvailable).toBe(true);
        expect(savedEmptyFountain.getStackItemCount()).toBe(0);
        expect(savedEmptyFountain.getOccupiedSpaceCount()).toBe(0);
        expect(savedEmptyFountain.getPendingStackValue()).toBe(0);
        expect(savedEmptyFountain.getAvailableSpaceCount()).toBe(1);

        const missingRoyalFlagsData: (number[] | undefined)[] = Array(35).fill(undefined);
        missingRoyalFlagsData[9] = Array(39).fill(0);
        missingRoyalFlagsData[11] = Array(84).fill(0);
        missingRoyalFlagsData[29] = [[0, 1], []] as unknown as number[];
        missingRoyalFlagsData[30] = Array(9).fill(0);
        const missingRoyalFlags = new Fountain();
        missingRoyalFlags.parse(missingRoyalFlagsData, []);
        missingRoyalFlags.prepare(hole.fountain.modifiers!);
        expect(missingRoyalFlags.stacksAvailable).toBe(false);
        expect(missingRoyalFlags.stacks[0].items.map(item => item.currencyId)).toEqual([0, 1]);
        expect(missingRoyalFlags.stacks[0].royal).toBeNull();
        expect(missingRoyalFlags.stacks[0].items.map(item => item.value)).toEqual([null, null]);
        expect(missingRoyalFlags.stacks[0].value).toBeNull();
        expect(missingRoyalFlags.stacks[1]).toEqual({
            space: 1, items: [], royal: null, value: 0,
        });

        const savedHoleData: (number[] | undefined)[] = Array(35).fill(undefined);
        savedHoleData[31] = [Array(20).fill(0), Array(20).fill(0), Array(20).fill(0)] as unknown as number[];
        savedHoleData[32] = [Array(20).fill(0), Array(20).fill(0), Array(20).fill(0)] as unknown as number[];
        savedHoleData[11] = Array(82).fill(0);
        const savedZeroFountain = new Fountain();
        savedZeroFountain.parse(savedHoleData, []);
        savedZeroFountain.prepare(hole.fountain.modifiers!);
        expect(savedZeroFountain.upgradeLevelsAvailable).toBe(true);
        expect(savedZeroFountain.marbleizationLevelsAvailable).toBe(true);
        expect(savedZeroFountain.upgrades[0].level).toBe(0);
        expect(savedZeroFountain.upgrades[0].marbleizationLevel).toBe(0);
        expect(savedZeroFountain.getBonus(0, 0)).toBe(0);
        expect(savedZeroFountain.getMarbleYield()).not.toBeNull();
        expect(savedZeroFountain.canAffordMarbleize(0, 9)).toBe(false);
    });
    it('keeps absent collectible levels and dependent Jar rates unknown, unlike saved zero', () => {
        const importedResults = [null, Array(40).fill(0)].map(collectibleLevels => {
            const save = loadTestSave(saveName);
            const savedHoleData = JSON.parse(save.get('Holes') as string) as number[][];
            if (collectibleLevels === null) {
                delete savedHoleData[24];
            } else {
                savedHoleData[24] = collectibleLevels;
            }
            save.fields.set('Holes', JSON.stringify(savedHoleData));

            const importedHole = updateIdleonData(
                initAccountDataKeys(initAllItems()),
                save,
                save.get('playerNames'),
                normalizeCompanionStates(save.get('companions')),
                save.get('servervars'),
                true,
            ).getData().get('hole') as Hole;
            return {
                collectiblesAvailable: importedHole.sourceSaveAvailable.collectibles,
                collectibleLevel: importedHole.jar.jarBonuses[24].level,
                effectiveCollectibleBonus: importedHole.jar.getBonus(24),
                producerRates: importedHole.jar.producers.map(producer => producer.ratePerHour),
            };
        });
        const [missing, savedZero] = importedResults;

        expect(missing.collectiblesAvailable).toBe(false);
        expect(missing.collectibleLevel).toBeNull();
        expect(missing.effectiveCollectibleBonus).toBeNull();
        expect(missing.producerRates).toHaveLength(3);
        expect(missing.producerRates.every(rate => rate === null)).toBe(true);

        expect(savedZero.collectiblesAvailable).toBe(true);
        expect(savedZero.collectibleLevel).toBe(0);
        expect(savedZero.effectiveCollectibleBonus).toBe(0);
        expect(savedZero.producerRates).toHaveLength(3);
        expect(savedZero.producerRates.every(rate => rate !== null)).toBe(true);
    });
    it('preserves absent Schematic inputs in Fountain valuation and Cove effects', () => {
        const importWithSchematics = (schematics: number[] | null) => {
            const save = loadTestSave(saveName);
            const savedHole = JSON.parse(save.get('Holes') as string) as number[][];
            if (schematics === null) {
                delete savedHole[13];
            } else {
                savedHole[13] = schematics;
            }
            save.fields.set('Holes', JSON.stringify(savedHole));

            const importedData = updateIdleonData(
                initAccountDataKeys(initAllItems()),
                save,
                save.get('playerNames'),
                normalizeCompanionStates(save.get('companions')),
                save.get('servervars'),
                true,
            ).getData();
            const importedHole = importedData.get('hole') as Hole;
            const players = importedData.get('players') as { playerID: number; currentMapId: number }[];
            const player = players[0];
            player.currentMapId = 216;
            importedHole.resourceCavrens.characterAssignments ??= [];
            importedHole.resourceCavrens.characterAssignments[player.playerID] = 17;
            updateHoleCharacterCapabilities(importedData);
            const coveEffects = importedHole.cove.localEffectsByPlayerId.get(player.playerID)!;
            return {
                schematicsAvailable: importedHole.sourceSaveAvailable.schematics,
                bUpgrade94Level1: importedHole.fountain.modifiers?.bUpgrade94Level1,
                bUpgrade95Level10: importedHole.fountain.modifiers?.bUpgrade95Level10,
                bUpgrade97Level3: importedHole.fountain.modifiers?.bUpgrade97Level3,
                currencyValue: importedHole.fountain.getCurrencyValue(0),
                maximumStackSize: importedHole.fountain.getMaximumStackSize(),
                stackItemValue: importedHole.fountain.getStackItemValue(0, false, 1),
                coveEffects,
            };
        };
        const missing = importWithSchematics(null);
        const savedZero = importWithSchematics(Array(106).fill(0));

        expect(missing.schematicsAvailable).toBe(false);
        expect(missing.bUpgrade94Level1).toBeNull();
        expect(missing.bUpgrade95Level10).toBeNull();
        expect(missing.bUpgrade97Level3).toBeNull();
        expect(missing.currencyValue).toBeNull();
        expect(missing.maximumStackSize).toBeNull();
        expect(missing.stackItemValue).toBeNull();
        expect(missing.coveEffects.respawnTimeMultiplier).toBeNull();
        expect(missing.coveEffects.pickupRandomDoubleChance).toBeNull();

        expect(savedZero.schematicsAvailable).toBe(true);
        expect(savedZero.bUpgrade94Level1).toBe(0);
        expect(savedZero.bUpgrade95Level10).toBe(0);
        expect(savedZero.bUpgrade97Level3).toBe(0);
        expect(savedZero.currencyValue).not.toBeNull();
        expect(savedZero.maximumStackSize).not.toBeNull();
        expect(savedZero.stackItemValue).not.toBeNull();
        expect(savedZero.coveEffects.respawnTimeMultiplier).not.toBeNull();
        expect(savedZero.coveEffects.pickupRandomDoubleChance).toBe(0);
    });

});
