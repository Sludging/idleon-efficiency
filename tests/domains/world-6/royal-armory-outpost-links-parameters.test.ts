import { Player } from '../../../data/domain/player';
import { Alchemy } from '../../../data/domain/world-2/alchemy/alchemy';
import type { RoyalGuardianContribution } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory, getRoyalGuardianContribution } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { getTargetPlayer } from '../../utils/target-player';


describe('Royal Armory saved-link production and candidate direct parameters', () => {
    let results: ExtractionResults;
    let armory: RoyalArmory;
    let contribution: RoyalGuardianContribution;
    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-links-data.json');
        validateExtractionHealth(results);
        const gameData = loadGameDataFromSave('latest');
        armory = gameData.get('royalArmory') as RoyalArmory;
        const players = gameData.get('players') as Player[];
        const alchemy = gameData.get('alchemy') as Alchemy;
        contribution = getRoyalGuardianContribution(getTargetPlayer(players), alchemy, players);
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
    it('matches every built Outpost collection rate for the capture-selected character context', () => {
        // Preserve the source array rather than numeric-normalizing the whole extraction.
        const extracted = results.extractions.parameter_rates;
        if (!extracted || !Array.isArray(extracted.result)) throw new Error('Missing source collection-rate array for all genuine built Outposts');
        for (const [mapId, expected] of extracted.result as [number, number][]) {
            const map = armory.mapStates.get(mapId)!;
            expect(map.getResourceCollectionRate(armory.resourceCollectionBonuses, contribution)).toMatchLiveGame(expected, 0);
        }
    });
    it('matches the prepared Savage Stronghold node-removal multiplier', () => {
        expect(armory.productionBonuses.savageCollectionMultiplier).toMatchLiveGame(getExtractedValue(results, 'parameter_savage'), 0);
    });
    it('matches the Armory bonus used directly to prepare Savage removal', () => {
        expect(armory.getUpgradeBonus(69)).toMatchLiveGame(getExtractedValue(results, 'parameter_savage_upgrade'), 0);
    });
});
