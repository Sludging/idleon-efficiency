import { createHash } from 'crypto';
import fs from 'fs';
import path from 'path';
import { SkillsIndex } from '../../../data/domain/SkillsIndex';
import type { Anvil, AnvilWrapper } from '../../../data/domain/world-1/anvil';
import { loadGameDataFromSave, loadTestSave } from '../../utils/cloudsave-loader';
import {
    ExtractionResults,
    getExtractedValue,
    loadExtractionResults,
    validateExtractionHealth,
} from '../../utils/live-game-data-loader';
import { TARGET_PLAYER_INDEX } from '../../utils/target-player';

const saveName = 'latest';
const cloudSave = loadTestSave(saveName);
const playerNames = cloudSave.get('playerNames') as string[];
const startupInput = cloudSave.toJSON();
const accountDataset = require('../../helpers/account-dataset.cjs') as {
    getSelectedAccountDataset(): { manifest: { results: Record<string, string> } } | undefined;
    resolveExtractionResultsPath(filename: string): string;
};
const { prepareCharacterAfkInput } = require('../../../sub-projects/idleon-offline/character-afk-input.cjs') as {
    prepareCharacterAfkInput(
        input: Record<string, unknown>,
        options: { zeroCharacterAfk: boolean; evaluationTimeMs: number },
    ): Record<string, unknown>;
};
const selectedDataset = accountDataset.getSelectedAccountDataset();
const resultFiles = selectedDataset
    ? Object.keys(selectedDataset.manifest.results)
    : fs.readdirSync(path.dirname(accountDataset.resolveExtractionResultsPath('anvil-production-data.json')));
const captures = resultFiles
    .filter(filename => /^anvil-production(?:-actor\d+)?-data\.json$/.test(filename))
    .map(filename => ({
        filename,
        playerID: filename === 'anvil-production-data.json'
            ? TARGET_PLAYER_INDEX
            : Number(filename.match(/-actor(\d+)-data\.json$/)![1]),
    }));

function inputHash(input: Record<string, unknown>): string {
    return createHash('sha256').update(JSON.stringify(input, (_key, value: unknown) => {
        if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
            const object = value as Record<string, unknown>;
            return Object.fromEntries(Object.keys(object).sort().map(key => [key, object[key]]));
        }
        return value;
    })).digest('hex');
}

function decodeSaved<T>(value: T | string): T {
    return typeof value === 'string' ? JSON.parse(value) as T : value;
}

interface AnvilActorContext {
    activePlayerIndex: number;
    playerName: string;
    characterClass: number;
    mapId: number;
    smithingLevel: number;
    pointCounts: number[];
    acmeAllocatedLevel: number;
    acmeNativeBonus: number;
    levels: number[];
    levelDriftIndexes: number[];
    talents: Record<string, number>;
    activeTalentPreset: number;
    divinityLinks: number[];
    superTalentMembership: number[][];
    labPositions: number[];
    beanstalkQuantities: unknown;
    foodIdentities: string[];
    foodSlotsOwned: number;
    goldenFoodQuantities: { slot: number; item: string; quantity: number }[];
    materialBag: number;
    accountTalentAllocations: {
        actorIndex: number;
        playerName: string;
        talents: Record<string, number>;
    }[];
    inputOptions: { zeroCharacterAfk: boolean; evaluationTimeMs: number };
    effectiveInputCanonicalJsonSha256: string;
}


// Native getters read the active actor. Each included packet must match the selected save.
// Source: docs/game-snippets/anvil/AnvilProduceStats.1.25.js:8.
describe('Anvil native capture selection', () => {
    it('includes captures without duplicate character packets', () => {
        expect(captures.length).toBeGreaterThan(0);
        expect(new Set(captures.map(capture => capture.playerID)).size).toBe(captures.length);
    });
});

