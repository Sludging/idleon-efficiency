import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';


describe('Royal Armory saved-link production and candidate direct parameters', () => {
    let results: ExtractionResults;
    let armory: RoyalArmory;
    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-links-data.json');
        validateExtractionHealth(results);
        armory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });
    [1, 27].forEach(mapId => {
        it(`matches the connection reach used by candidates of map${mapId}`, () => {
            const map = armory.mapStates.get(mapId)!;
            if (!map.isOutpost()) throw new Error(`Missing genuine Outpost${mapId}`);
            expect(map.connectionRange).toMatchLiveGame(getExtractedValue(results, `parameter_range_${mapId}`), 0);
        });
        it(`matches the source outpost gate for saved production on map${mapId}`, () => {
            expect(Number(armory.mapStates.get(mapId)!.outpostEligible)).toMatchLiveGame(getExtractedValue(results, `parameter_eligible_${mapId}`), 0);
        });
    });
    it('matches every built Outpost collection rate consumed by the account material totals', () => {
        // Preserve the source array rather than numeric-normalizing the whole extraction.
        const extracted = results.extractions.parameter_rates;
        if (!extracted || !Array.isArray(extracted.result)) throw new Error('Missing source collection-rate array for all genuine built Outposts');
        for (const [mapId, expected] of extracted.result as [number, number][]) {
            expect(armory.getOutpostResourceRate(mapId)).toMatchLiveGame(expected, 0);
        }
    });
    it('matches the prepared Savage Stronghold node-removal multiplier', () => {
        // No kind2 exists in this save: source multiplier parity is not an exercised Savage collection branch.
        expect(armory.productionBonuses.savageCollectionMultiplier).toMatchLiveGame(getExtractedValue(results, 'parameter_savage'), 0);
    });
    it('matches the Armory bonus used directly to prepare Savage removal', () => {
        expect(armory.getUpgradeBonus(69)).toMatchLiveGame(getExtractedValue(results, 'parameter_savage_upgrade'), 0);
    });
});
