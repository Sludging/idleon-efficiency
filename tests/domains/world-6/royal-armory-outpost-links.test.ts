import { Outpost, OutpostConnection } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
const connectionCases: readonly { mapId: number; connection: OutpostConnection; key: string; description: string }[] = [
    { mapId: 1, connection: { kind: 'resource', resourceId: 15 }, key: 'saved_in_range', description: 'saved graded node within reach' },
    { mapId: 27, connection: { kind: 'resource', resourceId: 4 }, key: 'depleted_candidate', description: 'exhausted node still within connection reach' },
    { mapId: 1, connection: { kind: 'resource', resourceId: 23 }, key: 'wrong_world', description: 'real node belonging to another world' },
    { mapId: 1, connection: { kind: 'resource', resourceId: 0 }, key: 'out_of_range', description: 'real same-world node outside connection reach' },
    { mapId: 27, connection: { kind: 'resource', resourceId: 6 }, key: 'zero_removed', description: 'untouched node with zero removed quantity' },
    { mapId: 1, connection: { kind: 'support', mapId: 1 }, key: 'wrong_kind', description: 'support connection from a Resource Depot' },
];


describe('Royal Armory source eligibility, connection geometry and saved-link production', () => {
    let armory: RoyalArmory;
    let results: ExtractionResults;
    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-links-data.json');
        validateExtractionHealth(results);
        armory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });
    function outpostAt(mapId: number): Outpost {
        const map = armory.mapStates.get(mapId);
        if (!map?.isOutpost()) throw new Error(`Missing genuine Outpost ${mapId} in paired save`);
        return map;
    }
    // Numeric loader intentionally normalizes numbers only; retain delivered strings/arrays here.
    function extractedResult(key: string): unknown {
        const value = results.extractions[key];
        if (!value) throw new Error(`Missing source extraction ${key}`);
        return value.result;
    }
    [
        { mapId: 0, description: 'world town' },
        { mapId: 8, description: 'fixed excluded map' },
        { mapId: 37, description: 'NonAFK map whose destination is zero' },
        { mapId: 29, description: 'NonAFK map with a nonzero destination' },
        { mapId: 1, description: 'eligible combat map' },
        { mapId: 3, description: 'hidden map with metadata x9999' },
    ].forEach(({ mapId, description }) => {
        it(`matches outpost availability for the ${description}`, () => {
            expect(Number(armory.mapStates.get(mapId)!.outpostEligible)).toMatchLiveGameWithDetails(
                getExtractedValue(results, `eligible_${mapId}`), { tolerance: 0, context: `Source outpost availability on map${mapId}` },
            );
        });
    });
    connectionCases.forEach(({ mapId, connection, key, description }) => {
        it(`matches the connection reason for a ${description}`, () => {
            expect(outpostAt(mapId).getConnectionEligibility(connection)).toBe(extractedResult(`candidate_${key}`));
        });
    });
    // These genuine saved links cover grade15, exhaustion, and grade0 respectively.
    [1, 27, 60].forEach(mapId => {
        it(`matches current inventory production from both saved links on map${mapId}`, () => {
            expect(outpostAt(mapId).productionPerHour).toMatchLiveGameWithDetails(
                getExtractedValue(results, `production_${mapId}`), { tolerance: 0, context: `Current inventory credits per hour on map${mapId}; no finite-stock forecast` },
            );
        });
    });
    // Positive/depleted saved links and one empty slot are distinct collector branches.
    [{ mapId: 1, slot: 0 }, { mapId: 27, slot: 0 }, { mapId: 1, slot: 1 }].forEach(({ mapId, slot }) => {
        it(`matches saved slot${slot} inventory credits and node removal on map${mapId}`, () => {
            const link = outpostAt(mapId).linkDetails[slot];
            expect(link.productionPerHour).toMatchLiveGameWithDetails(
                getExtractedValue(results, `link_${mapId}_${slot}_production`), { tolerance: 0, context: `Map${mapId} saved slot${slot} inventory credits` },
            );
            expect(link.nodeRemovalPerHour).toMatchLiveGameWithDetails(
                getExtractedValue(results, `link_${mapId}_${slot}_removal`), { tolerance: 0, context: `Map${mapId} saved slot${slot} node removal` },
            );
        });
    });
    it('reports the depleted saved link separately from its valid connection geometry', () => {
        const link = outpostAt(27).linkDetails[0];
        expect(link.eligible).toBe(extractedResult('candidate_depleted_candidate') === 'available');
        expect(Number(link.exhausted)).toMatchLiveGame(getExtractedValue(results, 'link_27_exhausted'), 0);
        expect(link.reason).toBe(getExtractedValue(results, 'link_27_exhausted') === 1 ? 'exhausted' : extractedResult('candidate_depleted_candidate'));
    });
    it('lists factual nonexhausted alternatives within reach of the depleted saved link', () => {
        expect(outpostAt(27).linkDetails[0].alternatives.map(node => node.nodeId)).toEqual(extractedResult('alternatives_27'));
    });
    // Materials1/2/12 are the catalog types of genuine linked nodes15/13/28, not zero-only aliases.
    [1, 2, 12].forEach(materialId => {
        it(`matches all account inventory credits for material${materialId} in collector addition order`, () => {
            expect(armory.totalResourceProduction.get(materialId)).toMatchLiveGameWithDetails(
                getExtractedValue(results, `total_material_${materialId}`), { tolerance: 0, context: `Full account material${materialId} production; both slots counted independently` },
            );
        });
    });
});
