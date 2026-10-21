import type { Divinity } from '../../../data/domain/world-5/divinity';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import { initAllItems } from '../../../data/domain/items';
import { Hole, updateHole } from '../../../data/domain/world-5/hole/hole';
import type { OpalExternalSourceValues } from '../../../data/domain/world-5/hole/hole';
import { Well } from '../../../data/domain/world-5/hole/well';
import { CoveUpgrade } from '../../../data/domain/world-5/hole/cove';
import { initAccountDataKeys, updateIdleonData } from '../../../data/domain/idleonData';
import { normalizeCompanionStates } from '../../../data/domain/companions/companionState';
import { lavaLog } from '../../../data/utility';
import { Jar } from '../../../data/domain/world-5/hole/jar';

import { getStampBonusForKey } from '../../../data/domain/world-1/stamps';
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
    it('keeps active Pocket gods in non-Doot effective membership', () => {
        const players = gameData.get('players') as Player[];
        const player = players[0];
        const divinity = gameData.get('divinity') as Divinity;
        const pocket = hole.majiks.pocketDivinity;
        const links = divinity.playerInfo.find(info => info.playerIndex === player.playerID);
        if (!links) throw new Error('Imported player has no Divinity record.');
        const previousLevel = pocket.level;
        const previousSelections = pocket.selections;
        const previousPrimaryGod = links.primaryGod;
        const previousEsGod = links.esGod;
        const previousDootActive = links.dootActive;

        try {
            pocket.level = 2;
            pocket.parseSelections([divinity.gods[0].index, divinity.gods[1].index, divinity.gods[0].index]);
            links.primaryGod = divinity.gods[0];
            links.esGod = undefined;
            links.dootActive = false;
            pocket.prepareCharacters([player], divinity);

            expect(pocket.characters[0].overlappingGodIds).toEqual([divinity.gods[0].index]);
            expect(pocket.characters[0].addedGodIds).toEqual([divinity.gods[1].index]);
            expect(pocket.characters[0].effectiveGodIds).toEqual([divinity.gods[0].index, divinity.gods[1].index]);

            links.dootActive = true;
            pocket.prepareCharacters([player], divinity);
            expect(pocket.characters[0].effectiveGodIds).toEqual(divinity.gods.map(god => god.index));
        } finally {
            pocket.level = previousLevel;
            pocket.selections = previousSelections;
            links.primaryGod = previousPrimaryGod;
            links.esGod = previousEsGod;
            links.dootActive = previousDootActive;
            pocket.prepareCharacters(players, divinity);
        }
    });
    it('preserves negative Well stock and blocks timing while zero remains estimable', () => {
        const savedHoleData = JSON.parse(loadTestSave(saveName).get('Holes') as string) as number[][];
        const negativeHoleData = savedHoleData.map(row => [...row]);
        negativeHoleData[9][0] = -1;
        const negativeWell = new Well();
        negativeWell.parse(hole, negativeHoleData);
        expect(negativeWell.sediments[0].current).toBe(-1);

        const zeroHoleData = savedHoleData.map(row => [...row]);
        zeroHoleData[9][0] = 0;
        const zeroWell = new Well();
        zeroWell.parse(hole, zeroHoleData);
        expect(zeroWell.sediments[0].current).toBe(0);

        const gravel = hole.well.sediments[0];
        const savedCurrent = gravel.current;
        try {
            gravel.current = 0;
            const zeroTiming = hole.well.getFullInTime(gravel);
            gravel.current = -1;
            const negativeTiming = hole.well.getFullInTime(gravel);
            expect(zeroTiming.status).toBe('estimate');
            expect(zeroTiming.hours).toBeGreaterThan(0);
            expect(negativeTiming).toEqual({ status: 'blocked', hours: null });
        } finally {
            gravel.current = savedCurrent;
        }
    });

    it('gates Research Gambit reward while its reference player is in Tutorial maps', () => {
        const player = (gameData.get('players') as Player[])[0];
        const bonus = hole.gambit.bonuses.find(bonus => bonus.index === 15)!;
        const savedMapId = player.currentMapId;
        const savedUnlocked = bonus.unlocked;
        try {
            bonus.unlocked = true;
            player.currentMapId = 0;
            const normalReward = hole.gambit.getBonus(15, player);
            player.currentMapId = 20;
            const tutorialReward = hole.gambit.getBonus(15, player);
            expect(normalReward).toBeGreaterThan(0);
            expect(tutorialReward).toBe(0);
        } finally {
            player.currentMapId = savedMapId;
            bonus.unlocked = savedUnlocked;
        }
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
    it('prepares next unlocks for unrescued and capped Villagers', () => {
        const [polonai, kaipu, cosmo, minau, bolaia] = hole.villagers;
        const villagers = [polonai, kaipu, cosmo, minau, bolaia];
        const savedLevels = villagers.map(villager => villager.level);

        try {
            villagers.forEach(villager => { villager.level = 0; });
            hole.prepareInspection();
            const schematicOrder = hole.schematics.map(schematic => schematic.data.order);
            expect(villagers.map(villager => villager.nextUnlock)).toEqual([
                { kind: 'cavern', requiredLevel: 1, identities: [0], atMaximum: false },
                { kind: 'schematic', requiredLevel: 1, identities: schematicOrder.slice(1, 4), atMaximum: false },
                { kind: 'majik-point', requiredLevel: 1, identities: [], atMaximum: false },
                { kind: 'measurement', requiredLevel: 1, identities: [0], atMaximum: false },
                { kind: 'study-rate', requiredLevel: 1, identities: [], atMaximum: false },
            ]);

            polonai.level = hole.studies.length;
            kaipu.level = 100;
            minau.level = hole.measurements.length;
            hole.prepareInspection();
            expect(polonai.nextUnlock).toEqual({
                kind: 'cavern', requiredLevel: hole.studies.length + 1, identities: [], atMaximum: true,
            });
            expect(kaipu.nextUnlock).toEqual({
                kind: 'schematic', requiredLevel: 101, identities: [], atMaximum: true,
            });
            expect(minau.nextUnlock).toEqual({
                kind: 'measurement', requiredLevel: hole.measurements.length + 1, identities: [], atMaximum: true,
            });
            expect(cosmo.nextUnlock).toEqual({
                kind: 'majik-point', requiredLevel: 1, identities: [], atMaximum: false,
            });
            expect(bolaia.nextUnlock).toEqual({
                kind: 'study-rate', requiredLevel: 1, identities: [], atMaximum: false,
            });
        } finally {
            villagers.forEach((villager, index) => { villager.level = savedLevels[index]; });
            hole.prepareInspection();
        }
    });
    it('prepares numeric resource cavern requirements after normal Hole import', () => {
        expect(Number.isFinite(hole.getResourceRequirementReduction())).toBe(true);
        Object.values(hole.resourceCavrens.cavrens).forEach(cavern => {
            expect(Number.isFinite(cavern.resourceRequirement)).toBe(true);
            expect(cavern.resourceRemaining).toBe(Math.max(0, cavern.resourceRequirement - cavern.resourceCurrent));
            expect(typeof cavern.resourceRequirementMet).toBe('boolean');
            expect(Number.isFinite(cavern.efficiencyThreshold)).toBe(true);
        });
    });
    it('keeps existing account-bonus and Gaming consumers numeric after normal import', () => {
        const gaming = gameData.get('gaming') as Gaming;
        const player = (gameData.get('players') as Player[])[0];

        expect(Number.isFinite(gaming.garden.harvestBits)).toBe(true);
        expect(Number.isFinite(gaming.garden.nonPlantBitsMultiplier)).toBe(true);
        expect(Number.isFinite(hole.getMonumentBonus('Bravery', 4))).toBe(true);
        expect(Number.isFinite(hole.fountain.getBonus(0, 16))).toBe(true);
        expect(Number.isFinite(getPlayerDamageTotalMultiplier(gameData, player))).toBe(true);
        expect(Number.isFinite(getClassExperienceMultiplier(gameData, player))).toBe(true);
    });
    it('resolves source descriptions for initialized aspects and future placeholders', () => {
        const jar = new Jar();
        const percentBonus = jar.jarBonuses[5];
        percentBonus.level = 1;
        expect(percentBonus.getBonus()).toBe(10);
        expect(percentBonus.getUnit()).toBe("percent");
        expect(percentBonus.getDescription(0)).toBe('All skilling caverns require 10% less Resources to get opals!');

        const multiplierBonus = jar.jarBonuses[2];
        multiplierBonus.level = 1;
        expect(multiplierBonus.getUnit()).toBe("multiplier");
        expect(multiplierBonus.getDescription(0)).toBe('1.20× higher chance to find Opals in Tall Jars.');

        const futureBonus = jar.jarBonuses[31];
        expect(futureBonus.getUnit()).toBeNull();
        expect(futureBonus.getDescription(0)).toBe("Boosts a future cavern... futuuure..!");


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
        const futureUpgrade = hole.cove.upgrades[23];
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
        expect(percentBonus.getFirstDiscoveryDescription(0)).toBe('All skilling caverns require 15% less Resources to get opals!');
        expect(percentBonus.getDescription(0)).toBe('All skilling caverns require 0% less Resources to get opals!');


        const futureBonus = jar.jarBonuses[31];
        expect(futureBonus.getFirstDiscoveryDescription(0)).toBe('Boosts a future cavern... futuuure..!');
    });


    it('shows Jar source descriptions without unresolved chance markers', () => {
        expect(hole.jar.jarTypes[1].getDescription()).toBe('Has a chance to contain an Opal');
        expect(hole.jar.jarTypes[2].getDescription()).toBe('Has a chance to contain a new collectible');
        expect(hole.jar.jarTypes[4].getDescription()).toBe('Has a chance to enchant a collectible doubling its bonus');
        const bonus = new Jar().jarBonuses[5];
        bonus.level = 1;
        expect(bonus.getDescription(0)).toBe('All skilling caverns require 10% less Resources to get opals!');
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


    it('aggregates assigned producer rates by Jar type and preserves unknown contributors', () => {
        const jar = new Jar();
        const holeData: (number[] | undefined)[] = [];
        holeData[11] = Array(50).fill(0);
        holeData[11]![37] = 0;
        holeData[25] = [1, 1, 2, 10, 20, 30];
        jar.parse(holeData, null);
        jar.prepare({
            collectibleBonus: 0,
            cavernCount: 12,
            producerCount: 3,
            productionUpgrade67: 0,
            productionUpgrade74: 0,
            productionUpgrade72: 0,
            cavernLog: 0,
        });

        expect(jar.jarTypes[0].jarsPerHour).toBe(0);
        expect(jar.jarTypes[1].jarsPerHour).toBe(24);
        expect(jar.jarTypes[2].jarsPerHour).toBe(7.2);
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
        const abnormalRupie = hole.jar.jarBonuses[0];
        expect(abnormalRupie.getDescription(hole.jar.rupieValue)).toContain('Current Rupie Value:31.9B');
        expect(abnormalRupie.getDescription(hole.jar.rupieValue)).not.toContain('$');
        expect(abnormalRupie.getFirstDiscoveryDescription(hole.jar.rupieValue)).toContain('Current Rupie Value:31.9B');
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


    it('prepares prospective Cove effects from account-shared saved inputs', () => {
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

        const effects = hole.cove.accountEffects;

        expect(effects.dropRateMultiplier).toBeGreaterThan(1);
        expect(effects.afkGainMultiplier).toBeGreaterThan(1);
        expect(effects.multikillPerDamageTier).toBeGreaterThan(0);
        expect(effects.baseMultikill).toBeGreaterThan(0);
        expect(effects.respawnTimeMultiplier).toBeLessThan(1);
        expect(effects.bluePickupTargetId).not.toBeNull();
        expect(effects.bluePickupAmount).toBeGreaterThan(0);
        expect(effects.purplePickupTargetId).not.toBeNull();
        expect(effects.purplePickupAmount).toBeGreaterThan(0);
        expect(effects.pickupRandomDoubleChance).toBeGreaterThan(0);
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

    it('restores Villager rescue and claim readiness states', () => {
        const villager = hole.villagers[0];
        const originalLevel = villager.level;
        const originalExp = villager.currentExp;
        try {
            villager.level = 0;
            villager.currentExp = 0;
            expect(villager.rescued).toBe(false);
            expect(villager.claimReady).toBe(false);

            villager.level = 1;
            const requirement = villager.getExpRequirement();
            villager.currentExp = requirement - 1;
            expect(villager.claimReady).toBe(false);
            villager.currentExp = requirement;
            expect(villager.claimReady).toBe(true);
        } finally {
            villager.level = originalLevel;
            villager.currentExp = originalExp;
        }
    });

    it('imports the Harp selected note from its saved selection row', () => {
        const savedHoles = JSON.parse(loadTestSave(saveName).get('Holes') as string) as number[][];
        expect(Number(savedHoles[11][21])).not.toBe(Number(savedHoles[19]?.[21] ?? 0));
        expect(hole.harp.selectedNote).toBe(Number(savedHoles[11][21]));
        expect(hole.harp.tune).toBe(Number(savedHoles[11][21]));
    });

    it('counts reserved Villager investments in the prepared Opal ledger', () => {
        const savedHoles = JSON.parse(loadTestSave(saveName).get('Holes') as string) as number[][];
        const testHoles = savedHoles.map(row => [...row]);
        testHoles[3][5] = 11;
        testHoles[3][6] = 17;
        testHoles[3][7] = 23;
        const testData = new Map(gameData);
        testData.set('Holes', testHoles);
        const externalSources = hole.opalLedger.sources.filter(source => !source.id.startsWith('cavern:'));
        const externalSourceOpals: OpalExternalSourceValues = {
            'gem-shop': externalSources.find(source => source.id === 'gem-shop')?.opals ?? null,
            grimoire: externalSources.find(source => source.id === 'grimoire')?.opals ?? null,
            companion: externalSources.find(source => source.id === 'companion')?.opals ?? null,
            compass: externalSources.find(source => source.id === 'compass')?.opals ?? null,
            emperor: externalSources.find(source => source.id === 'emperor')?.opals ?? null,
            schematic: externalSources.find(source => source.id === 'schematic')?.opals ?? null,
            arcane: externalSources.find(source => source.id === 'arcane')?.opals ?? null,
            sushi: externalSources.find(source => source.id === 'sushi')?.opals ?? null,
        };
        const originalInvested = hole.opalLedger.invested;
        const originalUninvested = hole.opalLedger.uninvested;
        try {
            hole.parse(testData);
            hole.prepareOpalLedger(externalSourceOpals, externalSources);
            expect(hole.opalLedger.invested).toBe(originalInvested + 51);
            expect(hole.opalLedger.uninvested).toBe(originalUninvested! - 51);
        } finally {
            const restoredData = new Map(gameData);
            restoredData.set('Holes', savedHoles);
            hole.parse(restoredData);
            updateHole(restoredData);
        }
    });

    it('requires Kaipu rescue for first schematic and preserves the effective 105-slot cap', () => {
        const kaipu = hole.villagers[1];
        const originalLevel = kaipu.level;
        const firstSchematic = hole.schematics.find(row => row.orderPosition === 0)!;
        const firstSchematicUnlocked = firstSchematic.unlocked;
        const finalReachableSchematic = hole.schematics.find(row => row.orderPosition === 104)!;
        const cappedSchematic = hole.schematics.find(row => row.orderPosition === 105)!;
        const cappedSchematicBuilt = cappedSchematic.built;
        try {
            firstSchematic.unlocked = false;
            kaipu.level = 0;
            firstSchematic.prepareInspection(kaipu.level, hole.schematics.length);
            expect(firstSchematic.available).toBe(false);
            expect(firstSchematic.requiredKaipuLevel).toBe(1);

            kaipu.level = 1;
            firstSchematic.prepareInspection(kaipu.level, hole.schematics.length);
            expect(firstSchematic.available).toBe(true);

            finalReachableSchematic.prepareInspection(110, hole.schematics.length);
            expect(finalReachableSchematic.available).toBe(true);
            expect(finalReachableSchematic.requiredKaipuLevel).toBe(33);

            [0, 1, 33, 110].forEach(level => {
                cappedSchematic.prepareInspection(level, hole.schematics.length);
                expect(cappedSchematic.available).toBe(false);
                expect(cappedSchematic.requiredKaipuLevel).toBeNull();
                expect(cappedSchematic.built).toBe(cappedSchematicBuilt);
            });
        } finally {
            kaipu.level = originalLevel;
            firstSchematic.unlocked = firstSchematicUnlocked;
            firstSchematic.prepareInspection(originalLevel, hole.schematics.length);
            finalReachableSchematic.prepareInspection(originalLevel, hole.schematics.length);
            cappedSchematic.prepareInspection(originalLevel, hole.schematics.length);
        }
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