describe.each(captures)(
    'Anvil native outputs for character $playerID',
    ({ filename, playerID }) => {
        let anvil: Anvil;
        let results: ExtractionResults;

        beforeAll(() => {
            expect(Number.isSafeInteger(playerID)).toBe(true);
            expect(playerID).toBeGreaterThanOrEqual(0);
            expect(typeof playerNames[playerID]).toBe('string');
            expect(playerNames[playerID].length).toBeGreaterThan(0);
            results = loadExtractionResults(filename);
            validateExtractionHealth(results);

            const context: AnvilActorContext = results.extractions.anvil_actor_context.result;
            const savedPointCounts = cloudSave.get(`AnvilPAstats_${playerID}`) as number[];
            const savedSkillLevels = cloudSave.get(`Lv0_${playerID}`) as number[];
            const savedTalents = decodeSaved<Record<string, number>>(cloudSave.get(`SL_${playerID}`));

            // Hash the effective input, not the source file bytes or later runtime writes.
            expect(typeof context.inputOptions.zeroCharacterAfk).toBe('boolean');
            expect(Number.isSafeInteger(context.inputOptions.evaluationTimeMs)).toBe(true);
            expect(context.inputOptions.evaluationTimeMs).toBeGreaterThan(0);
            const effectiveInput = prepareCharacterAfkInput(startupInput, context.inputOptions);
            expect(context.effectiveInputCanonicalJsonSha256).toBe(inputHash(effectiveInput));

            expect(context.activePlayerIndex).toBe(playerID);
            expect(context.playerName).toBe(playerNames[playerID]);
            expect(context.characterClass).toBe(cloudSave.get(`CharacterClass_${playerID}`));
            expect(context.mapId).toBe(cloudSave.get(`CurrentMap_${playerID}`));
            expect(context.smithingLevel).toBe(savedSkillLevels[SkillsIndex.Smithing]);
            expect(context.acmeAllocatedLevel).toBe(savedTalents['281'] ?? 0);
            expect(context.pointCounts).toEqual(savedPointCounts);
            expect(results.extractions.anvil_saved_point_counts.result).toEqual(savedPointCounts);

            // Account catchup can advance unrelated skills even without character absence.
            // These Anvil consumers use class level, Smithing, and Divinity, not every skill level.
            expect(context.levels).toHaveLength(savedSkillLevels.length);
            expect(context.levelDriftIndexes).toEqual(savedSkillLevels.flatMap((level, index) =>
                context.levels[index] === level ? [] : [index],
            ));
            for (const index of [0, SkillsIndex.Smithing, SkillsIndex.Divinity]) {
                expect(context.levels[index]).toBe(savedSkillLevels[index]);
            }

            const savedNonzeroTalents = Object.fromEntries(Object.entries(savedTalents)
                .map(([id, level]) => [id, Number(level)] as const)
                .filter(([, level]) => level !== 0));
            expect(context.talents).toEqual(savedNonzeroTalents);
            expect(context.activeTalentPreset).toBe(Number(decodeSaved<number[]>(cloudSave.get(`PlayerStuff_${playerID}`))[1]));
            expect(context.divinityLinks).toEqual(decodeSaved<number[]>(cloudSave.get('Divinity')).slice(0, 24));
            expect(context.superTalentMembership).toEqual(decodeSaved<number[][]>(cloudSave.get('Spelunk')).slice(20, 44));
            expect(context.labPositions).toEqual(decodeSaved<number[][]>(cloudSave.get('Lab'))[0]);
            expect(context.beanstalkQuantities).toEqual(decodeSaved<unknown[]>(cloudSave.get('Ninja'))[104]);
            expect(context.foodIdentities).toEqual(Array.from(
                decodeSaved<ArrayLike<ArrayLike<string>>>(cloudSave.get(`EquipOrder_${playerID}`))[2],
            ));
            expect(context.foodSlotsOwned).toBe(Number(cloudSave.get(`FoodSlO_${playerID}`)));
            for (const { slot, item, quantity } of context.goldenFoodQuantities) {
                expect(slot).toBeGreaterThanOrEqual(0);
                expect(slot).toBeLessThan(context.foodSlotsOwned);
                expect(item).toBe(cloudSave.get(`EquipOrder_${playerID}`)[2][slot]);
                expect(quantity).toBe(Number(cloudSave.get(`EquipQTY_${playerID}`)[2][slot]));
            }
            expect(context.materialBag).toBe(Number(decodeSaved<Record<string, number>>(
                cloudSave.get(`MaxCarryCap_${playerID}`),
            ).bCraft));
            expect(context.accountTalentAllocations).toEqual(playerNames.map((playerName, actorIndex) => {
                const talents = decodeSaved<Record<string, number>>(cloudSave.get(`SL_${actorIndex}`));
                return {
                    actorIndex,
                    playerName,
                    talents: Object.fromEntries([49, 54, 56, 209, 535, 536]
                        .map(id => [String(id), Number(talents[id] ?? 0)])),
                };
            }));

            const account = loadGameDataFromSave(saveName);
            anvil = (account.get('anvil') as AnvilWrapper).playerAnvils[playerID];
        });

        it('matches production work per hour', () => {
            // The native getter returns work per second. Existing public speed is work per hour.
            const expected = 3600 * getExtractedValue(results, 'anvil_production_speed_per_second');
            expect(anvil.anvilSpeed).toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: `Character ${playerID}: Anvil production work per hour`,
            });
        });

        it('matches the production EXP bonus percentage', () => {
            // Existing consumers use a bonus percentage, not the native EXP multiplier.
            const multiplier = getExtractedValue(results, 'anvil_production_exp_multiplier');
            const expected = 100 * (multiplier - 1);
            expect(anvil.anvilXP).toMatchLiveGameWithDetails(expected, {
                tolerance: 0,
                context: `Character ${playerID}: direct native Anvil production EXP bonus percentage`,
            });
        });

        it('matches native per-product storage capacity', () => {
            expect(anvil.productCapacity).toMatchLiveGameWithDetails(
                getExtractedValue(results, 'anvil_product_capacity'),
                {
                    tolerance: 0,
                    context: `Character ${playerID}: direct native Anvil product capacity in items`,
                },
            );
        });

        it('matches points supplied by Acme Anvil', () => {
            expect(anvil.pointsFromAcme).toMatchLiveGameWithDetails(
                getExtractedValue(results, 'anvil_acme_points'),
                {
                    tolerance: 0,
                    context: `Character ${playerID}: Acme Anvil point contribution`,
                },
            );
        });

        it('matches purchased coin-point costs reconstructed at the current character discount', () => {
            expect(anvil.getTotalCoinCost()).toMatchLiveGameWithDetails(
                getExtractedValue(results, 'anvil_reconstructed_coin_spend'),
                {
                    tolerance: 0,
                    context: `Character ${playerID}: reconstructed coin spend, not historical transactions`,
                },
            );
        });

        it('matches all purchased material tiers reconstructed at the current character discount', () => {
            const expected: Record<string, number> = results.extractions.anvil_reconstructed_material_spend.result;
            const actual = anvil.getTotalMonsterMatCost();
            expect(Object.keys(actual).sort()).toEqual(Object.keys(expected).sort());

            for (const [item, amount] of Object.entries(expected)) {
                expect(actual[item]).toMatchLiveGameWithDetails(amount, {
                    tolerance: 0,
                    context: `Character ${playerID}: reconstructed ${item} spend across purchased material points`,
                });
            }
        });
    },
);
