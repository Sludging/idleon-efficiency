import { Outpost } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';


describe('Royal Armory source eligibility and saved-link depletion', () => {
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
    it('matches the saved depleted-link state', () => {
        const link = outpostAt(27).linkDetails[0];
        expect(Number(link.exhausted)).toMatchLiveGame(getExtractedValue(results, 'link_27_exhausted'), 0);
    });
});
