import { OutpostRank } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';

const sharedParameters = [
    { key: 'range_orblet_bonus', description: 'Long Range Orblet bonus', getValue: (armory: RoyalArmory) => armory.getOrbletMarketBonus(8) },
    { key: 'range_guard_effect', description: 'range added by each Guard', getValue: (armory: RoyalArmory) => armory.units.getRole(RoyalUnitRole.Guard).effect },
    { key: 'range_military_rank_bonus', description: 'range added by each Military rank', getValue: (armory: RoyalArmory) => armory.getUpgradeBonus(74) },
] as const;

describe('Royal Armory Outpost connection-range direct parameters', () => {
    let armory: RoyalArmory;
    let results: ExtractionResults;

    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-range-data.json');
        validateExtractionHealth(results);
        armory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });

    sharedParameters.forEach(({ key, description, getValue }) => {
        it(`matches the ${description} used by Outpost connection range`, () => {
            expect(getValue(armory)).toMatchLiveGame(getExtractedValue(results, key), 0);
        });
    });

    // These paired Outposts exercise both zero Guards and a stationed Guard; map 6 adds no new count scenario.
    [1, 51].forEach(mapId => {
        it(`matches the total Guards extending the connection range of map ${mapId}`, () => {
            expect(armory.mapStates.get(mapId)!.units.getTotalCount(RoyalUnitRole.Guard)).toMatchLiveGame(
                getExtractedValue(results, `range_guard_count_${mapId}`), 0,
            );
        });
    });

    // All three selected Outposts have zero saved Military XP; compare that direct rank calculation once.
    it('matches the current Military rank used by Outpost connection range', () => {
        expect(armory.mapStates.get(1)!.getRankProgress(OutpostRank.Military).level).toMatchLiveGame(
            getExtractedValue(results, 'range_military_rank_1'), 0,
        );
    });
});
