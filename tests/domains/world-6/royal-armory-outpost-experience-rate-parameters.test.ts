import { OUTPOST_RANKS, OutpostRank, RankExperienceBonuses } from '../../../data/domain/world-6/royalArmory/outposts';
import { RoyalArmory } from '../../../data/domain/world-6/royalArmory/royalArmory';
import { RoyalUnitRole } from '../../../data/domain/world-6/royalArmory/units';
import { loadGameDataFromSave } from '../../utils/cloudsave-loader';
import { ExtractionResults, getExtractedValue, loadExtractionResults, validateExtractionHealth } from '../../utils/live-game-data-loader';
import { expectOutpostXpWithinBounds } from '../../utils/outpost-xp-comparison';


const preparedParameters = [
    { key: 'xp_orblet_bonus', description: 'rank experience Orblet bonus', getValue: (value: RankExperienceBonuses) => value.orbletExperienceBonus },
    // Locked Striped Hardhat has raw level -1, but the Armory consumes effective ShopUpg65=0.
    { key: 'xp_purity_shop_bonus', description: 'effective unlocked Priest purity bonus, not the raw Spelunking getter', getValue: (value: RankExperienceBonuses) => value.purityExperienceBonus },
    { key: 'xp_intel_rank_bonus', description: 'experience bonus supplied by each Intel rank', getValue: (value: RankExperienceBonuses) => value.intelRankBonus },
    { key: 'xp_support_bonus', description: 'experience bonus per incoming support', getValue: (value: RankExperienceBonuses) => value.supportExperienceBonus },
    { key: 'xp_jelly_bonus', description: 'Jelly obstruction1 rank experience bonus', getValue: (value: RankExperienceBonuses) => value.jellyExperienceBonus },
] as const;

const rankRoles = [RoyalUnitRole.Trader, RoyalUnitRole.Surveyor, RoyalUnitRole.Commander, RoyalUnitRole.Knight, RoyalUnitRole.Priest] as const;

describe('Royal Armory rank experience direct parameters', () => {
    let armory: RoyalArmory;
    let results: ExtractionResults;
    beforeAll(() => {
        results = loadExtractionResults('royal-armory-outpost-experience-rate-data.json');
        validateExtractionHealth(results);
        armory = loadGameDataFromSave('latest').get('royalArmory') as RoyalArmory;
    });

    preparedParameters.forEach(({ key, description, getValue }) => {
        it(`matches the prepared ${description} directly consumed by rank experience`, () => {
            expect(getValue(armory.rankExperienceBonuses)).toMatchLiveGame(getExtractedValue(results, key), 0);
        });
    });

    // v1.22 has no shop77 row: its undefined result cannot be a numeric extraction.
    // Its >=1 guard is inactive; full multiplier comparisons cover that source guard.
    OUTPOST_RANKS.forEach(rank => {
        it(`matches the ${RoyalUnitRole[rankRoles[rank]]} effect consumed by ${OutpostRank[rank]} experience`, () => {
            expect(armory.rankExperienceBonuses.rankEffects[rank]).toMatchLiveGame(getExtractedValue(results, `xp_role_effect_${rank}`), 0);
        });
        it(`matches the source's rank-type-map purification lookup for ${OutpostRank[rank]}`, () => {
            // Source deliberately queries maps0..4 by rank type, not the receiving outpost.
            expect(Number(armory.rankExperienceBonuses.purifiedRanks[rank])).toMatchLiveGame(getExtractedValue(results, `xp_rank_purified_${rank}`), 0);
        });
    });

    it('matches the Intel rank used by the selected map6 multiplier', () => {
        expect(armory.mapStates.get(6)!.getRankProgress(OutpostRank.Intel).level).toMatchLiveGame(getExtractedValue(results, 'xp_intel_rank_6'), 0);
    });
    it('matches the Armory17 bonus gating Militia experience', () => {
        expect(armory.getUpgradeBonus(17)).toMatchLiveGame(getExtractedValue(results, 'xp_militia_upgrade_bonus'), 0);
    });

    // Selected incoming support counts are all zero; one comparison covers that branch.
    it('matches incoming support count used by map6 rank experience', () => {
        expect(armory.mapStates.get(6)!.totalSupports).toMatchLiveGame(getExtractedValue(results, 'xp_support_count_6'), 0);
    });
    [
        ...OUTPOST_RANKS.map(rank => ({ mapId: 6, rank })),
        { mapId: 53, rank: OutpostRank.Trading },
        { mapId: 51, rank: OutpostRank.Command },
        { mapId: 1, rank: OutpostRank.Trading },
        { mapId: 1, rank: OutpostRank.Command },
    ].forEach(({ mapId, rank }) => {
        it(`matches map${mapId}'s ${OutpostRank[rank]} multiplier directly consumed by hourly gain`, () => {
            expect(armory.mapStates.get(mapId)!.getRankExperienceMultiplier(rank)).toMatchLiveGame(getExtractedValue(results, `xp_multiplier_${mapId}_${rank}`), 0);
        });
    });

    // Trader zero vs one, and Surveyor zero in the genuine selected state.
    [{ mapId: 1, role: RoyalUnitRole.Trader }, { mapId: 6, role: RoyalUnitRole.Trader }, { mapId: 6, role: RoyalUnitRole.Surveyor }].forEach(({ mapId, role }) => {
        it(`matches map${mapId}'s total ${RoyalUnitRole[role]} contributors to stationary XP`, () => {
            expect(armory.mapStates.get(mapId)!.units.getTotalCount(role)).toMatchLiveGame(getExtractedValue(results, `xp_stationary_count_${mapId}_${role}`), 0);
        });
    });


    [{ mapId: 6, rank: OutpostRank.Trading }, { mapId: 6, rank: OutpostRank.Command }, { mapId: 53, rank: OutpostRank.Trading }].forEach(({ mapId, rank }) => {
        it(`matches the next ${OutpostRank[rank]} threshold directly consumed by map${mapId} ETA`, () => {
            expectOutpostXpWithinBounds(armory.mapStates.get(mapId)!.getRankProgress(rank).nextThreshold, getExtractedValue(results, `xp_threshold_${mapId}_${rank}`));
        });
    });
});
